"use client";
import AdminCompetiotionCart from "@/components/AdminCompetiotionCart";
import { dummyCompetitions } from "@/constant/data";
import { CompetitionCartProps } from "@/constant/Type";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const Competitions = () => {
  const router = useRouter();
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mt-4 font-bold">All the Competions</h1>
        <div className=" p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150">
          <button
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => router.push("/admin/competitions/createcompetition")}
          >
            <FaPlus />
            <p>Create Competiton </p>
          </button>
        </div>
      </div>
      <div className="my-4 p-3 bg-white rounded-2xl max-w-[40%] text-xl">
        <input placeholder="Enter the compenttion Name" className="border-none outline-0"/>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
        {dummyCompetitions.map((competition, index: number) => (
          <AdminCompetiotionCart
            key={index}
            competition={competition as CompetitionCartProps}
          />
        ))}
      </div>
    </div>
  );
};

export default Competitions;
