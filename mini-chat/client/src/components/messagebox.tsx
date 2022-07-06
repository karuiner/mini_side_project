import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  height: 100px;
  width: 600px;
  position: absolute;
  flex-direction: column;
  display: flex;
  z-index: 2;
  border: solid 1px black;
`;
const ButtonBox = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainBox = styled.div`
  height: 60px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainLabel = styled.label`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainInput = styled.input`
  width: 300px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainButton = styled.button`
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function MessageBox({ label, dataf }: { label: string; dataf: Function }) {
  let [text, textf] = useState("");

  return (
    <Frame>
      <ButtonBox>
        <Button>{"X"}</Button>
      </ButtonBox>
      <MainBox>
        <MainLabel>{label}</MainLabel>
        <MainInput
          type={"text"}
          value={text}
          onChange={(e) => {
            textf(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.length > 0) {
            }
          }}
        ></MainInput>
        <MainButton>{"변경"}</MainButton>
      </MainBox>
    </Frame>
  );
}

export default MessageBox;
