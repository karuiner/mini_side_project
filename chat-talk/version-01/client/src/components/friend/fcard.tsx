import { useState } from "react";
import styled from "styled-components";
import dimage from "../../image/default.png";

const Frame = styled.div`
  width: 100%;
  display: flex;
  flex: 1 0 0;
  padding-left: 5px;
`;

const ImageBox = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  display: flex;
  height: 90%;
  flex: 1 0 0;
  object-fit: contain;
`;

const Tbox = styled.div`
  display: flex;

  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  flex: 4 0 0;
  height: 100%;
  flex-direction: column;
`;
const NameLine = styled.div`
  display: flex;
  flex: 1 0 0;
  padding-left 10px;
  align-items: center;
`;

const TextLine = styled.div`
  display: flex;
  flex: 1 0 0;
  padding-left 10px;
  align-items: center;
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

interface user {
  id: number;
  userName: string;
  statusMessage: string;
}

function Fcard({ id, user, f }: { id: number; user: user; f: Function }) {
  return (
    <Frame>
      <ImageBox>
        <Img src={dimage}></Img>
      </ImageBox>
      <TextBox>
        <NameLine>
          <Tbox>{user.userName}</Tbox>
        </NameLine>
        <TextLine>
          <Tbox>{user.statusMessage}</Tbox>
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
