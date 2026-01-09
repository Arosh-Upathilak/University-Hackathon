import { CompetitionCartProps } from "@/constant/Type";
import Image from "next/image";
import React from "react";
import { MdEdit,MdDelete } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { BiShowAlt } from "react-icons/bi";

const AdminCompetiotionCart = ({
  competition,
}: {
  competition: CompetitionCartProps;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{competition.name}</h3>
      <p className="text-gray-600">{competition.header}</p>
      <div className="mb-3">
        <Image
          src={competition.image}
          alt={competition.name}
          width={300}
          height={200}
          unoptimized
          className="w-full h-32 object-cover rounded"
        />
      </div>
      <div className="mt-2">
        <span
          className={`px-2 py-1 rounded text-sm ${
            competition.status === "Live"
              ? "bg-green-100 text-green-800"
              : competition.status === "Upcoming"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {competition.status}
        </span>
      </div>
      <p>
        Registered: {competition.registered}
      </p>
      <p>
        Questions: {competition.numberOfQuestion}
      </p>
      <p>
        Stating Date: {competition.startDate}:{competition.startDateTime}
      </p>
      <p>
        Ending Date: {competition.endDate}:{competition.endDateTime}
      </p>
      <p>Created by : {competition.creators}</p>

      <div className="flex flex-col mt-2 gap-4">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer ">
          <BiShowAlt size="20"/>&nbsp;Show Competiotion
        </button>
        <div className="flex items-center justify-between ">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
          <MdEdit size="20"/>&nbsp;Update
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2 cursor-pointer">
          <MdDelete size="20"/>&nbsp;Delete
        </button>
        </div>
        <button className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-700 flex items-center justify-center gap-2 cursor-pointer ">
          <FaCode size="20"/>&nbsp;Add Coding
        </button>
      </div>
    </div>
  );
};

export default AdminCompetiotionCart;
