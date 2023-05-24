import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Home2 from "../../src/pages/Home2";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Details from "../pages/Details";
import Posts from "../pages/Posts";
import Footer from "../components/Footer";
import Category from "../pages/Category";

import DashBoard from "../pages/DashBoard";
import UsersTable from "../components/UsersTable";
import PostsTable from "../components/PostsTable";
import CommentsTable from "../components/CommentsTable";
import CategoriesTable from "../components/CategoriesTable";

import CreatePost from "../components/CreatePost";

import ForgotPassWord from "../pages/ForgotPassWord";
import ResetPassWord from "../pages/ResetPassWord";

import NotFound from "../pages/NotFound";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <ToastContainer position="top-center" />
      <Navbar />
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home2 />}></Route>

        {/* Auth */}
        <Route
          path="/login"
          element={user?.user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassWord />}></Route>
        <Route path="/reset-password" element={<ResetPassWord />}></Route>
        <Route
          path="/register"
          element={user?.user ? <Navigate to="/" /> : <Register />}
        ></Route>

        {/* Posts */}
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/posts/:id" element={<Details />}></Route>
        <Route
          path="/posts/createpost"
          element={user?.user ? <CreatePost /> : <Navigate to="/login" />}
        ></Route>

        {/* Profile */}
        <Route path="/profile/:id" element={<Profile />}></Route>

        {/* Category */}
        <Route path="/category/:category" element={<Category />}></Route>

        {/* DashBoard */}
        <Route path="/dashboard" element={ user?.user?.isAdmin ? <DashBoard /> : <Navigate to="/" /> }></Route>
        <Route path="/dashboard/users-table" element={ user?.user?.isAdmin ?  <UsersTable /> : <Navigate to="/" />}></Route>
        <Route path="/dashboard/posts-table" element={ user?.user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}></Route>
        <Route
          path="/dashboard/comments-table"
          element={user?.user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/dashboard/categories-table"
          element={<CategoriesTable />}
        ></Route>
        
        {/* Not-Found */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Layout;
