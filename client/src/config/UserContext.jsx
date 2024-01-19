import { createContext, useState } from "react";
import {
  setToLocalStorage,
  removeFromLocalStorage,
  formatPrivateKeyString,
} from "../lib/localStorage";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const defaultUserData = {
    serverURL: null,
    accName: null,
    pkey: null,
    loggedIn: false,
  };
  const initialUserState =
    JSON.parse(localStorage.getItem("user")) || defaultUserData;

  const initialRSAState = JSON.parse(localStorage.getItem("rsa")) || null;

  const [userData, setUserData] = useState(initialUserState);
  const [rsa_private, setRsa_private] = useState(initialRSAState);
  const saveUserData = (newData) => {
    setUserData(newData);
    setToLocalStorage("user", newData);
  };
  const saveRSA = (rsa_private) => {
    if (!rsa_private || typeof rsa_private !== "string") return;
    const formatedKey = formatPrivateKeyString(rsa_private);
    setToLocalStorage("rsa", formatedKey);
    setRsa_private(formatedKey);
  };
  const dropRSA = () => {
    setRsa_private(null);
    removeFromLocalStorage("rsa");
  };

  const setUserDataToDefault = () => {
    removeFromLocalStorage("user");
    removeFromLocalStorage("rsa");
    setRsa_private(null);
    setUserData(defaultUserData);
  };
  const valueToShare = {
    saveUserData: saveUserData,
    rsa_private: rsa_private,
    saveRSA: saveRSA,
    dropRSA: dropRSA,
    setUserDataToDefault: setUserDataToDefault,
    userData: userData,
  };

  return (
    <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>
  );
}

export default UserContext;
