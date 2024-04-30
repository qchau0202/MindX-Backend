//! Dùng để chứa những hàm liên quan đến user
import { axiosInstance, axiosInstanceAuth } from "./index.js";
const login = ({ email, password }) => {
  return axiosInstance.post("/user/login", { email, password }); //! Nó sẽ đi vào body
};

const signUp = ({ name, email, password }) => {
  return axiosInstance.post("/user/sign-up", {name, email, password });
};

//! Phải có Token để đăng nhập, lấy thông tin user
const getPagingUser = ({ pageSize, pageIndex }) => {
  return axiosInstanceAuth.get(`/user/get-paging-user?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

const createUser = (data) => {
  return axiosInstanceAuth.post(`/user/create-user`, data)
}

const getUserById = (userId) => {
  return axiosInstanceAuth.get(`/user/${userId}`)
}

const editUser = (userId, data) => {
  return axiosInstanceAuth.put(`/user/${userId}`, data)
} 

const deleteUser = (userId) => {
  return axiosInstanceAuth.delete(`/user/${userId}`)
}

const uploadAvatar = (formData) => {
  return axiosInstanceAuth.put('/user/upload-avatar', formData)
}
export {
  login,
  signUp,
  getPagingUser,
  createUser,
  getUserById,
  editUser,
  deleteUser,
  uploadAvatar,
};
