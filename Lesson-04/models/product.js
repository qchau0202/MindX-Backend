import mongoose from "mongoose";

const product = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true,
})

// Hiện tại "Product" là khai báo tên của collections
export default mongoose.model("products", product)