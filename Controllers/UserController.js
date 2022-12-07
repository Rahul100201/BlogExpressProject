const UserModel= require('../models/User')
const bcrypt = require("bcrypt")
const CheckUserAuth= require('../middleware/auth')
const jwt = require('jsonwebtoken');

class UserController{
    static Adminregister=async(req,res)=>{
        res.render('admin/register',{message:req.flash('error')})
    }
    static Register=async(req,res)=>{   
        // console.log(req.body)
        
            const{name,email,password,confirmpassword}=req.body;
            const admin= await UserModel.findOne({email:email})
            if(admin){
                req.flash('error','Email already exists !!!')
                return res.redirect('/admin/register')
            }else{
                if(name && email && password && confirmpassword){
                    if(password==confirmpassword){
                        try{
                            const hashpassword= await bcrypt.hash(password,10)
                            const result = await UserModel({
                                name:name,
                                email:email,
                                password:hashpassword
                            })
                            await result.save()
                            req.flash('success','Register Successful,Please Login !!!')
                            return res.redirect('/login')
                        }catch(err){
                            console.log(err)
                        }
                    }else{
                        req.flash('error','Password and confirm password does not match !!!')
                        return res.redirect('/admin/register')
                    }

                }else{
                    req.flash('error','All fields are require !!!')
                    return res.redirect('/admin/register')
                }
            }

     
    }
    static Verifylogin=async(req,res)=>{
        try{
            const{email,password}=req.body;
            // console.log(password)
            if(email && password){
                const user = await UserModel.findOne({email:email})
                // console.log(user.password)
                if(user!=null){
                    const isMatched= await bcrypt.compare(password,user.password)
                    if((user.email===email)&& isMatched){
                        //verify token
                        const token = jwt.sign({ userId: user._id }, 'rahul1234');
                        // console.log(token)
                        res.cookie('token',token)
                        res.redirect('/admin/dashboard')
                    }else{
                        req.flash('error','Email & Password in invalid !!')
                        return res.redirect('/login')
                    }
                }else{
                    req.flash('error','You are registered user !!')
                    return res.redirect('/login')
                }
            }else{
                req.flash('error','All Fields Required !!')
                return res.redirect('/login')
            }
        }catch(err){
            console.log(err)
        }
    }
    
    static Logout = async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=UserController