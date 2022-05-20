import { useState } from "react";
import styled from "styled-components";
import Data from "../etc/datainterface";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Profile({ data }: { data: Data }) {
  return <Frame>profile</Frame>;
}
export default Profile;
