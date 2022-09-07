const mongoose = require('mongoose');
const {Schema}=mongoose;
const StockSchema = new Schema({
    pid:{
        type:String,
        required:true
    },
   product_name:{
        type:String,
        required:true       
   },
   model_no:{
    type:String,
    required:true,
    unique:true
    },
    company:{
        type: String,
        required: true,
      },
    quantity:{
        type:Number,
        required:true,
        },
    selling_price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    
  });

  module.exports=mongoose.model('stock',StockSchema);
  