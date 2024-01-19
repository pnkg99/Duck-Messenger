import { sendDataToServer } from "./sendAction";

export async function getMessageHistory(server, owner, from) {
  try {
    const getMessageHistoryData = {
      server: server,
      owner: owner,
      from: from,
    };
    const getMessageHistoryUrl = `/api/getMessageHistory`;
    let res = await sendDataToServer(
      getMessageHistoryUrl,
      getMessageHistoryData
    );
    if (res == undefined) {
      return { status: false, msg: "Response undefined" };
    }
    return res;
  } catch (e) {
    console.log(e);
    return { status: false, msg: e };
  }
}
