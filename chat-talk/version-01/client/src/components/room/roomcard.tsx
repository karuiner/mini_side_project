import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  width: 100%;
  display: flex;
  flex: 1 0 0;
`;

const ImageBox = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Tbox = styled.div`
  display: flex;
  text-overflow: ellipsis;
`;
const Time = styled.div`
  display: flex;
`;

const TextBox = styled.div`
  display: flex;
  flex: 3 0 0;
  height: 100%;
  flex-direction: column;
`;
const NameLine = styled.div`
  display: flex;
  flex: 1 0 0;

  align-items: center;
`;

const TextLine = styled.div`
  display: flex;
  flex: 1 0 0;
  justify-content: space-between;
  padding-right: 10px;
  align-items: center;
`;

const MC = styled.span`
  color: grey;
  padding-left: 10px;
`;

function Fcard({
  f,
  name,
  message,
  c,
}: {
  name: string;
  message: string;
  f: Function;
  c: number;
}) {
  return (
    <Frame>
      <ImageBox>
        <Tbox>{"image"}</Tbox>
      </ImageBox>
      <TextBox>
        <NameLine>
          <Tbox>{name}</Tbox>
          {c > 2 ? <MC>{c}</MC> : null}
        </NameLine>
        <TextLine>
          <Tbox>{message}</Tbox>
        </TextLine>
      </TextBox>
    </Frame>
  );
}
export default Fcard;
