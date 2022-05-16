import styled from "styled-components";
import Login from "./login";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const TitleBox = styled.div`
  display: flex;
  flex: 2 0 0;
  justify-content: center;
  align-items: center;
  border: 2px solid blue;
`;

const WindowBox = styled.div`
  display: flex;
  flex: 4 0 0;
  border: 2px solid green;
`;

function Start({ f }: { f: Function }) {
  return (
    <Frame>
      <TitleBox>
        <h1>Chat-Talk</h1>
      </TitleBox>
      <WindowBox>
        <Login f={f}></Login>
      </WindowBox>
    </Frame>
  );
}
export default Start;
