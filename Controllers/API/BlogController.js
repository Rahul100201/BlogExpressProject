const cloudinary = require('cloudinary').v2;
const BlogModel = require('../../models/Blog')


cloudinary.config({
    cloud_name: 'dhj8i6xfg',
    api_key: '634313662983133',
    api_secret: 's84ZGZvHSlrc-nMCrmWikncJY_U',
    secure: false
});

class BlogController {
    static Blogs = async (req, res) => {
        try {
            const blogs = await BlogModel.find()
            res.status(200).json({
                success: true,
                blogs
            })

        } catch (err) {
            console.log(err)
        }
    }
    static Insertblog = async (req, res) => {
        // console.log(req.body)
        //console.log(req.files)
        const imagefile = req.files.image
        // console.log(imagefile)
        const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder: 'blog_image',
            width: 400,

        })
        try {
            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }
            })
            await result.save()
            res
                .status(201)
                .send({
                    status: "success",
                    message: "Registration Successfully 😃🍻",
                    Image: image_upload.secure_url,
                });
        } catch (err) {
            console.log(err)
        }


    }
    static ViewBlogs = async (req, res) => {
        try {
            const viewblogs = await BlogModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                viewblogs
            })

        } catch (err) {
            console.log(err)
        }
    }
    static UpdateBlog = async (req,res)=>{
        try {
            const data =  await BlogModel.findById(req.params.id);
            const image_id=data.image.public_id;
            //console.log(image_id)
            await cloudinary.uploader.destroy(image_id)  //delete image code
            const imagefile = req.files.image
            const image_upload=await cloudinary.uploader.upload(imagefile.tempFilePath,{
                folder:'blog_image',    
                width:400,
    
            });
            const update = await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:image_upload.public_id,
                    url:image_upload.secure_url
                }
            });
            await update.save()
            res
                .status(201)
                .send({
                    status: "success",
                    message: "Update Successfully 😃🍻",
                    Image: image_upload.secure_url,
                });
        } catch (err) {
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
            res.status(204).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = BlogController