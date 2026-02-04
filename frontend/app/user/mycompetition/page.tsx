"use client";
import MyCompetitionCart from "@/components/MyCompetitionCart";
import { Competition } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

function MyCompetitionPage() {
  const [userName, setUserName] = useState<String>("");
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { url } = useContext(UserContext);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    setUserName(user.userName);
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${url}/CompetitionRegister/Register/User/Competitions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCompetitions(result.data.result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-[12vh] p-8">
      <div>
        <h1>Welcome back, {userName}!</h1>
        <p>Ready to solve some problems today?</p>
      </div>
      <div>
        <p className="italic text-2xl my-4 font-bold text-[#018dc1]">
          Current Competition
        </p>
        {competitions ? (
          competitions.map((item, index) => (
            <MyCompetitionCart key={index} competition={item as Competition} />
          ))
        ) : (
          <div>No Registed Competitions</div>
        )}
      </div>
    </div>
  );
}

export default MyCompetitionPage;
