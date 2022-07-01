export interface ITodo {
  text: string;
  id: number;
  category: categories;
}
export interface IfromType {
  Todo: string;
}
export enum categories {
  "TO_DO",
  "DOING",
  "DONE",
}
