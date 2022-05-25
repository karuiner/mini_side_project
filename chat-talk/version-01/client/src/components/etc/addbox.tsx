import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MessageBox = styled.div``;
const Line = styled.div``;
const InputBox = styled.input``;
const Button = styled.button``;
const ESCBox = styled.div`
  width: 20px;
  height: 100%;
`;
const ESC = styled.button`
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 50%;
`;

function Addbox({ data, dataf }: { data: Data; dataf: Function }) {
  let [idata, idataf] = useState("");

  return (
    <Frame>
      <InnerFrame>
        <MessageBox>
          {data.content === "friend"
            ? "추가하실 친구의 이름을 적어주세요"
            : "생성하실 대화방의 이름을 적어주세요"}
        </MessageBox>
        <Line>
          <InputBox
            placeholder="입력해주세요"
            value={idata}
            onChange={(e) => {
              idataf(e.target.value);
            }}
          ></InputBox>
          <Button
            onClick={() => {
              if (data.content === "friend") {
                if (idata !== data.userInfo.userName) {
                  axios
                    .get(
                      process.env.REACT_APP_SERVER_URL + `/user/name/${idata}`
                    )
                    .then((rst) => {
                      return axios
                        .post(
                          process.env.REACT_APP_SERVER_URL + `/friend` || "",
                          {
                            hostId: data.userInfo.id,
                            friendId: rst.data.id,
                          }
                        )
                        .then((x) => {
                          console.log(x);
                        })
                        .catch((err) => {
                          console.log(err);
                        })
                        .finally(() => {
                          dataf({ boxOn: false });
                        });
                    })
                    .catch();
                }
              } else {
                dataf({ room: [...data.room, {}], boxOn: false });
              }
            }}
          >
            {data.content === "friend" ? "추가" : "생성"}
          </Button>
        </Line>
      </InnerFrame>
      <ESCBox>
        <ESC></ESC>
      </ESCBox>
    </Frame>
  );
}
export default Addbox;
