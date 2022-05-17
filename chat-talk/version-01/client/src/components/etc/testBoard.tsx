import { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogBox = styled.div`
  display: flex;
  width: 100%;
  flex: 10 0 0;
  flex-direction: column;
  border: 2px solid green;
`;
const InputBox = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
  flex-direction: column;
  border: 2px solid green;
`;
const NameBox = styled.div`
  display: flex;
  flex: 1 0 0;
  width: 100%;
`;
const TextBox = styled.div`
  display: flex;
  flex: 1 0 0;
  width: 100%;
`;
const socketClient = io("http://localhost:4000");

function TestBoard() {
  let sarr: string[] = [];
  let [name, namef] = useState("noname");
  let [text, textf] = useState("");
  let [log, logf] = useState(sarr);
  socketClient.on("connection", () => {
    console.log("connection client");
  });
  //   socketClient.emit("first Request", { data: "first Reuqest" });
  //   socketClient.on("first Respond", (req) => {
  //     console.log(req);
  //   });
  socketClient.on("log", (req) => {
    logf([...log, req.data]);
  });
  return (
    <Frame>
      <InputBox>
        <NameBox>
          <span>id</span>
          <span>
            <input
              onChange={(e) => {
                namef(e.target.value);
              }}
            ></input>
          </span>
        </NameBox>
        <TextBox>
          <span>text</span>
          <span>
            <input
              onChange={(e) => {
                textf(e.target.value);
              }}
            ></input>
          </span>
          <button
            onClick={() => {
              console.log("click");
              socketClient.emit("message", {
                data: `${name} : ${text}`,
              });
            }}
          >
            send
          </button>
        </TextBox>
      </InputBox>
      <LogBox>
        {log.map((x, i) => (
          <div key={i}>{x}</div>
        ))}
      </LogBox>
    </Frame>
  );
}
export default TestBoard;
