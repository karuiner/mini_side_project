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
  cday: string;
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
  cday: string;
}

let dataInit: Data = {
  userName: "",
  roomName: "??????",
  roomNames: ["??????"],
  room: { ??????: { cday: "", userName: "", messages: [], members: [] } },
  roomCount: 1,
  cday: "",
};
let roomName = Array(10).fill("");
roomName[0] = "??????";

let members = ["aaa", "bbb", "ccc"];

let dummy = [
  { name: "aaa", text: "text" },
  { name: "bbb", text: "text1" },
  { name: "aaa", text: "text2" },
  { name: "ccc", text: "text2" },
];
let dbox = Array(10).fill("");

function cdayf() {
  let htime = new Date();
  let time = htime.toISOString().split("T");
  let day = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(htime);
  let times = time[0].split("-");
  return `${times[0]}??? ${times[1]}??? ${times[2]}??? ${day}`;
}

const socketClient = io(process.env.REACT_APP_SERVER_URL || "");
function App() {
  socketClient.emit("connection", "connect");
  let [data, dataf] = useState<Data>(dataInit);
  let [message, messagef] = useState("");
  let [Mbox, Mboxf] = useState({ status: false, label: "" });
  socketClient.on("Login", (req) => {
    let ndata = { ...data };
    let cday = cdayf();
    ndata.room[ndata.roomName].userName = req.userName;
    ndata.room[ndata.roomName].members = req.users;
    ndata.room[ndata.roomName].cday = cday;
    ndata.room[ndata.roomName].messages = [{ type: "Day", message: cday }];
    dataf({ ...ndata });
  });
  socketClient.on("Ologin", (req) => {
    let nmsg = [];
    // if (data.cday !== req.cday) {
    //   nmsg.push({ type: "Day", message: req.cday });
    // }
    nmsg.push({ type: "In", message: `${req.userName}?????? ?????? ???????????????.` });

    dataf({
      ...data,
      room: {
        ...data.room,
        ??????: {
          ...data.room["??????"],
          members: req.users,
          messages: [...data.room["??????"].messages, ...nmsg],
        },
      },
    });
  });

  socketClient.on("message", (req) => {
    let nmsg = [];
    if (data.room[data.roomName].cday !== req.cday) {
      nmsg.push({ type: "Day", message: req.cday });
    }
    nmsg.push({ type: req.type, ...req.message });

    dataf({
      ...data,
      room: {
        ...data.room,
        [data.roomName]: {
          ...data.room[data.roomName],
          cday: req.cday,
          messages: [...data.room[data.roomName].messages, ...nmsg],
        },
      },
    });
  });
  return (
    <Frame>
      <InnerFrame>
        {Mbox.status ? (
          <MessageBox
            label={Mbox.label}
            dataf={(text: string) => {
              if (text.length > 0 && Mbox.label === "??? ?????????") {
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
                        let ndata = { ...data },
                          cday = cdayf();
                        ndata.roomName = `newRoom-${data.roomCount}`;
                        ndata.roomNames.push(`newRoom-${data.roomCount}`);
                        ndata.roomCount++;
                        ndata.room[`newRoom-${data.roomCount}`] = {
                          cday: cday,
                          userName: data.room[data.roomName].userName,
                          messages: [{ type: "Day", message: cday }],
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
              {data.roomName !== "??????" ? (
                <TextButtonFrame>
                  <button
                    onClick={() => {
                      Mboxf({ status: true, label: "??? ????????? ??????" });
                    }}
                  >
                    {"????????? ?????? ??????"}
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
                        roomName: "??????",
                        roomCount: data.roomCount - 1,
                      });
                    }}
                  >{`?????????`}</button>
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
                    {x.type === "In" ? <TextC>{x.message}</TextC> : null}
                    {x.type === "Out" ? <TextC>{x.message}</TextC> : null}
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
                  Mboxf({ status: true, label: "??? ?????????" });
                }}
              >
                {"????????? ??????"}
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
                    userName: data.room[data.roomName].userName,
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
                    userName: data.room[data.roomName].userName,
                    message: message,
                  });
                  messagef("");
                }
              }}
            >
              {"??????"}
            </InputButton>
          </InputFrame>
        </MainFrame>
        <MemberFrame>
          <MemberLabel>{"?????? ??????"}</MemberLabel>
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
