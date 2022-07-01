import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, ToDoSate, ToDoSelector } from "./Atom/Atom";
import CreateToDo from "./CreateTodo";
import { categories } from "./interface/interface";
import ToDo from "./Todo";
const Wrapper = styled.div`
  max-width: 700px;
`;

function ToDoList() {
  const Todo = useRecoilValue(ToDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as unknown as categories);
  };
  return (
    <Wrapper>
      <span>To do</span>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={categories.TO_DO}>To do</option>
        <option value={categories.DOING}>Doing</option>
        <option value={categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {Todo.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </Wrapper>
  );
}
export default ToDoList;
