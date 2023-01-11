require("dotenv").config();
console.log(process.env.PORT);
const http = require("http");
const PORT = 4000 || process.env.PORT;
const server = http.createServer();
server.listen(PORT, () => {
  console.log("server is ready!");
});
