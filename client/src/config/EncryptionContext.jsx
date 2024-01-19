import { createContext, useState } from "react";
import { setToLocalStorage, removeFromLocalStorage } from "../lib/localStorage";

const EncryptionContext = createContext();

export function EncryptionContextProvider({ children }) {
    const initialState = JSON.parse(localStorage.getItem("encryption")) || false;

  const [encryption, setEncryption]=useState(initialState)


 const handleEncryption=()=>{
    setToLocalStorage('encryption', !encryption)
    setEncryption(prev=>!prev)
    }

const setEncryptionToDefault=()=>{
    removeFromLocalStorage('encryption');
    setEncryption(false);
}
    const valueToShare = {
        handleEncryption: handleEncryption,
        encryption:encryption,
        setEncryptionToDefault:setEncryptionToDefault
    }

    return (
        <EncryptionContext.Provider value={valueToShare}>
            {children}
        </EncryptionContext.Provider>
    )
}


export default EncryptionContext