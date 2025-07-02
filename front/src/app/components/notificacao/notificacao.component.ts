import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { INotification } from '../../shared/interfaces/notification.interface';
import { NotificacaoService } from './services/notificacao.service';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss'],
  imports: [FormsModule, ReactiveFormsModule],
  providers: [NotificacaoService],
  standalone: true,
})
export class NotificacaoComponent {
  conteudoMensagem = new FormControl<string>('', {
    validators: Validators.required,
  });
  notificacoes: INotification[] = [];

  constructor(private notificationService: NotificacaoService) {}

  handleNotification(): void {
    if (this.conteudoMensagem.invalid) {
      return;
    }

    const mensagemId = uuidv4();
    const mensagem = this.conteudoMensagem.value!;

    const payload = {
      mensagemId,
      conteudoMensagem: mensagem,
      status: 'AGUARDANDO PROCESSAMENTO',
    };

    this.notificationService.enviarNotificacao(payload).subscribe(
      () => {
        this.notificacoes.unshift(payload);
        this.conteudoMensagem.reset();
      },
      (err) => {
        window.alert(
          `Erro ao enviar notificação: ${
            err.error.message || 'Erro desconhecido'
          }`
        );
      }
    );
  }
}
