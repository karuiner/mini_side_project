import { useState } from "react";
import styled from "styled-components";
import { puser } from "../interface/datainterface";
import base from "../../image/default.png";
const Frame = styled.div`
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
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
  flex: 3 0 0;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;
const CheckBox = styled.div`
  display: flex;
  flex: 1 0 0;
  height: 100%;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;
const CheckCircle = styled.input`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;
const Image = styled.img`
  height: 4vh;
  width: 4vh;
  border: 1px solid black;
  border-radius: 50%;
`;

function NRFCard({
  data,
  check,
}: {
  data: puser;

  check: Function;
}) {
  return (
    <Frame>
      <ImageBox>
        <Image src={base}></Image>
      </ImageBox>
      <TextBox>
        <Tbox>{data.userName}</Tbox>
      </TextBox>
      <CheckBox>
        <CheckCircle
          type={"checkbox"}
          onChange={(e) => {
            check(e.target.checked);
          }}
        ></CheckCircle>
      </CheckBox>
    </Frame>
  );
}
export default NRFCard;
