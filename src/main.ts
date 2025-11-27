import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);

  await app.listen(process.env.PORT_EMAIL_SERVICE ?? 3000);

  logger.log(
    `SERVIÇO INICIALIZADO NA PORTA ${process.env.PORT_EMAIL_SERVICE ?? 3000}`,
  );
}
bootstrap();
