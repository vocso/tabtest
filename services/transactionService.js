const User=require("../database/models/userModel");
const Wallet=require("../database/models/walletModel");
const Transaction=require("../database/models/transactionModel");
const {transferValidation}=require("../helpers/validation");

const {getWallet,updateWallet}=require("../services/walletService");


const mongoose=require("mongoose");




const transfer =async (serviceData)=>{
    
        // validate transaction data
        const {error}=transferValidation(serviceData);
        if (error) 
            throw new Error(error);
        
        try{
        // add transaction
        let transaction=await new Transaction({...serviceData});
       transaction.save();
       if(!transaction)
           throw new Error("Error performing transaction");
       
       // update wallet balance - sender
       let wallet1=await  updateWallet(serviceData.from_wallet,-serviceData.amount)
       console.log("wallet 1 ", wallet1)

       console.log("---------servicedata",serviceData)
       // update wallet balance - receiver
       let wallet2=await  updateWallet(serviceData.to_wallet,serviceData.amount)
       console.log("wallet 2 ", wallet2)

       console.log("Debit successful",transaction);
  
       return await transaction;
       
    }
    catch(error){
        console.log("Error / Transaction Service / ");
        throw new Error(error);
    }
   
}



const transferFee =async (serviceData)=>{
    
    // from_wallet - caller
    // to_wallet - professional
    // system_wallet - admin's wallet for commissions

    // transfer from_wallet to to_wallet
    let transaction1=transfer(serviceData);

    let commission_amount=serviceData.amount*process.env.CALL_FEE_RATE/100;
     
    // transfer to_wallet to system_wallet
    let transaction2=transfer({
        ...serviceData,
        from_wallet:serviceData.to_wallet,
        to_wallet:process.env.SYSTEM_WALLET_ID,
        type:"commission",
        amount:commission_amount
    });
   
   return await transaction1;
  
}


module.exports.listTransactions =async (req)=>{

    const {createdAt=new Date()}=req.query;
    const wallet=await getWallet(req);

    console.log("wallet found",wallet);
    
     
    let where={}

        where={
            $and:[
                    {createdAt:{$lt:new Date(createdAt)}} ,
                    {
                        $or:[
                                {from_wallet:  wallet._id},
                                {to_wallet:  wallet._id},
                            ]
                    },
                    {active:true}
            ]
        };

    try{
        // list transactions
        let transactions=await Transaction.find(
                where
            ).sort({ createdAt: 'desc'}).limit(process.env.PAGE_SIZE);
      
       if(!transactions)
          throw new Error(" No transactions");
      
      console.log("Listing transactions...");
 
      return await transactions;
      
   }
   catch(error){
       console.log("Error / Transaction Listing Service / ");
       throw new Error(error);
   }
  
}



module.exports.transfer=transfer;
module.exports.transferFee=transferFee;



