import { atom, selector } from "recoil";
import { IToDoState } from "../interface/interface";

export const toDoState = atom<IToDoState>({
  key: "Todo",
  default: {
    To_Do: ["a", "d"],
    Doing: ["f", "b"],
    Done: ["c", "e"],
  },
});
