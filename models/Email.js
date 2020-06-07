const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailSchema = new Schema({
  reactstring: String,
  title: String,
  html: String,
  text: String,
  subject: String,
  from: String,
  clicks: { type: Number, default: 0 },
  unsubscribes: { type: Number, default: 0 },
  campaignName: String,
  key: String,
});

module.exports = mongoose.model("email", emailSchema);
