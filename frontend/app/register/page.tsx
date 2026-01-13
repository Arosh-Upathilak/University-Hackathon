"use client";
import React, { useContext, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosLock } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { IoPeopleSharp } from "react-icons/io5";
import { UserContext } from "@/context/userContext";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    UserName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { url, setUser: setContextUser } = useContext(UserContext);
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.UserName || !user.email || !user.password) {
      setError("Fill all the inputs");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${url}/User/Register`, user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setContextUser(response.data.user);
      toast.success(response.data.message);
      setError(null);

      if (response.data.user?.role === "Admin") {
        router.push("/admin");
      } else if (response.data.user?.role === "User") {
        router.push("/user");
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
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
    <div className="w-full min-h-screen flex justify-center items-center p-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-2xl bg-white overflow-hidden">
        <div className="bg-[#dbe7f1] hidden sm:flex flex-col justify-center p-8">
          <h1 className="text-3xl font-bold">
            Code.
            <br />
            Collaborate.
            <br />
            Create.
          </h1>

          <p className="mt-4 text-sm md:text-base">
            Join over 500 students in the ultimate university coding challenge.
            Sign in to access your dashboard and resources.
          </p>

          <div className="mt-6 flex justify-center">
            <Image
              src="/images/login_image.png"
              alt="login illustration"
              width={600}
              height={300}
              className="w-full rounded-3xl"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-10 md:px-16">
          <h1 className="text-3xl font-bold">Create an Account</h1>

          <p className="text-base text-slate-700 mt-4">
            Join the ultimate coding competition. Build. code. and compete.
          </p>

          <form
            className="w-full mt-6 flex flex-col gap-4"
            onSubmit={onSubmitHandler}
          >
            <Input
              labelText="Full Name"
              name="UserName"
              type="name"
              leftIcon={IoPeopleSharp}
              placeholder="Enter your name"
              value={user.UserName}
              onChange={onChangeHandler}
            />

            <Input
              labelText="University Email Address"
              name="email"
              type="email"
              leftIcon={HiOutlineMail}
              placeholder="Enter your email"
              value={user.email}
              onChange={onChangeHandler}
            />

            <Input
              labelText="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              leftIcon={IoIosLock}
              rightIcon={showPassword ? FaRegEyeSlash : FaRegEye}
              placeholder="Enter your password"
              value={user.password}
              onChange={onChangeHandler}
              onRightIconClick={() => setShowPassword((prev) => !prev)}
            />
            <p>
              {error && <span className="text-base text-red-500">{error}</span>}
            </p>
            <Button text="Submit" type="submit" loading={loading} />
          </form>
          <p className="mt-4 flex gap-4 justify-center">
            Already have an account
            <Link href="/" className="link_class">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
