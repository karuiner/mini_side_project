import { useEffect } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";
import RoomCard from "./roomcard";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;

  padding-left: 5%;
  padding-bottom: 5%;
  flex-direction: column;
`;
const Line = styled.div`
  display: flex;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  padding-right: 10px;
`;

const Button = styled.button`
  display: flex;
  border-radius: 5px;
  border: 1px solid black;
`;

const Content = styled.div`
  display: flex;
  height: 100%;

  justify-content: center;
`;
const ContentInner = styled.div`
  display: flex;
  max-height: 62vh;
  width: 100%;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 5px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: white;
`;

const CardBox = styled.div`
  display: flex;
  height: 15%;
  min-height: 100px;
  width: 100%;
  margin: 5px;
  border-radius: 10px;

  border: 1px solid black;
`;

function Room({ data, dataf }: { data: Data; dataf: Function }) {
  useEffect(() => {
    if (data.room.length === 0) {
      dataf({ room: Array(20).fill({}) });
    }
  });

  return (
    <Frame>
      <Line>
        <Button
          onClick={() => {
            // dataf({ friends: [...data.friends, {}] });
            dataf({ boxOn: true });
          }}
        >
          {"새 대화방"}
        </Button>
      </Line>
      <Content>
        <ContentInner>
          {data.friends.map((x, i) => {
            return (
              <CardBox
                key={i}
                onClick={() => {
                  dataf({ isChatting: true });
                }}
              >
                <RoomCard
                  f={() => {
                    dataf({
                      friends: [
                        ...data.friends.slice(0, i),
                        ...data.friends.slice(i + 1),
                      ],
                    });
                  }}
                ></RoomCard>
              </CardBox>
            );
          })}
        </ContentInner>
      </Content>
    </Frame>
  );
}
export default Room;
