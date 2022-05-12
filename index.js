require("dotenv").config();
const dbConnect = require("./db");
const app = require("./server.js");


const PORT = process.env.PORT || 3000;

dbConnect().then(
  async () => {
    const server = await app.listen(PORT, () => {
      console.log("Connection successfully established in port : ",PORT);
    });
  },
  (err) => {
    console.log("Connection error: " + err);
  }
);