import React, { useState, useEffect } from "react";
import db from "../firebase";
import firebase from "firebase";
import "../style/ChatBox.css";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import LinkIcon from "@material-ui/icons/Link";
import CodeIcon from "@material-ui/icons/Code";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import MoodIcon from "@material-ui/icons/Mood";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import { useStateValue } from "../reducer/StateProvider";
import Picker from "emoji-picker-react";

function ChatBox() {
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        setRoomDetails(snapshot.data());
      });
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("rooms").doc(roomId).collection("messeges").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.username,
      userImage: user?.userImage,
    });

    setInput("just a try");
  };

  return (
    <div className="chatBox">
      <input
        type="text"
        placeholder={`Send a Messege on ${roomDetails?.name} channel ${chosenEmoji?.emoji}`}
        className="chatBox__input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <div className="chatBox__stickers">
        <div className="chatBox__stickers__left">
          <div class="tooltip">
            <FlashOnIcon className="chatBox__sticker" />
            <span class="tooltiptext">Shortcuts</span>
          </div>
          <div class="tooltip">
            <FormatBoldIcon className="chatBox__sticker" />
            <span class="tooltiptext">Bold</span>
          </div>
          <div class="tooltip">
            <FormatItalicIcon className="chatBox__sticker" />
            <span class="tooltiptext">Italic</span>
          </div>
          <div class="tooltip">
            <StrikethroughSIcon className="chatBox__sticker" />
            <span class="tooltiptext">Strikethrough</span>
          </div>
          <div class="tooltip">
            <LinkIcon className="chatBox__sticker" />
            <span class="tooltiptext">Link</span>
          </div>
          <div class="tooltip">
            <MoodIcon className="chatBox__sticker" />
            <span class="tooltiptext">
              <Picker onEmojiClick={onEmojiClick} />
            </span>
          </div>
        </div>
        <div className="chatBox__stickers__right">
          <div class="tooltip">
            <KeyboardHideIcon className="chatBox__sticker" />
            <span class="tooltiptext">Hide formating</span>
          </div>
          <div class="tooltip">
            <CodeIcon className="chatBox__sticker" />
            <span class="tooltiptext">Code Block</span>
          </div>
          <div class="tooltip">
            <SendIcon onClick={input.length > 0 ? sendMessage : ""} />
            <span class="tooltiptext">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;

// whole Box
// - div for the input it keeps track for changes
// - stickers div
// = right div
// = left div

// box message with html and css

{
  /* <div>
{chosenEmoji ? (
  <span>You chose: {chosenEmoji.emoji}</span>
) : (
  <span>No emoji Chosen</span>
)}
<Picker onEmojiClick={onEmojiClick} />
</div> */
}
