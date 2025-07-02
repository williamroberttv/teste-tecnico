import { ClientsModule, Transport } from '@nestjs/microservices';

export const rabbitmqQueueConfig = ({
  queue,
  prefetchCount = 1,
  noAck = false,
}: {
  queue: string;
  prefetchCount?: number;
  noAck?: boolean;
}) => ({
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
    ],
    queue,
    prefetchCount,
    noAck,
    queueOptions: {
      durable: true,
    },
  },
});

export const rabbitmqClient = (queue: string) =>
  ClientsModule.register([
    {
      name: queue,
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
        ],
        prefetchCount: 1,
        queue,
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
    },
  ]);
