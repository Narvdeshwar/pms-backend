import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { prisma } from './shared/db/client';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log(' Database connected successfully');

    const server = app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });

    const shutdown = async () => {
      console.log(' Shutting down server...');
      server.close(() => {
        console.log('HTTP server closed.');
      });
      await prisma.$disconnect();
      console.log('Database disconnected.');
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error(' Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
