import React from "react";
import { useSearchParams } from "react-router-dom";

import styles from "../../css/messenger.module.css";
function ChatMSG({ msgData }) {
  const { sender, msg, time } = msgData;
  const [searchParams, setSearchParams] = useSearchParams("");
  const sentByMe = searchParams.get("selectedUser") === sender;

  return (
    <p
      className={`${styles.messageText} ${
        sentByMe ? styles.sender : styles.reciver
      }`}
    >
      {msg}
      <em>{time}</em>
    </p>
  );
}

export default ChatMSG;
