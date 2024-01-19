import React, { useState, useContext } from "react";
import UserContext from "../../config/UserContext";

function PrivateKeyImport() {
  const [privateKey, setPrivateKey] = useState(""); // State to store the private key
  const { userData, rsa_private, saveRSA, dropRSA } = useContext(UserContext);

  const saveAsPrivateKey = (rsa) => {
    saveRSA(rsa);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Read the contents of the file as a string
        const privateKeyString = e.target.result;

        // Parse the RSA private key using node-forge
        try {
          privateKeyString.replace(/\\n/g, "\n");
          setPrivateKey(privateKeyString);
          saveAsPrivateKey(privateKeyString);
        } catch (error) {
          // Handle any errors when parsing the private key
          console.error("Error parsing RSA private key:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
    </div>
  );
}

export default PrivateKeyImport;
