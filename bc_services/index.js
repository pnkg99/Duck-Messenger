const getTable = require("./get_table");
const login = require("./login");
const register = require("./register");
const sendRequest = require("./sendRequest");
const respRequest = require("./respRequest");
const removeContact = require("./removeContact");
const getProfile = require("./getProfile");
const sendMessage = require("./sendMessage");
const getMessages = require("./getMessages");
const getMessagesFrom = require("./getMessagesFrom");
const getSymetricKey = require("./getSymetricKey");
const encryptMessage = require("./encryptMessage");
const decryptMessage = require("./decryptMessage");
const getMessageHistory = require("./getMessageHistory");
const getRequests = require("./getRequests");

module.exports = {
  getTable,
  login,
  register,
  sendRequest,
  respRequest,
  removeContact,
  getProfile,
  sendMessage,
  getMessages,
  getMessagesFrom,
  getSymetricKey,
  encryptMessage,
  decryptMessage,
  getMessageHistory,
  getRequests,
};
