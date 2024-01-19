import { sendDataToServer } from "./sendAction";
export async function decryptData(msg, key) {
  try {
    const reqData = {
      key: key,
      message: msg,
    };
    const url = `/api/decryptMessage`;
    let res = await sendDataToServer(url, reqData);
    if (res == undefined) {
      return { status: false, msg: "Response undefined" };
    }
    return res;
  } catch (e) {
    console.log(e);
    return { status: false, msg: e };
  }
}
