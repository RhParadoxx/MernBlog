import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import Logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice.js";
import userLogo from "../assets/user.jpg";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";

import {
  ChartColumnBig,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu.jsx";

import {
  FaCloudMoon,
  FaCloudSun,
  FaEdit,
  FaMoon,
  FaRegEdit,
  FaSun,
} from "react-icons/fa";

import { toggleTheme } from "../redux/themeSlice.js";
import { LiaCommentSolid } from "react-icons/lia";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const { theme } = useSelector((store) => store.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = false;

  // logoutHandler ************************
  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Server Error");
    }
  };

  // search Handler************************
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  //  open mobile menu ************************
  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  function getInitials(firstName, lastName) {
    if (!firstName && !lastName) return "";
    if (!firstName) return lastName[0].toUpperCase();
    if (!lastName) return firstName[0].toUpperCase();
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  }

  return (
    <div className='py-2 lg:px-10 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-5 lg:px-0'>
        {/* logo section / search abr */}
        <div className='flex gap-4 items-center'>
          <Link to={"/"}>
            <div className='flex gap-2 items-center'>
              <img
                src={Logo}
                alt=''
                className='w-7 h-7 lg:w-10 lg:h-10 dark:invert'
              />
              <h1 className='font-bold text-3xl lg:text-4xl'>Logo</h1>
            </div>
          </Link>

          {/* search Bar */}
          <div className='relative hidden md:block'>
            <Input
              type='text'
              placeholder='Search'
              className='border border-gray-700 dark:bg-gray-900 bg-gray-300 w-auto lg:w-[300px] hidden md:block'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className='absolute right-0 top-0' onClick={handleSearch}>
              <Search />
            </Button>
          </div>
        </div>

        {/* nav section */}
        <nav className='flex lg:gap-7 gap-4 items-center'>
          <ul className='hidden lg:flex gap-7 items-center text-xl font-semibold'>
            <NavLink to={"/"} className='cursor-pointer'>
              <li>Home</li>
            </NavLink>
            <NavLink to={"/blogs"} className={`cursor-pointer`}>
              <li>Blogs</li>
            </NavLink>
            <NavLink to={"/about"} className={`cursor-pointer`}>
              <li>About</li>
            </NavLink>
            {/* <NavLink to={'/write-blog'} className={`cursor-pointer`}><li>Write a Blog</li></NavLink> */}
          </ul>
        </nav>

        {/* theme button  */}
        <div className='flex gap-2 ml-0 md:ml-50 '>
          <Button onClick={() => dispatch(toggleTheme())} className=''>
            {theme === "light" ? <FaCloudMoon /> : <FaCloudSun />}
          </Button>

          {user ? (
            <div className='flex gap-3 items-center'>
              {/* <Link to={'/profile'}> */}
              <DropdownMenu className=''>
                <DropdownMenuTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src={user.photoUrl || userLogo} />
                    <AvatarFallback className='font-bold'>
                      {getInitials(user.firstName, user.lastName) || "CN"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-56 dark:bg-gray-800'>
                  <DropdownMenuLabel> {user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/profile")}
                    >
                      <User />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/your-blog")}
                    >
                      <ChartColumnBig />
                      <span>Your Blog</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/comments")}
                    >
                      <LiaCommentSolid />
                      <span>Comments</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/write-blog")}
                    >
                      <FaRegEdit />
                      <span>Write Blog</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}>
                    <LogOut />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className='ml-2 lg:flex gap-2 '>
              <Link to={"/login"}>
                <Button>Login</Button>
              </Link>
            </div>
          )}
        </div>

        {/* open Mobile Menu  */}
        {openNav ? (
          <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 lg:hidden' />
        ) : (
          <HiMenuAlt1 onClick={toggleNav} className='w-7 h-7 lg:hidden' />
        )}

        {/* mobile menu */}
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
