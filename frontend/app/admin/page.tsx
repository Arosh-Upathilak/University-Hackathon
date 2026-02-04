"use client";
import AdminCart from "@/components/AdminCart";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoRadio } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { GiOlive } from "react-icons/gi";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { CompetitionProps } from "@/constant/Type";
import { DateTimeConfig,CompetitionStatus } from '@/helper/DateTimeConversion'

const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { url } = useContext(UserContext);
  const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${url}/Competition/GetAllCompetitions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompetitions(result.data.competitions || [])
        setLoading(false)
      } catch (err: unknown) {
        const axiosError = err as AxiosError<{
          message?: string;
          error?: string;
        }>;

        const errorMessage =
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Failed to Fetch Competitions.";
        console.error("Submission failed:", errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  }, []);
  
  return (
    <div className="p-8">
      <div>
        <div className="flex items-center justify-between flex-col sm:flex-row">
          <div className="flex flex-col ">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-600 text-lg">
              Manage hackathons, monitor real-time submissions, and oversee
              grading,
            </p>
          </div>
          <div className=" p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150">
            <button
              className="flex flex-row items-center gap-2 cursor-pointer"
              onClick={() =>
                router.push("/admin/competitions/createcompetition")
              }
            >
              <FaPlus />
              <p>Create Competiton </p>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white mt-8">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <h1 className="text-2xl text-blue-800 font-bold">
              Active & Recent Competition
            </h1>
            <Link
              href="/admin/competitions"
              className="cursor-pointer p-2 text-white bg-blue-600 hover:bg-blue-800 rounded-2xl transition-all duration-150"
            >
              View All
            </Link>
          </div>
          <div className="hidden sm:grid grid-cols-6 text-center font-semibold border-b-gray-200 rounded-t-2xl mt-4 text-base text-gray-700 bg-gray-200 p-4">
            <p>Competition Name</p>
            <p>Status</p>
            <p>Registered Students</p>
            <p>Starting Date</p>
            <p>End Date</p>
            <p>Actions</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center p-8 text-lg font-medium">
              Loading competitions...
            </div>
          )}

          {!loading && competitions.length > 0 && (
            <>
              {competitions.map((item,index) => (
                <div
                  key={index}
                  className="hidden sm:grid grid-cols-6 text-center border-b border-gray-300 last:border-b-0 p-4 hover:bg-gray-100 "
                >
                  <p>{item.competitionName}</p>
                  <p
                    className={` font-semibold ${CompetitionStatus(item.startDateTime,item.endDateTime)=== "Live"
                        ? "text-green-600"
                        : CompetitionStatus(item.startDateTime,item.endDateTime) === "Upcoming"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >{CompetitionStatus(item.startDateTime,item.endDateTime)}
                  </p>
                  <p>{DateTimeConfig(item.registrationEndDateTime)}</p>
                  <div>
                    <p>{DateTimeConfig(item.startDateTime)}</p>
                  </div>
                  <div>
                    <p>{DateTimeConfig(item.endDateTime)}</p>
                  </div>

                  <p>
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={()=>router.push(`/admin/competitions/showcompetition/${item.competitionId}`)}>
                      View Details
                    </button>
                  </p>
                </div>
              ))}

              <div className="sm:hidden space-y-4 mt-4 text-center">
                {competitions.map((item,index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 shadow-sm"
                  >
                    <p className="font-semibold text-lg">{item.competitionName}</p>

                    <div className="mt-2 text-sm space-y-1">
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={
                            CompetitionStatus(item.startDateTime,item.endDateTime) === "Live"
                              ? "text-green-600"
                              : CompetitionStatus(item.startDateTime,item.endDateTime) === "Upcoming"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }
                        >
                          {CompetitionStatus(item.startDateTime,item.endDateTime)}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Registered:</span>{" "}
                       {DateTimeConfig(item.registrationEndDateTime)}
                      </p>
                      <p>
                        <span className="font-medium">Start:</span>{" "}
                        {DateTimeConfig(item.startDateTime)}
                      </p>
                      <p>
                        <span className="font-medium">End:</span>{""} {DateTimeConfig(item.endDateTime)}
                      </p>
                    </div>

                    <button className="mt-3 text-blue-600 hover:text-blue-800 cursor-pointer" onClick={()=>router.push(`/admin/competitions/showcompetition/${item.competitionId}`)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          {!loading && competitions.length === 0 && (
            <div className="flex justify-center items-center p-8 text-xl font-bold">
              No competitions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
