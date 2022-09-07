const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubscriptionSchema = new Schema({
  subid:{
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
  model_no: {
    type: String,
    required: true,
  },
  company:{
    type: String,
    required: true,
  },
  subscription_fees: {
    type: Number,
    required: true
  },

  address: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  next_date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  service_no: {
    type: Number,
    required: true,
    default:0
  },
});

module.exports = mongoose.model("subscription", SubscriptionSchema);
