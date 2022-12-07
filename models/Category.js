const mongoose=require('mongoose')


const CategorySchema=new mongoose.Schema({
    title:{
        type:String,
        Requiured:true
    },
    description:{
        type:String,
        Requiured:true
    },
    name:{
        type:String,
        Requiured:true
    },
    email:{
        type:String,
        Requiured:true
    }
    
})

const CategoryModel=mongoose.model('category',CategorySchema)

module.exports=CategoryModel 







