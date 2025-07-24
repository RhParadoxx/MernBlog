import RecentBlog from "../Components/RecentBlog";
import Hero from "../Components/Hero";

const Home = () => {
  return (
    <div className=' bg-white dark:bg-gray-800'>
      <Hero />
      <RecentBlog />
    </div>
  );
};

export default Home;
