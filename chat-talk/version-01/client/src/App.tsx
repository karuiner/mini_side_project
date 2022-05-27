import React, { useState } from "react";
import styled from "styled-components";
import Addbox from "./components/etc/addbox";
import { Data } from "./components/interface/datainterface";
import Main from "./components/main/main";
import Start from "./components/start";

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppFrame = styled.div`
  box-sizing: border-box;
  height: 80vh;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  height: 150px;
  width: 300px;
  z-index: 3;
  position: absolute;
  background-color: white;
  border: 1px solid black;
`;

const data_init = {
  isLogin: false,
  isResister: false,
  isChatting: false,
  isModify: false,
  boxOn: false,
  content: "friend",
  userInfo: {},
  friends: [],
  room: [],
  chat: { roomId: -1 },
};

function App() {
  // console.log(window.innerHeight, window.innerWidth);
  // console.log(process.env.REACT_APP_SERVER_URL);
  let [isLogin, isloginf] = useState(false);
  let [data, dataf] = useState<Data>({
    ...data_init,
  });
  function IDF(input: {}, init = false) {
    if (!init) {
      dataf({ ...data, ...input });
    } else {
      dataf({
        ...data_init,
      });
    }
  }

  return (
    <Frame>
      <AppFrame>
        {!data.isLogin ? (
          <Start data={data} dataf={IDF}></Start>
        ) : (
          <Main data={data} dataf={IDF}></Main>
        )}

        {data.boxOn ? (
          <Box>
            <Addbox data={data} dataf={IDF}></Addbox>
          </Box>
        ) : null}
      </AppFrame>
    </Frame>
  );
}

export default App;
