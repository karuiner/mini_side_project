import { useState } from "react";
import styled from "styled-components";
import Data from "../etc/datainterface";

const Frame = styled.div`
  width: 100%;
  display: flex;
  flex: 1 0 0;
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 50px;
  flex: 1 0 0;
`;
const View = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const Input = styled.input`
  display: flex;
  flex: 1 0 0;
  size: 10;
`;

function LabelLine({
  data,
  udataf,
  label,
  type,
  x,
}: {
  data: String;
  udataf: Function;
  label: string;
  type: string;
  x: boolean;
}) {
  return (
    <Frame>
      <Label>{label}</Label>
      {!x ? (
        <View>{data}</View>
      ) : (
        <Input
          type={type}
          onChange={(e) => {
            udataf({ label: e.target.value });
          }}
        ></Input>
      )}
    </Frame>
  );
}
export default LabelLine;
