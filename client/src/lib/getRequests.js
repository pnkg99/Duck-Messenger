import { sendDataToServer } from "./sendAction";
export async function getRequests(server, owner) {
  try {
    const getRequestData = {
      server: server,
      owner: owner,
    };
    const getRequestUrl = `/api/getRequests`;
    let res = await sendDataToServer(getRequestUrl, getRequestData);
    if (res == undefined) {
      return { status: false, msg: "Response undefined" };
    }
    return res;
  } catch (e) {
    console.log(e);
    return { status: false, msg: e };
  }
}
