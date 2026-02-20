import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function main() {
  console.log('🌱 Seeding database...');

  // Create roles
  console.log('Creating roles...');
  const roles = [
    { name: 'IT_SYSTEM_ADMIN', description: 'System Administrator with full access' },
    { name: 'PLANT_MANAGER', description: 'Plant Manager with oversight access' },
    { name: 'PRODUCTION_PLANNER', description: 'Production Planner managing schedules' },
    { name: 'SALES', description: 'Sales Person managing orders' },
    { name: 'SHOP_FLOOR_SUPERVISOR', description: 'Shop Floor Supervisor' },
    { name: 'LINE_OPERATOR', description: 'Line Operator on production floor' },
    { name: 'MAINTENANCE_TECHNICIAN', description: 'Maintenance Technician' },
    { name: 'QUALITY_INSPECTOR', description: 'Quality Inspector' },
    { name: 'INVENTORY_WAREHOUSE_MANAGER', description: 'Inventory/Warehouse Manager' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  console.log('✅ Roles created');

  // Create test users
  console.log('Creating test users...');
  const password = await bcrypt.hash('Password123', 10);

  const users = [
    { email: 'admin@pms.com', name: 'System Admin', role: 'IT_SYSTEM_ADMIN' },
    { email: 'plant@pms.com', name: 'Plant Manager', role: 'PLANT_MANAGER' },
    { email: 'planner@pms.com', name: 'Production Planner', role: 'PRODUCTION_PLANNER' },
    { email: 'sales@pms.com', name: 'Sales Person', role: 'SALES' },
    { email: 'supervisor@pms.com', name: 'Shop Supervisor', role: 'SHOP_FLOOR_SUPERVISOR' },
    { email: 'operator@pms.com', name: 'Line Operator', role: 'LINE_OPERATOR' },
    { email: 'maintenance@pms.com', name: 'Maintenance Tech', role: 'MAINTENANCE_TECHNICIAN' },
    { email: 'quality@pms.com', name: 'Quality Inspector', role: 'QUALITY_INSPECTOR' },
    { email: 'inventory@pms.com', name: 'Inventory Manager', role: 'INVENTORY_WAREHOUSE_MANAGER' },
  ];

  for (const user of users) {
    const role = await prisma.role.findUnique({ where: { name: user.role } });
    if (role) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name,
          password,
          roleId: role.id,
        },
      });
    }
  }

  console.log('✅ Test users created');
  console.log('\n📝 Test Credentials:');
  console.log('   Email: admin@pms.com (or any role email)');
  console.log('   Password: Password123');
  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
