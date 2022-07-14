import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IDraggableProps } from "./interface/interface";

const Card = styled.div`
  padding: 10px 10px;
  border-radius: 3px;
  margin-bottom: 5px;
  background-color: ${(p) => p.theme.cardColor};
`;

function DraggableCard({ todo, index }: IDraggableProps) {
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(p) => (
        <Card ref={p.innerRef} {...p.dragHandleProps} {...p.draggableProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
