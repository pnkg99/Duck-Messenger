import { decryptData } from "./decryptData";

export async function decryptMessages(messages, key) {
  const decryptedMessages = [];
  for (const message of messages) {
    let decryptedMessage = {
      time: message.time,
      sender: message.sender,
    };

    try {
      const res = await decryptData(message.msg, key);
      decryptedMessage.msg = res.data;
      if (res.status === false) {
        decryptedMessages.push(message);
      } else {
        decryptedMessages.push(decryptedMessage);
      }
    } catch (error) {
      console.error("Error decrypting message:", error);
    }
  }
  return decryptedMessages;
}
