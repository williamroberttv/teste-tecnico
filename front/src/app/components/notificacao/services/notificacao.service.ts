import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { INotification } from '../../../shared/interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  enviarNotificacao(payload: INotification): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.baseUrl + '/notificar',
      payload
    );
  }
}
