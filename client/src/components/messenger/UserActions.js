import React, { useState } from "react";
import { sendDataToServer } from "../../lib/sendAction";
import ConfirmModal from "./ConfirmModal";
import styles from "../../css/messenger.module.css";
import toast, { Toaster } from "react-hot-toast";

function UserActions({
  account,
  rsa_private,
  accept,
  pkey,
  isRequest,
  userData,
}) {
  const [openConfirmModal, setOpenConfirmModa] = useState(false);
  async function sendAcceptRequestAction(
    server,
    owner,
    account,
    rsa_private,
    accept,
    pkey
  ) {
    try {
      const acceptRequestData = {
        server,
        owner,
        account,
        rsa_private,
        accept,
        pkey,
      };
      const acceptRequestUrl = `/api/respRequest`;
      let res = await sendDataToServer(acceptRequestUrl, acceptRequestData);
      if (res === undefined) {
        res = {};
      }
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  async function sendRemoveContactAction(server, owner, account, pkey) {
    try {
      const removeContactData = {
        server,
        owner,
        account,
        pkey,
      };
      const removeContactUrl = `/api/removeContact`;
      let res = await sendDataToServer(removeContactUrl, removeContactData);
      if (res === undefined) {
        res = { status: false };
      }
      return res;
    } catch (e) {
      console.log(e);
      return { status: false };
    }
  }
  function removeRequest() {
    sendAcceptRequestAction(
      userData.serverURL,
      userData.accName,
      account,
      rsa_private,
      false,
      userData.pkey
    );
  }

  function acceptRequest() {
    if (rsa_private) {
      sendAcceptRequestAction(
        userData.serverURL,
        userData.accName,
        account,
        rsa_private,
        true,
        userData.pkey
      );
    } else {
      toast.error("Please import your private RSA to accept the request");
    }
  }

  function removeContact() {
    const res = sendRemoveContactAction(
      userData.serverURL,
      userData.accName,
      account,
      userData.pkey,
      false
    );
    if (res.status) {
      toast.success("Contact removed");
      console.log(res);
    }
  }
  const typeOfUserReq = isRequest ? removeRequest : removeContact;

  return (
    <div>
      {isRequest && (
        <button className={styles.transparentBTN} onClick={acceptRequest}>
          Accept
        </button>
      )}
      <button
        className={styles.transparentBTN}
        onClick={() => setOpenConfirmModa(true)}
      >
        Delete
      </button>
      <ConfirmModal
        typeOfUserReq={typeOfUserReq}
        isOpen={openConfirmModal}
        setIsOpen={setOpenConfirmModa}
      />
      <Toaster position="bottom-left" />
    </div>
  );
}

export default UserActions;
