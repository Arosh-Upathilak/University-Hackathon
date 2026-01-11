"use client";
import { useRef, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./CodeEditor/LanguageSelector";
import { CODE_SNIPPETS } from "@/constant/data";
import Output from "./CodeEditor/Output";
import { CodeEditorProps } from "@/constant/Type";

const CodeEditor = ({ value, language = "javascript", onChange, onLanguageChange }: CodeEditorProps) => {
  const editorRef = useRef<{ getValue: () => string } | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    if (!value) {
      onChange(CODE_SNIPPETS["javascript"]);
    }
  }, []);

  const onMount = (
    editor: any,
    monaco: any
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
    
    setTimeout(() => {
      editor.setPosition({ lineNumber: 1, column: 1 });
      editor.revealLine(1);
    }, 100);
  };

  const onSelect = (lang: string) => {
    setCurrentLanguage(lang);
    onChange(CODE_SNIPPETS[lang as keyof typeof CODE_SNIPPETS]);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <LanguageSelector language={currentLanguage} onSelect={onSelect} />

          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-[#f2f7fb]">
            <div className="p-2">
              <Editor
                height="72vh"
                language={currentLanguage}
                value={value}
                onMount={onMount}
                onChange={(val) => onChange(val ?? "")}
                options={{ 
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>
          </div>
        </div>

        <Output
          editorRef={editorRef as { current: { getValue: () => string } }}
          language={currentLanguage}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
