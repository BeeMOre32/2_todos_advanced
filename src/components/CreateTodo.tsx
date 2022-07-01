import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, ToDoSate } from "./Atom/Atom";
import { IfromType } from "./interface/interface";

export default function CreateToDo() {
  const setTodo = useSetRecoilState(ToDoSate);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IfromType>();
  const onVaild = ({ Todo }: IfromType) => {
    setTodo((prev) => [{ text: Todo, id: Date.now(), category }, ...prev]);
  };

  return (
    <form onSubmit={handleSubmit(onVaild)}>
      <input
        placeholder="write your to do"
        {...register("Todo", {
          required: "you need to write something to register",
        })}
      ></input>
      <button>Add</button>
    </form>
  );
}
