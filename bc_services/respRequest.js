const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");
const { asymetricEncryption } = require("../utils");
const getProfile = require("./getProfile");

async function respRequest(server, owner, account, rsa_private, accept, pkey) {
  //console.log(rsa_private.replace(/\\n/g, "\n"));
  try {
    let accountSignature = {};
    let rpc = new JsonRpc(server);
    try {
      // Check serverUrl is valid
      const info = await rpc.get_info();
    } catch (e) {
      return { msg: "Server does not have RPC API", status: false };
    }
    try {
      // Check private key type
      accountSignature = new JsSignatureProvider([pkey]);
    } catch (e) {
      return { msg: "Wrong private key format", status: false };
    }

    const user_request = await rpc.get_table_rows({
      code: process.env.MSGACC,
      scope: owner,
      table: "requests",
      json: true,
      lower_bound: account,
      upper_bound: account,
      limit: 1,
      reverse: false,
    });
    const decryptedKey = asymetricEncryption.decrypt(
      user_request.rows[0].key,
      rsa_private.replace(/\\n/g, "\n")
    );
    const user = await getProfile(server, account);
    const encryptedKey = asymetricEncryption.encrypt(
      decryptedKey,
      user.data.rsa_pub
    );

    const accountApi = new Api({ rpc, signatureProvider: accountSignature });
    const transactActions = {
      account: process.env.MSGACC,
      name: "resprequest",
      authorization: [
        {
          actor: owner,
          permission: "active",
        },
      ],
      data: { owner: owner, from: account, key: encryptedKey, accept: accept },
    };
    try {
      const resil = await accountApi.transact({ actions: [transactActions] });
      return {
        status: true,
        msg: accept ? "Contact added" : "Contact removed",
        trx: resil,
      };
    } catch (e) {
      console.log(e);
      const error = new RpcError(e);
      return { msg: error.json.details[0].message, status: false };
    }
  } catch (e) {
    return { msg: e, status: false };
  }
}

module.exports = respRequest;
