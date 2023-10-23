const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"itmustbe present"] 
},
price:{
    type:Number,
    
},
feature:{
    type:Boolean,
    default:false
},
rating:{
    type:Number,
    default:2
},
createdAt:{
    type:Date,
    default: Date.now() 
},
company:{
    type: String,
    enum:{
        values:['ikea','caressa','marcos','liddy'],
        message:'{values} is not supported',
},
}
})
module.exports =mongoose.model('Product',ProductSchema)