"use client";
import React, { useEffect, useState } from "react";
import { DifficultyLevelProps } from "@/constant/Type";
import { numberToDifficulty } from "@/helper/EnumConvertor";
import { GoDotFill } from "react-icons/go";

const DificulyLevel = ({ levelNumber }: DifficultyLevelProps) => {
  const [difficultyColour, setDifficultyColour] = useState<string>("");
  const [difficultyBackGroundColour, setDifficultyBackGroundColour] =
    useState<string>("");
  useEffect(() => {
    if (levelNumber === undefined || levelNumber === null) return;
    if (levelNumber == 0) {
      setDifficultyColour("#22c55e");
      setDifficultyBackGroundColour("#dcfce7");
    } else if (levelNumber == 1) {
      setDifficultyColour("#fb923c");
      setDifficultyBackGroundColour("#ffedd5");
    } else if (levelNumber == 2) {
      setDifficultyColour("#b91c1c");
      setDifficultyBackGroundColour("#fef2f2");
    }
  }, [levelNumber]);
  return (
    <div
      className="flex items-center  px-2 rounded-2xl border"
      style={{ background: difficultyBackGroundColour,borderColor:difficultyColour }}
    >
      <GoDotFill color={difficultyColour} />
      &nbsp;
      <p className="font-bold" style={{ color: difficultyColour }}>
        {numberToDifficulty(levelNumber)}
      </p>
    </div>
  );
};

export default DificulyLevel;
