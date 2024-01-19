const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");

async function get_table(serverUrl, account, table) {
  let rpc = new JsonRpc(serverUrl);
  let obj = {};
  let getTableReq = {
    code: account,
    scope: account,
    table: table,
    json: true,
    limit: 1000,
    reverse: false,
  };
  try {
    obj = await rpc.get_table_rows(getTableReq);
  } catch (e) {
    console.log(e);
  }
  return obj;
}

module.exports = get_table;
