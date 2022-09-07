const mongoose = require("mongoose");
const { Schema } = mongoose;
const Outservice_payment_Schema = new Schema({
  ser_pay_id:{
    type:String,
    required:true
  },
  outsid: {
    type: String,
    ref: "outservice",
    required: true,
  },
  status: {
    type: String,
    default:"done",
    required: true,
   
  },
  mode: {
    type: String,
    required: true,
   },
  
});

module.exports = mongoose.model("outservice_pay", Outservice_payment_Schema);
