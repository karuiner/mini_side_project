import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 5%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LabelBox = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
  border: 2px solid green;
`;
const InputBox = styled.input`
  display: flex;
  width: 100%;
  flex: 1 0 0;
  border: 2px solid green;
`;

function Labelinput({ label, f }: { label: string; f: Function }) {
  return (
    <Frame>
      <LabelBox>label</LabelBox>
      <InputBox></InputBox>
    </Frame>
  );
}
export default Labelinput;
