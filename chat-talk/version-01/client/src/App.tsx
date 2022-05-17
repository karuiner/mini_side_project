import React, { useState } from "react";
import styled from "styled-components";
import TestBoard from "./components/etc/testBoard";
import Main from "./components/main/main";
import Start from "./components/start";

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
`;

const AppFrame = styled.div`
  height: 80%;
  width: 500px;
  display: flex;
  border: 2px solid blue;
`;
function App() {
  console.log(window.innerHeight, window.innerWidth);
  let [isLogin, isloginf] = useState(false);
  return (
    <Frame>
      <AppFrame>
        {/* {!isLogin ? <Start f={isloginf}></Start> : <Main></Main>} */}
        <TestBoard></TestBoard>
      </AppFrame>
    </Frame>
  );
}

export default App;
