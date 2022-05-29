interface userInfo {
  id?: number;
  userName?: string;
  email?: string;
  statusMessage?: string;
}
interface puser {
  id: number;
  userName: string;
  statusMessage: string;
}

interface friend {
  id: number;
  puser: puser;
}

interface user {
  id: number;
  userName: string;
}

interface member {
  id: number;
  user: user;
}
interface message {
  userName: string;
  message: string;
  time: string;
}

interface room {
  id: number;
  roomName: string;
  member: member[];
  lastMessage: string;
}
interface chat {
  roomId: number;
  roomIndex: number;
}

interface Data {
  isLogin: Boolean;
  isResister: boolean;
  isChatting: boolean;
  isModify: boolean;
  boxOn: boolean;
  content: string;
  userInfo: userInfo;
  friends: friend[];
  room: room[];
  chat: chat;
}

export type { Data, userInfo, friend, message, room, member, puser };
