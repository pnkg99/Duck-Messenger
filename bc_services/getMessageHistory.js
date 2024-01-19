const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("ineryjs");
const { symetricEncryption } = require("../utils");

const getMessageHistory = async (
  serverUrl,
  owner,
  account,
  key,
  limit = 50
) => {
  try {
    let rpc = new JsonRpc(serverUrl);
    let owner_messages = await rpc.get_table_rows({
      code: process.env.MSGACC,
      scope: owner,
      table: "inbox",
      lower_bound: account,
      upper_bound: account,
      json: true,
      limit: limit,
      reverse: false,
    });
    if (owner_messages?.rows[0]?.messages) {
      owner_messages = owner_messages.rows[0].messages;
    } else {
      owner_messages = [];
    }

    let user_messages = await rpc.get_table_rows({
      code: process.env.MSGACC,
      scope: account,
      table: "inbox",
      lower_bound: owner,
      upper_bound: owner,
      json: true,
      limit: limit,
      reverse: false,
    });
    if (user_messages.rows.length >= 1) {
      user_messages = user_messages.rows[0].messages;
    } else {
      user_messages = [];
    }
    if (owner_messages.length < 1 && user_messages.length < 1) {
      return {
        status: true,
        msg: `Users have no messages`,
        data: [],
      };
    }
    for (const ind in owner_messages) {
      owner_messages[ind]["sender"] = account;
    }

    for (const ind in user_messages) {
      user_messages[ind]["sender"] = owner;
    }

    function compareByTime(a, b) {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();

      return timeA - timeB;
    }

    const merged_messages = owner_messages.concat(user_messages);
    let sorted_messages = merged_messages.sort(compareByTime);

    return {
      status: true,
      msg: `Successfully fetched user messages`,
      data: sorted_messages,
    };
  } catch (error) {
    return { msg: error, status: false };
  }
};

module.exports = getMessageHistory;
