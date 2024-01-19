const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");
const { asymetricEncryption } = require("../utils");

async function register(serverUrl, account, private_key) {
  try {
    let accountSignature = {};
    let rpc = new JsonRpc(serverUrl);
    try {
      // Check serverUrl is valid
      const info = await rpc.get_info();
    } catch (e) {
      return { msg: "Server does not have RPC API", status: false };
    }
    try {
      // Check private key type
      accountSignature = new JsSignatureProvider([private_key]);
    } catch (e) {
      return { msg: "Wrong private key format", status: false };
    }
    try {
      const acc = await rpc.get_account(account);
    } catch (e) {
      return { msg: "Account does not exist on blockchain", status: false };
    }

    const { privateKey, publicKey } = asymetricEncryption.generateKeys();

    const accountApi = new Api({ rpc, signatureProvider: accountSignature });
    const transactActions = {
      account: process.env.MSGACC,
      account: process.env.MSGACC,
      name: "reguser",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: { owner: account, rsa_pub: publicKey },
    };
    try {
      // Try to push
      const resil = await accountApi.transact({ actions: [transactActions] });
      return {
        status: true,
        msg: "Successfuly registered",
        private_key: privateKey,
      };
    } catch (e) {
      const error = new RpcError(e);
      return { msg: error.json.details[0].message, status: false };
    }
  } catch (e) {
    return { msg: e, status: false };
  }
}

module.exports = register;
