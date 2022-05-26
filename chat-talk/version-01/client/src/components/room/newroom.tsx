import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";
import NRFCard from "./nrfcard";

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
const NameLine = styled.div`
  display: flex;
  height: 8vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const FnameLine = styled.div`
  display: flex;
  height: 8vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const FlistLine = styled.div`
  display: flex;
  height: 52vh;
  width: 100%;
  overflow-y: scroll;
  orverflow-x: hidden;
  flex-direction: column;
`;
const ListCard = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
`;

function NewRoom({
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
      <NameLine>
        <input
          placeholder="대화방 명을 입력해주세요"
          value={rname}
          onChange={(e) => {
            rnamef(e.target.value);
          }}
        ></input>
      </NameLine>
      <FnameLine>
        <input
          placeholder="추가하실 친구의 이름을 입력해주세요"
          onChange={(e) => {
            let name = e.target.value;
            if (name.length > 0) {
              axios
                .get(
                  process.env.REACT_APP_SERVER_URL + `/user/name/${name}` || ""
                )
                .then((x) => {
                  if (x.data.length > 0 || x.data.id !== undefined) {
                    dummyf([x.data]);
                    checkf(Array(x.data.length).fill(false));
                  } else {
                    dummyf([]);
                    checkf([]);
                  }
                })
                .catch(() => {});
            } else {
              dummyf(friend);
            }
          }}
        ></input>
      </FnameLine>
      <FlistLine>
        {dummy.map((x, i) => {
          return (
            <ListCard key={i}>
              <NRFCard
                data={x}
                check={(ck: boolean) => {
                  check[i] = ck;
                  checkf(check);
                }}
              ></NRFCard>
            </ListCard>
          );
        })}
      </FlistLine>
    </Frame>
  );
}
export default NewRoom;
