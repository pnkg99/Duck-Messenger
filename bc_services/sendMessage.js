const { response } = require("express");
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");

async function sendMessage(server, owner, account, message, pkey) {
  try {
    let accountSignature = {};
    let rpc = new JsonRpc(server);
    try {
      // Check server is valid
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

    const accountApi = new Api({ rpc, signatureProvider: accountSignature });
    const transactActions = {
      account: process.env.MSGACC,
      name: "sendmsg",
      authorization: [
        {
          actor: owner,
          permission: "active",
        },
      ],
      data: { from: owner, to: account, data: message },
    };
    try {
      const resil = await accountApi.transact({ actions: [transactActions] });
      return { status: true, msg: "Message successfuly sent", trx: resil };
    } catch (e) {
      console.log(e);
      const error = new RpcError(e);
      return { msg: error.json.details[0].message, status: false };
    }
  } catch (e) {
    return { msg: e, status: false };
  }
}

module.exports = sendMessage;
