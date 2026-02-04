"use client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { executeCode } from "@/constant/api";

const Output = ({
  editorRef,
  language,
}: {
  editorRef: { current: { getValue: () => string } | null };
  language: string;
}) => {
  const toast = useToast();
  const [output, setOutput] = useState<string[] | null>(null);
  const [stdin, setStdin] = useState(""); // 🔥 INPUT STATE
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);

      const { run: result } = await executeCode(
        language,
        sourceCode,
        stdin
      );

      setOutput(result.output ? result.output.split("\n") : []);
      setIsError(!!result.stderr);
    } catch (error: unknown) {
      toast({
        title: "Execution error",
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
    <div className="bg-white flex-1">
      <div className="flex justify-between items-center p-4 gap-4">

        <button
          onClick={runCode}
          disabled={isLoading}
          className="p-2 rounded-2xl bg-green-600 text-white hover:bg-green-800 transition-all duration-150 w-[120px]"
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>

      <div>
        <p className="text-xl mb-2">Input(If have any input add this)</p>
        <textarea
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          placeholder="Enter input here (each line = new input)"
          className="w-full h-32 p-2 border rounded-xl outline-none bg-[#f2f7fb]"
        />
      </div>

      <p className="text-xl mb-2">Output</p>
      <div  
        className={`mt-2 h-[55vh] p-2 border border-gray-500 rounded-2xl overflow-auto bg-[#f2f7fb] ${
          isError ? "border-red-500 text-red-500" : "border-gray-800"
        }`}
      >
        
        {output && output.length > 0 ? (
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
