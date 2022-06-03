import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Data, friend } from "../interface/datainterface";
import NRFCard from "../room/nrfcard";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const ButtonLine = styled.div<{ dh: number }>`
  display: flex;
  height: ${({ dh }) => dh}vh;
  width: 100%;
  justify-content: space-between;
  padding-right: 20px;
  align-items: center;
`;
const NameLine = styled.div<{ dh: number }>`
  display: flex;
  height: ${({ dh }) => 2 * dh}vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const FnameLine = styled.div<{ dh: number }>`
  display: flex;
  height: ${({ dh }) => 2 * dh}vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const FlistLine = styled.div<{ dh: number; check: boolean }>`
  display: flex;
  height: ${({ check, dh }) => (check ? 10 * dh : 12 * dh)}vh;
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

function AddFriend2({
  h,
  ddata,

  data,
  dataf,
  nrf,
}: {
  h: number;
  ddata: friend[];
  data: Data;
  dataf: Function;
  nrf: Function;
}) {
  let dh = h / 15;
  let friend = [...ddata.map((x) => x.puser)];
  let [dummy, dummyf] = useState(friend);
  let [rname, rnamef] = useState("");
  let [check, checkf] = useState(Array(friend.length).fill(false));
  useEffect(() => {
    console.log(check, dummy);
  }, [check]);

  return (
    <Frame>
      <ButtonLine dh={dh}>
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
      {data.content === "room" ? (
        <NameLine dh={dh}>
          <input
            placeholder="대화방 명을 입력해주세요"
            value={rname}
            onChange={(e) => {
              rnamef(e.target.value);
            }}
          ></input>
        </NameLine>
      ) : (
        <></>
      )}

      <FnameLine dh={dh}>
        <input
          placeholder="이름 검색"
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
      <FlistLine check={data.content === "room" && !data.isChatting} dh={dh}>
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
export default AddFriend2;
