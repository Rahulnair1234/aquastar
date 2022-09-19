const mongoose = require('mongoose');

const {Schema}=mongoose;
const UserSchema = new Schema({
    uid:{
        type:String,
        required:true
    },
   name:{
        type:String,
        required:true       
   },
   email:{
    type:String,
    required:true,
    unique:true
    },
    mobile:{
        type:String,
        required:true,
        },
    password:{
        type:String,
        required:true
    },
    privileges:{
        type:Boolean,
        required:true,
        default:false
    },
    
  });

  module.exports=mongoose.model('user',UserSchema);
  