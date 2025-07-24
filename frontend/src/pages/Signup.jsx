import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import auth from "../assets/auth.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex h-screen md:pt-14'>
      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
        <Card className='w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600'>
          <CardHeader>
            <CardTitle>
              <h1 className='text-center text-xl font-semibold'>
                Create an account
              </h1>
            </CardTitle>
            
          </CardHeader>
          <CardContent>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='flex gap-3'>
                <div>
                  <Label className='mb-2'>First Name</Label>
                  <Input
                    type='text'
                    placeholder='First Name'
                    name='firstName'
                    value={user.firstName}
                    onChange={handleChange}
                    className='dark:border-gray-600 dark:bg-gray-900'
                  />
                </div>

                <div>
                  <Label className='mb-2'>Last Name</Label>
                  <Input
                    type='text'
                    placeholder='Last Name'
                    name='lastName'
                    value={user.lastName}
                    onChange={handleChange}
                    className='dark:border-gray-600 dark:bg-gray-900'
                  />
                </div>
              </div>
              <div>
                <Label className='mb-2'>Email</Label>
                <Input
                  type='email'
                  placeholder='email'
                  name='email'
                  value={user.email}
                  onChange={handleChange}
                  className='dark:border-gray-600 dark:bg-gray-900'
                />
              </div>

              <div className='relative'>
                <Label className='mb-2'>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder='Create a Password'
                  name='password'
                  value={user.password}
                  onChange={handleChange}
                  className='dark:border-gray-600 dark:bg-gray-900'
                />
                <button
                  type='button'
                  className='absolute right-3 top-7 text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type='submit' className='w-full cursor-pointer'>
                Sign Up
              </Button>
              <p className='text-center text-gray-600 dark:text-gray-300'>
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className='underline cursor-pointer ml-2'>
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
