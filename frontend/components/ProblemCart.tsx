"use client";
import { CodingProblemProps } from "@/constant/Type";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { numberToDifficulty } from "@/helper/EnumConvertor";
import { FaLongArrowAltRight } from "react-icons/fa";

const ProblemCart = ({ problem }: { problem: CodingProblemProps }) => {
  const param = useParams();
  const competitionId = param.competiionId;
  const [difficultyColour, setDifficultyColour] = useState<string>("");
  const [difficultyBackGroundColour, setDifficultyBackGroundColour] =useState<string>("");

  useEffect(() => {
    if (!problem) return;
    if (problem.difficultyLevel == 0) {
      setDifficultyColour("#22c55e");
      setDifficultyBackGroundColour("#dcfce7")
    } else if (problem.difficultyLevel == 1) {
      setDifficultyColour("#fb923c");
      setDifficultyBackGroundColour("#ffedd5")
    } else if (problem.difficultyLevel == 2) {
      setDifficultyColour("#b91c1c");
      setDifficultyBackGroundColour("#fef2f2")
    }
  }, [problem]);

  return (
    <div className="bg-white rounded-2xl ">
      <div
        className="border-l-4 my-4 p-4"
        style={{ borderLeftColor: difficultyColour }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center  px-2 rounded-2xl" style={{background:difficultyBackGroundColour}}>
            <GoDotFill color={difficultyColour} />
            &nbsp;
            <p className="font-bold" style={{ color: difficultyColour }}>
              {numberToDifficulty(problem.difficultyLevel)}
            </p>
          </div>
          <div>
            <BsCircle color={difficultyColour}/>
          </div>
        </div>
        <div className="mb-2  mt-4">
          <h2>{problem.title}</h2>
        </div>
        <div className="border-[1px] border-[#f6f8fb]" />
        <div className="flex items-center justify-between mt-4">
          <p className="font-bold">{problem.totalPoints} &nbsp;points</p>
          <Link
            href={`/user/mycompetition/showproblems/${competitionId}/${problem.competitionProblemId}`} className="flex items-center font-bold text-[#1e85ed]"
          >
            Solve Chalange &nbsp;<FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProblemCart;
