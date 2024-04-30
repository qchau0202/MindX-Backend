import { Table, Pagination, Button, Form, Popconfirm } from "antd";
import {
  createUser,
  deleteUser,
  editUser,
  getPagingUser,
  uploadAvatar,
} from "../../services/user";
import { useEffect, useState } from "react";
import ModalCreateUser from "./components/ModalCreateUser/index.jsx";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ModalUploadUserAvatar from "./components/ModalUploadUserAvatar/index.jsx";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDoc, setTotalDoc] = useState(0);
  const [modalCreateUser, setModalCreateUser] = useState(false);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);

  //! Upload
  const [modalUploadUserAvatar, setModalUploadUserAvatar] = useState(false);

  const handleOpenUploadUserAvatar = (userId) => {
    setModalUploadUserAvatar(true);
    setSelectedUser(userId);
  };

  const handleCloseUploadUserAvatar = (userId) => {
    setModalUploadUserAvatar(false);
    setSelectedUser(null);
  };

  const handleOpenEditModal = (userId) => {
    setModalCreateUser(true);
    setSelectedUser(userId);
  };

  const handleCloseModal = () => {
    setModalCreateUser(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      setLoading(true);
      const result = await deleteUser(userId);
      toast.success("Successfully deleted user!");
      //! Lọc ra các user
      setUsers(users.filter((user) => user._id != userId));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user!");
    } finally {
      setLoading(false);
    }
  };

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
      title: 'Avatar',
      dataIndex: "avatar",
      key: "avatar",
      render: (row) => {
        return (
          <><img width={150 } src={row}/></>
        )
      }
    },
    {
      title: "Permission",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      render: (row) => {
        return (
          <div className="flex gap-2">
            <FaEdit
              cursor={"pointer"}
              onClick={() => {
                console.log(row);
                handleOpenEditModal(row._id);
              }}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDeleteUser(row._id)}
              okText="Yes"
              cancelText="No"
            >
              <MdDeleteForever cursor={"pointer"} />
              <FaFileImage
                cursor={"pointer"}
                onClick={() => handleOpenUploadUserAvatar(row._id)}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

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

  //! Create user
  const handleCreateUser = async (values) => {
    try {
      setLoading(true);
      if (!selectedUser) {
        const result = await createUser(values);
        let newUser = users;
        newUser.pop();
        setUsers([result.data.result, ...newUser]); //todo ... là trước đó, lấy hết mảng users trước đó
        toast.success("User created successfully!");
      } else {
        const result = await editUser(selectedUser, values);
        //! Cập nhật state sau khi edit
        setUsers(
          users.map((user) => {
            if (user._id == selectedUser) {
              return result.data.user;
            }
            return user;
          })
        );
        toast.success("User updated successfully!");
        setSelectedUser(null);
      }

      setModalCreateUser(false); //todo Đóng lại user theo trường hợp
      form.resetFields();
    } catch (error) {
      console.log(error);
      toast.error(selectedUser ? "Update user failed" : "Add user failed!");
    } finally {
      setLoading(false);
    }
  };

  //! Upload file
  const handleUploadFile = async (file) => {
    try {
      const formData = new FormData();
      console.log(file);
      //! Form data phải có middleware
      formData.append("avatar", file);
      formData.append("userId", selectedUser)
      const result = await uploadAvatar(formData);
      setUsers(users.map(user => {
        if (user._id == selectedUser) {
          user.avatar = result.data.url
        }
        return user
      }))
      toast.success("File uploaded successfully!")
    } catch (error) {
      toast.error("File uploaded failed!");
    }
  };

  useEffect(() => {
    getUsers();
  }, [pageSize, pageIndex]);
  //! Khi dependencies = [], chỉ gọi 1 lần duy nhất, nếu truyền vào cái gì đó thay đổi, page sẽ tự gọi lại

  return (
    <>
      <ModalUploadUserAvatar />
      <div className="h-full bg-white">
        <Table
          loading={loading}
          columns={columns}
          dataSource={users}
          pagination={false}
          handleUploadFile={handleUploadFile}
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
          title={selectedUser ? "Fix info" : "Add user"}
          isModalOpen={modalCreateUser}
          handleCancel={handleCloseModal}
          handleOk={handleCreateUser}
          loading={loading}
          selectedUser={selectedUser}
          form={form}
        />
        <ModalUploadUserAvatar
          isOpen={modalUploadUserAvatar}
          handleCancel={handleCloseUploadUserAvatar}
          handleUploadFile={handleUploadFile}
        />
      </div>
    </>
  );
};
export default Dashboard;
