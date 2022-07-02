import { useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

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

const InputBox = styled.input`
  height: 100%;
  flex: 1 0 0;
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

interface Data {
  userName: string;
  roomName: string;
  roomCount: number;
  roomNames: string[];
  messages: message[];
  members: string[];
}

let dataInit: Data = {
  userName: "",
  roomName: "로비",
  roomNames: ["로비"],
  messages: [],
  members: [],
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
  socketClient.on("Login", (req) => {
    dataf({ ...data, userName: req.userName, members: req.users });
  });
  socketClient.on("Ologin", (req) => {
    dataf({ ...data, members: req.users });
  });

  socketClient.on("message", (req) => {
    dataf({
      ...data,
      messages: [...data.messages, { type: req.type, ...req.message }],
    });
  });

  return (
    <Frame>
      <InnerFrame>
        <MainFrame>
          <RoomFrame>
            <LabelFrame>
              {dbox.map((x, i) => {
                let name = data.roomNames[i] || x;
                console.log(name);
                if (i === data.roomCount) {
                  return (
                    <Label
                      key={i}
                      select={false}
                      onClick={() => {
                        dataf({
                          ...data,
                          roomNames: [...data.roomNames, `newRoom-${i}`],
                          roomCount: data.roomCount + 1,
                        });
                      }}
                    >
                      {"+"}
                    </Label>
                  );
                } else {
                  return (
                    <Label key={i} select={data.roomName === name}>
                      {name}
                    </Label>
                  );
                }
              })}
            </LabelFrame>
            <TextFrame>
              {data.messages.map((x, i) => (
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
            </TextFrame>
          </RoomFrame>
          <InputFrame>
            <NameFrame htmlFor="input-0001">{data.userName}</NameFrame>
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
            {data.members.map((x, i) => (
              <Member key={i}>{x}</Member>
            ))}
          </MemberList>
        </MemberFrame>
      </InnerFrame>
    </Frame>
  );
}

export default App;
