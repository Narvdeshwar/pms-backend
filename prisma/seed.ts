import dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../src/shared/db/client';

async function main() {
  const roles = [
    'PLANT_MANAGER',
    'PRODUCTION_PLANNER',
    'SHOP_FLOOR_SUPERVISOR',
    'LINE_OPERATOR',
    'MAINTENANCE_TECHNICIAN',
    'QUALITY_MANAGER_INSPECTOR',
    'INVENTORY_WAREHOUSE_MANAGER',
    'IT_SYSTEM_ADMIN',
    'SALES'
  ];

  // Ensure required roles exist first
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `${roleName.replace(/_/g, ' ').toLowerCase()} role`,
      },
    });
  }

  const defaultAdminRole = await prisma.role.findUnique({ where: { name: 'IT_SYSTEM_ADMIN' } });

  if (defaultAdminRole) {
    // Reassign users with roles not in the new list to IT_SYSTEM_ADMIN
    await prisma.user.updateMany({
      where: {
        role: {
          name: {
            notIn: roles
          }
        }
      },
      data: {
        roleId: defaultAdminRole.id
      }
    });
  }

  // Delete roles that are not in the list
  await prisma.role.deleteMany({
    where: {
      name: {
        notIn: roles
      }
    }
  });

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
