import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";
import Setting from "./chat_setting";
import Message from "./message";
import Message_Reverse from "./message_r";
import io from "socket.io-client";
const socketClient = io(process.env.REACT_APP_SERVER_URL || "");
const Frame = styled.div`
  height: 80vh;
  width: 500px;
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
  height: 70vh;

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
  let [srnm, srnmf] = useState("");

  socketClient.on("message_to_client", (req) => {
    console.log(req);
    df([
      ...dummy,
      {
        userName: req.userName || "noname",
        message: req.message,
        time: "time",
      },
    ]);
  });

  //   socketClient.emit("first Request", { data: "first Reuqest" });
  //   socketClient.on("first Respond", (req) => {
  //     console.log(req);
  //   });

  useEffect(() => {
    let cbox = document.getElementById("testest");
    cbox?.scrollTo(10000, 10000);
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/message/${data.chat.roomId}` || ""
      )
      .then((x) => {
        df([...x.data]);
        console.log(x);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            {x.userName !== data.userInfo.userName ? (
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
              socketClient.emit("message_to_server", {
                roomId: data.chat.roomId,
                data: {
                  id: data.userInfo.id,
                  userName: data.userInfo.userName,
                  message: msg,
                  time: "time",
                },
              });

              df([
                ...dummy,
                {
                  userName: data.userInfo.userName || "noname",
                  message: msg,
                  time: "time",
                },
              ]);
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
