import { Body, Controller, Get, Post } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';

@Controller('notificar')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto): {
    message: string;
  } {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  getHello() {
    this.notificationService.getAll();
  }

  @MessagePattern('fila.notificacao.entrada.WILLIAM')
  async handleStudentInvite(@Ctx() context: RmqContext): Promise<void> {
    try {
      const content = context.getMessage().content.toString('utf-8');
      const originalMessageData = JSON.parse(content);
      await this.notificationService.handleMessage(originalMessageData);
    } catch (error) {
      console.error('Erro ao processar a mensagem de notificação', error);
    }
  }
}
