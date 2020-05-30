const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailSchema = new Schema({
  html: String,
  text: String,
  subject: String,
  bcc: [],
  from: String,
  clicks: { type: Number, default: 0 },
  unsubscribes: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model("emails", emailSchema);
