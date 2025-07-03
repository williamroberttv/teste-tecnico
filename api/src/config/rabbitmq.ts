import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
config();

export const rabbitmqQueueConfig = (queue: string) => ({
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
    ],
    queue,
    queueOptions: {
      durable: true,
    },
  },
});

export const rabbitmqClient = (service: string, queue: string) =>
  ClientsModule.register([
    {
      name: service,
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
        ],
        queue,
        queueOptions: {
          durable: true,
        },
      },
    },
  ]);
