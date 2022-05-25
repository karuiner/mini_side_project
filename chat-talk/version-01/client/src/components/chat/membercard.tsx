import { useState } from "react";
import styled from "styled-components";

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
function MemberCard({ data, dataf }: { data: Dummy; dataf: Function }) {
  return (
    <Frame>
      <ImageBox>
        <image>image</image>
      </ImageBox>
      <NameBox>{data.userName}</NameBox>
      <ButtonBox>
        <button>{"+"}</button>
      </ButtonBox>
    </Frame>
  );
}
export default MemberCard;