import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { RegisterInput, LoginInput } from '../auth.validation';
import { prisma } from "@/shared/db";

const JWT_SECRET = process.env.JWT_SECRET || "something";

export const RegisterUser = async (input: RegisterInput) => {
    // check first if the user is already register with input email address
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } })
    if (existingUser) throw new Error("User already registered!")

    // hashing of password
    const hashedPassword = await bcrypt.hash(input.password, 10)

    // Find role - use provided role or fallback to 'LINE_OPERATOR'
    const roleName = input.role || 'LINE_OPERATOR';
    const role = await prisma.role.findUnique({
        where: { name: roleName }
    });

    if (!role) throw new Error(`Role '${roleName}' not found!`);

    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
            roleId: role.id,
            department: input.department
        }
    })
    const { password: _, ...userWithOutPassword } = user;
    const token = jwt.sign({ userId: user.id, role: roleName }, JWT_SECRET, { expiresIn: '1d' });

    return {
        token,
        user: {
            ...userWithOutPassword,
            role: roleName
        }
    };
}
export const LoginUser = async (input: LoginInput) => {
    // check if the user is register or not
    const isUserExits = await prisma.user.findUnique({
        where: { email: input.email },
        include: { role: true }
    })
    if (!isUserExits) throw new Error("Invalid email or password")

    const isValidPassword = await bcrypt.compare(input.password, isUserExits.password)
    if (!isValidPassword) throw new Error("Invalid email or password")

    const token = jwt.sign({ userId: isUserExits.id, role: isUserExits.role.name }, JWT_SECRET, { expiresIn: '1d' })
    return { token, user: { id: isUserExits.id, name: isUserExits.name, email: isUserExits.email, role: isUserExits.role.name } }
}
