"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "next/navigation";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import { ProblemsProps } from "@/constant/Type";
import Problem from "@/components/Problem";
import CodeSubmit from "@/components/CodeSubmit";

const QuestionShowPage = () => {
  const router = useRouter();
  const params = useParams<{competiionId: string;questionId: string;}>();
  const {competiionId,questionId} = params;
  const [loading, setLoading] = useState<boolean>(false);
  const { url } = useContext(UserContext);
  const [problemDetails, setProblemDetails] = useState<ProblemsProps | null>(null);

  useEffect(() => {
    if (!competiionId || !questionId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${url}/StudentsProblems/GetCompetitionProblems/${competiionId}/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProblemDetails(result.data.problem);
        setLoading(false);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="mt-[12vh]">
      <button
        onClick={() => router.back()}
        className="flex text-black hover:text-black/50 items-center p-4"
      >
        <FaArrowLeft /> &nbsp;Back
      </button>
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-screen">
          <Problem problem={problemDetails as any} />
          <CodeSubmit competiionId={Number(competiionId)} questionId={Number(questionId)}/>
        </div>
      )}
    </div>
  );
};

export default QuestionShowPage;
