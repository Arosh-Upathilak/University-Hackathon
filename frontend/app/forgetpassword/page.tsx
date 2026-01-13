"use client";
import Input from "@/components/Input";
import React, { useContext, useState } from "react";
import { IoIosLock } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import Button from "@/components/Button";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import { UserContext } from "@/context/userContext";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const Forgetpassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {url} = useContext(UserContext);
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!userEmail){
      setError("Fill the email")
      return;
    }
    setLoading(true)
    try{
      const response = await axios.post(`${url}/User/Forgot-Password`, { email: userEmail });
      
      if(response.data.success){
        console.log(response.data)
        toast.success(response.data.message)
        setError(null)
        setLoading(true)
        router.push("/forgetpasswordSuccess")
      }
    }catch (err: unknown) {
      const axiosError = err as AxiosError<{
        message?: string;
        error?: string;
      }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Register failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-16">
      <div className="flex flex-col justify-center items-center  p-12 rounded-4xl bg-white  shadow-2xl ">
        <div className="text-blue-700 p-1  rounded-full bg-blue-100">
          <IoIosLock size={50} />
        </div>
        <h1 className="mt-3 text-3xl font-bold">Forgot Password</h1>
        <p className="flex items-center justify-center flex-col mt-4 text-gray-500">
          <span>Enter the email address associated with your</span>
          <span>university account and well sera you a link to reset</span>
          <span>your password.</span>
        </p>
        <form className="w-full" onSubmit={onSubmitHandler}>
          <Input
            labelText="University Email"
            name="email"
            type="email"
            leftIcon={HiOutlineMail}
            onChange={onChangeHandler}
            value={userEmail}
            placeholder="Enter your email"
          />
          <p>
            {error && <span className="text-base text-red-500">{error}</span>}
          </p>
          <div className="mt-4 w-full  ">
            <Button text="Send Reset Link" loading={loading} type="submit" />
          </div>
        </form>

        <Link
          href="/"
          className="mt-4 flex flex-row justify-center items-center text-gray-500 text-base hover:text-gray-700 transition duration-300"
        >
          <FaArrowLeftLong />
          &nbsp;&nbsp;&nbsp;Return to Log in
        </Link>
      </div>
    </div>
  );
};

export default Forgetpassword;
