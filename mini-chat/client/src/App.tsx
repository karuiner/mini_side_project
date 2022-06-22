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
  border: 2px solid black;
`;

const TextFrame = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  height: 100%;
`;

const MemberFrame = styled.div`
  height: 100%;
  width: 200px;
  border: 2px solid blue;
`;

const InputFrame = styled.div`
  height: 60px;
  width: 100%;
  border: 2px solid green;
`;

const RoomFrame = styled.div`
  height: 60px;
  flex: 1 0 0;
  width: 100%;
  border: 2px solid green;
`;

const socketClient = io(process.env.REACT_APP_SERVER_URL || "");
function App() {
  socketClient.emit("connection", "connect");
  return (
    <Frame>
      <InnerFrame>
        <MainFrame>
          <RoomFrame>
            <LabelFrame></LabelFrame>
            <TextFrame></TextFrame>
          </RoomFrame>
          <InputFrame></InputFrame>
        </MainFrame>
        <MemberFrame></MemberFrame>
      </InnerFrame>
    </Frame>
  );
}

export default App;
