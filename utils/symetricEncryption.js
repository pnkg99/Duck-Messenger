const crypto = require("crypto");

// Generate a random key for AES encryption
const generateKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 256 bits
};

// Encrypt a message using AES
const encrypt = (data, key) => {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Decrypt an AES-encrypted message
const decrypt = (encryptedData, key) => {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

module.exports = {
  generateKey,
  encrypt,
  decrypt,
};
