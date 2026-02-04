"use client";
import { UserCompetitionCartButtonProps } from "@/constant/Type";
import React, {  useEffect, useState } from "react";
import CompetitionRegisterPopUp from "./CompetitionRegisterPopUp";

function UserCompetitionCartButton({
  registrationEndDate,
  id,
  name
}: UserCompetitionCartButtonProps) {
  const [buttonText, setButtonText] = useState<string>("");
  const [buttonStyle, setButtonStyle] = useState<string>("");
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const onClose = ()=>{
    setShowPopUp(false)
  }

  useEffect(() => {
    const now = new Date();
    const register = new Date(registrationEndDate);
    if (register > now) {
      setButtonText("Register");
      setButtonStyle(
        "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer  transition-all duration-200",
      );
    } else {
      setButtonText("Lock the Competition");
      setButtonStyle("bg-[#f1f5f8] text-[#626d7e] pointer-events-none");
    }
  }, []);

  return (
    <>
    {showPopUp && <CompetitionRegisterPopUp name={name} id={id} onClose={onClose}/>}
      <button
        className={`py-1 border w-full rounded-xl ${buttonStyle}`}
        onClick={()=>setShowPopUp(true)}
      >
        {buttonText}
      </button>
      
    </>
  );
}

export default UserCompetitionCartButton;
