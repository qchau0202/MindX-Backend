import { Modal, Input, Form, Button, Select } from "antd";
import { getUserById } from "../../../../services/user";
import { useEffect } from "react";
const ModalCreateUser = ({
  loading,
  isModalOpen,
  handleCancel,
  handleOk,
  title,
  form,
  selectedUser,
}) => {
  const getUser = async () => {
    try {
      const result = await getUserById(selectedUser);
      form.setFieldValue("name", result.data.user.name);
      form.setFieldValue("email", result.data.user.email);
      form.setFieldValue("role", result.data.user.role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedUser) getUser();
  }, [selectedUser]);
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
      >
        <Form name="basic" initialValues={{}} onFinish={handleOk} form={form}>
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {!selectedUser && (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          {!selectedUser && (
            <Form.Item
              label="Confirm password"
              name="confirm-password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please choose user's role!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Guest">Guest</Select.Option>
            </Select>
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
      </Modal>
    </>
  );
};
export default ModalCreateUser;
