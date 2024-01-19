import React, { useState, useContext, useEffect } from "react";
import styles from "../../css/messenger.module.css";
import UserContext from "../../config/UserContext";
import { getRequests } from "../../lib/getRequests";
import PrivateKeyImport from "./PrivateKeyImport";

function ContactsRSAaes() {
  const [asPkey, setAsPkey] = useState("");
  const [requests, setRequests] = useState([]);
  const { userData, rsa_private, saveRSA, dropRSA } = useContext(UserContext);

  async function getRequestAsync() {
    try {
      const reqs = await getRequests(userData.serverURL, userData.accName);
      setRequests(reqs);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getRequestAsync();
  }, [userData.serverURL, userData.accName]);

  const handleAsPkeyChange = (e) => {
    setAsPkey(e.target.value.trim());
  };
  const saveAsPrivateKey = () => {
    saveRSA(asPkey.replace(/\\n/g, "\n"));
    // saveRSA(asPkey);
  };
  const dropRSAKey = () => {
    dropRSA();
    setAsPkey("");
  };
  const generatePkeyFields = () => {
    if (rsa_private) {
      return (
        <>
          <input
            type="text"
            className={styles.keyInput}
            value={rsa_private}
            disabled
          />{" "}
          <button onClick={dropRSAKey}>Drop</button>
        </>
      );
    } else {
      return (
        <>
          <input
            type="text"
            className={styles.keyInput}
            value={asPkey}
            placeholder="Enter key here!"
            onChange={handleAsPkeyChange}
          />{" "}
          {asPkey && <button onClick={saveAsPrivateKey}>Save</button>}
        </>
      );
    }
  };
  return (
    <div>
      <section className={styles.btnCTR}>
        <h2>RSA</h2>
        <h4>Paste Private Key</h4>
        <div className={styles.inputGroup}>{generatePkeyFields()}</div>
        <h3>Import from File</h3>
        <PrivateKeyImport></PrivateKeyImport>
      </section>
      <section className={styles.btnCTR}></section>
    </div>
  );
}

export default ContactsRSAaes;
