const cloudinary = require('cloudinary').v2;
const BlogModel=require('../../models/Blog')
const AboutModel = require('../../models/About');

cloudinary.config({ 
    cloud_name: 'dhj8i6xfg', 
    api_key: '634313662983133', 
    api_secret: 's84ZGZvHSlrc-nMCrmWikncJY_U',
    secure: false
  });

  
class AdminController{

    static Dasboard=async(req,res)=>{
        try{
            const{name,email}= req.data1
            res.render('admin/dashboard',{n:name,e:email})
        }catch(err){
           console.log(err) 
        }
    }
    static Blogs=async(req,res)=>{
        try{
            const data=await BlogModel.find()
            //console.log(data);
            res.render('admin/blog/blogdisplay',{d:data})
        }catch(err){
            console.log(err)
        }      
    }


    static Addblogs=async(req,res)=>{
        try{
             res.render('admin/blog/addblogs')
        }catch(err){
            console.log(err)
        }
    }
    static Insertblog=async(req,res)=>{
        // console.log(req.body)
        //console.log(req.files)
        const imagefile= req.files.blog_image
        // console.log(imagefile)
        const image_upload=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'blog_image',
            width:400,

        })
        try{
            const result=new BlogModel({
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:image_upload.public_id,
                    url:image_upload.secure_url
                }
            })
            await result.save()
            res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
    }
    static Blogview=async(req,res)=>{
        try{
        const data = await BlogModel.findById(req.params.id)
        //console.log(req.params.id)
        //console.log(data)
        res.render('admin/blog/blogview',{viewdata:data})
        }catch(err){
            console.log(err)

        }
    }
    static Blogedit=async(req,res)=>{
        try{
        const data = await BlogModel.findById(req.params.id)
        //console.log(req.params.id)
        res.render('admin/blog/blogedit',{edata:data})
        }catch(err){
            console.log(err)

        }
    }
    static Updateblog=async(req,res)=>{
    //   console.log(req.body)
    //   console.log(req.params.id)
    try{
        const user= await BlogModel.findById(req.params.id)
        const image_id= user.image.public_id;
        // console.log(image_id)
        await cloudinary.uploader.destroy(image_id)
        const imagefile = req.files.blog_image


        const image_upload=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'blog_image',    
            width:400,
        })
            const data = await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:image_upload.public_id,
                    url:image_upload.secure_url
                }
            })
            await data.save()
            res.redirect('/admin/blogs')
    }catch(err){
        console.log(err)
    }
    }
    static Blogdelete=async(req,res)=>{
        try{
            const user= await BlogModel.findById(req.params.id)
            const image_id= user.image.public_id;
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id)


            const data = await BlogModel.findByIdAndDelete(req.params.id,{
            })
            await data.delete()
            res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
    }
    static About=async(req,res)=>{
        try{
            const data = await AboutModel.find()
            res.render('admin/aboutcontent',{d:data})
        }catch(err){
            console.log(err)
        }
    }

    static Addaboutcontent=async(req,res)=>{
        try{
            res.render('admin/addaboutcontent')
       }catch(err){
           console.log(err)
       }    
    }
    static Insertabout=async(req,res)=>{
        //console.log(req.body)
        try{
            const data= new AboutModel({
                title:req.body.title,
                content:req.body.content
                
            })
            await data.save()
            res.redirect('/admin/about_content')
        }catch(err){
            console.log(err)                        
        }
    }
    static Viewcontent=async(req,res)=>{
        try{
            const data = await AboutModel.findById(req.params.id)
            // console.log(req.params.id)
            // console.log(data)
            res.render('admin/view_content',{viewdata:data})

        }catch(err){
            console.log(err)
        }
      
    }

}

module.exports=AdminController