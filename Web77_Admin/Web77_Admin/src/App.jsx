import "./App.css";
import { Routes, Route } from "react-router";
import NonAuthLayout from "./layouts/NonAuthLayout";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/Signup";
import { useSelector } from "react-redux";
import AuthLayout from "./layouts/AuthLayout";
import isObjectEmpty from "./utils/isObjectEmpty";
import Dashboard from "./pages/Dashboard";
function App() {
  //! Kiểm tra xem đã đăng nhập hay chưa để navigate sang trang khác
  const user = useSelector((state) => state.users.user);

  return (
    <>
      <Toaster />
      <Routes>
        {isObjectEmpty(user) ? (
          <Route path="/" element={<NonAuthLayout />}>
            <Route path="" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        ) : (
            <Route path="/" element={<AuthLayout />}>
              <Route path="" element={<Dashboard />} /> 
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
