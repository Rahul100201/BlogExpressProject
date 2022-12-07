const express= require('express')
const router= express.Router()
const CheckUserAuth= require('../middleware/auth')

const AdminController = require('../Controllers/admin/AdminController')
const FrontendController = require('../Controllers/FrontendController')
const CategoryController = require('../Controllers/admin/CategoryController')
const UserController = require('../Controllers/UserController')


//frontend routing

router.get('/',FrontendController.Home)
router.get('/about',FrontendController.About)
router.get('/contact',FrontendController.Contact)
router.get('/blogdetail/:id',FrontendController.Blogdetail)
router.get('/bloglist',FrontendController.Bloglist)
router.get('/login',FrontendController.Login)


//admin/dashboard routing

router.get('/admin/dashboard',CheckUserAuth,AdminController.Dasboard)
router.get('/admin/blogs',CheckUserAuth,AdminController.Blogs)
router.get('/admin/addblogs',CheckUserAuth,AdminController.Addblogs)
router.post('/admin/insert_blog',CheckUserAuth,AdminController.Insertblog)
router.get('/admin/blog_view/:id',CheckUserAuth,AdminController.Blogview)
router.get('/admin/blog_edit/:id',CheckUserAuth,AdminController.Blogedit)
router.post('/admin/updateblog/:id',CheckUserAuth,AdminController.Updateblog)
router.get('/admin/blog_delete/:id',CheckUserAuth,AdminController.Blogdelete)
router.get('/admin/about_content',CheckUserAuth,AdminController.About)
router.get('/admin/addaboutcontent',CheckUserAuth,AdminController.Addaboutcontent)
router.post('/admin/insert_aboutcontent',CheckUserAuth,AdminController.Insertabout)
router.get('/admin/view_content/:id',CheckUserAuth,AdminController.Viewcontent)


//admin/categorycontroller

router.get('/admin/category',CheckUserAuth,CategoryController.CategoryDisplay)
router.get('/admin/createcategory',CheckUserAuth,CategoryController.CreateCategory)
router.post('/admin/categoryinsert',CheckUserAuth,CategoryController.CategoryInsert)
router.get('/admin/category_view/:id',CheckUserAuth,CategoryController.Categoryview)
router.get('/admin/category_edit/:id',CheckUserAuth,CategoryController.Categoryedit)
router.post('/admin/categoryupdate/:id',CheckUserAuth,CategoryController.Categoryupdate)
router.get('/admin/category_delete/:id',CheckUserAuth,CategoryController.Categorydelete)


//usercontroller
router.get('/admin/register',UserController.Adminregister)
router.post('/register',UserController.Register)
router.post('/verify_login',UserController.Verifylogin)
router.get('/logout',UserController.Logout)




























module.exports=router