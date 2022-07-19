import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../Atom/Atom";
import { IBoardInputProps, IToDo } from "../interface/interface";

export default function BoardInput({ BoardId }: IBoardInputProps) {
  const { register, handleSubmit, setValue } = useForm<IToDo>();
  const setToDo = useSetRecoilState(toDoState);
  const onVaild = (data: IToDo) => {
    const newToDo = {
      id: Date.now(),
      text: data.todo,
    };
    setToDo((allBoard) => {
      return {
        ...allBoard,
        [BoardId]: [...allBoard[BoardId], newToDo],
      };
    });
    setValue("todo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onVaild)}>
      <input
        {...register("todo", { required: true })}
        type="text"
        placeholder="enter your to task"
      />
    </Form>
  );
}
const Form = styled.form`
  padding: 10px 10px;
  width: 100%;
  box-sizing: border-box;
  input {
    width: 100%;
    background-color: inherit;
    border: none;
    color: white;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: white;
    }
  }
`;
