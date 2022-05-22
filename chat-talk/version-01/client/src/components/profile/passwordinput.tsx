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
const Line = styled.div`
  flex: 1 0 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LabelBox = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 50px;
  flex: 1 0 0;
`;
const InputBox = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const TextBox = styled.span`
  display: flex;
`;
const Input = styled.input`
  height: 100%;
  width: 50%;
`;

function Labelinput({ f }: { f: Function }) {
  let pp = "";
  return (
    <Frame>
      <Line>
        <LabelBox>
          <TextBox>{"Password"}</TextBox>
        </LabelBox>
        <InputBox>
          <Input
            type={"password"}
            onChange={(e) => {
              pp = e.target.value;
            }}
          ></Input>
        </InputBox>
      </Line>
      <Line>
        <LabelBox>
          <TextBox>{"Password 재입력"}</TextBox>
        </LabelBox>
        <InputBox>
          <Input
            type={"password"}
            onChange={(e) => {
              if (e.target.value === pp) {
                f(pp);
              }
            }}
          ></Input>
        </InputBox>
      </Line>
    </Frame>
  );
}
export default Labelinput;
