import io from "socket.io-client";
import "./App.css";
const socketClient = io(process.env.REACT_APP_SERVER_URL || "");
function App() {
  socketClient.emit("connection", "connect");
  return (
    <div className="App">
      <button
        onClick={() => {
          socketClient.emit("test", "test");
        }}
      ></button>
    </div>
  );
}

export default App;
