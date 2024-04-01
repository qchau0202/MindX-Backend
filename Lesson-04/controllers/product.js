import product from "../models/product.js"

export const createProduct = async (req, res) => {
    const user = req.user
    const product_name = req.body.product_name
    const product_price = req.body.product_price
    try {
        const result = await product.create({
            product_name: product_name,
            product_price: product_price,
            created_by: user._id,
        })
        return res.status(201).json({
            // result
            product: result
        })
    } catch (error) {
        // Lỗi phía server
        console.log(error)
        return res.status(500).json(error)
    }
}

export const getPagingProduct = async (req, res) => {
    try {
        // const query = req.query 
        // const products = await product.find().skip(query.pageSize * query.pageIndex - query.pageSize).limit(query.pageSize).
        //     populate({ path: "CreatedBy", select: "name" }).select("-product_price") //! Có dấu - thì là bỏ, không có dấu là chỉ lấy mỗi nó
        const pageSize = req.query.pageSize
        const pageIndex = req.query.pageIndex
        const products = await product.find().skip(pageSize * pageIndex - pageSize).limit(pageSize).
              populate({ path: "CreatedBy", select: "name" }).select("-product_price") //! Có dấu - thì là bỏ, không có dấu là chỉ lấy mỗi nó
        const countProducts = await product.countDocuments()
        const totalPage = Math.ceil(countProducts / pageSize) 
        return res.status(200).json({ products, totalPage })
    } catch (error) {
        return res.status(500).json(error)
    }
}
