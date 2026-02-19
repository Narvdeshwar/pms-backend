import { prisma } from "@/shared/db";
import { CreateLotRecordInput, CreateSerialRecordInput, CreateTraceabilityRecordInput } from "../traceability.validation";

// Lot Records
export const getAllLots = async () => {
    return await prisma.lotRecord.findMany({
        orderBy: { updatedAt: 'desc' }
    });
};

export const getLotById = async (id: string) => {
    return await prisma.lotRecord.findUnique({
        where: { id },
        include: {
            serials: true
        }
    });
};

export const createLot = async (data: CreateLotRecordInput) => {
    const { manufacturingDate, expiryDate, ...rest } = data;
    return await prisma.lotRecord.create({
        data: {
            ...rest,
            manufacturingDate: new Date(manufacturingDate),
            expiryDate: expiryDate ? new Date(expiryDate) : null,
        }
    });
};

export const updateLot = async (id: string, data: any) => {
    const updateData = { ...data };
    if (updateData.manufacturingDate) updateData.manufacturingDate = new Date(updateData.manufacturingDate);
    if (updateData.expiryDate) updateData.expiryDate = new Date(updateData.expiryDate);

    return await prisma.lotRecord.update({
        where: { id },
        data: updateData
    });
};

export const deleteLot = async (id: string) => {
    return await prisma.lotRecord.delete({
        where: { id }
    });
};

// Serial Records
export const getAllSerials = async () => {
    return await prisma.serialRecord.findMany({
        orderBy: { updatedAt: 'desc' }
    });
};

export const getSerialById = async (id: string) => {
    return await prisma.serialRecord.findUnique({
        where: { id },
        include: {
            lot: true
        }
    });
};

export const createSerial = async (data: CreateSerialRecordInput) => {
    const { manufacturingDate, ...rest } = data;
    return await prisma.serialRecord.create({
        data: {
            ...rest,
            manufacturingDate: new Date(manufacturingDate),
        }
    });
};

export const updateSerial = async (id: string, data: any) => {
    const updateData = { ...data };
    if (updateData.manufacturingDate) updateData.manufacturingDate = new Date(updateData.manufacturingDate);

    return await prisma.serialRecord.update({
        where: { id },
        data: updateData
    });
};

export const deleteSerial = async (id: string) => {
    return await prisma.serialRecord.delete({
        where: { id }
    });
};

// Traceability Records
export const getAllTraceabilityRecords = async (filters?: any) => {
    const where: any = {};

    if (filters?.lotNumber) {
        const lot = await prisma.lotRecord.findFirst({
            where: { lotNumber: filters.lotNumber }
        });
        if (lot) where.referenceId = lot.id;
    }

    if (filters?.serialNumber) {
        const serial = await prisma.serialRecord.findFirst({
            where: { serialNumber: filters.serialNumber }
        });
        if (serial) where.referenceId = serial.id;
    }

    if (filters?.jobId) where.jobId = filters.jobId;
    if (filters?.dateFrom || filters?.dateTo) {
        where.timestamp = {};
        if (filters.dateFrom) where.timestamp.gte = new Date(filters.dateFrom);
        if (filters.dateTo) where.timestamp.lte = new Date(filters.dateTo);
    }

    return await prisma.traceabilityRecord.findMany({
        where,
        orderBy: { timestamp: 'desc' }
    });
};

export const createTraceabilityRecord = async (data: CreateTraceabilityRecordInput) => {
    return await prisma.traceabilityRecord.create({
        data
    });
};
