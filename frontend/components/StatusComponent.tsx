"use client";
import React, { useEffect, useState } from "react";
import { StatusCompenentProps } from "@/constant/Type";

function StatusComponent({
  registrationEndDate,
  startDate,
  endDate,
}: StatusCompenentProps) {
  const [state, setState] = useState<string>("");
  const [stateStyle,setStateStyle] = useState<string>("");
  
  useEffect(() => {
    const now = new Date();
    const register = new Date(registrationEndDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < register) {
      setState("UpComming");
      setStateStyle("bg-[#DBEAFE] text-[#1D4ED8]")
    } else if (start <= now && now <= end) {
      setState("Live");
      setStateStyle("bg-[#DCFCE7] text-[#15803D] ")
    } else {
      setState("Finished");
      setStateStyle("bg-[#F3F4F6] text-[#F3F4F6] ")
    }
  }, []);

  return (
    <div className={`z-10 top-4 right-4 absolute px-2 py-1 rounded-2xl ${stateStyle} ` }>
      {state}
    </div>
  );
}

export default StatusComponent;
