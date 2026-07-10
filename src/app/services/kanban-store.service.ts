import {Injectable, inject, signal} from '@angular/core';
import {StorageStoreService} from './storage-store.service';
import {KanbanCard, ColumnStatus} from '../models/kanban.model';

const KANBAN_STORAGE_KEY = 'kanban_tasks';

@Injectable({
  providedIn: 'root',
})
export class KanbanStoreService {

  private readonly storageStoreService = inject(StorageStoreService);
  public readonly cardsSignal = signal<KanbanCard[]>(
    this.storageStoreService.getData<KanbanCard[]>(KANBAN_STORAGE_KEY) || []
  );

  public addCard(title: string, description: string, status: ColumnStatus): void {
    const newCard: KanbanCard = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      createdAt: Date.now(),
    };
    const updatedCards = [...this.cardsSignal(), newCard];
    this.saveAndEmit(updatedCards);
  }

  public deleteCard(id: string): void {
    const updatedCards = this.cardsSignal().filter(card => card.id !== id);
    this.saveAndEmit(updatedCards);
  }

  public updateCardStatus(id: string, newStatus: ColumnStatus): void {
    const updatedCards = this.cardsSignal().map(card => 
      card.id === id ? {...card, status: newStatus} : card
    );
    this.saveAndEmit(updatedCards);
  }

  public updateCard(id: string, newTitle: string, newDescription: string): void {
    const updatedCards = this.cardsSignal().map(card => 
      card.id === id ? {...card, title: newTitle, description: newDescription} : card
    );
    this.saveAndEmit(updatedCards);
  }

  private saveAndEmit(newCards: KanbanCard[]): void {
    this.cardsSignal.set(newCards);
    this.storageStoreService.setData(KANBAN_STORAGE_KEY, newCards);
  }
}