import { Injectable } from '@nestjs/common';
import { IStoreStatus } from '../interfaces/store.interface';

@Injectable()
export class StoreService {
  private readonly messageStatusStore = new Map<string, string>();

  setStatus(data: IStoreStatus): void {
    console.log(
      `[StatusService] Armazenando status para messageId ${data.mensagemId}: ${data.status}`,
    );
    this.messageStatusStore.set(data.mensagemId, data.status);
  }

  getStatus(messageId: string): string | undefined {
    return this.messageStatusStore.get(messageId);
  }

  getAll(): Map<string, string> {
    return this.messageStatusStore;
  }
}
