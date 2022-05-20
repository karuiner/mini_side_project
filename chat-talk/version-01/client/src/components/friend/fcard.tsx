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
const Tail = styled.div`
  width: 20px;
  display: flex;
`;
const Remove = styled.button`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
`;

function Fcard({ f }: { f: Function }) {
  return (
    <Frame>
      <ImageBox>
        <Tbox>{"image"}</Tbox>
      </ImageBox>
      <TextBox>
        <NameLine>
          <Tbox>{"name"}</Tbox>
        </NameLine>
        <TextLine>
          <Tbox>{"text"}</Tbox>
        </TextLine>
      </TextBox>
      <Tail>
        <Remove
          onClick={() => {
            f();
          }}
        ></Remove>
      </Tail>
    </Frame>
  );
}
export default Fcard;
