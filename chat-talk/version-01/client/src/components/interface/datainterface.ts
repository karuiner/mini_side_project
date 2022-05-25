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
interface member {
  id: number;
  uid: number;
  userName: string;
}
interface message {
  userName: string;
  message: string;
  time: string;
}

interface room {
  id: number;
  name: string;
  members: member[];
  message: message[];
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
}

export type { Data, userInfo, friend, message, room, member };
