import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty({ message: 'O ID da mensagem não pode estar vazio.' })
  @IsString({ message: 'O ID da mensagem deve ser uma string.' })
  mensagemId: string;

  @IsNotEmpty({ message: 'O conteúdo da mensagem não pode estar vazio.' })
  @IsString({ message: 'O conteúdo da mensagem deve ser uma string.' })
  conteudoMensagem: string;
}
