import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const ResponsiveMenu = ({ openNav, setOpenNav, logoutHandler }) => {
  const { user } = useSelector((store) => store.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[85%] flex-col justify-between bg-white dark:bg-gray-800 px-8 pb-6 pt-16 text-black dark:text-gray-100 lg:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        <div className='flex items-center justify-start gap-3'>
          {user ? (
            <Avatar className='w-14 h-14'>
              <AvatarImage src={user.photoUrl} size={50} />
            </Avatar>
          ) : (
            <FaUserCircle size={50} className='' />
          )}

          <div>
            <h1 className=''>Hello, {user?.firstName || "User"}</h1>
            <h1 className='text-sm text-slate-500'>Premium User</h1>
          </div>
        </div>
        <nav className='mt-12'>
          <ul className='flex flex-col gap-7 text-2xl font-semibold '>
            <Link to='/' onClick={() => setOpenNav(false)}>
              <li className='cursor-pointer'>Home</li>
            </Link>
            <Link to='/blogs' onClick={() => setOpenNav(false)}>
              <li className='cursor-pointer'>Blog</li>
            </Link>
            <Link to='/about' onClick={() => setOpenNav(false)}>
              <li className='cursor-pointer'>About</li>
            </Link>
            {/* searchbar */}
            <div className='relative '>
              <Input
                type='text'
                placeholder='Search'
                className='border border-gray-700 dark:bg-gray-900 bg-gray-300 '
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className='absolute right-0 top-0' onClick={handleSearch}>
                <Search />
              </Button>
            </div>

            <Button
              onClick={() => {
                logoutHandler(), setOpenNav(false);
              }}
            >
              Logout
            </Button>
          </ul>
        </nav>
      </div>
      <div className='pb-20 mt-16'>
        <h1>Made with ❤️ by RH Paradox</h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
