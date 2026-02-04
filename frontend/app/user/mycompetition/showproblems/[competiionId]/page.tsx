"use client";
import ProblemCart from "@/components/ProblemCart";
import ProgressBar from "@/components/ProgressBar";
import { difficultyLevel } from "@/constant/data";
import { CodingProblemProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ShowCompetitionPage = () => {
  const { url } = useContext(UserContext);
  const params = useParams();
  const competitionId = params.competiionId;
  const [loading, setLoading] = useState<Boolean>(false);
  const [problems, setProblems] = useState<CodingProblemProps[]>([]);
  const [difficulty, setDifficulty] = useState<Number>(0);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${url}/CodingProblem/${competitionId}/GetAllProblems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProblems(result.data.problems);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-[12vh] p-8">
      <div className="w-full flex justify-between mb-4">
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex gap-2 items-center hover:text-black/75"
        >
          <FaLongArrowAltLeft /> Back
        </button>
        <Link
          href={`/user/mycompetition/showproblems/${competitionId}/leaderBoard`}
          className=" text-[#154855] hover:text-[#0a4d60]  text-2xl  "
        >
          Show the LeaderBoard
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <h1>Coding Challenges</h1>
          <h3 className="text-[#6a7a90]">
            Select a task to earn points for your teop Good luck!
          </h3>
        </div>
        <ProgressBar style={"bg-white w-[25%]"} />
      </div>

      <div className="mt-4 flex justify-between items-center ">
        <div className="flex items-center p-3  rounded-2xl outline-0 w-[40%] gap-4 bg-white">
          <FaSearch color="#7f7f7f" />
          <input
            placeholder="Search challenges by name, tag or topic..."
            className="w-full outline-0"
          />
        </div>
        <div className="flex items-center gap-2 bg-white rounded-2xl p-2">
          {difficultyLevel.map((item, index) => (
            <button
              key={index}
              onClick={() => setDifficulty(item.id)}
              className={`text-[#546173] ${difficulty === item.id && "bg-blue-500 text-white"} flex items-center p-2 cursor-pointer gap-2 rounded-2xl `}
            >
              <item.icon />
              <p>{item.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <div>Loading....</div>}
        {problems ? (
          problems.map((item, index) => {
            return (
              <ProblemCart key={index} problem={item as CodingProblemProps} />
            );
          })
        ) : (
          <div>No Problems Avaliable</div>
        )}
      </div>
    </div>
  );
};

export default ShowCompetitionPage;
