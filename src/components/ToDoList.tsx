import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ToDoSate } from "./Atom/Atom";
import CreateToDo from "./CreateTodo";
import ToDo from "./Todo";
const Wrapper = styled.div`
  max-width: 700px;
`;

function ToDoList() {
  const todo = useRecoilValue(ToDoSate);
  return (
    <Wrapper>
      <span>To do</span>
      <CreateToDo />
      <ul>
        {todo.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </Wrapper>
  );
}
export default ToDoList;
