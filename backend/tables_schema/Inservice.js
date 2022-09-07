const mongoose = require("mongoose");
const { Schema } = mongoose;
const InserviceSchema = new Schema({
  insid:{
    type: String,
    required: true,
  },
  subid: {
    type: String,
    ref: "subscription",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:"processing"
  },
  description: {
    type: String,
    default:" "
   },  
});

module.exports = mongoose.model("inservice", InserviceSchema);
