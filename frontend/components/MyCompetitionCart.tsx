"use client";
import { Competition } from "@/constant/Type";
import React from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";


const MyCompetitionCart = ({ competition }: { competition: Competition }) => {
    const router = useRouter();
  return (
    <div className="rounded-3xl  mb-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 space-y-2">
          {" "}
          <h1>{competition.competitionName}</h1>
          <p>{competition.competitionTagLine}</p>
          <p className="text-[#66768c]">{competition.competitionDescription}</p>
          <ProgressBar />
          <button className="p-2 bg-[#2b7fff] cursor-pointer rounded-xl flex items-center text-white hover:bg-[#287cfa8d] transition duration-200 mt-4" onClick={()=>router.push(`/user/mycompetition/showproblems/${competition.competitionId}`)}>Enter the Competition &nbsp;<FaArrowRightLong /></button>
        </div>
        <div>
          <Image
            src={competition.competitionImageLink}
            alt={competition.competitionName}
            width={500}
            height={800}
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default MyCompetitionCart;
