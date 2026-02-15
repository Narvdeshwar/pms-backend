import dotenv from 'dotenv';
dotenv.config();
import { prisma } from './src/shared/db/client';
import bcrypt from 'bcryptjs';

async function main() {
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminRole = await prisma.role.findUnique({ where: { name: 'IT_SYSTEM_ADMIN' } });

    if (!adminRole) {
        console.error('Role IT_SYSTEM_ADMIN not found. Please run seed first.');
        return;
    }

    const user = await prisma.user.upsert({
        where: { email: 'admin@pms.com' },
        update: {
            password: hashedPassword,
            roleId: adminRole.id,
        },
        create: {
            email: 'admin@pms.com',
            name: 'System Admin',
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });

    console.log(`✅ Admin user created/updated: ${user.email}`);
    console.log(`Password: ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
