const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");
const { asymetricEncryption, symetricEncryption } = require("../utils");
const getProfile = require("./getProfile");

async function sendRequest(serverUrl, owner, account, private_key) {
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
    const user = await getProfile(serverUrl, account);

    if (!user?.data) {
      return { msg: "User is not registered", status: false };
    }

    const symetricKey = symetricEncryption.generateKey();
    const encryptedSymetricKey = asymetricEncryption.encrypt(
      symetricKey,
      user.data.rsa_pub
    );

    const accountApi = new Api({ rpc, signatureProvider: accountSignature });
    const transactActions = {
      account: process.env.MSGACC,
      name: "sendreqest",
      authorization: [
        {
          actor: owner,
          permission: "active",
        },
      ],
      data: { from: owner, to: account, key: encryptedSymetricKey },
    };
    try {
      const resil = await accountApi.transact({ actions: [transactActions] });
      return { status: true, msg: "Contact request sent", trx: resil };
    } catch (e) {
      console.log(e);
      const error = new RpcError(e);
      return { msg: error.json.details[0].message, status: false, e: e };
    }
  } catch (e) {
    return { msg: e, status: false };
  }
}

module.exports = sendRequest;
