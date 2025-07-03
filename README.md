# Teste Técnico - Sistema de Notificações

Este projeto é composto por duas aplicações principais:

- **api/**: Backend desenvolvido em [NestJS](https://nestjs.com/) responsável pelo processamento e gerenciamento das notificações, utilizando RabbitMQ como broker de mensagens.
- **front/**: Frontend desenvolvido em [Angular](https://angular.io/) para envio e visualização das notificações.

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Como rodar o projeto com Docker Compose

O projeto já está configurado para rodar a API e o RabbitMQ via Docker Compose. Siga os passos abaixo:

1. **Clone o repositório e acesse a pasta do projeto:**

   ```sh
   git clone https://github.com/williamroberttv/teste-tecnico.git
   cd teste-tecnico/api
   ```

2. **Configure as variáveis de ambiente:**

   Copie o arquivo `.env.example` para `.env` e ajuste as variáveis se necessário:

   ```sh
   cp .env.example .env
   ```

3. **Suba os containers:**

   ```sh
   docker-compose up --build
   ```

   Isso irá iniciar:
   - O serviço **api** (NestJS) na porta `3333`
   - O serviço **RabbitMQ** nas portas `5672` (broker) e `15672` (painel de administração)

4. **Acesse o painel do RabbitMQ (opcional):**

   - URL: [http://localhost:15672](http://localhost:15672)
   - Usuário/Senha padrão: `guest` / `guest`

5. **Rodando o Frontend (Angular):**

   O frontend não está incluso no Compose, rode manualmente:

   ```sh
   cd ../front
   npm install
   npm start
   ```

   Acesse [http://localhost:4200](http://localhost:4200) para utilizar a aplicação.

## Scripts úteis

### API

- `npm run start:dev` — inicia a API em modo desenvolvimento (hot reload)
- `npm run test` — executa os testes unitários
- `npm run test:e2e` — executa os testes end-to-end

### Frontend

- `npm start` — inicia o servidor de desenvolvimento Angular
- `npm run build` — gera o build de produção

## Estrutura dos diretórios

```
api/      # Backend NestJS
front/    # Frontend Angular
```

## Observações

- Certifique-se de que as portas `3333`, `5672`, `15672` e `4200` estejam livres.
- O backend espera que o RabbitMQ esteja disponível conforme as variáveis de ambiente.
- O frontend se comunica com a API em `http://localhost:3000/api` por padrão (ajuste em `front/src/environments/environment.ts` se necessário).

---

Qualquer dúvida, consulte os READMEs específicos em [api/README.md](api/README.md) e [front/README.md](front/README.md).