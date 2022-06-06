import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Data, member, room } from "../interface/datainterface";
import MemberCard from "./membercard";

const Frame = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px;
  border-radius: 20px;
  flex-direction: column;
`;
const Return = styled.div`
  flex: 1 0 0;
  display: flex;
  padding-left: 10px;
  align-items: center;
  width: 100%;
`;

const AddMember = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid black;
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
  height: 48vh;
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

function Setting({
  data,
  room,
  dataf,
  f,
  outf,
  addf,
}: {
  data: Data;
  room: room;
  dataf: Function;
  f: Function;
  addf: Function;
  outf: Function;
}) {
  let [member, memberf] = useState<member[]>([]);
  let friends = data.friends.map((x) => x.puser.userName);
  useEffect(() => {
    if (member.length === 0) {
      let xx = room.member.filter((x) => {
        return x.user.userName !== data.userInfo.userName;
      });

      memberf(xx);
    }
  }, []);

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
        <AddMember>
          <button
            onClick={() => {
              addf(true);
            }}
          >
            {"친구 추가"}
          </button>
        </AddMember>
        <MemberLabel>{"대화 상대"}</MemberLabel>
        <RoomMember>
          {member.map((x, i) => {
            let xdata = {
              userName: x.user.userName,
              friend: friends.includes(x.user.userName),
            };
            return (
              <MemberCardBox key={i}>
                <MemberCard data={xdata} dataf={memberf}></MemberCard>
              </MemberCardBox>
            );
          })}
        </RoomMember>
        <Button>
          <button
            onClick={() => {
              outf();
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
