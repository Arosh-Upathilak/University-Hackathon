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
  const [userName,setUserName] = useState<string>("");
  const [searchText,setSearchText] = useState<string>("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString? JSON.parse(userString) : null;
    setUserName(user.userName)
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

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCompetitions();
  }, []);

  const filtercompetitions = competition.filter((item)=>{
    const search = searchText.toLowerCase();
    return item.competitionName.toLowerCase().includes(search) || "";
  })

  return (
    <div className="mt-[12vh] p-8 ">
      <h1 className="mb-4">Ready to code {userName}</h1>
      
      <div className="my-4 p-3 bg-white rounded-2xl max-w-[40%] text-xl">
        <input
          placeholder="Enter the compenttion Name"
          className="border-none outline-0"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          { filtercompetitions && filtercompetitions.length>0 ? filtercompetitions.map((competition, index: number) => (
            <CompetitionCartUser key={index} competition={competition as any} />
          )): <p>No Competittions Avalable</p>}
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default UserHome;
