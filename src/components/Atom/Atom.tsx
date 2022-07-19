import { atom } from "recoil";
import { IToDoState } from "../interface/interface";

export const toDoState = atom<IToDoState>({
  key: "Todo",
  default: {
    To_Do: [],
    Doing: [],
    Done: [],
  },
});
