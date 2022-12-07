const mongoose = require('mongoose')
const url = 'mongodb+srv://Adonis:Rahulsoni1234@cluster0.qi3col2.mongodb.net/blog_project?retryWrites=true&w=majority'
const connectDB = ()=>{
    //return mongoose.connect('mongodb://localhost:27017/blog_project')
    return mongoose.connect(url)
    .then(()=>[
        console.log('connection succefull')
    ]).catch((err)=>{
        console.log(err)
    })
}


module.exports=connectDB




