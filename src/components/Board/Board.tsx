import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IAreaProps, IBoardProps } from "../interface/interface";
import BoardInput from "./BoardInput";

const Wrapper = styled.div`
  padding: 10px 0px;
  background-color: ${(p) => p.theme.bgColor};
  border-radius: 8px;
  min-height: 70px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
`;

const Area = styled.div<IAreaProps>`
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.accentColor
      : props.isDraggingFromWith
      ? "#95a5a6"
      : "inherit"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

function Board({ toDo, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <BoardInput BoardId={boardId} />
      <Droppable droppableId={boardId}>
        {(p, snap) => (
          <Area
            isDraggingOver={snap.isDraggingOver}
            isDraggingFromWith={Boolean(snap.draggingFromThisWith)}
            ref={p.innerRef}
            {...p.droppableProps}
          >
            {toDo.map((todo, index) => (
              <DraggableCard
                key={todo.id}
                toDoId={todo.id}
                index={index}
                toDoText={todo.text}
              />
            ))}
            {p.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
