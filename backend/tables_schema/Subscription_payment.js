const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subscription_payment_Schema = new Schema({
  sub_pay_id:{
    type:String,
    required:true
  },
  subid: {
    type: String,
    ref: "subscription",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:"done"
  },
  mode: {
    type: String,
    required: true,
   },
   date: {
    type: Date,
    default: Date.now,
    required: true,
  }
  
});

module.exports = mongoose.model("subscription_pay", Subscription_payment_Schema);
