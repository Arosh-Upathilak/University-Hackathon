import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgetpasswordSuccess = () => {
  return (
    <div className="min-h-screen p-16  flex justify-center items-center ">
      <div className="flex justify-center items-center flex-col  gap-4 border p-12 bg-white rounded-4xl">
        <h1 className="text-6xl font-bold">Forget password Success</h1>
        <p className="text-xl text-gray-600 ">Check your email</p>
        <p className="text-xl text-gray-600 ">
          We have sent you a link to reset your password
        </p>
        <p className="text-xl text-gray-600 ">
          Please check your email and click on the link to reset your password
        </p>
        <Link
          href="/"
          className="mt-4 flex flex-row justify-center items-center text-blue-500 text-base hover:text-blue-700 transition duration-300"
        >
          <FaArrowLeftLong />
          &nbsp;&nbsp;&nbsp;Return to Log in
        </Link>
      </div>
    </div>
  );
};

export default ForgetpasswordSuccess;
