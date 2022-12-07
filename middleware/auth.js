const  jwt = require('jsonwebtoken');
const Usermodel=require('../models/User')

const CheckUserAuth = async(req,res,next)=>{
    const{token}=req.cookies;
    if(!token){
        req.flash('error','Unauthorize user please register !!!')
        return res.redirect('/login')
    }else{
        const verify_token=jwt.verify(token,'rahul1234')
        //console.log(verify_token)
        const data= await Usermodel.findOne({_id:verify_token.userId})
        // console.log(data)
        req.data1=data;

        next()
    }
    // console.log('not authrized')
}
module.exports=CheckUserAuth