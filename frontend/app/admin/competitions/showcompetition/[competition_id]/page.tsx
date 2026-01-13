"use client";
import BackButton from "@/components/BackButton";
import PopUpMessage from "@/components/PopUpMessage";
import { CompetitionProps, CodingProblemProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const [codingProblems, setCodingProblems] = useState<CodingProblemProps[]>(
    []
  );
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteProblemId, setDeleteProblemId] = useState<number | null>(null);

  const handleDelete = async (problemId: number) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(
        `${url}/CodingProblem/${competition_id}/DeleteProblem/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCodingProblems((prev) =>
        prev.filter((p) => p.competitionProblemId !== problemId)
      );
      setShowDeletePopup(false);
      setDeleteProblemId(null);
      toast.success(result.data.message);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete problem.");
    }
  };

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
        const result1 = await axios.get(
          `${url}/CodingProblem/${competition_id}/GetAllProblems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result1.data);
        setCompetition(result.data.competition || "");
        setCodingProblems(result1.data.problems || []);
        setLoading(false);
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
    fetchData();
  }, []);

  const isEnded: boolean =
  !!competition?.endDateTime &&
  new Date(competition.endDateTime) < new Date();
  console.log(isEnded);

  return (
    <div>
      <BackButton links="/admin/competitions" text="back to competition page" />
      <div className="p-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">
            {competition?.competitionName || "Loading..."}
          </h1>
          <p className="text-base mt-2 text-gray-400">
            {competition?.competitionTagLine || ""}
          </p>
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
              className={`bg-violet-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 ${
                isEnded
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-violet-700 cursor-pointer"
              }`}
              disabled={isEnded }
            >
              <FaCode size="20" />
              &nbsp;Add Coding
            </button>
          </div>

          <div>
            <div className="hidden sm:grid grid-cols-5 text-center font-semibold border border-b-gray-200 rounded-t-2xl mt-4 text-base text-gray-700 bg-gray-200 p-4">
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

            {!loading && codingProblems.length > 0 && (
              <>
                {codingProblems.map((problem) => (
                  <div
                    key={problem.competitionProblemId}
                    className="hidden sm:grid grid-cols-5 text-center border-b border-gray-300 last:border-b-0 p-4 hover:bg-gray-100"
                  >
                    <p>{problem.title}</p>
                    <p className="font-semibold">{problem.totalPoints}</p>
                    <p>0</p>
                    <div className="col-span-2 space-x-8">
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/competitions/showcompetition/${competition_id}/showcodingproblem/${problem.competitionProblemId}`
                          )
                        }
                        className="text-white cursor-pointer"
                      >
                        <div className="px-3 py-2 bg-blue-600 rounded-2xl hover:bg-blue-800">
                          View
                        </div>
                      </button>
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/competitions/showcompetition/${competition_id}/updatecodingproblem/${problem.competitionProblemId}`
                          )
                        }
                        className="text-white cursor-pointer"
                      >
                        <div className="px-3 py-2 bg-emerald-600 rounded-2xl hover:bg-emerald-800">
                          Update
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setDeleteProblemId(problem.competitionProblemId);
                          setShowDeletePopup(true);
                        }}
                        className="text-white cursor-pointer"
                      >
                        <div className="px-3 py-2 bg-red-600 rounded-2xl hover:bg-red-800">
                          Delete
                        </div>
                      </button>
                    </div>
                    {showDeletePopup &&
                      deleteProblemId === problem.competitionProblemId && (
                        <PopUpMessage
                          onClose={() => {
                            setShowDeletePopup(false);
                            setDeleteProblemId(null);
                          }}
                          onConfirm={() =>
                            handleDelete(problem.competitionProblemId)
                          }
                        />
                      )}
                  </div>
                ))}

                <div className="sm:hidden space-y-4 mt-4 text-center">
                  {codingProblems.map((problem, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4 shadow-sm"
                    >
                      <p className="font-semibold text-lg">{problem.title}</p>
                      <div className="mt-2 text-sm space-y-1">
                        <p>
                          <span className="font-medium">Points:</span>{" "}
                          {problem.totalPoints}
                        </p>
                        <p>
                          <span className="font-medium">Submissions:</span> 0
                        </p>
                      </div>
                      <div className="flex gap-8 items-center justify-between mt-4">
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/competitions/showcompetition/${competition_id}/showcodingproblem/${problem.competitionProblemId}`
                            )
                          }
                          className="text-white cursor-pointer"
                        >
                          <div className="px-3 py-2 bg-blue-600 rounded-2xl hover:bg-blue-800">
                            View
                          </div>
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/competitions/showcompetition/${competition_id}/updatecodingproblem/${problem.competitionProblemId}`
                            )
                          }
                          className="text-white cursor-pointer"
                        >
                          <div className="px-3 py-2 bg-emerald-600 rounded-2xl hover:bg-emerald-800">
                            Update
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setDeleteProblemId(problem.competitionProblemId);
                            setShowDeletePopup(true);
                          }}
                          className="text-white cursor-pointer"
                        >
                          <div className="px-3 py-2 bg-red-600 rounded-2xl hover:bg-red-800">
                            Delete
                          </div>
                        </button>
                      </div>
                      {showDeletePopup &&
                        deleteProblemId === problem.competitionProblemId && (
                          <PopUpMessage
                            onClose={() => {
                              setShowDeletePopup(false);
                              setDeleteProblemId(null);
                            }}
                            onConfirm={() =>
                              handleDelete(problem.competitionProblemId)
                            }
                          />
                        )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {!loading && codingProblems.length === 0 && (
              <div className="flex justify-center items-center p-8 text-xl font-bold">
                No coding problems yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
