import axios from "axios";
import React, { useEffect, useState } from "react";
import userLogo from "../assets/user.jpg";

const PopularAuthors = () => {
  const [popularUser, setPopularUser] = useState([]);
  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/all-users`
      );
      if (res.data.success) {
        setPopularUser(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col justify-start my-3 gap-2 px-4 md:px-0'>
          {popularUser?.slice(0, 3)?.map((user, index) => {
            return (
              <div key={index} className='flex gap-2 items-center '>
                <img
                  src={user.photoUrl || userLogo}
                  alt=''
                  className='rounded-full h-10 w-10 md:w-16 md:h-16'
                />
                <p className='font-semibold'>
                  {user.firstName} {user.lastName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularAuthors;
