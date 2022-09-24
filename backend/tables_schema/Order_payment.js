const mongoose = require("mongoose");
const { Schema } = mongoose;
const Order_payment_Schema = new Schema({
  o_pay_id:{
    type:String,
    required :true
  },
  oid: {
    type: String,
    ref: "order",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "processing",
  },
  mode: {
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model("order_pay", Order_payment_Schema);
