//! Dùng để chứa những hàm liên quan đến user
import { axiosInstance } from "./index.js";
const login = ({ email, password }) => {
  return axiosInstance.post("/user/login", { email, password }); //! Nó sẽ đi vào body
};

export { login };
