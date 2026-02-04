"use client";
import React, { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import { codeSnippets } from "@/constant/data";
import { FaPlay } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { CodeSubmitProps, UserSubmitProps } from "@/constant/Type";
import { UserContext } from "@/context/userContext";
import axios from "axios";

const CodeSubmit = ({ competiionId, questionId }: CodeSubmitProps) => {
  const [language, setLanguage] = useState<string>(codeSnippets[0].language);
  const [code, setCode] = useState<string>(codeSnippets[0].codeSnippet);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [userSubmitData, setUserSubmitData] = useState<UserSubmitProps>();
  const { url } = useContext(UserContext);
  
  const hadleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectlanguage = e.target.value;
    const selectcodeSnippet = codeSnippets.find(
      (item) => item.language === selectlanguage,
    )?.codeSnippet;
    setLanguage(e.target.value);
    setCode(selectcodeSnippet || "");
  };
  const onReload = () => {
    const selectcodeSnippet = codeSnippets.find(
      (item) => item.language === language,
    )?.codeSnippet;
    setCode(selectcodeSnippet || "");
  };
  const onClear = () => {
    setCode("");
  };

  const onRunCode = async () => {
    const payload: UserSubmitProps = {
      language,
      sourceCode: code,
    };
    try{
      setIsRunning(true);
      const token = localStorage.getItem("token")
      const result = await axios.post(`${url}/StudentsProblems/GetCompetitionHiddenTestCase/${competiionId}/${questionId}`,payload,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(result.data.hiddenTestCase);
      setIsRunning(false);
    }catch(error:unknown){
      console.error(error);
    }finally{
      setIsRunning(false);
    }
    
  };

  return (
    <div className="bg-white border border-[#e2e8f0]">
      <div className="p-4 flex gap-4 items-center">
        <select
          className="px-4 py-2 bg-[#f1f5f9] rounded-2xl w-[30%] border-2 border-[#e2e8f0] outline-0"
          value={language}
          onChange={hadleChange}
          disabled={isRunning}
        >
          {codeSnippets.map((item) => (
            <option key={item.id} value={item.language}>
              {item.displayName}
            </option>
          ))}
        </select>
        <button
          className="disabled:cursor-not-allowed cursor-pointer text-gray-400 hover:text-gray-200 "
          disabled={isRunning}
          onClick={onReload}
        >
          ⟳
        </button>
      </div>
      <div className="border-[1px] border-[#e2e8f0] " />
      <Editor
        height="60vh"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          padding: { top: 16 },
          tabSize: 2,
        }}
      />
      <div className="border p-2 flex items-center justify-between bg-[#f1f5f9] border-[#e2e8f0] text-[#64748b]">
        <p className="font-bold ">Console Output</p>
        <button
          className="underline cursor-pointer disabled:cursor-not-allowed"
          disabled={isRunning}
          onClick={onClear}
        >
          Clear
        </button>
      </div>
      <div className="min-h-[300px] bg-[#f8fafc]"></div>
      <div className="bg-gray-200 p-4 flex items-center justify-between gap-4 fixed bottom-0 w-[50%]">
        <button
          className="flex items-center text-[#334155] p-2 border rounded-2xl bg-white border-[#cbd5e1] hover:bg-gray-100  cursor-pointer disabled:cursor-not-allowed"
          disabled={isRunning}
          onClick={onRunCode}
        >
          <FaPlay /> &nbsp;{isRunning? "Runnig....." : "Run Code"} 
        </button>
        <button
          className="flex items-center text-white p-2  rounded-2xl bg-[#137fec]  hover:bg-[#3994f0]  cursor-pointer disabled:cursor-not-allowed"
          disabled={isRunning}
        
        >
          <MdCloudUpload /> &nbsp; Submit Code
        </button>
      </div>
    </div>
  );
};

export default CodeSubmit;
