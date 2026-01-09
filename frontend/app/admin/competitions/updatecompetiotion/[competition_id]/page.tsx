"use client";
import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { IoTrashBin } from "react-icons/io5";
import RteEditor from "@/components/RichTextEditor";
import Image from "next/image";
import { uploadFileToCloudinary } from "@/helper/UploadFileToCloudinary";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";

const Updatecompetiotion = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    competition_name: "",
    competition_tag_line: "",
    competition_description: "",
    competition_image_link: "",
    competition_start_date_time: "",
    competition_end_date_time: "",
    competition_regiserend_date_time: "",
    competition_visiabilty_for_student: false,
    competition_rules: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const preview = selectedImage ? URL.createObjectURL(selectedImage) : null;
  const router = useRouter();
  const params = useParams();
  
  const competition_id = params.competition_id as string;

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl = "";
      if (selectedImage) {
        console.log("Uploading image:", selectedImage.name);
        imageUrl = await uploadFileToCloudinary(selectedImage);
      }

      const payload = {
        ...formData,
        competition_image_link: imageUrl,
      };

      setFormData({
        competition_name: "",
        competition_tag_line: "",
        competition_description: "",
        competition_image_link: "",
        competition_start_date_time: "",
        competition_end_date_time: "",
        competition_regiserend_date_time: "",
        competition_visiabilty_for_student: false,
        competition_rules: "",
      });
      setSelectedImage(null);
      toast.success("Image upload success");
      setLoading(false);
      console.log("FINAL PAYLOAD:", payload);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{
        message?: string;
        error?: string;
      }>;

      console.log("Submission failed:", error);
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Update New Competition</h1>
          <p className="text-gray-400 mt-2">
            Draft a new coding problem for the hackathon,
          </p>
        </div>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl col-span-2">
            <div className="p-4 bg-gray-200 rounded-t-2xl text-2xl">
              General Information
            </div>

            <div>
              <div className="flex flex-col gap-2 p-4">
                <label>
                  Competition Name <span className="text-red-600">*</span>
                </label>
                <input
                  placeholder="e.g. Winter Cool test"
                  className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0"
                  onChange={onChangeHandler}
                  required
                  value={formData.competition_name}
                  name="competition_name"
                />
              </div>

              <div className="flex flex-col gap-2 p-4">
                <label>Short Tag line</label>
                <input
                  placeholder="e.g. Innovate for a better future"
                  className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0"
                  onChange={onChangeHandler}
                  value={formData.competition_tag_line}
                  name="competition_tag_line"
                />
                <p className="text-sm text-gray-400">
                  A brief catcy pharse shown on the card.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-col gap-2 ">
                  <label>
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.competition_description}
                    onChange={onChangeHandler}
                    placeholder="Describe the rules, goals, and details of the hackathon..."
                    className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0 min-h-32"
                    rows={3}
                    required
                    name="competition_description"
                  />
                </div>
                <div className="flex items-center justify-start gap-4">
                  <label>
                    Visiable for Students
                  </label>
                  <input type="checkbox" className="w-3 h-3" onChange={onChangeHandler} 
                  name="competition_visiabilty_for_student"
                  checked={formData.competition_visiabilty_for_student}/>
                </div>
  
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl  flex flex-col gap-2">
              <div className=" p-4 bg-gray-200 rounded-t-2xl text-2xl">
                Banner Image
              </div>

              <div className="p-4">
                <div className="p-6 border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-gray-600">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    required
                    onChange={(e) =>
                      setSelectedImage(e.target.files?.[0] || null)
                    }
                  />

                  {!preview ? (
                    <label
                      htmlFor="imageUpload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <CiImageOn size={40} className="text-gray-500" />
                      <span className="text-sm text-gray-500">
                        Upload Image
                      </span>
                    </label>
                  ) : (
                    <div
                      className="flex flex-col items-center gap-3 "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        width={200}
                        height={200}
                        src={preview}
                        alt="Preview"
                        className="w-full rounded-2xl object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-2xl text-white"
                      >
                        <IoTrashBin />
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl ">
              <div className=" p-4 bg-gray-200 rounded-t-2xl text-2xl">
                Timeline & Schedule
              </div>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2">
                  <label>
                    Starting Date & Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="bg-[#f2f7fb] rounded-2xl border border-gray-200 outline-0 p-2"
                    onChange={onChangeHandler}
                    value={formData.competition_start_date_time}
                    name="competition_start_date_time"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>
                    Ending Date & Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="bg-[#f2f7fb] rounded-2xl border border-gray-200 outline-0 p-2"
                    onChange={onChangeHandler}
                    value={formData.competition_end_date_time}
                    name="competition_end_date_time"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>
                    Regiser Deadline Date & Time{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="bg-[#f2f7fb] rounded-2xl border border-gray-200 outline-0 p-2"
                    onChange={onChangeHandler}
                    value={formData.competition_regiserend_date_time}
                    name="competition_regiserend_date_time"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl mt-4 w-full">
          <div className=" p-4 bg-gray-200 rounded-t-2xl text-2xl">
            Rules and Regulations
          </div>
          <div className="flex flex-col gap-2 p-4">
            <label>
              Add Rules and Regulations <span className="text-red-600">*</span>
            </label>
            <RteEditor
              placeholder="Enter the Rules and Regulations"
              value={formData.competition_rules}
              onChange={(content: string) =>
                setFormData((prev) => ({
                  ...prev,
                  competition_rules: content,
                }))
              }
            />
          </div>
          <p className="p-4">
            {error && <span className="text-base text-red-500">{error}</span>}
          </p>
        </div>
        <div className="flex items-center justify-center my-4">
          <button
            className="flex flex-row items-center justify-center gap-2 cursor-pointer w-[20%] p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <p>Loading ....</p>
            ) : (
              <>
                <FaUpload />
                <p>Update Competiton</p>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="bg-red-100 rounded-2xl mt-4 p-4 text-red-600">
        <ul>
          <li>Before adding problems, you must create a competition.</li>
          <li>
            Each competition must have a valid name, description, and duration.
          </li>
          <li>
            Problems can only be added after the competition is successfully
            created.
          </li>
          <li>
            Once the competition is published, problems cannot be modified.
          </li>
          <li>
            Ensure all rules and constraints are clearly mentioned for
            participants.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Updatecompetiotion;
