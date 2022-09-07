const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({
  oid:{
    type:String,
    required:true
  },
  uid: {
    type: String,
    ref: "user",
    required: true,
  },
  pid: {
    type: String,
    ref: "stock",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:"Reviewing"
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", OrderSchema);
