const BlogModel=require('../models/Blog')
const CategoryModel = require('../models/Category')
const AboutModel=require('../models/About')
const UserModel = require('../models/User')

class FrontendController{
    static Home=async(req,res)=>{
        try{
            //const blog_data=await BlogModel.find()
            const recent_blog = await BlogModel.find().sort({_id:-1}).limit(3)
            // console.log(blog_data)
            res.render('front/home',{d:recent_blog})
        }catch(err){
            console.log(err)
        }
    }
    static About=async(req,res)=>{
        try{
            const data= await AboutModel.find()
             //console.log(data)
            res.render('front/about',{d:data})
        }catch(err){
            console.log(err)
        }
      
    }
    static Contact=async(req,res)=>{
        try{
            res.render('front/contact')
      }catch(err){
          console.log(err)
      }
    }
    static Blogdetail=async(req,res)=>{
        try{
            const blog_detail = await BlogModel.findById(req.params.id);
            const recent_blog = await BlogModel.find().sort({_id:-1}).limit(6)
            const category= await CategoryModel.find()
            // console.log(category)
            res.render('front/blogdetail',{d:blog_detail,c:category,r:recent_blog})
        }catch(err){
            console.log(err)
            
        }
    }
    static Bloglist=async(req,res)=>{
        try{
            const recent_blog = await BlogModel.find()
            res.render('front/bloglist',{d:recent_blog})
        }catch(err){
           console.log(err) 
        }
        
    }
    static Login=async(req,res)=>{
        try{
            res.render('front/login',{message:req.flash('success'),error:req.flash('error')})
        }catch(err){
           console.log(err) 
        }
    }
    

}


module.exports=FrontendController