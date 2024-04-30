import express from "express";
import {
  createUser,
  getPagingUser,
  signUp,
  login,
  editUser,
  changePassword,
  deleteUser,
  findUserById,
  uploadUserAvatar,
} from "../controllers/user.js";
import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";
import upload from "../middlewares/upload.js";

const userRouter = express.Router();

userRouter.put(
  "/upload-avatar",
  authentication,
  upload.single("avatar"),
  uploadUserAvatar
);
userRouter.post("/create-user", createUser);
//! Phân trang ( quan trọng )
userRouter.get("/get-paging-user", authentication, getPagingUser); //todo VD: chèn authentication trước, đây là 1 middleware
userRouter.post("/sign-up", signUp);
userRouter.get("/:id", authentication, findUserById);
userRouter.post("/login", login);
userRouter.put("/:id", authentication, editUser);
userRouter.put("/change-password/:id", authentication, changePassword);
userRouter.delete("/:id", authentication, deleteUser);

//! Đối với các API cần sử dụng authentication, thêm đằng trước các hàm
export default userRouter;
