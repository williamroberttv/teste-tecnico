import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { INotification } from '../../../shared/interfaces/notification.interface';
import { NotificacaoService } from './notificacao.service';

describe('NotificacaoService', () => {
  let service: NotificacaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        NotificacaoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(NotificacaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the correct URL with the correct payload', () => {
    const mockPayload: INotification = {
      mensagemId: '123-abc',
      conteudoMensagem: 'Hello World',
      status: 'AGUARDANDO PROCESSAMENTO',
    };

    const mockResponse = { message: 'Notificação enviada com sucesso' };
    const expectedUrl = 'http://localhost:3000/api/notificar';

    service.enviarNotificacao(mockPayload).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toBe('POST');

    expect(req.request.body).toEqual(mockPayload);

    req.flush(mockResponse);
  });
});
