"use client";
import BackButton from "@/components/BackButton";
import { dummyCompetitions } from "@/constant/data";
import { CompetitionProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";

const ShowPage = () => {
  const router = useRouter();
  const params = useParams();
  const competition_id = Array.isArray(params.competition_id) 
    ? params.competition_id[0] 
    : params.competition_id;
  const [loading, setLoading] = useState(false);
  const { url } = useContext(UserContext);
  const [competition, setCompetition] = useState<CompetitionProps>();

   useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const result = await axios.get(
            `${url}/Competition/GetCompetitionById/${competition_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCompetition(result.data.competition || "");
          setLoading(false)
        } catch (err: unknown) {
          const axiosError = err as AxiosError<{
            message?: string;
            error?: string;
          }>;
  
          const errorMessage =
            axiosError.response?.data?.error ||
            axiosError.message ||
            "Failed to Fetch Competition.";
          console.log("Submission failed:", errorMessage);
        } finally {
          setLoading(false);
        }
      };
      fetchData()
    }, []);

  return (
    <div>
      <BackButton links="/admin/competitions" text="back to competition page" />
      <div className="p-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{competition?.competitionName || 'Loading...'}</h1>
          <p className="text-base mt-2 text-gray-400">{competition?.competitionTagLine || ''}</p>
        </div>
        <div className="mt-4 bg-white rounded-2xl p-4">
          <div className=" ">
            <button
              onClick={() =>
                router.push(
                  `/admin/competitions/showcompetition/${[
                    competition_id,
                  ]}/addcodingproblem`
                )
              }
              className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-700 flex items-center justify-center gap-2 cursor-pointer "
            >
              <FaCode size="20" />
              &nbsp;Add Coding
            </button>
          </div>

          <div>
            <div className="hidden sm:grid grid-cols-5 text-center font-semibold border-b-gray-200 rounded-t-2xl mt-4 text-base text-gray-700 bg-gray-200 p-4">
              <p>Question Name</p>
              <p>Points</p>
              <p>Total Submitions</p>
              <p className="col-span-2">Actions</p>
            </div>

            {loading && (
              <div className="flex justify-center items-center p-8 text-lg font-medium">
                Loading competitions...
              </div>
            )}

            {!loading && dummyCompetitions.length > 0 && (
              <>
                {dummyCompetitions.map((item) => (
                  <div
                    key={item.id}
                    className="hidden sm:grid grid-cols-5 text-center border-b border-gray-300 last:border-b-0 p-4 hover:bg-gray-100 "
                  >
                    <p>{item.name}</p>
                    <p
                      className={` font-semibold ${
                        item.status === "Live"
                          ? "text-green-600"
                          : item.status === "Upcoming"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {item.status}
                    </p>
                    <p>{item.registered}</p>

                    <div className="col-span-2 space-x-8">
                      <button className="text-white cursor-pointer">
                        <div className="px-3 py-2 bg-blue-600 rounded-2xl hover:bg-blue-800">
                          View
                        </div>
                      </button>
                      <button className="text-white cursor-pointer">
                        <div className="px-3 py-2 bg-emerald-600 rounded-2xl hover:bg-emerald-800">
                          Update
                        </div>
                      </button>
                      <button className="text-white cursor-pointer">
                        <div className="px-3 py-2 bg-red-600 rounded-2xl hover:bg-red-800">
                          Delete
                        </div>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="sm:hidden space-y-4 mt-4 text-center">
                  {dummyCompetitions.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-xl p-4 shadow-sm"
                    >
                      <p className="font-semibold text-lg">{item.name}</p>

                      <div className="mt-2 text-sm space-y-1">
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span
                            className={
                              item.status === "Live"
                                ? "text-green-600"
                                : item.status === "Upcoming"
                                ? "text-blue-600"
                                : "text-gray-500"
                            }
                          >
                            {item.status}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">Registered:</span>{" "}
                          {item.registered}
                        </p>
                      </div>
                      <div className="flex gap-8 items-center justify-between mt-4">
                        <button className="text-white cursor-pointer">
                          <div className="px-3 py-2 bg-blue-600 rounded-2xl hover:bg-blue-800">
                            View
                          </div>
                        </button>
                        <button className="text-white cursor-pointer">
                          <div className="px-3 py-2 bg-emerald-600 rounded-2xl hover:bg-emerald-800">
                            Update
                          </div>
                        </button>
                        <button className="text-white cursor-pointer">
                          <div className="px-3 py-2 bg-red-600 rounded-2xl hover:bg-red-800">
                            Delete
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!loading && dummyCompetitions.length === 0 && (
              <div className="flex justify-center items-center p-8 text-xl font-bold">
                No competitions yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
