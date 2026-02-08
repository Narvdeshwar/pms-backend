import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { RegisterInput, LoginInput } from '../auth.validation';
import { prisma } from '../../../shared/db/client';

const JWT_SECRET = process.env.JWT_SECRET || "something";

export const RegisterUser = async (input: RegisterInput) => {
    // check first if the user is already register with input email address
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } })
    if (existingUser) throw new Error("User already registered!")

    // hashing of password
    const hashedPassword = await bcrypt.hash(input.password, 10)

    // Find default role 'OPERATOR'
    const defaultRole = await prisma.role.findUnique({ where: { name: 'OPERATOR' } })
    if (!defaultRole) throw new Error("Default role 'OPERATOR' not found!")

    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
            roleId: defaultRole.id
        }
    })
    const { password, ...userWithOutPassword } = user;
    return userWithOutPassword;
}
export const LoginUser = async (input: LoginInput) => {
    // check if the user is register or not
    const isUserExits = await prisma.user.findUnique({ where: { email: input.email } })
    if (!isUserExits) throw new Error("Invalid email or password")

    const isValidPassword = await bcrypt.compare(input.password, isUserExits.password)
    if (!isValidPassword) throw new Error("Invalid email or password")

    const token = jwt.sign({ userId: isUserExits.id, role: isUserExits.roleId }, JWT_SECRET, { expiresIn: '1d' })
    return { token, user: { id: isUserExits.id, name: isUserExits.name, email: isUserExits.email, role: isUserExits.roleId } }
}