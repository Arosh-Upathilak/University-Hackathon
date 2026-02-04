import { TestCaseProps } from "@/constant/Type";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const TestCase = ({ index,item, removeTestCase, updateTestCase,style }: TestCaseProps) => {
  return (
    <div className="p-4 bg-gray-200 rounded-2xl mb-4">
      <div className="flex items-start justify-between">
        <p className="font-bold">TEST CASE #{index+1}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={item.IsHidden}
              onChange={(e) =>
                updateTestCase(item.id, "IsHidden", e.target.checked)
              }
            />
            <p>Hidden</p>
          </div>
          <button onClick={() => removeTestCase(item.id)} className={`${style}`}>
            <RiDeleteBinLine
              size={20}
              className="cursor-pointer hover:text-black/50"
            />
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <div className="bg-gray-300 p-4 rounded-2xl flex flex-col gap-3">
          <label>
            Input <span className="text-red-600">*</span>
          </label>
          <textarea
            required
            rows={1}
            placeholder="e.g. [1,2,3,4,5]"
            className="p-2 bg-gray-100/50 rounded-2xl outline-0 "
            value={item.Input}
            onChange={(e) =>{
              e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              updateTestCase(item.id, "Input", e.target.value)
            }}
          />
        </div>
        <div className="bg-gray-300  p-4 rounded-2xl flex flex-col gap-3">
          <label>
            Expected Output <span className="text-red-600">*</span>
          </label>
          <textarea
            required
            rows={1}
            placeholder="e.g. [1,2,3,4,5]"
            className="p-2 bg-gray-100/50 rounded-2xl outline-0"
            value={item.Output}
            onChange={(e) =>{
              e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              updateTestCase(item.id, "Output", e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestCase;
