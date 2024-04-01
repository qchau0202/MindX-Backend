import express from "express";
import { createProduct, getPagingProduct } from "../controllers/product.js";
import authentication from "../middlewares/authentication.js";

const productRouter = express.Router();

productRouter.post("/create-product",createProduct)
productRouter.get("/get-paging-product", getPagingProduct)

export default productRouter