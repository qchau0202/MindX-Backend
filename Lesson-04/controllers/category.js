import toSlug from "../utils/toSlug.js"
import categoryModel from "../models/category.js"

export const getPagingCategory = async (req, res) => {
    try {

        //todo HW: Check if pageSize and pageIndex are available in the param, are they numbers ?
        const pageSize = req.query.pageSize
        const pageIndex = req.query.pageIndex

        const categories = await categoryModel.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
        const totalPages = await categoryModel.countDocuments()

        return res.status(201).json({
            categories,
            totalPages
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createCategory = async (req, res) => {
    try {
        const name = req.body.name
        //! Return ra 1 string ( VD: Do dien tu = Do-dien-tu)
        const slug = toSlug(name)
        const newCategory = await categoryModel.create({
            name,
            slug
        })
        return res.status(201).json({
            category: newCategory
        })
   } catch (error) {
       return res.status(500).json(error)
   }
}

export const editCategory = (req, res) => {

}

export const deleteCategory = (req, res) => {
    
}