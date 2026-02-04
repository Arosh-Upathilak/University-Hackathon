"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const LeaderBordPage = () => {
  const router = useRouter();
  return (
    <div className="mt-[12vh] p-8">
      <button
        onClick={() => router.back()}
        className="flex text-black hover:text-black/50 items-center"
      >
        <FaArrowLeft /> &nbsp;Back
      </button>
      <h1>LeaderBordPage</h1>
    </div>
  );
};

export default LeaderBordPage;
