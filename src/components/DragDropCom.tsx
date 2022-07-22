import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./Atom/Atom";
import Board from "./Board/Board";
import AddBoard from "./Board/AddBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

const BoardGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardWrapper = styled.div`
  box-sizing: border-box;
`;

const TrashCan = styled.div<{ isDraggingover: boolean }>`
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
  transform: ${(p) => (p.isDraggingover ? "scale(1.1)" : "none")};
  transition: all 0.1s ease-in-out;
`;

export default function DragDropCom() {
  const [toDo, setToDo] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    // Dragging movement
    const { destination, source } = info;
    if (!destination) return;
    if (info.type === "board") {
      // board movement
      setToDo((allBoard) => {
        const copiedBoard = Object.entries({ ...allBoard });
        const cutTodo = [...copiedBoard.splice(source.index, 1)];
        copiedBoard.splice(destination.index, 0, ...cutTodo);
        return {
          ...Object.fromEntries(copiedBoard),
        };
      });
    }
    if (destination?.droppableId === source.droppableId) {
      setToDo((allBoard) => {
        // same borad movement
        const copy = [...allBoard[source.droppableId]];
        const copyObj = copy[source.index];
        copy.splice(source.index, 1);
        copy.splice(destination.index, 0, copyObj);
        return {
          ...allBoard,
          [source.droppableId]: copy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      if (destination.droppableId === "TrashCan") {
        // Delete TODO
        setToDo((allBoard) => {
          const sourceBoard = [...allBoard[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return {
            ...allBoard,
            [source.droppableId]: sourceBoard,
          };
        });
      }

      if (destination.droppableId !== "TrashCan") {
        setToDo((allBoard) => {
          // Different Board movement
          const sourceBoard = [...allBoard[source.droppableId]];
          const copySource = sourceBoard[source.index];
          const destinationBoard = [...allBoard[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, copySource);
          return {
            ...allBoard,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBoard />
        <BoardWrapper>
          <Droppable
            droppableId="BoardMovement"
            direction="horizontal"
            type="board"
          >
            {(p) => (
              <BoardGrid {...p.droppableProps} ref={p.innerRef}>
                {Object.keys(toDo).map((boardId, index) => (
                  <Board
                    index={index}
                    key={boardId}
                    boardId={boardId}
                    toDo={toDo[boardId]}
                  />
                ))}
                {p.placeholder}
              </BoardGrid>
            )}
          </Droppable>
          <Droppable droppableId="TrashCan">
            {(m, snap) => (
              <TrashCan ref={m.innerRef} isDraggingover={snap.isDraggingOver}>
                <FontAwesomeIcon icon={solid("trash-can")} size="2x" />
              </TrashCan>
            )}
          </Droppable>
        </BoardWrapper>
      </Wrapper>
    </DragDropContext>
  );
}
