import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Data, room } from "../interface/datainterface";
import NewRoom from "./newroom";
import RoomCard from "./roomcard";
import io from "socket.io-client";
const socketClient = io(process.env.REACT_APP_SERVER_URL || "");
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
  let [nr, nrf] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/room/${data.userInfo.id}` || "")
      .then((x) => {
        socketClient.emit("room_set", { data: x.data.map((x: room) => x.id) });

        dataf({ room: [...x.data] });
      })
      .catch((err) => {});
  }, [nr]);

  return (
    <Frame>
      {nr ? (
        <NewRoom data={data} dataf={dataf} nrf={nrf}></NewRoom>
      ) : (
        <>
          <Line>
            <Button
              onClick={() => {
                nrf(true);
              }}
            >
              {"새 대화방"}
            </Button>
          </Line>
          <Content>
            <ContentInner>
              {data.room.map((x, i) => {
                let name =
                  x.roomName.length > 0
                    ? x.roomName
                    : x.member
                        .map((x) => x.user.userName)
                        .filter((x) => x !== data.userInfo.userName)
                        .join(", ");
                return (
                  <CardBox
                    key={i}
                    onClick={() => {
                      dataf({ isChatting: true, chat: { roomId: x.id } });
                    }}
                  >
                    <RoomCard
                      name={name}
                      message={x.lastMessage}
                      c={x.member.length}
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
        </>
      )}
    </Frame>
  );
}
export default Room;
