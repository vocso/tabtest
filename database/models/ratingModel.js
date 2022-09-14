const mongoose=require("mongoose");

const ratingSchema=new mongoose.Schema({
    from:{type:ObjectId,required},
    to:{type:ObjectId,required},
    call_id:ObjectId,
    stars:{type:Number,required},
    text:String,
    active:{type:Boolean,default:false},

     
     
},
{
    timestamps:true
});

module.exports =mongoose.model("Rating",ratingSchema);