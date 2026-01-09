"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import RteEditor from "@/components/RichTextEditor";
import { FaPlus } from "react-icons/fa";
import TestCase from "@/components/TestCase";
import CodeEditor from "@/components/CodeEditor";

const AddCodingPage = () => {
  const params = useParams();
  const competition_id = params.competition_id as string;
  const [nextTestCaseId, setNextTestCaseId] = useState(1);

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [formData, setFormData] = useState({
    chalange_title: "",
    chalange_difficulty_level: "",
    chalange_total_point: "",
    chalange_description: "",
    chalange_testcases: [
      {
        id: nextTestCaseId,
        chalange_testcase_input: "",
        chalange_testcase_output: "",
        hidden: false,
      },
    ],
    chalange_answer_code: "",
  });

  const removeTestCase = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      chalange_testcases: prev.chalange_testcases.filter((tc) => tc.id !== id),
    }));
  };

  const updateTestCase = (
    id: number,
    field: "chalange_testcase_input" | "chalange_testcase_output" | "hidden",
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      chalange_testcases: prev.chalange_testcases.map((tc) =>
        tc.id === id ? { ...tc, [field]: value } : tc
      ),
    }));
  };

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      chalange_testcases: [
        ...prev.chalange_testcases,
        {
          id: nextTestCaseId + 1,
          chalange_testcase_input: "",
          chalange_testcase_output: "",
          hidden: false,
        },
      ],
    }));
    setNextTestCaseId((prev) => prev + 1);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
                  name="chalange_title"
                  onChange={onChangeHandler}
                  value={formData.chalange_title}
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
                      onChange={onChangeHandler}
                      name="chalange_difficulty_level"
                      value={formData.chalange_difficulty_level}
                      required
                    >
                      <option value="" disabled>
                        Select Difficalty Level
                      </option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
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
                    name="chalange_total_point"
                    type="number"
                    onChange={onChangeHandler}
                    value={formData.chalange_total_point}
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
                  <p>{formData.chalange_difficulty_level}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Points</p>
                  <p>{formData.chalange_total_point}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Number of Test Case</p>
                  <p>{formData.chalange_testcases.length}</p>
                </div>

                <hr className="my-4 h-px bg-gray-300 border-0" />
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center gap-2 cursor-pointer  p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150"
                >
                  Create Chalanges
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
                  value={formData.chalange_description}
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
                  className="flex items-center p-2 text-blue-600 hover:text-blue-800 transition-all duration-150"
                  type="button"
                  onClick={addTestCase}
                >
                  <FaPlus size={20} />
                  &nbsp;Add Case{" "}
                </button>
              </div>

              <div className="px-4 flex flex-col ">
                {formData.chalange_testcases.map((item, index) => {
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
            <CodeEditor
              value={formData.chalange_answer_code}
              onChange={(code) =>
                setFormData((prev) => ({
                  ...prev,
                  chalange_answer_code: code,
                }))
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCodingPage;
