const bc_services = require("./bc_services");

const Controller = {
  /**
   * @type RequestHandler
   */
  async getTable(req, res) {
    try {
      res.send(
        await bc_services.getTable(
          req.body.server,
          req.body.account,
          req.body.table
        )
      );
    } catch (error) {
      res.send({ message: "Internal server error" });
    }
  },
  async login(req, res) {
    try {
      const response = await bc_services.login(
        req.body.server,
        req.body.account,
        req.body.private_key
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async register(req, res) {
    try {
      const response = await bc_services.register(
        req.body.server,
        req.body.account,
        req.body.private_key
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async sendRequest(req, res) {
    try {
      const response = await bc_services.sendRequest(
        req.body.server,
        req.body.owner,
        req.body.account,
        req.body.private_key
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async respRequest(req, res) {
    try {
      const response = await bc_services.respRequest(
        req.body.server,
        req.body.owner,
        req.body.account,
        req.body.rsa_private,
        req.body.accept,
        req.body.pkey
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async getRequests(req, res) {
    try {
      const response = await bc_services.getRequests(
        req.body.server,
        req.body.owner
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async removeContact(req, res) {
    try {
      const response = await bc_services.removeContact(
        req.body.server,
        req.body.owner,
        req.body.account,
        req.body.pkey
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async getProfile(req, res) {
    try {
      const response = await bc_services.getProfile(
        req.body.server,
        req.body.owner
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async sendMessage(req, res) {
    try {
      const response = await bc_services.sendMessage(
        req.body.server,
        req.body.owner,
        req.body.account,
        req.body.message,
        req.body.pkey
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async getMessages(req, res) {
    try {
      const response = await bc_services.getMessages(
        req.body.server,
        req.body.owner
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async getMessagesFrom(req, res) {
    try {
      const response = await bc_services.getMessagesFrom(
        req.body.server,
        req.body.owner,
        req.body.from
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async getSymetricKey(req, res) {
    try {
      const response = await bc_services.getSymetricKey(
        req.body.server,
        req.body.owner,
        req.body.from,
        req.body.rsa_private
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  encryptMessage(req, res) {
    try {
      const response = bc_services.encryptMessage(
        req.body.key,
        req.body.message
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  decryptMessage(req, res) {
    try {
      const response = bc_services.decryptMessage(
        req.body.key,
        req.body.message
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
  async getMessageHistory(req, res) {
    try {
      const response = await bc_services.getMessageHistory(
        req.body.server,
        req.body.owner,
        req.body.from,
        req.body.rsa_private
      );
      res.send(response);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" });
    }
  },
};
module.exports = Controller;
