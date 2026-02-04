import { ProgressBarProps } from "@/constant/Type";
import React from "react";

const ProgressBar = ({style}:ProgressBarProps) => {
  return (
    <div className={`${style?? "bg-[#f8fafc]" } rounded-3xl p-4`}>
        <div className="mb-4 flex justify-between gap-4">
            <p className="font-bold text-[#3b485b]">Competition Progress</p>
            <p className="font-bold text-[#137fec]">65%</p>
        </div>
      <div className="w-full h-4 bg-gray-300 rounded-3xl overflow-hidden">
        <div className="h-full bg-blue-500" style={{ width: "75%" }} />
      </div>
    </div>
  );
};

export default ProgressBar;
