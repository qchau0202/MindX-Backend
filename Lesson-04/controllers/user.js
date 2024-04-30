import User from "../models/user.js";
import bcrypt from "bcryptjs";
import joi from "joi";
import jwt from "jsonwebtoken";
import handleUpload from "../utils/cloudinary.js";
//! jwt cung cấp một đoạn mã ( như tấm vé để truy cập ), phải truy xuất mã này mới lấy được data

export const login = async (req, res) => {
  const { compareSync } = bcrypt;
  try {
    const email = req.body.email;
    const password = req.body.password;

    const loginSchema = joi.object({
      email: joi.string().email().min(3).max(32).required().messages({
        "string.email": "Email không đúng định dạng",
        "string.min": "Tối thiểu là 3 ký tự",
        "string.max": "Tối đa 32 ký tự",
      }),
      password: joi.string().min(6).max(32).required(),
    });

    const validate = loginSchema.validate({ email, password });

    if (validate.error) {
      return res.status(400).json({
        error: validate.error.details[0].message,
      });
    }

    // lean để khi destructuring ở dùng 36 không bị lỗi
    const findUser = await User.findOne({ email }).lean();

    if (!findUser) {
      return res.status(400).json({
        error: "Không tìm người dùng",
      });
    }

    const checkPassword = compareSync(password, findUser.password);
    const accessToken = jwt.sign({ id: findUser._id }, process.env.SCRET_KEY, {
      expiresIn: "100d",
    });
    // Tách findUser thành 2 phần => phần thứ 1 password , phần thứ 2 là phần còn lại của findUser gán vào biến returnUser
    const { password: userPassword, ...returnUser } = findUser;

    if (!checkPassword) {
      return res.status(401).json({
        error: "Wrong password",
      });
    }

    return res.status(200).json({
      message: "Login successfully",
      user: returnUser,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const signUp = async (req, res) => {
  // Define
  const { hashSync, genSaltSync } = bcrypt;
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if (!name) {
      return res.status(400).json({
        message: "Username is required!",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is required!",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required!",
      });
    }
    // Dùng lean để tránh bị lỗi
    const findUser = await User.findOne({ email }).lean(); // return an object

    if (findUser) {
      return res.status(400).json({
        message: "User existed",
      });
    }
    const salt = genSaltSync();
    const hashPassword = hashSync(password, salt); // Tham số 1 là người dùng, tham số 2 là salt
    const user = await User.create({
      email,
      password: hashPassword,
      name,
      role,
    });
    return res.status(200).json({
      message: "Create user succesfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.create(data);

    return res.status(201).json({
      result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ! Pagination method ( kỹ thuật phân trang )
//todo Thông tin ta cần khi sử dụng Pagination
//todo -> Số lượng phần tử hiển thị, số trang
export const getPagingUser = async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    //! Hàm .find là lấy ra tất cả trong data ( không điều kiện là lấy hết )
    //! const users = await User.find({age: 10}) -> có điều kiện
    const users = await User.find()
      .skip(query.pageSize * query.pageIndex - query.pageSize)
      .limit(query.pageSize)
      .sort({ createdAt: "descending" });
    const countUsers = await User.countDocuments();
    const totalPage = Math.ceil(countUsers / query.pageSize); //! Math.ceil -> lấy giá trị trần tức: 0.2 = 1, 1.2 = 2...
    return res.status(200).json({ users, totalPage, count: countUsers });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;

    // select ("-password") => bỏ password trong object trả về
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "User successfully updated!",
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//! Change password
//todo Trước khi đổi mật khẩu, kiểm tra xem mật khẩu của người dùng đã đúng hay chưa
export const changePassword = async (req, res) => {
  const { compareSync, genSaltSync, hashSync } = bcrypt;
  try {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found!",
      });
    }

    //! Kiểm tra password cũ có đúng hay không
    const checkPassword = compareSync(oldPassword, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        error: "Sai mật khẩu cũ",
      });
    }

    //! Nếu như đúng rồi ta có thể update như sau
    const salt = genSaltSync();
    const hashPassword = hashSync(newPassword, salt);

    const updateUser = await User.findByIdAndUpdate(id, {
      password: hashPassword,
    });

    return res.status(200).json({
      message: "Password successfully updated!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//! Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Successfully deleted user!",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//! Get user by ID
export const findUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const uploadUserAvatar = async (req, res) => {
  try {
    console.log(req.file);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await handleUpload(dataURI);
    const userId = req.body.userId;
    const updateUser = await User.findByIdAndUpdate(userId, {
      avatar: result.url
    })
    console.log(userId)
    console.log(result);
    return res.status(200).json({
      url: result.url
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
