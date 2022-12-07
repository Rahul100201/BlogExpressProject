const UserModel = require('../../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")


class UsersController{
    static Register=async(req,res)=>{   
        // console.log(req.body)
        
            const{name,email,password,confirmpassword}=req.body;
            const user= await UserModel.findOne({email:email})
            if(user){
                res.send({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
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
                            res.send({ status: "201", message: "Registration succesfully" }); 
                        }catch(err){
                            console.log(err)
                        }
                    }else{
                        res.send({ status: "failed", message: "Password confirm password are not same 😓" }); 
                    }

                }else{
                    res.send({ status: "failed", message: "All fields are required 😓" }); 
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
                        res.send({ status: "success", message: "login successfully with web token 😃🍻", "Token": token });
                        //res.redirect('/admin/dashboard')
                    }else{
                        res.send({ status: "failed", message: "Email & Password is not valid" });
                    }
                }else{
                    res.send({ status: "failed", message: "You are not register user" });
                }
            }else{
                res.send({ status: "failed", message: "All field are required" });
            }
        }catch(err){
            console.log(err)
        }
    }
    static Logout = async(req,res)=>{
        try{
            res.clearCookie('token')
            res.send({ status: "success", message: "logout successfully with web token 😃🍻"});
            
        }catch(err){
            console.log(err)
        }
    }

}

module.exports=UsersController