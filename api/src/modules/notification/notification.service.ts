import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IStoreStatus } from '../../shared/interfaces/store.interface';
import { StoreService } from '../../shared/services/store.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('fila.notificacao.entrada.WILLIAM')
    private entradaClient: ClientProxy,
    @Inject('fila.notificacao.status.WILLIAM')
    private statusClient: ClientProxy,
    private storeService: StoreService,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    try {
      this.entradaClient.emit(
        'fila.notificacao.entrada.WILLIAM',
        createNotificationDto,
      );

      return {
        message: 'Notificação em processamento.',
      };
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      throw new HttpException(
        { message: 'Não foi possível processar a mensagem de notificação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async handleMessage(payload: CreateNotificationDto) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const randomNumber = Math.floor(Math.random() * 10);

      const statusPayload: IStoreStatus = {
        mensagemId: payload.mensagemId,
        status:
          randomNumber <= 2 ? 'FALHA_PROCESSAMENTO' : 'PROCESSADO_SUCESSO',
      };

      this.statusClient.emit('fila.notificacao.status.WILLIAM', statusPayload);
      this.storeService.setStatus(statusPayload);
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      throw new HttpException(
        { message: 'Não foi possível processar a mensagem de notificação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getAll() {
    this.storeService.getAll();
  }
}
