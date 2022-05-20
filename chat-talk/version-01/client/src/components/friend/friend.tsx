import { useEffect } from "react";
import styled from "styled-components";
import Data from "../etc/datainterface";
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
  height: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
`;
const Content = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const ContentInner = styled.div`
  display: flex;
  height: 65vh;
  width: 100%;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 5px;
`;

const CardBox = styled.div`
  min-height: 80px;
  height: 15%;
  width: 100%;
  margin: 5px;
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
      <Line>{`친구 ${data.friends.length}명`}</Line>
      <Content>
        <ContentInner>
          {data.friends.map((x, i) => {
            return (
              <CardBox key={i}>
                <Fcard></Fcard>
              </CardBox>
            );
          })}
        </ContentInner>
      </Content>
    </Frame>
  );
}
export default Friend;
