export interface IDraggableProps {
  todo: string;
  index: number;
}

export interface IBoardProps {
  toDo: string[];
  boardId: string;
}

export interface IToDoState {
  [key: string]: string[];
}

export interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromWith: boolean;
}
