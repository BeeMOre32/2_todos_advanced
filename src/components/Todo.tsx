import { useSetRecoilState } from "recoil";
import { ToDoSate } from "./Atom/Atom";
import { ITodo } from "./interface/interface";

export default function ToDo({ text, category, id }: ITodo) {
  const setTodo = useSetRecoilState<ITodo[]>(ToDoSate);
  const onClick = (NewCategory: ITodo["category"]) => {
    setTodo((prev) => {
      const TargetIndex = prev.findIndex((prev) => prev.id === id);
      const NewTodo = { text, id, category: NewCategory };
      const NewTodoArr = [...prev];
      NewTodoArr.splice(TargetIndex, 1, NewTodo);
      return NewTodoArr;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To do</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}
