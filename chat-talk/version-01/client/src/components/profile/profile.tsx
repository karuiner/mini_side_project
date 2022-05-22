import { useEffect, useState } from "react";
import styled from "styled-components";
import Data from "../etc/datainterface";
import base from "../../image/default.png";
import LabelLine from "./Labelline";
import Passwordinput from "./passwordinput";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ButtonBox = styled.div`
  display: flex;
  flex: 1 0 0;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 20px;
  justify-content: space-between;
  align-items: center;
`;

const Logout = styled.button`
  display: flex;
  border-radius: 10px;
`;
const Modify = styled.button`
  display: flex;
  border-radius: 10px;
`;

const ImageBox = styled.div`
  display: flex;
  flex: 5 0 0;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.img`
  height: 25vh;
  width: 25vh;
  border: 1px solid black;
  border-radius: 50%;
`;

const Ibutton = styled.button`
  height: 3vh;
  box-sizing: border-box;

  margin: 1.5vh;
  border-radius: 10px;
`;
const InfoBox = styled.div`
  display: flex;
  flex: 5 0 0;
  width: 100%;
  flex-direction: column;
`;
const PasswordLine = styled.div`
  display: flex;
  flex: 2 0 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

interface user {
  userName?: string;
  password?: string;
  email?: string;
  message?: string;
}

function Profile({ data, dataf }: { data: Data; dataf: Function }) {
  let [udata, udataf] = useState<user>({});

  return (
    <Frame>
      <ButtonBox>
        {data.isModify ? (
          <Modify
            onClick={() => {
              dataf({ isModify: false });
            }}
          >
            취소
          </Modify>
        ) : (
          <Modify
            onClick={() => {
              dataf({ isModify: true });
            }}
          >
            프로필 수정
          </Modify>
        )}
        {data.isModify ? (
          <Logout
            onClick={() => {
              dataf({
                userInfo: udata,
                isModify: false,
              });
            }}
          >
            수정
          </Logout>
        ) : (
          <Logout
            onClick={() => {
              dataf({
                isLogin: false,
                isResister: false,
                isChatting: false,
                boxOn: false,
                content: "friend",
                userInfo: {},
                friends: [],
                room: [],
              });
            }}
          >
            logout
          </Logout>
        )}
      </ButtonBox>
      <ImageBox>
        <Image src={base}></Image>
        {data.isModify ? <Ibutton>이미지 수정</Ibutton> : null}
      </ImageBox>
      <InfoBox>
        <LabelLine
          data={data.userInfo.userName || ""}
          udataf={udataf}
          label={"userName"}
          type={"text"}
          x={data.isModify}
        ></LabelLine>

        <LabelLine
          data={data.userInfo.email || ""}
          udataf={udataf}
          label={"email"}
          type={"email"}
          x={data.isModify}
        ></LabelLine>

        <LabelLine
          data={""}
          udataf={udataf}
          label={"message"}
          type={"text"}
          x={data.isModify}
        ></LabelLine>

        <PasswordLine>
          {data.isModify ? <Passwordinput f={udataf}></Passwordinput> : null}
        </PasswordLine>
      </InfoBox>
    </Frame>
  );
}
export default Profile;
