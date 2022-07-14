import styled, { createGlobalStyle } from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./components/Atom/Atom";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";

const GobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	background-color: ${(props) => props.theme.bodyColor};
	color: ${(prop) => prop.theme.textColor};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardGrid = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDo, setToDo] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDo((allBoard) => {
        // same borad movement
        const copy = [...allBoard[source.droppableId]];
        copy.splice(source.index, 1);
        copy.splice(destination.index, 0, draggableId);
        return {
          ...allBoard,
          [source.droppableId]: copy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDo((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const destinationBoard = [...allBoard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <GobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <BoardGrid>
            {Object.keys(toDo).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDo={toDo[boardId]} />
            ))}
          </BoardGrid>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
