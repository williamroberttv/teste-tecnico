import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { rabbitmqQueueConfig } from './config/rabbitmq';

try {
  dotenv.config();
} catch {
  console.warn('dotenv not found, prod env?');
}

async function bootstrap() {
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule);

  const queues = [
    {
      queue: 'fila.notificacao.entrada.WILLIAM',
      prefetchCount: 1,
      noAck: false,
    },
    {
      queue: 'fila.notificacao.status.WILLIAM',
      prefetchCount: 1,
      noAck: false,
    },
  ];

  for (const queue of queues) {
    app.connectMicroservice(rabbitmqQueueConfig(queue));
  }

  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(await app.getUrl());
}
bootstrap();
