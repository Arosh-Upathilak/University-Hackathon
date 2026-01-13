"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import type { Level } from "@tiptap/extension-heading";
import { useEffect } from "react";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
} from "react-icons/fa";
import { RichTextEditorProps } from "@/constant/Type";

const Tiptap = ({ placeholder, value = "", onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl " +
          "focus:outline-none min-h-[250px] " +
          "prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col w-full">
      <div className="p-2 rounded-t-2xl flex bg-gray-100 space-x-2">
        <div className="relative">
          <button
            type="button"
            className={`p-2 cursor-pointer ${
              editor.isActive("heading") ? "bg-gray-300" : ""
            }`}
          >
            <FaHeading />
          </button>

          <select
            onChange={(e) => {
              const level = Number(e.target.value) as Level;
              editor.chain().focus().toggleHeading({ level }).run();
            }}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <option key={level} value={level}>
                H{level}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 cursor-pointer ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        >
          <FaBold />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 cursor-pointer ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
        >
          <FaItalic />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 cursor-pointer ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          <FaUnderline />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 cursor-pointer ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
        >
          <FaListUl />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 cursor-pointer ${
            editor.isActive("orderedList") ? "bg-gray-300" : ""
          }`}
        >
          <FaListOl />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="border rounded-b-2xl p-2 bg-[#f2f7fb] outline-0 border-gray-200"
      />
    </div>
  );
};

export default Tiptap;
