import { Outlet } from "react-router";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./index.css"
const AuthLayout = () => {
  //! Nhớ sử dụng outlet, nếu không có outlet, thông tin không được hiện lên
  //todo Tùy biến, design trong đây
  return (
    <>
      <div className="authlayout flex justify-center h-screen">
        <div className="left flex-none w-1/6 h-full pt-4">
          <Sidebar />
        </div>
        <div className="right flex-auto w-2/3 h-full pl-4">
          <Header />
          <div className="main w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
