export type ColumnStatus = 'idea' | 'todo' | 'in-progress' | 'done';


export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  status: ColumnStatus;
  createdAt: number;
}

export interface KanbanColumn {
  id: ColumnStatus;
  title: string;
  color: string;
}