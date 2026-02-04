import axios from "axios";
import { LANGUAGE_VERSIONS } from "./data";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (
  language: string,
  sourceCode: string,
  stdin: string = "" 
) => {
  const response = await API.post("/execute", {
    language,
    version: LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin, 
  });

  return response.data;
};
