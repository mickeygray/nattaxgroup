const mongoose = require("mongoose");
const { Schema } = mongoose;

const leadSchema = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  county: String,
  type: String,
  amount: String,
  email: String,
  lienDate: Date,
  dmDate: Date,
  lexId: String,
  plaintiff: String,
  highdollar: { type: Boolean, default: false },
  upsellable: { type: Boolean, default: false },
  contacts: { type: Number, default: 0 },
  converted: { type: Boolean, default: false },
  dnc: { type: Boolean, default: false },
});

module.exports = mongoose.model("lead", leadSchema);
