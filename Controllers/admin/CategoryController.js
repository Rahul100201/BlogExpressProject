const CategoryModel = require('../../models/Category')

class CategoryController {
    static CategoryDisplay = async (req, res) => {
        try {
            const data = await CategoryModel.find()
            res.render('admin/category/categorydisplay', { d: data })
        } catch (err) {
            console.log(err)
        }
    }
    static CreateCategory = async (req, res) => {
        try {
            res.render('admin/category/createcategory')
        } catch (err) {
            console.log(err)
        }
    }
    static CategoryInsert = async (req, res) => {
        //console.log(req.body);
        try {
            const result = new CategoryModel({
                title: req.body.title,
                description: req.body.description,
                name: req.body.name,
                email: req.body.email
            })
            await result.save()
            res.redirect('/admin/category')
        } catch (err) {

        }
    }
    static Categoryview = async (req, res) => {
        try {
            const data = await CategoryModel.findById(req.params.id)
            res.render('admin/category/category_view', { viewcategory: data })
        } catch (err) {
            console.log(err)
        }
    }
    static Categoryedit = async (req,   res) => {
        try {
            const data = await CategoryModel.findById(req.params.id)
            res.render('admin/category/categoryedit', { edata: data })
        } catch (err) {
            consople.log(err)
        }

    }
    static Categoryupdate = async (req, res) => {
        //   console.log(req.body)
        //   console.log(req.params.id)
        try {
            const data = await CategoryModel.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                name: req.body.name,
                email: req.body.email
            })
            await data.save()
            res.redirect('/admin/category')

        } catch (err) {
            console.log(err)
        }

    }

    static Categorydelete = async (req, res) => {
        try {
            const data = await CategoryModel.findByIdAndDelete(req.params.id, {

            })
            await data.delete()
            res.redirect('/admin/category')
        } catch (err) {
            console.log(err)

        }
        //console.log(req.params.id)
    }

}


module.exports = CategoryController