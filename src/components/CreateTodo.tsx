import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ToDoSate } from "./Atom/Atom";
import { IfromType } from "./interface/interface";

export default function CreateToDo() {
  const setTodo = useSetRecoilState(ToDoSate);
  const { register, handleSubmit, setValue } = useForm<IfromType>();
  const onVaild = ({ Todo }: IfromType) => {
    setTodo((prev) => [
      { text: Todo, id: Date.now(), category: "TO_DO" },
      ...prev,
    ]);
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
