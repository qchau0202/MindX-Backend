import { Table, Pagination, Button, Form } from "antd";
import { createUser, getPagingUser } from "../../services/user";
import { useEffect, useState } from "react";
import ModalCreateUser from "./components/ModalCreateUser/index.jsx";
import { toast } from 'react-hot-toast';
const columns = [
  {
    title: "Username",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Permission",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDoc, setTotalDoc] = useState(0);
  const [modalCreateUser, setModalCreateUser] = useState(false);
  const [form] = Form.useForm()
  const getUsers = async () => {
    try {
      setLoading(true);
      const result = await getPagingUser({ pageSize, pageIndex });
      setUsers(result.data.users);
      setTotalPages(result.data.totalPages);
      setTotalDoc(result.data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (values) => {
    try {
      setLoading(true)
      const result = await createUser(values);
      setModalCreateUser(false)
      let newUser = users
      newUser.pop()
      setUsers([result.data.result, ...newUser]) //todo ... là trước đó, lấy hết mảng users trước đó
      form.resetFields()
      toast.success("New user added!")
    }
    catch (error) {
      console.log(error);
      toast.error("Add user failed!")
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getUsers();
  }, [pageSize, pageIndex]);
  //! Khi dependencies = [], chỉ gọi 1 lần duy nhất, nếu truyền vào cái gì đó thay đổi, page sẽ tự gọi lại

  return (
    <>
      <div className="h-full bg-white">
        <Table
          loading={loading}
          columns={columns}
          dataSource={users}
          pagination={false}
        />
        <Button type="primary" onClick={() => setModalCreateUser(true)}>
          Add user
        </Button>
        <Pagination
          defaultCurrent={1}
          current={pageIndex}
          total={totalDoc}
          pageSize={pageSize}
          showSizeChanger
          onChange={(pageIndex, pageSize) => {
            setPageSize(pageSize);
            setPageIndex(pageIndex);
          }}
        />
        <ModalCreateUser
          title={"Add user"}
          isModalOpen={modalCreateUser}
          handleCancel={() => {
            setModalCreateUser(false);
          }}
          handleOk={handleCreateUser}
          loading={loading}
        />
      </div>
    </>
  );
};
export default Dashboard;
