import React, { useState } from "react";
import styles from "../../css/messenger.module.css";
import toast, { Toaster } from 'react-hot-toast';
function AddContact({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const handleFriendNameChange = (e) => {
    setFriendName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (friendName.trim() === "") {
      toast.error("Please enter contact");
      return;
    }
    onAddFriend(friendName);
    setFriendName("");
  };

  return (
    <div className={styles.addFriend}>
      <h3>Add Contact</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="friendName"
            className={styles.searchFieldContact}
            value={friendName}
            onChange={handleFriendNameChange}
            placeholder="Profile name"
          />
        </div>
        <button className={styles.contactBTN} type="submit">
          Add
        </button>
      </form>
      <Toaster position="bottom-left"/>
    </div>
  );
}

export default AddContact;
