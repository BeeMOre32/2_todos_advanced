import { type } from "@testing-library/user-event/dist/type";
import { atom, selector } from "recoil";
import { categories, ITodo } from "../interface/interface";

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
});

export const ToDoSate = atom<ITodo[]>({
  key: "Todo",
  default: [],
});

export const ToDoSelector = selector({
  key: "TodoSelector",
  get: ({ get }) => {
    const toDo = get(ToDoSate);
    const category = get(categoryState);
    return toDo.filter((todo) => todo.category === category);
  },
});
