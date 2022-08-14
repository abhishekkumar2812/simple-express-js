const { default: mongoose } = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";

mongoose.connect(uri);

mongoose.connection;

// module.exports = { mongoose };
