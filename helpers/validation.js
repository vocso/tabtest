const Joi=require("@hapi/joi");

//Register Mobile Validation
const registerMobileValidation=data=>{
    const schema=Joi.object({
        mobile:Joi.string().length(10).pattern(/^[0-9]+$/).required()
    });
    return schema.validate(data);
};
//OTP Validation
const otpValidation=data=>{

    const schema=Joi.object({
        _id:Joi.string().max(100).pattern(/^[a-z0-9]+$/).required(),
        otp:Joi.string().length(6).pattern(/^[0-9]+$/).required()
    });
    return schema.validate(data);
};

//Personal Info Validation
const personalInfoValidation=data=>{

    const schema=Joi.object({
        fname:Joi.string().min(3).max(25).required(),
        lname:Joi.string().min(2).max(25).required(),
//        handle:Joi.string().min(3).max(25).pattern(/^[a-z0-9]+$/).required(),
        email:Joi.string().email(),
        
    });
    return schema.validate(data);
};



//User handle validation
const handleValidation=data=>{

    const schema=Joi.object({
        handle:Joi.string().min(3).max(25).pattern(/^[a-z0-9\-]+$/).required(),
        
    });
    return schema.validate(data);
};




// Wallet/Transfer Validation
const transferValidation=data=>{

    const schema=Joi.object({
        from_wallet:Joi.required(),
        to_wallet:Joi.required(),
        amount:Joi.number().min(1).required(),
        notes:Joi.string(),
        call_id:Joi.string(),
        type:Joi.string(),
        
    });
    return schema.validate(data);
};




module.exports.registerMobileValidation=registerMobileValidation;
module.exports.otpValidation=otpValidation;
module.exports.personalInfoValidation=personalInfoValidation;
module.exports.handleValidation=handleValidation;

module.exports.transferValidation=transferValidation;