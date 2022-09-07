const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/aquastar?directConnection=true&tls=false&readPreference=primary";
const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports=connectToMongo;