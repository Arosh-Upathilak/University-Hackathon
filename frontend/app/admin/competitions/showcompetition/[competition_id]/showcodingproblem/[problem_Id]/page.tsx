"use client";
import BackButton from "@/components/BackButton";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RteEditor from "@/components/RichTextEditor";
import { FaPlus } from "react-icons/fa";
import TestCase from "@/components/TestCase";
import CodeEditor from "@/components/CodeEditor";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { UserContext } from "@/context/userContext";
import { numberToDifficulty } from "@/helper/EnumConvertor";
import { TestCaseItemProps } from "@/constant/Type";

const ShowCodingProblem = () => {
  const params = useParams();
  const competition_id = Array.isArray(params.competition_id)
    ? params.competition_id[0]
    : params.competition_id;
  const problem_Id = Array.isArray(params.problem_Id) ? params.problem_Id[1] : params.problem_Id;
  const [nextTestCaseId, setNextTestCaseId] = useState(1);
  const { url } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    Title: "",
    DifficultyLevel: 0,
    TotalPoints: "",
    Description: "",
    TestCases: [
      {
        id: nextTestCaseId,
        Input: "",
        Output: "",
        IsHidden: false,
      },
    ],
    AnswerLanguage: "python",
    AnswerCode: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}/CodingProblem/${competition_id}/GetProblems/${problem_Id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const problems = response.data;
        
        setFormData({
          Title: problems.title || "",
          DifficultyLevel: problems.difficultyLevel || 0,
          TotalPoints: problems.totalPoints || "",
          Description: problems.description || "",
          TestCases: problems.testCases?.map((tc: { input: string; output: string; isHidden: boolean }, index: number) => ({
            id: index + 1,
            Input: tc.input || "",
            Output: tc.output || "",
            IsHidden: tc.isHidden || false,
          })) || [],
          AnswerLanguage: problems.answerLanguage || "python",
          AnswerCode: problems.answerCode || "",
        });
      } catch (err: unknown) {
        const axiosError = err as AxiosError<{
          message?: string;
          error?: string;
        }>;

        const errorMessage =
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Failed to Create Problem.";
        console.error("Submission failed:", errorMessage);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
        setError("");
      }
    };
    fetchDetails();
  }, []);


  return (
    <div>
      <BackButton
        links={`/admin/competitions/showcompetition/${[competition_id]}`}
        text="back to page"
      />
      <div className="p-8">
        <div>
          <h1 className="text-3xl font-bold">Show Coding Challenge</h1>
          <p>
            Design a new technical problem for the university hackathon. Define
            rules, languages. and test cases.
          </p>
        </div>
        <form>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-2xl">
              <div className="p-4 bg-gray-200 rounded-t-2xl text-2xl">
                General Information
              </div>
              <div className="flex flex-col gap-2 p-4">
                <label>
                  Challenge titte <span className="text-red-600">*</span>
                </label>
                <input
                readOnly
                  placeholder="e.g. Reverse a Linked Cist (Recursive)"
                  className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0"
                  required
                  name="Title"
                  value={formData.Title}
                />
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-2 p-4">
                  <label>
                    Difficalty Level <span className="text-red-600">*</span>
                  </label>
                  <div className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 ">
                    <select
                      className="flex justify-end items-center w-full outline-0"
                      name="DifficultyLevel"
                      value={formData.DifficultyLevel}
                      required
                      disabled
                    >
                      <option  disabled>
                        Select Difficalty Level
                      </option>
                      <option value={0}>Easy</option>
                      <option value={1}>Medium</option>
                      <option value={2}>Hard</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <label>
                    Total point <span className="text-red-600">*</span>
                  </label>
                  <input
                    readOnly
                    placeholder="100"
                    className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0"
                    required
                    name="TotalPoints"
                    type="number"
                    value={formData.TotalPoints}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl ">
              <div className="p-4 bg-gray-200 rounded-t-2xl text-2xl">
                Summery
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Complexity</p>
                  <p>
                    {formData.DifficultyLevel === 0
                      ? ""
                      : numberToDifficulty(formData.DifficultyLevel)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Points</p>
                  <p>{formData.TotalPoints}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Number of Test Case</p>
                  <p>{formData.TestCases.length}</p>
                </div>

              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-2xl">
              <div className="p-4 bg-gray-200 rounded-t-2xl text-2xl">
                Problem Description
              </div>
              <div className="flex flex-col gap-2 p-4">
                <label>
                  Description <span className="text-red-600">*</span>
                </label>
                <RteEditor
                  placeholder="Enter the Problem description"
                  value={formData.Description}
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl ">
              <div className="p-4 bg-gray-200 rounded-t-2xl text-2xl">
                Test Cases
              </div>
              <div className="flex items-center justify-end mt-2">
                <button
                  className="flex items-center p-2 cursor-pointer text-blue-600 pointer-events-none transition-all duration-150"
                  type="button"
                >
                  <FaPlus size={20} />
                  &nbsp;Add Case{" "}
                </button>
              </div>

              <div className="px-4 flex flex-col ">
                {formData.TestCases.map((item, index) => {
                  return (
                    <TestCase
                      index={index}
                      key={index}
                      item={item}
                      removeTestCase={()=>("")}
                      updateTestCase={()=>("")}
                      style="pointer-events-none"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl p-4 bg-white">
            <div style={{ scrollMarginTop: "0px" }}>
              <CodeEditor
              key={formData.AnswerLanguage || "python"}
              language={formData.AnswerLanguage || "python"}
                value={formData.AnswerCode}
                onChange={() => {}}
                onLanguageChange={() => {}}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowCodingProblem;
