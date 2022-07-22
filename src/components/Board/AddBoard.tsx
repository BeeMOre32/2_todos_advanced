import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../Atom/Atom";
import { IBoardInput } from "../interface/interface";

const Input = styled.input`
  background-color: inherit;
  border: none;
  color: white;
  width: 400px;
  font-size: 30px;
  &:focus {
    outline: none;
    border: none;
  }
  &::placeholder {
    color: white;
  }
`;

const Box = styled.div`
  top: 20%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form``;

export default function AddBoard() {
  const setBoard = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IBoardInput>();
  const onVaild = (data: IBoardInput) => {
    const newBoard = data.Board;
    setBoard((allBoard) => {
      return {
        ...allBoard,
        [newBoard]: [],
      };
    });
    setValue("Board", "");
  };
  return (
    <Box>
      <Form onSubmit={handleSubmit(onVaild)}>
        <Input
          {...register("Board", { required: true })}
          type="text"
          placeholder="Type and enter to add board"
        />
      </Form>
    </Box>
  );
}
