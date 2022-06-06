import { useState } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";
const Frame = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: 50%;
  padding: 5px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 1px solid black;
`;

const OtherBox = styled.div`
  flex: 1 0 0;
`;
const NameLine = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding-right: 5px;
  justify-content: flex-end;
`;
const MessageBox = styled.div`
  min-height: 50px;
  max-width: 200px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid black;
  word-break: normal;
`;

const TimeBox = styled.div`
  flex-direction: column;
  display: flex;
  align-items: flex-end;
  padding-right: 10px;
  justify-content: flex-end;
`;
const Text = styled.div`
  display: flex;
`;
const MessageLine = styled.div`
  display: flex;
  justify-content: flex-end;
`;
function Message({
  userName,
  message,
  time,
}: {
  userName: string;
  message: string;
  time: string;
}) {
  return (
    <Frame>
      <OtherBox>
        <NameLine>
          <Text>{userName}</Text>
        </NameLine>
        <MessageLine>
          <TimeBox>
            <Text>{time}</Text>
          </TimeBox>
          <MessageBox>{message}</MessageBox>
        </MessageLine>
      </OtherBox>
    </Frame>
  );
}
export default Message;
