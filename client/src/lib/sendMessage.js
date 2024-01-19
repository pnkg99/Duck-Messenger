import { sendDataToServer } from "./sendAction";
export async function sendMessage(server, owner, account, message, pkey) {
  try {
    const getProfileData = {
      server: server,
      owner: owner,
      account: account,
      message: message,
      pkey: pkey,
    };
    const getProfileUrl = `/api/sendMessage`;
    let res = await sendDataToServer(getProfileUrl, getProfileData);
    if (res == undefined) {
      return { status: false, msg: "Response undefined" };
    }
    return res;
  } catch (e) {
    console.log(e);
    return { status: false, msg: e };
  }
}
