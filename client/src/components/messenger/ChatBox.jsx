import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "../../css/messenger.module.css";
import ChatMSG from "./ChatMSG";
import UserContext from "../../config/UserContext";
import EncryptionContext from "../../config/EncryptionContext";
import { useSearchParams } from "react-router-dom";
import { encryptData } from "../../lib/encryptData";
import { decryptMessages } from "../../lib/decryptMessages";
import { getMessageHistory } from "../../lib/getMessageHistory";
import { sendMessage } from "../../lib/sendMessage";
import toast, { Toaster } from "react-hot-toast";
import { getAes } from "../../lib/getAes";

function ChatBox() {
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageHistoryDecr, setMessageHistoryDecr] = useState([]);
  const [toEncrypt, setToEncrypt] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const selectedUser = searchParams.get("selectedUser");
  const { userData, rsa_private } = useContext(UserContext);
  const { encryption } = useContext(EncryptionContext);
  const [aes, setAes] = useState("");
  const messageListRef = useRef(null);
  const MAX_CHAR = 300;

  useEffect(() => {
    if (!selectedUser) {
      return;
    }
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageHistoryDecr]);

  async function decryptMessageHistory() {
    try {
      const decryptedData = await decryptMessages(messageHistory, aes);
      setMessageHistoryDecr(decryptedData);
    } catch (e) {
      console.log(e);
    }
  }
  async function setMessagesHistory(server, owner, account) {
    try {
      let msgData = await getMessageHistory(server, owner, account);
      console.log(msgData);
      setMessageHistory(msgData.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function setAesAsync(server, owner, account, rsa_private) {
    try {
      let res = await getAes(server, owner, account, rsa_private);
      if (res.status) {
        setAes(res.key);
      } else {
        if (res.msg.code == "ERR_OSSL_UNSUPPORTED") {
          //toast.error("Wrong rsa private format");
          return;
        } else {
          toast.error("Failed to obtain aes key");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!selectedUser) return;

    const fetchData = async () => {
      // Fetch new messages and update message history
      await setMessagesHistory(
        userData.serverURL,
        userData.accName,
        selectedUser
      );

      if (rsa_private) {
        await setAesAsync(
          userData.serverURL,
          userData.accName,
          selectedUser,
          rsa_private
        );
      }
      if (encryption) {
        if (!rsa_private) {
          toast.error("Provide rsa_private to use encrypted communication");
          return;
        }
      }
      setToEncrypt(true);

      // Scroll to the bottom of the message list
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    };

    // Call fetchData immediately and then every 5 seconds
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedUser]);

  useEffect(() => {
    if (!messageHistory) return;
    decryptMessageHistory();
    setToEncrypt(false);
  }, [messageHistory]);

  const closeMSG = () => {
    setSearchParams((prev) => {
      prev.delete("selectedUser");
      setMessageHistory([]);
      setMessageHistoryDecr([]);
      return prev;
    });
  };

  const handleUserInput = (e) => {
    let userPromt = e.target.value;
    if (userPromt.length > MAX_CHAR) {
      console.error(`max ${MAX_CHAR} char allowed`);
      return;
    }
    setUserInput(userPromt);
  };

  const sendUserMSG = async () => {
    if (!userInput) {
      console.error("nothing to send");
      return;
    }
    if (!rsa_private) {
      toast.error("Import rsa_private to send/read messages");
      return;
    }
    if (!aes) {
      try {
        let res = await getAes(
          userData.serverURL,
          userData.accName,
          selectedUser,
          rsa_private
        );
      } catch (e) {
        console.log(e);
        return;
      }
    }

    let encyptedMessage = await encryptData(aes, userInput);
    encyptedMessage = encyptedMessage.data;

    const result = await sendMessage(
      userData.serverURL,
      userData.accName,
      selectedUser,
      encyptedMessage,
      userData.pkey
    );
    if (result.status) {
      toast.success(result.msg);
      console.log(encyptedMessage, 155);
      setMessageHistory([...messageHistory, { msg: encyptedMessage }]);
      setUserInput("");
    } else {
      toast.error(result.msg);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendUserMSG();
    }
  };

  const generateMessages = (encryption, messageHistory, messageHistoryDecr) => {
    if (!encryption) {
      return messageHistory.map((msg, i) => {
        return <ChatMSG msgData={msg} key={i} />;
      });
    } else {
      return messageHistoryDecr.map((msg, i) => {
        return <ChatMSG msgData={msg} key={i} />;
      });
    }
  };
  return (
    <div className={styles.chatBox}>
      <header className={styles.chatBoxHeader}>
        <img src="./img/duck_3940441.svg" alt="user" />
        <h2>{selectedUser}</h2>
        <button onClick={closeMSG}>
          <img src="./img/art-design_1774729.svg" alt="X" />
        </button>
      </header>
      <article className={styles.messageList} ref={messageListRef}>
        {messageHistory &&
          generateMessages(encryption, messageHistory, messageHistoryDecr)}
      </article>
      {selectedUser && (
        <div className={styles.messageInputContainer}>
          <input
            onKeyDown={handleEnter}
            type="text"
            value={userInput}
            className={styles.messageInput}
            onChange={handleUserInput}
          />
          <button onClick={sendUserMSG} className={styles.messageInputSendBTN}>
            <img src="./img/send.svg" alt="sendBTN" />
          </button>
        </div>
      )}
      <Toaster position="bottom-left" />
    </div>
  );
}

export default ChatBox;
