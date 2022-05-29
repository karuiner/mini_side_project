import axios, { Axios } from "axios";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";
import NRFCard from "../room/nrfcard";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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

function AddFriend({
  data,
  dataf,
  ucheckf = () => {},
}: {
  data: Data;
  dataf: Function;
  ucheckf: Function;
}) {
  let friend = [...data.friends.map((x) => x.puser)];
  let [dummy, dummyf] = useState(friend);
  let [check, checkf] = useState(Array(friend.length).fill(false));
  useEffect(() => {
    console.log(check, dummy);
  }, [check]);

  return (
    <Frame>
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
                  ucheckf(check);
                }}
              ></NRFCard>
            </ListCard>
          );
        })}
      </FlistLine>
    </Frame>
  );
}
export default AddFriend;
