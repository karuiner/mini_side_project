import { useState } from "react";
import styled from "styled-components";
import Login from "./login";
import Resister from "./resister";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: yellow;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid black;
`;
const TitleBox = styled.div`
  display: flex;
  flex: 2 0 0;
  justify-content: center;
  align-items: center;
`;

const WindowBox = styled.div`
  display: flex;
  flex: 4 0 0;
`;

function Start({ f }: { f: Function }) {
  let [wn, wnf] = useState(true);
  return (
    <Frame>
      <TitleBox>
        <h1>Chat Talk</h1>
      </TitleBox>
      <WindowBox>
        {wn ? (
          <Login f={f} f2={wnf}></Login>
        ) : (
          <Resister f={f} f2={wnf}></Resister>
        )}
      </WindowBox>
    </Frame>
  );
}
export default Start;
