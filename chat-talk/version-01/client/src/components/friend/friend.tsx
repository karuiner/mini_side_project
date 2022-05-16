import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Friend() {
  return <Frame>friend</Frame>;
}
export default Friend;
