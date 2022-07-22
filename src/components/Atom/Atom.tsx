import { atom } from "recoil";
import { IToDoState } from "../interface/interface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const toDoState = atom<IToDoState>({
  key: "Todo",
  default: {
    To_Do: [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
