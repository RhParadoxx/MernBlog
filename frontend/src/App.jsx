import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./Components/Navbar";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import YourBlog from "./pages/YourBlog";
import Comments from "./pages/Comments";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import Footer from "./Components/Footer";
import UpdateBlog from "./pages/UpdateBlog";
import BlogView from "./pages/BlogView";
import SearchList from "./pages/SearchList";

const AppRoutes = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {/* toaster */}
      <Toaster richColors position='top-right' />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:blogId' element={<BlogView />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/search' element={<SearchList />} />
        {/* Dashboard admin  routes */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path='profile' element={<Profile />} />
          <Route path='your-blog' element={<YourBlog />} />
          <Route path='comments' element={<Comments />} />
          <Route path='write-blog' element={<CreateBlog />} />
          <Route path='write-blog/:blogId' element={<UpdateBlog />} />
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
