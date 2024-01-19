const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("/table", controller.getTable);

router.post("/login", controller.login);

router.post("/register", controller.register);

router.post("/sendRequest", controller.sendRequest);

router.post("/respRequest", controller.respRequest);

router.post("/removeContact", controller.removeContact);

router.post("/sendMessage", controller.sendMessage);

router.post("/getProfile", controller.getProfile);

router.post("/getMessages", controller.getMessages);

router.post("/getMessagesFrom", controller.getMessagesFrom);

router.post("/getSymetricKey", controller.getSymetricKey);

router.post("/encryptMessage", controller.encryptMessage);

router.post("/decryptMessage", controller.decryptMessage);

router.post("/getMessageHistory", controller.getMessageHistory);

router.post("/getRequests", controller.getRequests);

module.exports = router;
