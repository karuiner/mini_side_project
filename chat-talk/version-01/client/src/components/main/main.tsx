import { useState } from "react";
import styled from "styled-components";
import Friend from "../friend/friend";
import Profile from "../profile/profile";
import Room from "../room/room";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ButtonBox = styled.div`
  display: flex;
  flex: 1 0 0;

  border: 2px solid blue;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;
const ContentBox = styled.div`
  display: flex;
  flex: 5 0 0;
  border: 2px solid green;
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
