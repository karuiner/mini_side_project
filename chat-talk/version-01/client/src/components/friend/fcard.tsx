import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const ImageBox = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 100%;
`;

const TextBox = styled.div`
  display: flex;
  flex: 4 0 0;
  height: 100%;
  flex-direction: column;
`;
const NameLine = styled.div`
  display: 1 0 0;
  flex: 1 0 0;
`;

const TextLine = styled.div`
  display: 1 0 0;
  flex: 1 0 0;
`;

function Fcard() {
  return (
    <Frame>
      <ImageBox>{"image"}</ImageBox>
      <TextBox>
        <NameLine>{"name"}</NameLine>
        <TextLine>{"text"}</TextLine>
      </TextBox>
    </Frame>
  );
}
export default Fcard;
