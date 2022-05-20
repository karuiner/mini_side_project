import { useState } from "react";
import styled from "styled-components";
import Data from "../etc/datainterface";
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

function Start({ data, dataf }: { data: Data; dataf: Function }) {
  let [wn, wnf] = useState(true);
  return (
    <Frame>
      <TitleBox>
        <h1>Chat Talk</h1>
      </TitleBox>
      <WindowBox>
        {!data.isResister ? (
          <Login dataf={dataf}></Login>
        ) : (
          <Resister dataf={dataf}></Resister>
        )}
      </WindowBox>
    </Frame>
  );
}
export default Start;
