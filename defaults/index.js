module.exports={
    apiResponse:{
        status:400,
        message:"",
        body:{}
    },
    dataResponse:{
        recordCount:0,
        pageCount:0,
        pageNumber:0,
        data:{}
    },
    userMessages:{
        REGISTERED:"Enter OTP",
        OTP_VERIFIED:"OTP Verified",
        PERSONAL_INFO_UPDATED:"Personal info updated",
        USER_INFO:"User info retrieved",
        HANDLE_UPDATE:"User Handle updated",
        LIST:"Listing users",
    },
    walletMessages:{
        BALANCE:"Balance Amount retrieved",
        TRANSFER:"Amount transferred",
        TRANSFER_FEE:"Fee credited ( less commission )",
        REVERSE:"Amount reversed",
        REVERSE_FEE:"Fee reversed ( including commission )",
        LIST:"Transactions list returned",
    },
    categoryMessages:{
        INFO:"Category details retrieved",
        LIST:"Categories list returned",
    },
    apiMessages:{
        ACCESS_DENIED:"Access denied!\nThis incident is being reported.",
        INVALID_TOKEN:"Invalid authentication token"
    }
}