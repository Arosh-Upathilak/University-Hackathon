import { CompetitionCartUserProps } from "@/constant/Type";
import React from "react";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import StatusComponent from "./StatusComponent";
import { DateTimeConfig } from "@/helper/DateTimeConversion";
import UserCompetitionCartButton from "./UserCompetitionCartButton";

const CompetitionCartUser = ({ competition }: CompetitionCartUserProps) => {
  return (
    <div className="rounded-2xl  bg-white flex flex-col relative">
      <div className="w-full  h-72">
        <Image
          src={competition.competitionImageLink}
          width={500}
          height={500}
          alt={competition.competitionName}
          className="h-full rounded-t-2xl"
        />
        <StatusComponent
          registrationEndDate={competition.registrationEndDateTime}
          startDate={competition.startDateTime}
          endDate={competition.endDateTime}
        />
      </div>
      <div className="p-4">
        <h2>{competition.competitionName}</h2>
        <p className="text-gray-500">
          {competition.competitionTagLine.slice(0, 12)}
        </p>
        <div className="flex flex-col space-y-2 mt-2">
          <hr className="border-gray-500 border-[0.1 px]" />
          <div className="flex items-center text-gray-500">
            <IoCalendarOutline />
            &nbsp; Register End :{" "}
            {DateTimeConfig(competition.registrationEndDateTime)}
          </div>
          <div className="flex items-center text-gray-500">
            <IoCalendarOutline />
            &nbsp; Start : {DateTimeConfig(competition.startDateTime)}
          </div>
          <div className="flex items-center text-gray-500">
            <IoCalendarOutline />
            &nbsp;End : {DateTimeConfig(competition.endDateTime)}
          </div>
          <UserCompetitionCartButton
            registrationEndDate={competition.registrationEndDateTime}
            id={competition.competitionId}
            name={competition.competitionName}
          />
        </div>
      </div>
    </div>
  );
};

export default CompetitionCartUser;
