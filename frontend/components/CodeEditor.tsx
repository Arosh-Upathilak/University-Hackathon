"use client";
import { useRef, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./CodeEditor/LanguageSelector";
import { CODE_SNIPPETS } from "@/constant/data";
import Output from "./CodeEditor/Output";
import { CodeEditorProps } from "@/constant/Type";

const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  const editorRef = useRef<{ getValue: () => string } | null>(null);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (!value) {
      onChange(CODE_SNIPPETS["javascript"]);
    }
  }, []);

  const onMount = (
    editor: { getValue: () => string; focus: () => void },
    monaco: { editor: { defineTheme: (name: string, theme: object) => void; setTheme: (name: string) => void } }
  ) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("customLight", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#f2f7fb",
      },
    });

    monaco.editor.setTheme("customLight");
    editor.focus();
  };

  const onSelect = (lang: string) => {
    setLanguage(lang);
    onChange(CODE_SNIPPETS[lang as keyof typeof CODE_SNIPPETS]);
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <LanguageSelector language={language} onSelect={onSelect} />

          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-[#f2f7fb]">
            <div className="p-2">
              <Editor
                height="72vh"
                language={language}
                value={value}
                onMount={onMount}
                onChange={(val) => onChange(val ?? "")}
                options={{ minimap: { enabled: false } }}
              />
            </div>
          </div>
        </div>

        <Output
          editorRef={editorRef as { current: { getValue: () => string } }}
          language={language}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
