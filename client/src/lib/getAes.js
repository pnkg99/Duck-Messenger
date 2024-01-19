import { sendDataToServer } from "./sendAction";

export async function getAes(server, owner, account, rsa_private) {
  try {
    const reqData = {
      server: server,
      owner: owner,
      from: account,
      rsa_private: rsa_private,
    };
    const reqUrl = `/api/getSymetricKey`;
    let res = await sendDataToServer(reqUrl, reqData);
    return res;
  } catch (e) {
    console.log(e);
    return { status: false, msg: e };
  }
}
