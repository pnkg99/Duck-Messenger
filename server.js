const express = require("express");
require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🦆 🦆 🦆 ${PORT}`);
});
