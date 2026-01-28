import dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../src/shared/db/client';

async function main() {
  const roles = ['ADMIN', 'MANAGER', 'OPERATOR', 'VIEWER'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `Default ${roleName} role`,
      },
    });
  }

  console.log('✅ Roles seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
