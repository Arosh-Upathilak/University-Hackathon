import {  CompetitionProps } from "@/constant/Type";
import Image from "next/image";
import React, { useState } from "react";
import { MdEdit,MdDelete } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { CompetitionStatus, DateTimeConfig } from "@/helper/DateTimeConversion";
import { useRouter } from "next/navigation";
import PopUpMessage from "./PopUpMessage";

const AdminCompetiotionCart = ({
  competition,
}: {
  competition: CompetitionProps;
}) => {
  const router = useRouter();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  
  const onDeleteHandle = () => {
    setShowDeletePopup(true);
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{competition.competitionName}</h3>
      <p className="text-gray-600">{competition.competitionTagLine}</p>
      <div className="mb-3">
        <Image
          src={competition.competitionImageLink}
          alt={competition.competitionName}
          width={300}
          height={400}
          className="w-full h-48  object-cover rounded"
        />
      </div>
      <div className="mt-2">
        <span
          className={`px-2 py-1 rounded text-sm ${
            CompetitionStatus(competition.startDateTime,competition.endDateTime) === "Live"
              ? "bg-green-100 text-green-800"
              : CompetitionStatus(competition.startDateTime,competition.endDateTime) === "Upcoming"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {CompetitionStatus(competition.startDateTime,competition.endDateTime)}
        </span>
      </div>
      <p>
        Registered: {competition.registrations?.length}
      </p>
      <p>
        Questions: {competition.problems?.length}
      </p>
      <p>
        Stating Date: {DateTimeConfig(competition.startDateTime)}
      </p>
      <p>
        Ending Date: {DateTimeConfig(competition.endDateTime)}
      </p>
      <div className="flex flex-col mt-2 gap-4">
        
        <div className="flex items-center justify-between ">
        <button onClick={()=>router.push(`/admin/competitions/updatecompetiotion/${competition.competitionId}`)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
          <MdEdit size="20"/>&nbsp;Update
        </button>
        <button onClick={onDeleteHandle} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2 cursor-pointer">
          <MdDelete size="20"/>&nbsp;Delete
        </button>
        </div>
        <button onClick={()=>router.push(`/admin/competitions/showcompetition/${competition.competitionId}`)} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer ">
          <FaCode size="20"/>&nbsp;Add Coding
        </button>
      </div>
      {showDeletePopup && (
        <PopUpMessage onClose={() => setShowDeletePopup(false)} deleteCompetitionId={competition.competitionId}/>
      )}
    </div>
  );
};

export default AdminCompetiotionCart;
