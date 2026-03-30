const http = require("http");
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://mongo:27017/testdb";

async function connectWithRetry() {
  while (true) {
    try {
      await mongoose.connect(MONGO_URL);
      console.log("Connected to MongoDB");
      break;
    } catch (err) {
      console.log("MongoDB not ready, retrying...");
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}

connectWithRetry();

const server = http.createServer((req, res) => {
  res.end("App + MongoDB running");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
