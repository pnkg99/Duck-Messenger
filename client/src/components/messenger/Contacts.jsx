import styles from "../../css/messenger.module.css";
import UserContext from "../../config/UserContext";
import { useState, useEffect, useContext } from "react";
import User from "./User";
import { sendDataToServer } from "../../lib/sendAction";
import AddContact from "./AddContact";
import { getProfile } from "../../lib/getProfile";
import toast from "react-hot-toast";

function Contacts() {
  const [searchParams, setSearchParams] = useState("");
  const [showRequests, setShowRequests] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [contactsInfo, setContactsInfo] = useState([]);
  const [requestsInfo, setRequestInfo] = useState([]);
  const [friend, onAddFriend] = useState("");

  const { userData } = useContext(UserContext);

  async function sendRequest(server, owner, account) {
    try {
      const sendRequestData = {
        server: server,
        owner: owner,
        account: account,
        private_key: userData.pkey,
      };
      const sendRequestUrl = `/api/sendRequest`;
      let res = await sendDataToServer(sendRequestUrl, sendRequestData);
      return res;
    } catch (e) {
      console.log(e);
      return { status: false, msg: e };
    }
  }
  async function setProfileAsync() {
    try {
      const profile = await getProfile(userData.serverURL, userData.accName);
      console.log(profile, "39");
      setRequestInfo(profile.data.requests);
      setContactsInfo(profile.data.contacts);
    } catch (e) {
      console.log(e);
    }
  }
  async function sendRequestAsync() {
    try {
      const res = await sendRequest(
        userData.serverURL,
        userData.accName,
        friend
      );
      if (res?.status) {
        if (res.status) {
          toast.success(`Request sent to ${friend}`);
        } else {
          toast.error(res.msg);
        }
      } else {
        toast.error(`Bad response ${res}`);
      }
    } catch (e) {
      console.log(e);
      return { status: false, msg: e };
    }
  }
  const addUser = (newUser) => {
    setContactsInfo((prev) => [...prev, newUser]);
  };
  const removeUser = (toRemove) => {
    if (!toRemove) return;
    setContactsInfo((prev) => prev.filter((contacts) => contacts !== toRemove));
  };
  useEffect(() => {
    if (!friend) return;
    sendRequestAsync();
    console.log(friend);
  }, [friend]);

  useEffect(() => {
    setProfileAsync();
    console.log();
  }, [userData.serverURL, userData.accName]);

  const toggleRequests = () => {
    setShowRequests((prev) => !prev);
  };
  const toggleAddContact = () => {
    setAddContact((prev) => !prev);
    setShowRequests(false);
  };
  const searchUser = () => {
    console.log("searchUser called", searchParams);
  };

  const handleSearchParams = (e) => {
    const input = e.target.value.trim();
    setSearchParams(input);
  };

  const showUsers = () => {
    if (showRequests) {
      if (requestsInfo.length > 0) {
        return requestsInfo.map((userRequest, i) => (
          <User
            key={i}
            accName={userRequest}
            isRequest={true}
            addUser={addUser}
            removeUser={removeUser}
          />
        ));
      } else {
        return <p className={styles.noDataToShowMSG}>No requests</p>;
      }
    } else {
      if (contactsInfo.length > 0) {
        return contactsInfo.map((userContact, i) => (
          <User
            key={i}
            accName={userContact}
            addUser={addUser}
            removeUser={removeUser}
          />
        ));
      } else {
        return <p className={styles.noDataToShowMSG}>No contacts</p>;
      }
    }
  };

  return (
    <div>
      <div className={styles.btnCTR}>
        <div className={styles.buttonGroup}>
          <button onClick={toggleAddContact} className={styles.contactBTN}>
            Add contact
          </button>

          <button onClick={toggleRequests} className={styles.contactBTN}>
            Requests
          </button>
        </div>
        {addContact && !showRequests && (
          <AddContact onAddFriend={onAddFriend} />
        )}
        {!addContact && (
          <div className={styles.searchContainer}>
            <input
              className={styles.searchFieldContact}
              type="text"
              placeholder="Search"
              value={searchParams}
              onChange={handleSearchParams}
            />
            <button onClick={searchUser} className={styles.searchBTN}>
              <img src="./img/search.svg" alt="search" />{" "}
            </button>
          </div>
        )}
      </div>
      <ul className={styles.userList}>{showUsers()}</ul>
    </div>
  );
}

export default Contacts;
