const http = require("http");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { mongoConnect } = require("./server/services/db");
const feedbackController = require("./server/controller/feedback.controller");
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;
console.log(PORT);
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("combined"));
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});
app.post("/feedback", feedbackController.httpCreateFeedBack);
const server = http.createServer(app);
server.listen(PORT, async () => {
  await mongoConnect();
  console.log(`server is ready! PORT::::${PORT}`);
});
