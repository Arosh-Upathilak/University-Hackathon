"use client";
import CompetitionCartUser from "@/components/CompetitionCartUser";
import { CompetitionCartProps, CompetitionProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserHome = () => {
  const [competition, setCompetition] = useState<CompetitionCartProps[]>([]);
  const { url } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${url}/Competition/GetUserCompetitions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCompetition(result.data.competitions || []);
        setLoading(false);
        console.log(result.data.competitions);
        console.log(competition);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCompetitions();
  }, []);

  return (
    <div className="mt-[12vh] p-8 ">
      {!loading ? (
        <div className="grid grid-cols-4 gap-6">
          {competition.map((competition, index: number) => (
            <CompetitionCartUser key={index} competition={competition as any} />
          ))}
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default UserHome;
