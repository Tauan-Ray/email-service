import 'dotenv/config';

import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaForumService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: `${process.env.DATABASE_URL}`,
    });
    super({ log: ['error'], adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await this.$disconnect();
      await app.close();
    });
  }

  catchPrismaError<T>(error: Error, document: T) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      if (error.message.includes('P2002')) {
        throw new Prisma.PrismaClientValidationError(
          `Chave primária violada. Documento => ${document}`,
          { clientVersion: error.clientVersion },
        );
      }

      if (error.message.includes('P2025')) {
        throw new Prisma.PrismaClientValidationError(
          `Operação depende de um registro não encontrado. Documento => ${document}`,
          { clientVersion: error.clientVersion },
        );
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Prisma.PrismaClientValidationError(
        `Erro de validação, por favor verifique o documento. Documento => ${document}`,
        { clientVersion: error.clientVersion },
      );
    }

    throw error.message;
  }
}
