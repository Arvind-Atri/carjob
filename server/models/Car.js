const mongoose=require("mongoose");



const carSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    title:{
        type:String,
        required:true,
    },
    
    images:[{
        type:String,
    }],
    description:{
        type:String,
        required:true,
    },
    tags:[{
        type:String
    }]


})

module.exports=mongoose.model("Car",carSchema);