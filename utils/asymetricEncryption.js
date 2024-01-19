const crypto = require("crypto");
const passphrase = "dgejspamzgdjsmendgthclskdpencmst";

const encrypt = function (data, publicKey) {
  var buffer = Buffer.from(data);
  var encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

const decrypt = function (encryptedData, privateKey) {
  console.log(encryptedData, privateKey);
  var buffer = Buffer.from(encryptedData, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase: passphrase,
    },
    buffer
  );
  return decrypted.toString("utf8");
};

const { generateKeyPairSync } = require("crypto");

function generateKeys() {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    namedCurve: "secp256k1",
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  });
  return { privateKey, publicKey };
}

module.exports = {
  generateKeys,
  encrypt,
  decrypt,
};
