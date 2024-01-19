const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");

async function getProfile(serverUrl, owner) {
  let rpc = new JsonRpc(serverUrl);
  let obj = {};
  let getTableReq = {
    code: process.env.MSGACC,
    scope: process.env.MSGACC,
    table: "profiles",
    json: true,
    lower_bound: owner,
    upper_bound: owner,
    limit: 1,
    reverse: false,
  };
  try {
    obj = await rpc.get_table_rows(getTableReq);
    if (obj?.rows[0]?.owner !== owner) {
      return { status: false };
    } else {
      return { status: true, data: obj.rows[0] };
    }
  } catch (e) {
    console.log(e);
    return { status: false };
  }
}

module.exports = getProfile;
