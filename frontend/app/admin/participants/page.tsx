"use client";

import { studentsDummy } from "@/constant/data";
import { CompetitionRegistration } from "@/constant/Type";
import { DateTimeConfig } from "@/helper/DateTimeConversion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const Participants = () => {
  const [loading] = useState(false);
  const router = useRouter();

  const groupedByCompetition: Record<number, CompetitionRegistration[]> = {};

  for (const item of studentsDummy as CompetitionRegistration[]) {
    if (!groupedByCompetition[item.competitionId]) {
      groupedByCompetition[item.competitionId] = [];
    }
    groupedByCompetition[item.competitionId].push(item);
  }

  return (
    <div className="p-8">
      <div className="p-4 rounded-3xl bg-white mt-8">
        <div className="flex items-center justify-between flex-col sm:flex-row">
          <h1 className="text-2xl text-blue-800 font-bold">
            Active & Recent Competition
          </h1>
          <Link
            href="/admin/competitions"
            className="p-2 text-white bg-blue-600 hover:bg-blue-800 rounded-2xl"
          >
            View All
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center p-8 text-lg font-medium">
            Loading participants details...
          </div>
        )}

        {!loading && studentsDummy.length > 0 && (
          <>
            {Object.entries(groupedByCompetition).map(
              ([competitionId, participants]) => (
                <div key={competitionId} className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Competition ID: {competitionId}
                  </h2>

                  <div className="hidden sm:grid grid-cols-4 text-center font-semibold bg-gray-200 p-4 rounded-t-xl mt-4">
                    <p>Competition Id</p>
                    <p>Student Name</p>
                    <p>Registered Date</p>
                    <p>Show Details</p>
                  </div>

                  {participants.map((item) => (
                    <div
                      key={item.competitionRegistrationId}
                      className="hidden sm:grid grid-cols-4 text-center border-b border-b-gray-200 p-4 hover:bg-gray-100"
                    >
                      <p>{item.competitionId}</p>
                      <p>{item.studentName}</p>
                      <p>{DateTimeConfig(item.registeredAt)}</p>
                      <p>
                        <button className="text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                      </p>
                    </div>
                  ))}

                  <div className="sm:hidden space-y-4 mt-4">
                    {participants.map((item) => (
                      <div
                        key={item.competitionRegistrationId}
                        className="border rounded-xl p-4 shadow-sm text-center"
                      >
                        <p className="font-semibold text-lg">
                          Competition ID: {item.competitionId}
                        </p>
                        <p>
                          <span className="font-medium">Student:</span>{" "}
                          {item.studentName}
                        </p>
                        <p>
                          <span className="font-medium">Registered:</span>{" "}
                          {DateTimeConfig(item.registeredAt)}
                        </p>

                        <button className="mt-3 text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </>
        )}

        {!loading && studentsDummy.length === 0 && (
          <div className="flex justify-center items-center p-8 text-xl font-bold">
            No competitions yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
