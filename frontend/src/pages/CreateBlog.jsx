import React, { useState } from "react";

import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { setBlog, setLoading } from "../redux/blogSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading } = useSelector((store) => store.blog);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const createBlogHandler = async () => {
    if (!title.trim() || !category.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/blog/`,

        { title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const newBlog = res.data.blog;
        const updatedBlogs =
          blog && blog.length > 0 ? [...blog, newBlog] : [newBlog];
        dispatch(setBlog(updatedBlogs));
        navigate(`/dashboard/write-blog/${newBlog._id}`);
        toast.success(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20'>
      <Card className='md:p-10 p-4 dark:bg-gray-800'>
        <h1 className='text-2xl font-bold'>Let's create a blog</h1>
        <p className='text-sm text-muted-foreground'>
          Share your thoughts, ideas, and expertise with the world.
        </p>

        <div className='mt-10 space-y-6'>
          <div>
            <Label htmlFor='title' className='mb-2'>
              Title
            </Label>
            <Input
              id='title'
              type='text'
              placeholder='Your Blog Name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='bg-white dark:bg-gray-700'
              aria-label='Blog title'
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor='category' className='mb-2'>
              Category
            </Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger
                id='category'
                className='w-[180px] bg-white dark:bg-gray-700'
                aria-label='Select category'
                disabled={loading}
              >
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value='Web Development'>
                    Web Development
                  </SelectItem>
                  <SelectItem value='Digital Marketing'>
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value='Blogging'>Blogging</SelectItem>
                  <SelectItem value='Photography'>Photography</SelectItem>
                  <SelectItem value='Cooking'>Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex gap-2'>
            <Button
              onClick={createBlogHandler}
              disabled={loading || !title.trim() || !category.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className='mr-1 h-4 w-4 animate-spin' />
                  <span>Please wait ...</span>
                </>
              ) : (
                <span>Create</span>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;
