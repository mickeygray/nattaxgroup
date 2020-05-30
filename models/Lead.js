const mongoose = require("mongoose");
const { Schema } = mongoose;

const leadSchema = new Schema({
  email: String,
  name: String,
  amount: String,
  plaintiff: String,
  lexid: String,
  contacts: { type: Number, default: 0 },
  converted: { type: Boolean, default: false },
});

mongoose.model("leads", leadSchema);
