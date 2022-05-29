import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddFriend from "../etc/addfriend";
import { Data, member, room } from "../interface/datainterface";
import MemberCard from "./membercard";

const Frame = styled.div`
  box-sizing: border-box;
  height: inherit;
  width: inherit;
  display: flex;
  z-index: 3;
  position: absolute;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 100%;
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

const ButtonLine = styled.div`
  display: flex;
  height: 4vh;
  width: 100%;
  justify-content: space-between;
  padding-right: 20px;
  align-items: center;
`;

function NewMember({
  data,
  dataf,
  addf,
}: {
  data: Data;
  addf: Function;
  dataf: Function;
}) {
  let [member, memberf] = useState<member[]>([]);
  let friends = data.friends.map((x) => x.puser.userName);
  useEffect(() => {}, []);

  return (
    <Frame>
      <InnerFrame>
        <ButtonLine>
          <button
            onClick={() => {
              addf(false);
            }}
          >
            {"<-"}
          </button>
          <button
            onClick={() => {
              //   let userIds = dummy.map((x) => x.id).filter((x, i) => check[i]);
              //   axios
              //     .post(process.env.REACT_APP_SERVER_URL + `/room` || "", {
              //       roomName: rname,
              //       userIds: [...userIds, data.userInfo.id],
              //     })
              //     .then((x) => {
              //       console.log(x);
              //     })
              //     .catch((err) => {
              //       console.log(err);
              //     })
              //     .finally(() => {
              //       addf(false);
              //     });
              addf(false);
            }}
          >
            {"완료"}
          </button>
        </ButtonLine>
        <AddFriend data={data} dataf={dataf} ucheckf={() => {}}></AddFriend>
      </InnerFrame>
    </Frame>
  );
}
export default NewMember;
