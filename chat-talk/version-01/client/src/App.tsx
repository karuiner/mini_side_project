import React, { useState } from "react";
import styled from "styled-components";
import Data from "./components/etc/datainterface";
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
  height: 80vh;
  width: 500px;
  display: flex;
`;

function App() {
  console.log(window.innerHeight, window.innerWidth);
  let [isLogin, isloginf] = useState(false);
  let [data, dataf] = useState<Data>({
    isLogin: false,
    isResister: false,
    isChatting: false,
    content: "friend",
    userInfo: {},
    friends: [],
    room: [],
  });
  function IDF(input: {}) {
    dataf({ ...data, ...input });
  }

  return (
    <Frame>
      <AppFrame>
        {!data.isLogin ? (
          <Start data={data} dataf={IDF}></Start>
        ) : (
          <Main data={data} dataf={IDF}></Main>
        )}
      </AppFrame>
    </Frame>
  );
}

export default App;
