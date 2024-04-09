import { useState } from "react";
import { Button, Form, Input } from "antd";
import { login } from "../../services/user";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { saveTokenToLocalStorage, saveUserToLocalStorage } from "../../utils/localstorage.js";
import { useDispatch, useSelector } from "react-redux"
import { login as loginAction} from "../../features/user/userSlice.js"
const Login = () => {
  const [loading, setLoading] = useState(false);
  //! Redux
  const dispatch = useDispatch() //todo chú ý cách sử dụng dispatch

  //todo dùng hook useSelector dùng để select các data từ bất kì components nào
  const user = useSelector((state) => console.log(state)) //! State đại diện cho những gì mình khai báo trong reducer
  console.log(user)

  const onFinish = async (values) => {
    console.log("Success:", values); //! In ra key-values
    //! Đem dữ liệu gửi về back-end
    try {
      //todo Handle render
      setLoading(true);
      const result = await login(values);

      //! Redux
      dispatch(loginAction({ user: result.data.user }))
      
      //! Truyền result vào hàm để lưu token
      saveTokenToLocalStorage(result.data.accessToken)

      //! Lưu user
      saveUserToLocalStorage(result.data.user)

      toast.success("login succesfully!");
      console.log(result)
    } catch (error) {
      //todo Handle error
      toast.error("login failed!");
      console.log(error);
    } finally {
      //todo Handle loading
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Form
        label="Login"
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name" //todo Key name
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email" //todo Key name
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password" //todo Key name
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be 6 digit!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="flex justify-end">
          <Link to={"/sign-up"} className="underline text-blue-400">Sign up here</Link>
        </div>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            <p className="text-white">Submit</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
