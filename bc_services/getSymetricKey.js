const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");
const { asymetricEncryption } = require("../utils");
const getProfile = require("./getProfile");

const getSymetricKey = async (serverUrl, owner, account, rsa_private) => {
  try {
    let rpc = new JsonRpc(serverUrl);
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
    const user = await getProfile(serverUrl, owner);
    return {
      status: true,
      msg: `Decrypted symetric key for user ${account}`,
      key: asymetricEncryption.decrypt(user_request.rows[0].key, rsa_private),
    };
  } catch (error) {
    return { msg: error, status: false };
  }
};

module.exports = getSymetricKey;
