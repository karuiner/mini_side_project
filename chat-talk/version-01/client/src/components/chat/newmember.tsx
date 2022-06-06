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
