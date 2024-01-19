const { JsonRpc } = require("ineryjs");

async function getRequests(server, owner) {
  let rpc = new JsonRpc(server);
  let resp_obj = {};
  let rows = [];
  let next_key = "";
  let more = false;
  let getTableReq = {
    code: process.env.MSGACC,
    scope: owner,
    table: "requests",
    json: true,
    limit: 1000,
    reverse: false,
  };
  try {
    do {
      getTableReq.lower_bound = next_key;
      resp_obj = await rpc.get_table_rows(getTableReq);
      rows = rows.concat(resp_obj.rows);
      more = resp_obj.more;
      next_key = resp_obj.next_key;
    } while (more);
    return rows;
  } catch (e) {
    console.log(e);
    return {};
  }
}

module.exports = getRequests;
