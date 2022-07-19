export interface IDraggableProps {
  toDoId: number;
  index: number;
  toDoText: string;
}

export interface IBoardProps {
  toDo: ITodo[];
  boardId: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromWith: boolean;
}

export interface IToDo {
  todo: string;
}

export interface ITodo {
  id: number;
  text: string;
}

export interface IBoardInputProps {
  BoardId: string;
}
