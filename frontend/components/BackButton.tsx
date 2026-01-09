import React from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BackButtonProps } from "@/constant/Type";

const BackButton = ({links , text }: BackButtonProps) => {
  return (
    <div>
      <Link
        href= {`${links}`}
        className="mt-4 flex flex-row justify-start items-center text-gray-500 text-base hover:text-gray-700 transition duration-300 text-lg"
      >
        <FaArrowLeftLong />
        &nbsp;&nbsp;&nbsp;{text}
      </Link>
    </div>
  );
};

export default BackButton;
