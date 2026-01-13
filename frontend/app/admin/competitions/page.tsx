"use client";
import AdminCompetiotionCart from "@/components/AdminCompetiotionCart";
import { CompetitionProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const Competitions = () => {
  const router = useRouter();
  const { url } = useContext(UserContext);
  const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${url}/Competition/GetAllCompetitions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompetitions(result.data.competitions || []);
        setLoading(false);
      } catch (err: unknown) {
        const axiosError = err as AxiosError<{
          message?: string;
          error?: string;
        }>;

        const errorMessage =
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Failed to Fetch Competitions.";
        console.log("Submission failed:", errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mt-4 font-bold">All the Competions</h1>
        <div className=" p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150">
          <button
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => router.push("/admin/competitions/createcompetition")}
          >
            <FaPlus />
            <p>Create Competiton </p>
          </button>
        </div>
      </div>
      <div className="my-4 p-3 bg-white rounded-2xl max-w-[40%] text-xl">
        <input
          placeholder="Enter the compenttion Name"
          className="border-none outline-0"
        />
      </div>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        {loading ? (
          <>
            <div className="flex justify-center items-center p-8 text-lg font-medium">
              Loading competitions...
            </div>
          </>
        ) : (
          competitions.map((competition, index: number) => (
            <AdminCompetiotionCart
              key={index}
              competition={competition as CompetitionProps}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Competitions;
