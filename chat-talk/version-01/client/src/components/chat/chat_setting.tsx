import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  box-sizing: border-box;
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: flex-end;
  position: absolute;
`;
const InnerFrame = styled.div`
  height: 100%;
  width: 80%;
  border-radius: 20px;
  background-color: yellow;
  border: 2px solid black;
`;

function Setting({ f }: { f: Function }) {
  return (
    <Frame>
      <InnerFrame>
        <button
          onClick={() => {
            f(false);
          }}
        >
          돌아가기
        </button>
      </InnerFrame>
    </Frame>
  );
}
export default Setting;
