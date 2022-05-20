import { useState } from "react";
import styled from "styled-components";
import Chat from "../chat/chat";
import Data from "../etc/datainterface";
import Friend from "../friend/friend";
import Profile from "../profile/profile";
import Room from "../room/room";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: white;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid black;
`;
const ButtonBox = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  flex: 1 0 0;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 10 0 0;
`;

function Main({ data, dataf }: { data: Data; dataf: Function }) {
  return (
    <Frame>
      {!data.isChatting ? (
        <>
          <ButtonBox>
            <Button
              onClick={() => {
                dataf({ content: "friend" });
              }}
            >
              친구 목록
            </Button>
            <Button
              onClick={() => {
                dataf({ content: "room" });
              }}
            >
              대화방
            </Button>
            <Button
              onClick={() => {
                dataf({ content: "profile" });
              }}
            >
              프로필
            </Button>
          </ButtonBox>
          <ContentBox>
            {data.content === "friend" ? (
              <Friend data={data} dataf={dataf}></Friend>
            ) : (
              <></>
            )}
            {data.content === "room" ? <Room data={data}></Room> : <></>}
            {data.content === "Profile" ? (
              <Profile data={data}></Profile>
            ) : (
              <></>
            )}
          </ContentBox>
        </>
      ) : (
        <Chat></Chat>
      )}
    </Frame>
  );
}
export default Main;
