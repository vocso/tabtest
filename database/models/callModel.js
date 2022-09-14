const mongoose=require("mongoose");

const callsSchema=new mongoose.Schema({
    from_user:{type:ObjectId,required},
    to_user:{type:ObjectId,required},
    type:{enum:["Audio","Video"],default:"Audio"},
    duration:{type:Double,default:0},
    status:{enum:["Initiated","Answered","Rejected","Unanswered","Complete"],default:"Initiated"},
    deleted:{type:Boolean, default:0},
},
{
    timestamps:true
});

module.exports =mongoose.model("Call",callSchema);