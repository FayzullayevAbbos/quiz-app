import { Button } from "antd";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className='h-full w-full   '>
        <div className='w-full flex flex-col gap-10 items-center pt-40'>
          <h1 className='text-[70px] font-medium'>
            Welcome to my Quiz-App
          </h1>
          <div className='flex flex-col items-center gap-10'>
            <Link to={"/start"}>
              <Button
                className='text-[30px] px-5 py-8 font-bold'
                type='primary'
              >
                Start quiz
              </Button>
            </Link>
            <Link to={"/create"}>
              <Button
                className='text-[30px] px-5 py-8 font-bold'
                type='primary'
              >
                Create quiz
              </Button>
            </Link>
            <Link to={"/teacher-dashboard"}>
              <Button
                className='text-[30px] px-5 py-8 font-bold'
                type='primary'
              >
                For Teachers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
