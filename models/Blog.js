const mongoose=require('mongoose')


const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        Requiured:true
    },
    description:{
        type:String,
        Requiured:true
    },
    image:{
        public_id: {
            type:String,
            require:true

        },
        url:{
            type:String,
            require:true    
        }


        
    }
},{timestamps:true})

const BlogModel=mongoose.model('blog',BlogSchema)

module.exports=BlogModel 







