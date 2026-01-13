import { ButtonProps } from "@/constant/Type";
import React from "react";

const Button = ({ text, type = "button", loading = false }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`w-full p-3 rounded-2xl text-lg text-white transition duration-300
        ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }
      `}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
