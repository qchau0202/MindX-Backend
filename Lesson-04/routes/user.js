import express from "express"
import { createUser, getPagingUser, signUp, login, editUser, changePassword, deleteUser } from "../controllers/user.js"
import authentication from "../middlewares/authentication.js"
import authorization from "../middlewares/authorization.js"

const userRouter = express.Router()

userRouter.post("/create-user", createUser)
//! Phân trang ( quan trọng )
userRouter.get("/get-paging-user", authentication, getPagingUser) //todo VD: chèn authentication trước, đây là 1 middleware
userRouter.post("/sign-up", signUp)
userRouter.post("/login", login)
userRouter.put("/:id", authentication, authorization, editUser)
userRouter.put("/change-password/:id", authentication, changePassword)
userRouter.delete("/:id", authentication, deleteUser)

//! Đối với các API cần sử dụng authentication, thêm đằng trước các hàm
export default userRouter