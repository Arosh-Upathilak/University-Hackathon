import { LANGUAGE_VERSIONS } from "@/constant/data";
import { LanguageSelectorProps } from "@/constant/Type";

const LanguageSelector = ({ language, onSelect }: LanguageSelectorProps) => {
  return (
    <div className="mb-1 flex gap-4  p-4 rounded-2xl">
      <div className="flex items-center justify-center">
        <label className="text-3xl ">Language:</label>
      </div>
      

      <div className="bg-[#f2f7fb] rounded-2xl border border-gray-200 w-[300px]">
        <select
          value={language}
          onChange={(e) => onSelect(e.target.value)}
           className="flex justify-end items-center w-full outline-0 p-2 "
        >
          {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
            <option key={lang} value={lang}>
              {lang} ({version})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
