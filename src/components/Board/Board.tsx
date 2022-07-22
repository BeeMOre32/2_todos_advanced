import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IAreaProps, IBoardProps } from "../interface/interface";
import BoardInput from "./BoardInput";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../Atom/Atom";

const Wrapper = styled.div`
  padding: 10px 0px;
  background-color: ${(p) => p.theme.bgColor};
  border-radius: 8px;
  min-height: 150px;
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 20px;
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

const Btn = styled.button`
  width: 30px;
  height: 30px;
  background-color: inherit;
  border: none;
  position: absolute;
  left: 80%;
  top: 0;
`;

function Board({ toDo, boardId, index }: IBoardProps) {
  const setBoardDel = useSetRecoilState(toDoState);
  const onDelhandler = (boardId: string) => {
    setBoardDel((allBoard) => {
      const copiedAllBoard = { ...allBoard };
      delete copiedAllBoard[boardId];
      return copiedAllBoard;
    });
  };
  return (
    <Draggable index={index} draggableId={boardId}>
      {(p) => (
        <Wrapper ref={p.innerRef} {...p.draggableProps}>
          <Title {...p.dragHandleProps}>{boardId}</Title>
          <Btn onClick={() => onDelhandler(boardId)}>❌</Btn>
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
      )}
    </Draggable>
  );
}

export default Board;
