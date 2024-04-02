import { useState } from "react";
import { Button, Form, Input } from "antd";
import { login } from "../../services/user";
import toast from "react-hot-toast";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Success:", values); //! In ra key-values
    //! Đem dữ liệu gửi về back-end
    try {
      setLoading(true);
      const result = await login(values);
      toast.success("login succesfully!");
    } catch (error) {
      console.log(error);
      toast.error("login failed!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
