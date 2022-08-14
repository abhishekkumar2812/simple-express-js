// const mongoose = require("mongoose");
// const { mongoDb } = require("../config/mongo");
// const { mongoose } = require("../config/mongo");
const { default: mongoose } = require("mongoose");
// const monk = require("monk");

require("dotenv").config();

const uri =
  process.env.MONGO_URI ||
  "mongodb://ec2-13-233-77-156.ap-south-1.compute.amazonaws.com:27017/driffle_prod_events";

mongoose.connect(uri);

mongoose.connection;

const EventV2Schema = new mongoose.Schema({
  clientData: {
    type: Object,
    required: true,
  },
  actionData: {
    type: Object,
    required: true,
  },
  impactedNodeData: {
    type: Object,
    required: true,
  },
});

const EventModel = mongoose.model("events-v2", EventV2Schema);

// const ev = new EventModel({
//   clientData: {
//     one: "1",
//   },
// });

// ev.save();

module.exports = { EventModel };
