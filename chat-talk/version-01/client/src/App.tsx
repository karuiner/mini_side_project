import React, { useState } from "react";
import styled from "styled-components";
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
  height: 80%;
  width: 500px;
  display: flex;
`;
function App() {
  console.log(window.innerHeight, window.innerWidth);
  let [isLogin, isloginf] = useState(false);
  return (
    <Frame>
      <AppFrame>
        {!isLogin ? <Start f={isloginf}></Start> : <Main></Main>}
      </AppFrame>
    </Frame>
  );
}

export default App;
