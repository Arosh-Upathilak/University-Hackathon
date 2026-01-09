"use client";
import { InputProps } from "@/constant/Type";
import React from "react";

const Input = ({
  labelText,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="mt-2 text-lg font-semibold">
        {labelText} :
      </label>

      <div className="flex items-center justify-between p-3 w-full rounded-2xl bg-[#f2f7fb]">
        <div className="flex items-center gap-2 w-full">
          {LeftIcon && <LeftIcon className="text-gray-400" size={20} />}

          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="new-password"
            className="w-full bg-transparent outline-none border-none text-base"
          />
        </div>

        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <RightIcon size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
