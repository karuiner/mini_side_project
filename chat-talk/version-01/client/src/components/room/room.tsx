import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Room() {
  return <Frame>Room</Frame>;
}
export default Room;
