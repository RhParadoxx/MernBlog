import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import heroImg from "../assets/blog2.png";

const Hero = () => {
  return (
    <div className='px-5 lg:px-10 bg-gray-100  dark:bg-gray-800'>
      <div
        className='max-w-7xl mx-auto flex  items-center h-[600px]  md:my-0
     '
      >
        {/* text section */}
        <div className='max-w-2xl'>
          <h1 className='text-4xl md:w-6xl font-bold mb-4'>
            Explore the latest tech & web trends
          </h1>
          <p className='text-lg md:text-xl opacity-80 mb-6'>
            Stay ahead with in depth articles , tutorials and insights on web
            development , and digital marketing , and tech innovations
          </p>

          <div className='flex gap-3'>
            <Link>
              <Button className='text-lg cursor-pointer'>Get started</Button>
            </Link>
            <Link>
              <Button variant='outline' className='text-lg cursor-pointer'>
                Learn more
              </Button>
            </Link>
          </div>
        </div>
        {/* image section */}
        <div className='lg:flex items-center justify-center hidden '>
          <img src={heroImg} alt='heroImg' className='w-[450px]' />
        </div>
      </div>
    </div>
  );
};

export default Hero;
