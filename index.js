require("dotenv").config({ path: "./.env" });
const express = require("express");
const { createServer } = require("http");
// const { Server } = require("socket.io");
const cors = require("cors");

// const { Database } = require("./config/database");
// const { db } = require("./models/index.js");
// const { getSearchEvents } = require("./services/events.js");
const { commonObject } = require("./services/test.js");
// const { productLangService } = require("./services/product-lang");
const port = 8080; // default port to listen
// const database = await Database("dev");

const app = express();

let allowedOrigins = ["http://localhost:3000", "http://localhost:4001"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });
// const httpServer = createServer(app);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/product", (req, res) => {
  // productLangService();

  res.send("sdf");
});

// app.get("/events", async (req, res) => {
//   await getSearchEvents();
//   res.send("o");
// });

// Server sent events
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream"); // this is mandatory
  res.write("data: " + "Hello!\n\n"); // has to be write res.write, with 'data: ', and have to add two \n
});

app.get("/rest", (req, res) => {
  // console.log(commonObject);
  // commonObject.a += 10;
  // console.log(commonObject);
  const result = {
    status: 200,
    message: "sad",
  };
  res.send(result);
});

app.post("/register", (req, res) => {});

app.get("/mobile", (req, res) => {
  console.log(req.query);
  const result = {
    name: "bitch",
    email: "bitch@ass.com",
  };
  res.send(result);
});

/**
 * Express server start
 */
const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

/**
 * Socket connection
 */
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
    console.log("typing");
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log(newMessageRecieved);
    // var chat = newMessageRecieved.chat;

    // if (!chat.users) return console.log("chat.users not defined");

    // chat.users.forEach((user) => {
    //   if (user._id == newMessageRecieved.sender._id) return;

    //   socket.in(user._id).emit("message recieved", newMessageRecieved);
    // });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// httpServer.listen(port);
