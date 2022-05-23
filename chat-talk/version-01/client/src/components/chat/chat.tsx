import { useEffect, useState } from "react";
import styled from "styled-components";
import Data from "../etc/datainterface";
import Setting from "./chat_setting";
import Message from "./message";
import Message_Reverse from "./message_r";
const Frame = styled.div`
  height: 79.6vh;
  width: 496px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  padding: 20px;
  flex-direction: column;
`;
const Button = styled.div`
  box-sizing: border-box;
  height: 4vh;
  width 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20px;
  padding-right: 20px;
  `;

const Content = styled.div`
  max-height: 70vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  box-sizing: border-box;
  border-top-left-radius: 20px;
`;
const CardBox = styled.div`
  display: flex;

  margin: 5px;
  border-radius: 10px;
  flex: 1 0 1;
`;
const RoomName = styled.div`
  flex: 1 0 0;
  padding-left: 10px;
`;
//멤버 수도 추가해야함.
const InputBox = styled.div`
  min-height: 5vh;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  aling-items: center;
  flex: 1 0 1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Input = styled.input`
  flex: 1 0 0;
  text-align: right;
  padding-left: 20px;
  padding-right: 10px;
  overflow-y: auto;
  border-bottom-left-radius: 20px;
`;
const Ibutton = styled.button`
  flex: 1 0 1;
  border-bottom-right-radius: 20px;
`;

interface Ddata {
  userName: string;
  message: string;
  time: string;
}

function Chat({ data, dataf }: { data: Data; dataf: Function }) {
  let [dummy, df] = useState<Ddata[]>([]);
  let [set, setf] = useState(false);
  let [msg, msgf] = useState("");
  if (dummy.length === 0) {
    let dd: Ddata[] = [];
    for (let i = 0; i < 10; i++) {
      let name = i % 3 === 0 ? "user1" : "user2";
      dd.push({ userName: name, message: `message${i}`, time: `time${i}` });
    }
    dd[8].message =
      "sadasfhklajhfklajfdlkjsakld jsakljdklsjdklaskdlakldjk lsjdklaskdljklajdklsjak dljakljd k l sajkdljsak ljdskla jdklsjadlj kajdkl sjakdljaklsdjl";
    df(dd);
  }
  useEffect(() => {
    let cbox = document.getElementById("testest");
    cbox?.scrollTo(10000, 10000);
  });

  return (
    <Frame>
      {set ? <Setting f={setf}></Setting> : null}
      <Button>
        <button
          onClick={() => {
            dataf({ isChatting: false });
          }}
        >
          {"<-"}
        </button>
        <RoomName>{``}</RoomName>
        <button
          onClick={() => {
            setf(!set);
          }}
        >
          설정
        </button>
      </Button>
      <Content id="testest">
        {dummy.map((x, i) => (
          <CardBox key={i}>
            {x.userName !== "user1" ? (
              <Message {...x}></Message>
            ) : (
              <Message_Reverse {...x}></Message_Reverse>
            )}
          </CardBox>
        ))}
      </Content>
      <InputBox>
        <Input
          value={msg}
          onChange={(e) => {
            msgf(e.target.value);
          }}
        ></Input>
        <Ibutton
          onClick={() => {
            if (msg.length > 0) {
              df([...dummy, { userName: "user1", message: msg, time: "time" }]);
              msgf("");
            }
          }}
        >
          전송
        </Ibutton>
      </InputBox>
    </Frame>
  );
}
export default Chat;
