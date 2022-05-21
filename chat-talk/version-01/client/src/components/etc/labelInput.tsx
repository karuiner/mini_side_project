import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 2%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LabelBox = styled.div`
  display: flex;
  width: 80%;
  flex: 1 0 0;
  justify-content: center;
  font-size: 150%;
  align-items: center;
`;
const InputBox = styled.div`
  display: flex;
  width: 80%;
  flex: 1 0 0;
  justify-content: center;
  align-items: center;
`;
const TextBox = styled.span`
  display: flex;
`;
const Input = styled.input`
  display: flex;
  height: 80%;
  width: 80%;
  text-align: right;
  border-radius: 5px;
`;

function Labelinput({
  label,
  type,
  f,
}: {
  label: string;
  type: string;
  f: Function;
}) {
  return (
    <Frame>
      <LabelBox>
        <TextBox>{label}</TextBox>
      </LabelBox>
      <InputBox>
        <Input
          type={type}
          onChange={(e) => {
            f(e.target.value);
          }}
        ></Input>
      </InputBox>
    </Frame>
  );
}
export default Labelinput;
