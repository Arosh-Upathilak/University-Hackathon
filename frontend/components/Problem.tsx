"use client";
import React from "react";
import { ProblemsProps } from "@/constant/Type";
import DificulyLevel from "./DificulyLevel";
import { MdStars } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

const Problem = ({ problem }: { problem: ProblemsProps }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <DificulyLevel levelNumber={problem?.difficultyLevel as any} />
        <div className="flex text-blue-600 items-center gap-1">
          <MdStars />
          <p className="font-bold">{problem?.totalPoints} &nbsp;Points</p>
        </div>
      </div>
      <h1 className="my-4">{problem?.title}</h1>
      <div className="border border-[#e7ecf2] mb-4" />
      <div>
        <div className="font-bold flex items-center text-xl">
          <FaFileAlt color={"#0000FF"} /> &nbsp;Problem Statement
        </div>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{
            __html: problem?.description ?? "",
          }}
        />
      </div>
      <div className="mb-8">
        <p className="text-xl font-bold">Examples</p>
        <table className="mt-4  w-full bg-[#f8fafc] rounded-t-2xl border border-[#e2e8f0] border-separate ">
          <thead>
            <tr className="border border-[#eaeff5] ">
              <th className="p-4 font-bold text-[#68788e]">Input</th>
              <th className="p-4 font-bold text-[#68788e]">Output</th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {problem?.testCases.map(
              (item, index) =>
                !item.isHidden && (
                  <tr key={index}>
                    <td className="p-4">
                      <div className="whitespace-pre-wrap">{item.input}</div>
                    </td>
                    <td className="p-4 flex justify-start">{item.output}</td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problem;
