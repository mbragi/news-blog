const http = require("http");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = 4000 || process.env.PORT;
console.log(PORT);
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server is ready! PORT::::${PORT}`);
});
