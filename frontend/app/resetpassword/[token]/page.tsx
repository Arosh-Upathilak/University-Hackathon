"use client";
import Input from "@/components/Input";
import React, { useState, useEffect, useContext } from "react";
import { IoIosLock } from "react-icons/io";
import Button from "@/components/Button";
import Link from "next/link";
import { FaArrowLeftLong, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { UserContext } from "@/context/userContext";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfimPassword, setConfimShowPassword] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { url } = useContext(UserContext);
  const router = useRouter();
  const params = useParams();

  const token = params.token as string;

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link");
      router.push("/");
    }
  }, [token, router]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${url}/User/Reset-Password`, {
        token,
        newPassword: form.password
      });

      if (response.data.success) {
        toast.success("Password reset successful!");
        router.push("/");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string; error?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Password reset failed";

      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-16">
      <div className="flex flex-col justify-center items-center p-12 rounded-4xl bg-white shadow-2xl">
        <div className="text-blue-700 p-1 rounded-full bg-blue-100">
          <IoIosLock size={50} />
        </div>

        <h1 className="mt-3 text-3xl font-bold">Reset Password</h1>

        <p className="flex items-center justify-center flex-col mt-4 text-gray-500">
          <span>Enter your new password below</span>
        </p>

        <form className="w-full" onSubmit={onSubmitHandler}>
          <Input
            labelText="New Password"
            name="password"
            type={showPassword ? "text" : "password"}
            leftIcon={IoIosLock}
            onChange={onChangeHandler}
            value={form.password}
            placeholder="Enter new password"
            rightIcon={showPassword ? FaRegEye : FaRegEyeSlash }
            onRightIconClick={() => setShowPassword((prev) => !prev)}
          />

          <Input
            labelText="Confirm Password"
            name="confirmPassword"
            type={showConfimPassword  ? "text" : "password"}
            leftIcon={IoIosLock}
            onChange={onChangeHandler}
            value={form.confirmPassword}
            placeholder="Confirm new password"
            rightIcon={showConfimPassword ?  FaRegEye : FaRegEyeSlash }
            onRightIconClick={() => setConfimShowPassword((prev) => !prev)}
          />

          {error && (
            <p>
              <span className="text-base text-red-500">{error}</span>
            </p>
          )}

          <div className="mt-4 w-full md:w-lg">
            <Button text="Reset Password" loading={loading} type="submit" />
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

export default ResetPassword;
