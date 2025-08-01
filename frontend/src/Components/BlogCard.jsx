import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB");
  return (
    <div className='bg-white dark:bg-gray-800 dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all'>
      <img src={blog.thumbnail} alt='' className='rounded-lg w-full h-auto' />
      <p className='text-sm mt-2 flex flex-col gap-2'>
        <span className='font-semibold'>Author - {blog.author.firstName}</span>
        <span className='font-semibold'>Category - {blog.category}</span>
        <span className='font-semibold'>published on - {formattedDate}</span>
      </p>
      <h2 className='text-xl font-semibold  mt-1'>{blog.title}</h2>
      <h3 className='text-gray-500 mt-1 font-bold'>{blog.subtitle}</h3>

      <Button
        onClick={() => navigate(`/blogs/${blog._id}`)}
        className='mt-4px-4 py-2 rounded-lg text-sm '
      >
        Read More
      </Button>
    </div>
  );
};

export default BlogCard;
