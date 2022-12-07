const mongoose=require('mongoose')


const AboutSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    }

},{timestamps:true})


const AboutModel=mongoose.model('about',AboutSchema)
module.exports=AboutModel