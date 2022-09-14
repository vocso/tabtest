const Category=require("../database/models/categoryModel");
const { otpValidation}=require("../helpers/validation");
const dotEnv=require("dotenv").config();
const mongoose=require("mongoose");


module.exports.getCategory =async (_id)=>{
     
     try{
        // retrieve user data
        let category=await Category.find(new mongoose.Types.ObjectId(_id));
       
        if(!user)
           throw new Error("Category not found");
       
       console.log("Category Info found");
  
       return await category;
       
    }
    catch(error){
        console.log("Error / Category Service / ");
        throw new Error(error);
    }
   
}


module.exports.list =async ({order=0,keyword=""})=>{
     
    let where={}

        where={
            $and:[
                    {order:{$gt:order}}, 
                    {
                        $or:[
                                {category:  new RegExp(keyword,"i")},
                                {text:  new RegExp(keyword,"i")}
                            ]
                    },
                    {active:true}
            ]
        };

    try{
        // list categories
        let categories=await Category.find(
                where
            ).sort({ order: 'asc'}).limit(process.env.PAGE_SIZE);
      
       if(!categories)
          throw new Error(" Category not found");
      
      console.log("Listing categories...");
 
      return await categories;
      
   }
   catch(error){
       console.log("Error / Category Service / ");
       throw new Error(error);
   }
  
}
