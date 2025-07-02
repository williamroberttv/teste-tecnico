import { HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IStoreStatus } from 'src/shared/interfaces/store.interface';
import { StoreService } from 'src/shared/services/store.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let client: Partial<ClientProxy>;
  let storeService: Partial<StoreService>;

  beforeEach(() => {
    client = {
      emit: jest.fn(),
    };
    storeService = {
      setStatus: jest.fn(),
    };
    service = new NotificationService(
      client as ClientProxy,
      client as ClientProxy,
      storeService as StoreService,
    );
  });

  describe('create', () => {
    it('should emit notification and return confirmation message', () => {
      const dto: CreateNotificationDto = {
        mensagemId: '123',
        conteudoMensagem: '',
      };
      const result = service.create(dto);
      expect(client.emit).toHaveBeenCalledWith(
        'fila.notificacao.entrada.WILLIAM',
        dto,
      );
      expect(result).toEqual({ message: 'Notificação em processamento.' });
    });

    it('should throw HttpException if emit fails', () => {
      const dto: CreateNotificationDto = {
        mensagemId: '456',
        conteudoMensagem: '',
      };
      (client.emit as jest.Mock).mockImplementation(() => {
        throw new Error('fail');
      });
      expect(() => service.create(dto)).toThrow(HttpException);
    });
  });

  describe('handleMessage', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
    });

    afterEach(() => {
      (Math.random as jest.Mock).mockRestore();
    });

    it('should process message successfully and call emit and setStatus with success', async () => {
      const payload: CreateNotificationDto = {
        mensagemId: '789',
        conteudoMensagem: '',
      };
      await service.handleMessage(payload);

      const expectedStatus: IStoreStatus = {
        mensagemId: '789',
        status: 'FALHA_PROCESSAMENTO',
      };
      expect(client.emit).toHaveBeenCalledWith(
        'fila.notificacao.status.WILLIAM',
        expectedStatus,
      );
      expect(storeService.setStatus).toHaveBeenCalledWith(expectedStatus);
    });

    it('should throw HttpException if emitting status fails', async () => {
      const payload: CreateNotificationDto = {
        mensagemId: '000',
        conteudoMensagem: '',
      };
      (client.emit as jest.Mock).mockImplementation(() => {
        throw new Error('emit error');
      });
      await expect(service.handleMessage(payload)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
