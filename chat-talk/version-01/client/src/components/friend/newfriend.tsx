import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddFriend from "../etc/addfriend";
import { Data } from "../interface/datainterface";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const ButtonLine = styled.div`
  display: flex;
  height: 4vh;
  width: 100%;
  justify-content: space-between;
  padding-right: 20px;
  align-items: center;
`;

function NewFriend({
  data,
  dataf,
  nrf,
}: {
  data: Data;
  dataf: Function;
  nrf: Function;
}) {
  let friend = [...data.friends.map((x) => x.puser)];
  let [dummy, dummyf] = useState(friend);
  let [rname, rnamef] = useState("");
  let [check, checkf] = useState(Array(friend.length).fill(false));
  useEffect(() => {
    console.log(check, dummy);
  }, [check]);

  return (
    <Frame>
      <ButtonLine>
        <button
          onClick={() => {
            nrf(false);
          }}
        >
          {"<-"}
        </button>
        <button
          onClick={() => {
            let userIds = dummy.map((x) => x.id).filter((x, i) => check[i]);
            axios
              .post(process.env.REACT_APP_SERVER_URL + `/room` || "", {
                roomName: rname,
                userIds: [...userIds, data.userInfo.id],
              })
              .then((x) => {
                console.log(x);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                nrf(false);
              });
          }}
        >
          {"완료"}
        </button>
      </ButtonLine>
      <AddFriend data={data} dataf={dataf}></AddFriend>
    </Frame>
  );
}
export default NewFriend;
