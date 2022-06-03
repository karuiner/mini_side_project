import { useState } from "react";
import styled from "styled-components";
import dimage from "../../image/default.png";
const Frame = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Img = styled.img`
  display: flex;
  height: 80%;
  flex: 1 0 0;
  object-fit: contain;
`;

const NameBox = styled.div`
  flex: 1 0 0;
  align-items: center;
  display: flex;
`;

const ButtonBox = styled.div`
  align-items: center;
  display: flex;
`;
interface Dummy {
  userName: string;
  friend: boolean;
}

//대화 상대가 친구가 아닌 경우 친구 추가 함수 추가 할것
function MemberCard({ data, dataf }: { data: Dummy; dataf: Function }) {
  return (
    <Frame>
      <ImageBox>
        <Img src={dimage}></Img>
      </ImageBox>
      <NameBox>{data.userName}</NameBox>
      <ButtonBox>{!data.friend ? <button>{"+"}</button> : null}</ButtonBox>
    </Frame>
  );
}
export default MemberCard;
