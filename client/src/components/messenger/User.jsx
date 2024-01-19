import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import UserContext from "../../config/UserContext";
import styles from "../../css/messenger.module.css";
import UserActions from "./UserActions"; // Import the new component

function User({ accName, key, isRequest = false }) {
  const [selectedUser, selectUser] = useSearchParams("");
  let { userData, rsa_private } = useContext(UserContext);

  const server = userData.serverURL;
  const owner = userData.accName;
  const pkey = userData.pkey;

  function testClick(e) {
    if (!isRequest) {
      const parentLi = e.target.closest("li");

      if (parentLi) {
        let userName = parentLi.getAttribute("data-username");
        if (userName) {
          selectUser((prev) => {
            prev.set("selectedUser", userName);
            return prev;
          });
        }
      }
    }
  }
  return (
    <li data-username={accName} className={styles.userBox} onClick={testClick}>
      <img src="./img/duck_3940441.svg" alt="avatar" />
      <div>
        <h2>{accName} </h2>
      </div>
      <UserActions
        account={accName}
        rsa_private={rsa_private}
        accept={true}
        pkey={pkey}
        isRequest={isRequest}
        userData={userData}
      />
    </li>
  );
}

export default User;
