import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import "../style/SidebarOption.css";

function SidebarOption({ Icon, title, id, addChannel }) {
  let history = useHistory();

  const addChannels = (event) => {
    event.preventDefault();
    var channeName = prompt("Please enter your name", "Harry Potter");
    if (channeName) {
      db.collection("rooms").add({
        name: channeName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      history.push(`/room/${id}`);
    }
  };

  const selectChannel = () => {
    if (id) {
      console.log("hhh");
      history.push(`/room/${id}`);
    }
  };

  return (
    <div
      className="siderbarOption"
      onClick={addChannel ? addChannels : selectChannel}
    >
      {Icon && <Icon className="sidebarOption__icons" />}
      {Icon ? (
        <h3 className="sidebarOption__channel">{title}</h3>
      ) : (
        <h3 className="sidebarOption__hash"># {title}</h3>
      )}
    </div>
  );
}

export default SidebarOption;

// 1- get the rooms from db
// 2- find the room with the new name
// 3- get its id
// 4- put in the push history
