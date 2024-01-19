const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");

async function getMessagesFrom(serverUrl, owner, from) {
  let rpc = new JsonRpc(serverUrl);
  let resp_obj = {};
  let getTableReq = {
    code: process.env.MSGACC,
    scope: owner,
    table: "inbox",
    json: true,
    lower_bound: from,
    upper_bound: from,
    limit: 1,
    reverse: false,
  };
  try {
    resp_obj = await rpc.get_table_rows(getTableReq);
    if (resp_obj.rows[0].from !== from) {
      return [];
    } else {
      return resp_obj.rows[0].messages;
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}

module.exports = getMessagesFrom;
