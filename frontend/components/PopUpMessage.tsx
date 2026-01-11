"use client";
import { PopUpMessageProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";


const PopUpMessage = ({ onClose, deleteCompetitionId }: PopUpMessageProps) => {
  const { url } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const onDeleteHandel = async () => {
    try{
        setLoading(true)
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${url}/Competition/DeleteCompetition/${deleteCompetitionId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.data.success){
            onClose();
            setLoading(false)
            toast.success(response.data.message);
            window.location.reload();
        }
    }catch (error: unknown) {
      const axiosError = error as AxiosError<{
        message?: string;
        error?: string;
      }>;

      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Failed to Create Competition.";
      console.log("Submission failed:", error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Delete Competition</h3>
        <p className="mb-4">
          Are you sure you want to delete this competition?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteHandel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpMessage;
