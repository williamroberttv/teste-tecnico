import { Module } from '@nestjs/common';
import { rabbitmqClient } from 'src/config/rabbitmq';
import { StoreService } from 'src/shared/services/store.service';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    rabbitmqClient('NOTIFICATION_ENTRADA', 'fila.notificacao.entrada.WILLIAM'),
    rabbitmqClient('NOTIFICATION_STATUS', 'fila.notificacao.status.WILLIAM'),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, StoreService],
})
export class NotificationModule {}
