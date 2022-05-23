import { useState } from "react";
import styled from "styled-components";
import Chat from "../chat/chat";
import { Data } from "../interface/datainterface";
import Friend from "../friend/friend";
import Profile from "../profile/profile";
import Room from "../room/room";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid black;
  background-color: yellow;
`;
const ButtonBox = styled.div`
  height: 8vh;
  display: flex;
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
  box-sizing: border-box;
  width: 100%;
  height: 72vh;
`;

function Main({ data, dataf }: { data: Data; dataf: Function }) {
  return (
    <Frame>
      {!data.isChatting ? (
        <>
          <ButtonBox>
            <Button
              onClick={() => {
                dataf({ content: "friend", boxOn: false });
              }}
            >
              친구 목록
            </Button>
            <Button
              onClick={() => {
                dataf({ content: "room", boxOn: false });
              }}
            >
              대화방
            </Button>
            <Button
              onClick={() => {
                dataf({ content: "profile", boxOn: false });
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
            {data.content === "room" ? (
              <Room data={data} dataf={dataf}></Room>
            ) : (
              <></>
            )}
            {data.content === "profile" ? (
              <Profile data={data} dataf={dataf}></Profile>
            ) : (
              <></>
            )}
          </ContentBox>
        </>
      ) : (
        <Chat data={data} dataf={dataf}></Chat>
      )}
    </Frame>
  );
}
export default Main;
