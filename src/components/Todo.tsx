import { useSetRecoilState } from "recoil";
import { ToDoSate } from "./Atom/Atom";
import { categories, ITodo } from "./interface/interface";

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
      {category !== categories.TO_DO && (
        <button onClick={() => onClick(categories.TO_DO)}>To do</button>
      )}
      {category !== categories.DOING && (
        <button onClick={() => onClick(categories.DOING)}>Doing</button>
      )}
      {category !== categories.DONE && (
        <button onClick={() => onClick(categories.DONE)}>Done</button>
      )}
    </li>
  );
}
