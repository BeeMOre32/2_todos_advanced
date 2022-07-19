import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IDraggableProps } from "../interface/interface";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px 10px;
  border-radius: 3px;
  margin-bottom: 5px;
  background-color: ${(p) => (p.isDragging ? "#3498db" : p.theme.cardColor)};
  box-shadow: ${(p) => (p.isDragging ? "0px 3px 8px rgba(0,0,0,0.5)" : "none")};
`;

function DraggableCard({ toDoId, toDoText, index }: IDraggableProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(p, m) => (
        <Card
          isDragging={m.isDragging}
          ref={p.innerRef}
          {...p.dragHandleProps}
          {...p.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
