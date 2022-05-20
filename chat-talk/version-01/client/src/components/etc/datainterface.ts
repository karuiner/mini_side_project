interface userInfo {
  id?: number;
  userName?: string;
  email?: string;
}
interface friend {
  id: number;
  uid: number;
  userName: string;
}
interface member {
  id: number;
  uid: number;
  userName: string;
}
interface room {
  id: number;
  name: string;
  members: member[];
}

interface Data {
  isLogin: Boolean;
  isResister: boolean;
  isChatting: boolean;
  boxOn: boolean;
  content: string;
  userInfo: userInfo;
  friends: friend[];
  room: room[];
}

export default Data;
