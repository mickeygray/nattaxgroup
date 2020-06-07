const mongoose = require("mongoose");
const { Schema } = mongoose;

const campaignSchema = new Schema({
  title: String,
  html: String,
  text: String,
  subject: String,
  from: String,
  campaignName: String,
  to: [String],
  vars: [],
});

module.exports = mongoose.model("campaign", campaignSchema);
