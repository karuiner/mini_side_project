import styled from "styled-components";
import Data from "../etc/datainterface";
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
  border-radius: 20px;
  border: 2px solid black;
`;
const ColumnBox = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  margin: 5%;
  border-radius: 10px;
  border: 2px solid black;
`;

function Login({ dataf }: { dataf: Function }) {
  return (
    <Frame>
      <WindowBox>
        <ColumnBox>
          <Labelinput
            label={"username"}
            type={"text"}
            f={() => {}}
          ></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Labelinput
            label={"password"}
            type={"password"}
            f={() => {}}
          ></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Button
            onClick={() => {
              dataf({ isResister: true });
            }}
          >
            회원 가입
          </Button>
          <Button
            onClick={() => {
              dataf({ isLogin: true });
            }}
          >
            로그인
          </Button>
        </ColumnBox>
        <ColumnBox></ColumnBox>
      </WindowBox>
    </Frame>
  );
}
export default Login;
