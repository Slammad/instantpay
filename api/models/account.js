const mongoose=require('mongoose');

const accountSchema=mongoose.Schema({
    userid:String,
    tell:[],
    btcaddr:[String],
    BVN:Number,
    creditcards:[{
         bankname:{type:String,required:true},
         cardtype:{type:String,required:true},
         cardno:{type:Number,required:true},
         cardcvv:{type:Number,required:true},
       
     }],
     walletballance:Number,
     contacts:[{
        userid:{type:String,required:true},
        fullname:String,
        accountno:Number,
        bankname:String,
        email:String,
        Tell:[]
     }],
     transactions:[{
         userid:{type:String, required:true},
         servicetype:String,
         approved:Boolean,
         destcontact:Number,
     }],
     

})

module.exports=mongoose.model('Account',accountSchema);