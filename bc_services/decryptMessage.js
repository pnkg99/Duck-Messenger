const { symetricEncryption } = require("../utils");

const decryptMessage = (key, encryptedMessage) => {
  try {
    return {
      data: symetricEncryption.decrypt(encryptedMessage, key),
      status: true,
    };
  } catch (error) {
    return { msg: error, status: false };
  }
};

module.exports = decryptMessage;
