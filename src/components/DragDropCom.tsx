import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./Atom/Atom";
import Board from "./Board/Board";
import AddBoard from "./Board/AddBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
`;

const BoardGrid = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const BoardWrapper = styled.div`
  box-sizing: border-box;
`;

const TrashCan = styled.div`
  position: absolute;
  top: 80%;
  left: 90%;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function DragDropCom() {
  const [toDo, setToDo] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    console.log(info);

    // if (destination?.droppableId === source.droppableId) {
    //   setToDo((allBoard) => {
    //     // same borad movement
    //     const copy = [...allBoard[source.droppableId]];
    //     const copyObj = copy[source.index];
    //     copy.splice(source.index, 1);
    //     copy.splice(destination.index, 0, copyObj);
    //     return {
    //       ...allBoard,
    //       [source.droppableId]: copy,
    //     };
    //   });
    // }
    // if (destination.droppableId !== source.droppableId) {
    //   setToDo((allBoard) => {
    //     const sourceBoard = [...allBoard[source.droppableId]];
    //     const copySource = sourceBoard[source.index];
    //     const destinationBoard = [...allBoard[destination.droppableId]];
    //     sourceBoard.splice(source.index, 1);
    //     destinationBoard.splice(destination.index, 0, copySource);
    //     return {
    //       ...allBoard,
    //       [source.droppableId]: sourceBoard,
    //       [destination.droppableId]: destinationBoard,
    //     };
    //   });
    // }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBoard />
        <BoardWrapper>
          <BoardGrid>
            {Object.keys(toDo).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDo={toDo[boardId]} />
            ))}
          </BoardGrid>
          <Droppable droppableId="TrashCan">
            {(m) => (
              <TrashCan ref={m.innerRef}>
                <FontAwesomeIcon icon={solid("trash-can")} size="2x" />
              </TrashCan>
            )}
          </Droppable>
        </BoardWrapper>
      </Wrapper>
    </DragDropContext>
  );
}
