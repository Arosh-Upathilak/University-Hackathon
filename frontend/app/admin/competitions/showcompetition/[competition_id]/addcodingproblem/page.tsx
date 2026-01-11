"use client";
import BackButton from "@/components/BackButton";
import React, { useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RteEditor from "@/components/RichTextEditor";
import { FaPlus } from "react-icons/fa";
import TestCase from "@/components/TestCase";
import CodeEditor from "@/components/CodeEditor";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { UserContext } from "@/context/userContext";
import {  numberToDifficulty } from "@/helper/EnumConvertor";

const AddCodingPage = () => {
  const params = useParams();
  const competition_id = Array.isArray(params.competition_id)
    ? params.competition_id[0]
    : params.competition_id;
  const [nextTestCaseId, setNextTestCaseId] = useState(1);
  const { url } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    AnswerLanguage: "",
    AnswerCode: "",
  });

  const removeTestCase = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      TestCases: prev.TestCases.filter((tc) => tc.id !== id),
    }));
  };

  const updateTestCase = (
    id: number,
    field: "Input" | "Output" | "IsHidden",
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      TestCases: prev.TestCases.map((tc) =>
        tc.id === id ? { ...tc, [field]: value } : tc
      ),
    }));
  };

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      TestCases: [
        ...prev.TestCases,
        {
          id: nextTestCaseId + 1,
          Input: "",
          Output: "",
          IsHidden: false,
        },
      ],
    }));
    setNextTestCaseId((prev) => prev + 1);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(`${url}/CodingProblem/${competition_id}/CreateProblems`, formData,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      if(result.data.success){
        setLoading(false);
        toast.success(result.data.message);
        setFormData({
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
          AnswerLanguage: "",
          AnswerCode: "",
        });
        router.back();
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{
        message?: string;
        error?: string;
      }>;

      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Failed to Create Problem.";
      console.log("Submission failed:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setError("");
    }
  };

  return (
    <div>
      <BackButton
        links={`/admin/competitions/showcompetition/${[competition_id]}`}
        text="back to page"
      />
      <div className="p-8">
        <div>
          <h1 className="text-3xl font-bold">Create Coding Challenge</h1>
          <p>
            Design a new technical problem for the university hackathon. Define
            rules, languages. and test cases.
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
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
                  placeholder="e.g. Reverse a Linked Cist (Recursive)"
                  className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0"
                  required
                  name="Title"
                  onChange={onChangeHandler}
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          DifficultyLevel: Number(e.target.value),
                        }))
                      }
                      name="DifficultyLevel"
                      value={formData.DifficultyLevel}
                      required
                    >
                      <option value={0} disabled>
                        Select Difficalty Level
                      </option>
                      <option value={1}>Easy</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Hard</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <label>
                    Total point <span className="text-red-600">*</span>
                  </label>
                  <input
                    placeholder="100"
                    className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0"
                    required
                    name="TotalPoints"
                    type="number"
                    onChange={onChangeHandler}
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
                  <p>{formData.DifficultyLevel===0 ? "":numberToDifficulty(formData.DifficultyLevel)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Points</p>
                  <p>{formData.TotalPoints}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Number of Test Case</p>
                  <p>{formData.TestCases.length}</p>
                </div>

                <hr className="my-4 h-px bg-gray-300 border-0" />
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center gap-2 cursor-pointer  p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150"
                >
                  {loading? "Creating....":"Create Chalanges"}
                </button>
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
                  onChange={(content: string) =>
                    setFormData((prev) => ({
                      ...prev,
                      chalange_description: content,
                    }))
                  }
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl ">
              <div className="p-4 bg-gray-200 rounded-t-2xl text-2xl">
                Test Cases
              </div>
              <div className="flex items-center justify-end mt-2">
                <button
                  className="flex items-center p-2 cursor-pointer text-blue-600 hover:text-blue-800 transition-all duration-150"
                  type="button"
                  onClick={addTestCase}
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
                      removeTestCase={removeTestCase}
                      updateTestCase={updateTestCase}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl p-4 bg-white">
            <div style={{ scrollMarginTop: '0px' }}>
              <CodeEditor
                language={formData.AnswerLanguage || "javascript"}
                value={formData.AnswerCode}
                onChange={(code) =>
                  setFormData((prev) => ({
                    ...prev,
                    AnswerCode: code,
                  }))
                }
                onLanguageChange={(language) =>
                  setFormData((prev) => ({
                    ...prev,
                    AnswerLanguage: language,
                  }))
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCodingPage;
