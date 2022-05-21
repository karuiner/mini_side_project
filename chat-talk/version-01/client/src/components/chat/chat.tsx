import { useState } from "react";
import styled from "styled-components";
import Data from "../etc/datainterface";

const Frame = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  z-index: 1;
  position: absolute;
  flex-direction: column;
`;

function Chat({ data, dataf }: { data: Data; dataf: Function }) {
  return (
    <Frame>
      chatting
      <button
        onClick={() => {
          dataf({ isChatting: false });
        }}
      >
        돌아가기
      </button>
    </Frame>
  );
}
export default Chat;
