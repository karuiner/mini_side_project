import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MemberCard from "./membercard";

const Frame = styled.div`
  box-sizing: border-box;
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: flex-end;
  position: absolute;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  border-radius: 20px;
  padding: 20px;
  background-color: yellow;
  flex-direction: column;
  border: 2px solid black;
`;
const Return = styled.div`
  flex: 1 0 0;
  display: flex;
  padding-left: 10px;
  align-items: center;
  width: 100%;
`;

const RoomName = styled.div`
  flex: 2 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid black;
  align-items: center;
`;
const MemberLabel = styled.div`
  flex: 1 0 0;
  display: flex;
  padding-left: 10px;
  align-items: center;
  border-top: 1px solid black;
  width: 100%;
`;

const RoomMember = styled.div`
  height: 58vh;
  width: 100%;
  display: flex;

  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  flex-direction: column;
  background-color: white;
`;

const MemberCardBox = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  padding: 5px;
`;

const Button = styled.div`
  flex: 1 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
`;

interface Dummy {
  userName: string;
  friend: boolean;
}

function Setting({ dataf, f }: { dataf: Function; f: Function }) {
  let [dummy, dummyf] = useState<Dummy[]>([]);
  useEffect(() => {
    if (dummy.length === 0) {
      let sub = [];
      for (let i = 0; i < 6; i++) {
        let p = i % 3 === 0 ? false : true;
        sub.push({ userName: `user${i}`, friend: p });
      }
      dummyf(sub);
    }
  });

  return (
    <Frame>
      <InnerFrame>
        <Return>
          <button
            onClick={() => {
              f(false);
            }}
          >
            {"<-"}
          </button>
        </Return>
        <RoomName>
          {"roomname"}
          <button>{"수정"}</button>
        </RoomName>
        <MemberLabel>{"대화 상대"}</MemberLabel>
        <RoomMember>
          {dummy.map((x, i) => (
            <MemberCardBox key={i}>
              <MemberCard data={x} dataf={dummyf}></MemberCard>
            </MemberCardBox>
          ))}
        </RoomMember>
        <Button>
          <button
            onClick={() => {
              f(false);
              dataf({ isChatting: false });
            }}
          >
            {"나가기"}
          </button>
        </Button>
      </InnerFrame>
    </Frame>
  );
}
export default Setting;
