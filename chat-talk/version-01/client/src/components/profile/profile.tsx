import { useEffect, useState } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";
import base from "../../image/default.png";
import LabelLine from "./Labelline";
import Passwordinput from "./passwordinput";
import axios from "axios";

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
const Button = styled.div`
  display: flex;
  height: 50%;
  width: 25%;
  background-color: white;
  border-radius: 20px;
  font-size: 20px;
  color: red;
  font-weight: bold;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;

interface user {
  userName?: string;
  password?: string;
  email?: string;
  statusMessage?: string;
}

function Profile({ data, dataf }: { data: Data; dataf: Function }) {
  let [udata, udataf] = useState<user>({});
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/user/${data.userInfo.id}` || "")
      .then((x) => {
        console.log(x.data);
        dataf({ userInfo: { ...x.data } });
      })
      .catch(() => {});
  }, []);

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
              console.log(udata);
              axios
                .patch(process.env.REACT_APP_SERVER_URL + `/user` || "", {
                  id: data.userInfo.id,
                  data: { ...udata },
                })
                .then((e) => {
                  console.log(e);
                  dataf({
                    userInfo: { ...data.userInfo, ...udata },
                    isModify: false,
                  });
                })
                .catch();
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
          data={data.userInfo.statusMessage || ""}
          udataf={udataf}
          label={"statusMessage"}
          type={"text"}
          x={data.isModify}
        ></LabelLine>

        <PasswordLine>
          {data.isModify ? (
            <Passwordinput f={udataf}></Passwordinput>
          ) : (
            <Button
              onClick={() => {
                axios
                  .delete(
                    process.env.REACT_APP_SERVER_URL +
                      `/user/${data.userInfo.id}` || ""
                  )
                  .then(() => {
                    dataf({}, true);
                    console.log("탈퇴 완료");
                  })
                  .catch(() => {
                    console.log("탈퇴 실패");
                  });
              }}
            >
              탈퇴
            </Button>
          )}
        </PasswordLine>
      </InfoBox>
    </Frame>
  );
}
export default Profile;
