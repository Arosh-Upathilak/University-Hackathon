"use client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { executeCode } from "@/constant/api";

const Output = ({
  editorRef,
  language,
}: {
  editorRef: { current: { getValue: () => string } };
  language: string;
}) => {
  const toast = useToast();
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error: unknown) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description:
          error instanceof Error ? error.message : "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex-1 ">
      <div className="flex justify-between items-center p-4 gap-4">
        <p className="text-3xl">Output</p>

        <div className="p-2 rounded-2xl bg-green-600 text-white hover:bg-green-800 transition-all duration-150 w-[100px] flex flex-row items-center justify-center gap-2 cursor-pointer">
        <button
          onClick={runCode}
          disabled={isLoading}
          className="cursor-pointer"
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
        </div>
      </div>

      <div
        className={`mt-px h-[75vh] p-2 border border-gray-200 rounded-2xl overflow-hidden bg-[#f2f7fb]${
          isError
            ? "border-red-500 text-red-500"
            : "border-gray-800 text-gray-800"
        }`}
      >
        {output ? (
          output.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p className="text-gray-400">
            Click &quot;Run Code&quot; to see the output here
          </p>
        )}
      </div>
    </div>
  );
};

export default Output;
