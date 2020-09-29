import React, { useEffect, useState } from "react";
import db from "../firebase";
import "../style/Chat.css";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import Message from "./Message";
import ChatBox from "./ChatBox";

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomDetails(snapshot.data());
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messeges")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setRoomMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className="chat" style={{ color: "black" }}>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <strong># {roomDetails?.name}</strong>
          <StarBorderIcon />
        </div>
        <div className="chat__headerRight">
          <InfoIcon />
          <p>Details</p>
        </div>
      </div>

      <div className="chat__messege">
        {roomMessages.map((message) => (
          <Message
            user={message.user}
            userImage={message.userImage}
            timestamp={message.timestamp}
            message={message.message}
          />
        ))}
      </div>

      <ChatBox />
    </div>
  );
}

export default Chat;
