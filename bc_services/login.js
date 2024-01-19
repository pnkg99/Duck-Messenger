const { response } = require("express");
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");

async function login(serverUrl, account, private_key) {
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

    const accountApi = new Api({ rpc, signatureProvider: accountSignature });
    const transactActions = {
      account: process.env.MSGACC,
      name: "login",
      authorization: [
        {
          actor: account,
          permission: "active",
        },
      ],
      data: { owner: account },
    };
    try {
      // Try to push
      const resil = await accountApi.transact({ actions: [transactActions] });
      return { status: true, msg: "Successfully login", trx: resil };
    } catch (e) {
      console.log(e);
      const error = new RpcError(e);
      return { msg: error.json.details[0].message, status: false };
    }
  } catch (e) {
    return { msg: e, status: false };
  }
}

module.exports = login;
