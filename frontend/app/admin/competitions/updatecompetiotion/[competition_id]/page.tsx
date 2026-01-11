"use client";
import React, { useState, useEffect, useContext } from "react";
import { FaUpload } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { IoTrashBin } from "react-icons/io5";
import RteEditor from "@/components/RichTextEditor";
import Image from "next/image";
import { uploadFileToCloudinary } from "@/helper/UploadFileToCloudinary";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

const Updatecompetiotion = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    competitionName: "",
    competitionTagLine: "",
    competitionDescription: "",
    competitionImageLink: "",
    startDateTime: "",
    endDateTime: "",
    registrationEndDateTime: "",
    isVisibleForStudents: false,
    rules: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const preview = selectedImage
    ? URL.createObjectURL(selectedImage)
    : formData.competitionImageLink;
  const router = useRouter();
  const competition_id = Array.isArray(params.competition_id)
    ? params.competition_id[0]
    : params.competition_id;
  const { url } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${url}/Competition/GetCompetitionById/${competition_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const competition = result.data.competition || "";
        console.log("Competition:", competition);
        setFormData({
          competitionName: competition.competitionName || "",
          competitionTagLine: competition.competitionTagLine || "",
          competitionDescription: competition.competitionDescription || "",
          competitionImageLink: competition.competitionImageLink || "",
          startDateTime: competition.startDateTime || "",
          endDateTime: competition.endDateTime || "",
          registrationEndDateTime: competition.registrationEndDateTime || "",
          isVisibleForStudents: competition.isVisibleForStudents || false,
          rules: competition.rules || "",
        });
        setLoading(false);
      } catch (err: unknown) {
        const axiosError = err as AxiosError<{
          message?: string;
          error?: string;
        }>;

        const errorMessage =
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Failed to Fetch Competition.";
        console.log("Submission failed:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
        setError("");
      }
    };
    fetchData();
  }, []);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        competitionImageLink: imageUrl || formData.competitionImageLink,
      };

      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${url}/Competition/UpdateCompetition/${competition_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setFormData({
          competitionName: "",
          competitionTagLine: "",
          competitionDescription: "",
          competitionImageLink: "",
          startDateTime: "",
          endDateTime: "",
          registrationEndDateTime: "",
          isVisibleForStudents: false,
          rules: "",
        });
        setSelectedImage(null);
        toast.success(response.data.message);
        router.push("/admin/competitions");
        setLoading(false);
        console.log("FINAL PAYLOAD:", payload);
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{
        message?: string;
        error?: string;
      }>;

      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Failed to Update Competition.";
      toast.error(errorMessage);
      console.log("Submission failed:", errorMessage);
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
                  value={formData.competitionName}
                  name="competitionName"
                />
              </div>

              <div className="flex flex-col gap-2 p-4">
                <label>Short Tag line</label>
                <input
                  placeholder="e.g. Innovate for a better future"
                  className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0"
                  onChange={onChangeHandler}
                  value={formData.competitionTagLine}
                  name="competitionTagLine"
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
                    value={formData.competitionDescription}
                    onChange={onChangeHandler}
                    placeholder="Describe the rules, goals, and details of the hackathon..."
                    className="bg-[#f2f7fb] p-3 rounded-2xl border border-gray-200 outline-0 min-h-32"
                    rows={3}
                    required
                    name="competitionDescription"
                  />
                </div>
                <div className="flex items-center justify-start gap-4">
                  <label>Visiable for Students</label>
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={onChangeHandler}
                    name="isVisibleForStudents"
                    checked={formData.isVisibleForStudents}
                  />
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
                    required={!formData.competitionImageLink}
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
                        onClick={() => {
                          setSelectedImage(null);
                          setFormData(prev => ({ ...prev, competitionImageLink: "" }));
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-2xl text-white cursor-pointer"
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
                    value={formData.startDateTime}
                    name="startDateTime"
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
                    value={formData.endDateTime}
                    name="endDateTime"
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
                    value={formData.registrationEndDateTime}
                    name="registrationEndDateTime"
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
              value={formData.rules}
              onChange={(content: string) =>
                setFormData((prev) => ({
                  ...prev,
                  rules: content,
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
