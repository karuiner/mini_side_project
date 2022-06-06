import styled from "styled-components";
import { Data } from "../interface/datainterface";
import Labelinput from "../etc/labelInput";
import axios from "axios";
import { useState } from "react";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const url = process.env.REACT_APP_SERVER_URL || "";
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
interface Idata {
  userName: string;
  password: string;
}

function Login({ dataf }: { dataf: Function }) {
  let [idata, idataf] = useState<{ userName: string; password: string }>({
    userName: "",
    password: "",
  });

  return (
    <Frame>
      <WindowBox>
        <ColumnBox>
          <Labelinput
            label={"username"}
            type={"text"}
            f={(v: string) => {
              if (v.length > 0) {
                idataf({ ...idata, userName: v });
              }
            }}
          ></Labelinput>
        </ColumnBox>
        <ColumnBox>
          <Labelinput
            label={"password"}
            type={"password"}
            f={(v: string) => {
              if (v.length > 0) {
                idataf({ ...idata, password: v });
              }
            }}
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
              axios
                .post(url + "/user/signin", { ...idata })
                .then((x) => {
                  dataf({ isLogin: true, userInfo: { ...x.data } });
                })
                .catch((err) => {});
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
