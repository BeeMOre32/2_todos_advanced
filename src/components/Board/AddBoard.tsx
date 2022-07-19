import styled from "styled-components";

const Input = styled.input`
  background-color: inherit;
  border: none;
  color: white;
  &:focus {
    outline: none;
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

export default function AddBoard() {
  return (
    <Box>
      <Input type="text" placeholder="Add your Board" />
    </Box>
  );
}
