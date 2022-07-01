import { atom } from "recoil";
import { ITodo } from "../interface/interface";

export const ToDoSate = atom<ITodo[]>({
  key: "Todo",
  default: [],
});
