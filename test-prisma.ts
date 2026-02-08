import { prisma } from "./src/shared/db";

async function test() {
    try {
        const count = await (prisma as any).order.count();
        console.log("Order count:", count);
    } catch (e) {
        console.error("Order access failed:", e);
    } finally {
        process.exit();
    }
}

test();
