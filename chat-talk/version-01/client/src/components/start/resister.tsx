import { useState } from "react";
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

interface Udata {
  userName: string;
  password: string;
  email: string;
}

function Resister({ dataf }: { dataf: Function }) {
  let [udata, udataf] = useState<Udata>({
    userName: "",
    password: "",
    email: "",
  });
  return (
    <Frame>
      <WindowBox>
        <ColumnBox>
          <Labelinput
            label={"username"}
            type={"text"}
            f={(name: string) => {
              udataf({ ...udata, userName: name });
            }}
          ></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Labelinput
            label={"password"}
            type={"password"}
            f={(password: string) => {
              udataf({ ...udata, password: password });
            }}
          ></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Labelinput
            label={"password check"}
            type={"password"}
            f={(password: string) => {
              return udata.password === password;
            }}
          ></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Labelinput
            label={"email"}
            type={"email"}
            f={(email: string) => {
              udataf({ ...udata, email: email });
            }}
          ></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Button
            onClick={() => {
              dataf({ isLogin: true, isResister: false, userInfo: udata });
            }}
          >
            회원 가입
          </Button>
          <Button
            onClick={() => {
              dataf({ isResister: false });
            }}
          >
            돌아가기
          </Button>
        </ColumnBox>
      </WindowBox>
    </Frame>
  );
}
export default Resister;
