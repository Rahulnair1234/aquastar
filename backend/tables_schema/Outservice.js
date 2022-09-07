const mongoose = require("mongoose");
const { Schema } = mongoose;
const OutserviceSchema = new Schema({
  outsid:{
    type:String,
    required:true
  },
  uid: {
    type: String,
    ref: "user",
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  model_no: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  service_charge: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "ticket generated",
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("outservice", OutserviceSchema);
