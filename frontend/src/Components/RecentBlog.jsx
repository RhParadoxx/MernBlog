import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { setBlog } from "../redux/blogSlice";
import axios from "axios";
import PopularAuthors from "./PopularAuthors";

const tags = [
  {
    category: "Blogging",
  },
  {
    category: "Web Development",
  },
  {
    category: "Digital Marketing",
  },
  {
    category: "Cooking",
  },
  {
    category: "Photography",
  },
  {
    category: "Sports",
  },
];

const RecentBlog = () => {
  const { blog } = useSelector((store) => store.blog);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(blog);

  useEffect(() => {
    const getAllPublsihedBlogs = async () => {
      try {
        const res = await axios.get(
          `https://localhost:8000/api/v1/blog/get-published-blogs`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPublsihedBlogs();
  }, []);

  return (
    <div className='bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10'>
        {/* Blog Card List Section */}
        <div className='gap-6'>
          <div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-1'>
              Recent Blogs
            </h3>
            <hr className='w-24 text-center border-1 border-red-500 rounded-full' />
          </div>

          {blog?.slice(0, 4)?.map((blog, index) => (
            <BlogCardList key={index} blog={blog} />
          ))}
        </div>

        {/* Sidebar   *********************************/}
        <aside className='bg-gray-100 dark:bg-gray-800 p-6 rounded-md space-y-6'>
          {/* Categories filter *********************************/}
          <div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-1'>
                Popular Categories
              </h3>
              <hr className=' w-24 text-center border-1 border-red-500 rounded-full' />
            </div>
            <div className='flex flex-wrap gap-2 mt-4'>
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  className='cursor-pointer'
                  onClick={() => navigate(`/search?q=${tag.category}`)}
                >
                  {tag.category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Suggested Blogs   ******************************** */}
          <div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-1'>
                Suggested Blogs
              </h3>
              <hr className='w-24 text-center border-1 border-red-500 rounded-full' />
            </div>

            <ul className='space-y-2 mt-3'>
              {[
                "10 Tips to Master React",
                "Understanding Tailwind CSS",
                "Improve SEO in 2024",
                "music production",
              ].map((title, idx) => (
                <li
                  key={idx}
                  className='text-sm text-gray-700 dark:text-gray-200 hover:underline cursor-pointer'
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>

          {/* authors popular ******************************** */}

          <div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-1'>
                popular authors
              </h3>
              <hr className='w-24 text-center border-1 border-red-500 rounded-full' />
            </div>
            <PopularAuthors />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RecentBlog;
