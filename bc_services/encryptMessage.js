const { symetricEncryption } = require("../utils");

const encryptMessage = (key, message) => {
    try {
        return { data: symetricEncryption.encrypt(message, key) };
    }
    catch (error) {
        return { msg: error, status: false };
    }
};

module.exports = encryptMessage;