import { useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import MessageBox from "./components/messagebox";
const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerFrame = styled.div`
  height: 800px;
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  over-flow: auto;
`;

const MainFrame = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  height: 100%;
`;

const LabelFrame = styled.div`
  height: 60px;
  width: 1000px;
  display: flex;
  border: 2px solid black;
`;
const Label = styled.div<{ select: boolean }>`
  height: 100%;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  // ${({ select }) => (select ? "" : "")}
  border: solid 1px black;
`;

const TextFrame = styled.div`
  flex: 1 0 0;
  display: flex;

  flex-direction: column;
  border: 2px solid red;
  height: 100%;
`;
const TextButtonFrame = styled.div`
  width: 100%;
  height: 20px;
  justify-content: center;
  align-items: center;
`;
const TextInnerFrame = styled.div`
  flex: 1 0 0;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  border: 2px solid red;
  height: 100%;
`;

const TextBox = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
`;
const TextA = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextB = styled.div`
  height: 100%;
  flex: 1 0 0;
  display: flex;
  // justify-content: center;
  align-items: center;
`;
const TextC = styled.div`
  height: 100%;
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MemberFrame = styled.div`
  height: 100%;
  width: 200px;
  flex-direction: column;
  border: 2px solid blue;
`;
const MemberLabel = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid blue;
`;
const MemberList = styled.div`
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border: 2px solid blue;
`;
const Member = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputFrame = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 2px solid green;
`;
const NameFrame = styled.label`
  height: 100%;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NameButtonFrame = styled.label`
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.input`
  height: 100%;
  flex: 1 0 0;
  text-align: right;
  padding-right: 10px;
`;
const InputButton = styled.button`
  height: 100%;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoomFrame = styled.div`
  height: 60px;
  flex: 1 0 0;
  width: 100%;
  border: 2px solid green;
`;

interface message {
  type: string;
  userName?: string;
  message: string;
  time?: string;
}

interface room {
  userName: string;
  messages: message[];
  members: string[];
}

interface Data {
  userName: string;
  roomName: string;
  roomCount: number;
  roomNames: string[];
  room: { [key: string]: room };
}

let dataInit: Data = {
  userName: "",
  roomName: "로비",
  roomNames: ["로비"],
  room: { 로비: { userName: "", messages: [], members: [] } },
  roomCount: 1,
};
let roomName = Array(10).fill("");
roomName[0] = "로비";

let members = ["aaa", "bbb", "ccc"];

let dummy = [
  { name: "aaa", text: "text" },
  { name: "bbb", text: "text1" },
  { name: "aaa", text: "text2" },
  { name: "ccc", text: "text2" },
];
let dbox = Array(10).fill("");

const socketClient = io(process.env.REACT_APP_SERVER_URL || "");
function App() {
  socketClient.emit("connection", "connect");
  let [data, dataf] = useState<Data>(dataInit);
  let [message, messagef] = useState("");
  let [Mbox, Mboxf] = useState({ status: false, label: "" });
  socketClient.on("Login", (req) => {
    let ndata = { ...data };
    ndata.room[ndata.roomName].userName = req.userName;
    ndata.room[ndata.roomName].members = req.users;

    dataf({ ...ndata });
  });
  socketClient.on("Ologin", (req) => {
    let ndata = { ...data };

    ndata.room[ndata.roomName].members = req.users;
    dataf({ ...ndata });
  });

  socketClient.on("message", (req) => {
    let ndata = { ...data };
    ndata.room[ndata.roomName].messages.push({
      type: req.type,
      ...req.message,
    });
    dataf({
      ...ndata,
    });
  });
  return (
    <Frame>
      <InnerFrame>
        {Mbox.status ? (
          <MessageBox
            label={Mbox.label}
            dataf={(text: string) => {
              if (text.length > 0 && Mbox.label === "새 대화명") {
                // socketClient.emit("Name-Change", {userName:});

                let newdata = data.room[data.roomName];
                newdata.userName = text;
                dataf({
                  ...data,
                  room: { ...data.room, [data.roomName]: { ...newdata } },
                });
              } else if (text.length > 0) {
                let newdata = data.room;
                let roomnames = data.roomNames;
                let idx = roomnames.indexOf(data.roomName);
                roomnames[idx] = text;
                newdata[text] = { ...newdata[data.roomName] };
                delete newdata[data.roomName];
                dataf({
                  ...data,
                  room: { ...newdata },
                  roomNames: roomnames,
                  roomName: text,
                });
              }
              Mboxf({ ...Mbox, status: false });
            }}
          ></MessageBox>
        ) : null}
        <MainFrame>
          <RoomFrame>
            <LabelFrame>
              {dbox.map((x, i) => {
                let name = data.roomNames[i] || x;
                if (i === data.roomCount) {
                  return (
                    <Label
                      key={i}
                      select={false}
                      onClick={() => {
                        let ndata = { ...data };
                        ndata.roomNames.push(`newRoom-${data.roomCount}`);
                        ndata.roomCount++;
                        ndata.room[`newRoom-${data.roomCount}`] = {
                          userName: data.room[data.roomName].userName,
                          messages: [],
                          members: [data.room[data.roomName].userName],
                        };
                        dataf({
                          ...ndata,
                        });
                      }}
                    >
                      {"+"}
                    </Label>
                  );
                } else {
                  return (
                    <Label
                      key={i}
                      select={data.roomName === name}
                      onClick={() => {
                        if (name !== data.roomName) {
                          dataf({ ...data, roomName: name });
                        }
                      }}
                    >
                      {name}
                    </Label>
                  );
                }
              })}
            </LabelFrame>
            <TextFrame>
              {data.roomName !== "로비" ? (
                <TextButtonFrame>
                  <button
                    onClick={() => {
                      Mboxf({ status: true, label: "새 대화방 이름" });
                    }}
                  >
                    {"대화방 이름 변경"}
                  </button>
                  <button
                    onClick={() => {
                      let newdata = data.room;
                      let roomnames = data.roomNames.filter(
                        (x) => x !== data.roomName
                      );
                      delete newdata[data.roomName];
                      dataf({
                        ...data,
                        room: { ...newdata },
                        roomNames: roomnames,
                        roomName: "로비",
                        roomCount: data.roomCount - 1,
                      });
                    }}
                  >{`나가기`}</button>
                </TextButtonFrame>
              ) : null}
              <TextInnerFrame>
                {data.room[data.roomName].messages.map((x, i) => (
                  <TextBox key={i}>
                    {x.type === "message" ? (
                      <>
                        <TextA>{x.userName + " : "}</TextA>

                        <TextB>{x.message}</TextB>
                        <TextA>{x.time}</TextA>
                      </>
                    ) : null}
                    {x.type === "Day" ? <TextC>{x.message}</TextC> : null}
                  </TextBox>
                ))}
              </TextInnerFrame>
            </TextFrame>
          </RoomFrame>
          <InputFrame>
            <NameFrame htmlFor="input-0001">
              {data.room[data.roomName].userName}
            </NameFrame>
            <NameButtonFrame>
              <button
                onClick={() => {
                  Mboxf({ status: true, label: "새 대화명" });
                }}
              >
                {"대화명 변경"}
              </button>
            </NameButtonFrame>
            <InputBox
              type={"text"}
              id={"input-0001"}
              value={message}
              onChange={(e) => {
                messagef(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.length > 0) {
                  socketClient.emit("message", {
                    message: message,
                  });
                  messagef("");
                }
              }}
            ></InputBox>
            <InputButton
              onClick={() => {
                if (message.length > 0) {
                  socketClient.emit("message", {
                    message: message,
                  });
                  messagef("");
                }
              }}
            >
              {"전송"}
            </InputButton>
          </InputFrame>
        </MainFrame>
        <MemberFrame>
          <MemberLabel>{"참여 인원"}</MemberLabel>
          <MemberList>
            {data.room[data.roomName].members.map((x, i) => (
              <Member key={i}>{x}</Member>
            ))}
          </MemberList>
        </MemberFrame>
      </InnerFrame>
    </Frame>
  );
}

export default App;
