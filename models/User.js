const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        Requiured:true
    },
    email:{
        type:String,
        Requiured:true
    },
    password:{
            type:String,
            require:true
    }
},{timestamps:true})

const UserModel=mongoose.model('user',UserSchema)

module.exports=UserModel 







