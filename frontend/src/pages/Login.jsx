import { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Label } from "../Components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import auth from "../assets/auth.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/");
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='flex items-center h-screen md:pt-14 m '>
      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
        <Card className='w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600'>
          <CardHeader>
            <CardTitle className='text-center text-xl font-semibold'>
              Login into your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <Label className='mb-2'>Email</Label>
                <Input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={input.email}
                  onChange={handleChange}
                  className='dark:border-gray-600 dark:bg-gray-900'
                />
              </div>

              <div className='relative'>
                <Label className='mb-2'>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter Your Password'
                  name='password'
                  value={input.password}
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
                Login
              </Button>
              <p className='text-center text-gray-600 dark:text-gray-300'>
                Don't have an account?
                <Link to={"/signup"}>
                  <span className='underline cursor-pointer ml-2'>
                    Sign up
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

export default Login;
