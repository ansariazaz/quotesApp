const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const quotesSchema = new mongoose.Schema({
    quotes:{
        type:String,
        required:true
    },
    quotesBy:{
       type:ObjectId,
       ref:"User"
    }
})


module.exports = mongoose.model('Quotes',quotesSchema)