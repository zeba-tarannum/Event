const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    match: /^\+\d{1,3}\d{9,10}$/,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  },
  idProof: { type: String, required: true },
  regType: { type: String, required: true },
  tickets: { type: Number, required: true },
  date: { type: Date }
});

module.exports = mongoose.model("Event", eventSchema);
