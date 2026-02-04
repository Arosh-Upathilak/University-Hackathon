"use client";
import { CompetitionRegisterPopUpProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

function CompetitionRegisterPopUp({
  id,
  name,
  onClose,
}: CompetitionRegisterPopUpProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { url } = useContext(UserContext);
  const registerForCompetitions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
       const result = await axios.post(
          `${url}/CompetitionRegister/Register/${id}`,{},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success("Competition Register Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Register Competition")
    } finally {
      onClose();
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
      <div className="p-6 bg-white rounded-2xl space-y-4 border border-gray-400">
        <h1>Register for the Competitions</h1>
        <p>
          Are you want to register for the{" "}
          <span className="font-bold">{name} </span>Competitions?
        </p>
        <div className="w-full flex justify-end items-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            onClick={registerForCompetitions}
          >
            {loading ? "Loading...." : "Okay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompetitionRegisterPopUp;
