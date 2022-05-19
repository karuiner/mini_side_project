import { useState } from "react";
import styled from "styled-components";
import Friend from "../friend/friend";
import Profile from "../profile/profile";
import Room from "../room/room";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: yellow;
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

function Main() {
  let [target, targetf] = useState(0);

  return (
    <Frame>
      <ButtonBox>
        <Button
          onClick={() => {
            targetf(0);
          }}
        >
          친구 목록
        </Button>
        <Button
          onClick={() => {
            targetf(1);
          }}
        >
          대화방
        </Button>
        <Button
          onClick={() => {
            targetf(2);
          }}
        >
          프로필
        </Button>
      </ButtonBox>
      <ContentBox>
        {target === 0 ? (
          <Friend></Friend>
        ) : target === 1 ? (
          <Room></Room>
        ) : (
          <Profile></Profile>
        )}
      </ContentBox>
    </Frame>
  );
}
export default Main;
