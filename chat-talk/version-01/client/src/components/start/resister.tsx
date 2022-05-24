import axios from "axios";
import { checkPrime } from "crypto";
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
const url = process.env.REACT_APP_SERVER_URL || "";

function Resister({ dataf }: { dataf: Function }) {
  let [udata, udataf] = useState<Udata>({
    userName: "",
    password: "",
    email: "",
  });

  function check() {
    if (udata.userName.length === 0) {
      return false;
    }

    if (udata.password.length === 0) {
      return false;
    }

    if (udata.email.length === 0) {
      return false;
    }

    return true;
  }

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
              if (check()) {
                axios
                  .post(url + "/user/", { ...udata })
                  .then((x) => {
                    dataf({
                      isLogin: true,
                      isResister: false,
                      userInfo: udata,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
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
