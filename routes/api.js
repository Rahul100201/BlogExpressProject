const express= require('express');
const BlogController = require('../Controllers/API/BlogController');
const UsersController = require('../Controllers/API/UsersController');
const router= express.Router()




router.get('/blogs',BlogController.Blogs)
router.post('/blog_insert',BlogController.Insertblog)
router.get('/viewblog/:id',BlogController.ViewBlogs)
router.post('/updateblog/:id',BlogController.UpdateBlog)
router.delete('/deleteblog/:id',BlogController.Blogdelete)




//user apirouting
router.post('/register',UsersController.Register)
router.post('/verifylogin',UsersController.Verifylogin)
router.get('/logout',UsersController.Logout)
module.exports=router;