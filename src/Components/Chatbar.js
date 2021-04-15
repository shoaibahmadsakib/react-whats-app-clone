import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chatbar.css";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { useParams } from "react-router-dom";
import db from "../Firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chatbar() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp","asc")
        .onSnapshot((snapsort) => {
          setMessages(snapsort.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-headerinfo">
          <h3>{roomName}</h3>
          <p> {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toGMTString()}</p>
        </div>
        <div className="chatheader-right">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <p
            className={`chat-message ${
              message.name == user.displayName && "chat-reciver"
            }`}
          >
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="chat-time">
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        <SentimentVerySatisfiedIcon />

        <form>
          <input
            type="text"
            placeholder="input here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            send message
          </button>
          <MicIcon />
        </form>
      </div>
    </div>
  );
}

export default Chatbar;
