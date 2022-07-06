require("dotenv").config({ path: "./.env" });
const express = require("express");
const { Database } = require("./config/database");
const { productLangService } = require("./services/product-lang");
const app = express();
const port = 8080; // default port to listen

// const database = await Database("dev");

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/product", (req, res) => {
  productLangService();

  res.send("sdf");
});

// Server sent events
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream"); // this is mandatory
  res.write("data: " + "Hello!\n\n"); // has to be write res.write, with 'data: ', and have to add two \n
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
