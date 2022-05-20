import styled from "styled-components";
import Data from "./datainterface";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MessageBox = styled.div``;
const Line = styled.div``;
const InputBox = styled.input``;
const Button = styled.button``;
const ESCBox = styled.div`
  width: 20px;
  height: 100%;
`;
const ESC = styled.button`
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 50%;
`;

function Addbox({ data, dataf }: { data: Data; dataf: Function }) {
  return (
    <Frame>
      <InnerFrame>
        <MessageBox>
          {data.content === "friend"
            ? "추가하실 친구의 이름을 적어주세요"
            : "생성하실 대화방의 이름을 적어주세요"}
        </MessageBox>
        <Line>
          <InputBox placeholder="입력해주세요"></InputBox>
          <Button
            onClick={() => {
              if (data.content === "friend") {
                dataf({ friends: [...data.friends, {}], boxOn: false });
              } else {
                dataf({ room: [...data.room, {}], boxOn: false });
              }
            }}
          >
            {data.content === "friend" ? "추가" : "생성"}
          </Button>
        </Line>
      </InnerFrame>
      <ESCBox>
        <ESC></ESC>
      </ESCBox>
    </Frame>
  );
}
export default Addbox;
