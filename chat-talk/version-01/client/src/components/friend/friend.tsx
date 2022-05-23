import { useEffect } from "react";
import styled from "styled-components";
import { Data } from "../interface/datainterface";
import Fcard from "./fcard";

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
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-right: 10px;
`;
const Count = styled.div`
  display: flex;
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
  border: 1px solid black;
  background-color: white;
`;

const CardBox = styled.div`
  display: flex;
  height: 15%;
  min-height: 80px;
  width: 100%;
  margin: 5px;
  border-radius: 10px;
  border: 1px solid black;
`;

function Friend({ data, dataf }: { data: Data; dataf: Function }) {
  useEffect(() => {
    if (data.friends.length === 0) {
      dataf({ friends: Array(20).fill({}) });
    }
  });

  return (
    <Frame>
      <Line>
        <Count>{`친구 ${data.friends.length}명`}</Count>
        <Button
          onClick={() => {
            // dataf({ friends: [...data.friends, {}] });
            dataf({ boxOn: true });
          }}
        >
          {"친구 추가"}
        </Button>
      </Line>
      <Content>
        <ContentInner>
          {data.friends.map((x, i) => {
            return (
              <CardBox key={i}>
                <Fcard
                  f={() => {
                    dataf({
                      friends: [
                        ...data.friends.slice(0, i),
                        ...data.friends.slice(i + 1),
                      ],
                    });
                  }}
                ></Fcard>
              </CardBox>
            );
          })}
        </ContentInner>
      </Content>
    </Frame>
  );
}
export default Friend;
