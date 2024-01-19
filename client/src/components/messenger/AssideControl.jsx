import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import Contacts from "./Contacts";
import ContactsRSAaes from "./ContactsRSAaes";
import EncryptionContext from "../../config/EncryptionContext";
import UserContext from "../../config/UserContext";
import styles from "../../css/messenger.module.css";
import HowToModal from "./HowToModal";

const AssideControl = () => {
  const [msgURLMode, setMsgURLMode] = useSearchParams("");
  const [refresh, setRefresh] = useState(false);
  const { handleEncryption, encryption } = useContext(EncryptionContext);
  const {
    setUserDataToDefault,
    userData: { accName },
  } = useContext(UserContext);
  const setMSGMode = (e) => {
    const { id } = e.target;
    setMsgURLMode((prev) => {
      prev.set("mode", id);
      return prev;
    });
  };
  const mode = msgURLMode.get("mode");
  const refreshData = () => {
    console.log("refreshing data...");
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  };
  return (
    <aside className={styles.assideControlWrapper}>
      <div className={styles.logoContainer}>
        <h1>
          <strong>
            <b>Duck&nbsp;</b>
          </strong>
          Messenger
        </h1>
      </div>
      <div className={styles.settingsControl}>
        <button onClick={setMSGMode}>
          <img src="./img/contacts.svg" alt="users" id="users" />
          <p>contacts</p>
        </button>
        <button id="keys" onClick={setMSGMode}>
          <img src="./img/keys.svg" alt="keys" id="keys" />
          <p>private keys</p>
        </button>
        <button id="encrypted" onClick={handleEncryption}>
          <img
            src={`./img/encrypt${encryption ? "-active" : ""}.svg`}
            alt="encrypted"
            id="encrypted"
          />
          <p>encrypted</p>
        </button>
      </div>
      <hr className={styles.brakeLine} />
      {mode === "users" && <Contacts />}
      {mode === "keys" && <ContactsRSAaes />}
      <button
        className={`${styles.refreshBTN} ${refresh ? styles.active : ""}`}
        onClick={refreshData}
      >
        <img
          src={`./img/refresh-${refresh ? "active" : "inactive"}.svg`}
          alt="refresh"
        />
      </button>
      <button className={styles.logOutBTN} onClick={setUserDataToDefault}>
        LogOut <br />
        <strong>{accName}</strong>
      </button>
      <HowToModal />
    </aside>
  );
};

export default AssideControl;
