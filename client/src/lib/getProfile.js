import { sendDataToServer } from "./sendAction";
export async function getProfile(server, owner) {
  try {
    const getProfileData = {
      server: server,
      owner: owner,
    };
    const getProfileUrl = `/api/getProfile`;
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
