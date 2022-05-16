import styled from "styled-components";
import Labelinput from "../etc/labelInput";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WindowBox = styled.div`
  display: flex;
  height: 80%;
  width: 80%;
  flex-direction: column;
  border: 2px solid green;
`;
const ColumnBox = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;

function Login({ f }: { f: Function }) {
  return (
    <Frame>
      <WindowBox>
        <ColumnBox>
          <Labelinput label={"username"} f={() => {}}></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Labelinput label={"password"} f={() => {}}></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Button>가입</Button>
          <Button
            onClick={() => {
              f(true);
            }}
          >
            로그인
          </Button>
        </ColumnBox>
      </WindowBox>
    </Frame>
  );
}
export default Login;
