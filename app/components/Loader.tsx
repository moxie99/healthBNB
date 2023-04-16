"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader size={100} color="green" />
      <h1 className="font-light shadow-emerald-700 text-green-800 text-lg">
        Explore the world while maintaining good health
      </h1>
    </div>
  );
};

export default Loader;
