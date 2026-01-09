"use client";
import AdminCart from "@/components/AdminCart";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoRadio } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { GiOlive } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { dummyCompetitions } from "@/constant/data";


const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="p-8">
      <div>
        <div className="flex items-center justify-between flex-col sm:flex-row">
          <div className="flex flex-col ">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-600 text-lg">
              Manage hackathons, monitor real-time submissions, and oversee
              grading,
            </p>
          </div>
          <div className=" p-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150">
            <button className="flex flex-row items-center gap-2 cursor-pointer" onClick={()=>router.push("/admin/competitions/createcompetition")}>
              <FaPlus />
              <p>Create Competiton </p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          <AdminCart
            headerText="Total Hackathons"
            Icon={IoRadio}
            IconStyle="bg-green-200 text-green-600"
            count="123"
          />
          <AdminCart
            headerText="Live Hackathon"
            Icon={GiOlive}
            IconStyle="bg-orange-200 text-orange-600"
            count="123"
          />
          <AdminCart
            headerText="Total Students"
            Icon={FaPeopleGroup}
            IconStyle="bg-blue-200 text-blue-600"
            count="123"
          />
          <AdminCart
            headerText="Total Mentors"
            Icon={RiAdminFill}
            IconStyle="bg-purple-200 text-purple-600"
            count="123"
          />
        </div>

        <div className="p-4 rounded-3xl bg-white mt-8">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <h1 className="text-2xl text-blue-800 font-bold">
              Active & Recent Competition
            </h1>
            <Link
              href="/admin/competitions"
              className="cursor-pointer p-2 text-white bg-blue-600 hover:bg-blue-800 rounded-2xl transition-all duration-150"
            >
              View All
            </Link>
          </div>
          <div className="hidden sm:grid grid-cols-6 text-center font-semibold border-b-gray-200 rounded-t-2xl mt-4 text-base text-gray-700 bg-gray-200 p-4">
            <p>Competition Name</p>
            <p>Status</p>
            <p>Registered Students</p>
            <p>Starting Date</p>
            <p>End Date</p>
            <p>Actions</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center p-8 text-lg font-medium">
              Loading competitions...
            </div>
          )}

          {!loading && dummyCompetitions.length > 0 && (
            <>
              {dummyCompetitions.map((item) => (
                <div
                  key={item.id}
                  className="hidden sm:grid grid-cols-6 text-center border-b border-gray-300 last:border-b-0 p-4 hover:bg-gray-100 "
                >
                  <p>{item.name}</p>
                  <p
                    className={` font-semibold ${
                      item.status === "Live"
                        ? "text-green-600"
                        : item.status === "Upcoming"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </p>
                  <p>{item.registered}</p>
                  <div>
                    <p>{item.startDate}</p>
                    <p>6.00.00 p.m.</p>
                  </div>
                  <div>
                    <p>{item.endDate}</p>
                    <p>6.00.00 p.m.</p>
                  </div>

                  <p>
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      View
                    </button>
                  </p>
                </div>
              ))}

              <div className="sm:hidden space-y-4 mt-4 text-center">
                {dummyCompetitions.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-xl p-4 shadow-sm"
                  >
                    <p className="font-semibold text-lg">{item.name}</p>

                    <div className="mt-2 text-sm space-y-1">
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={
                            item.status === "Live"
                              ? "text-green-600"
                              : item.status === "Upcoming"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }
                        >
                          {item.status}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Registered:</span>{" "}
                        {item.registered}
                      </p>
                      <p>
                        <span className="font-medium">Start:</span>{" "}
                        {item.startDate} 6.00.00 p.m.
                      </p>
                      <p>
                        <span className="font-medium">End:</span> {item.endDate} 6.00.00 p.m.
                      </p>
                    </div>

                    <button className="mt-3 text-blue-600 hover:text-blue-800 cursor-pointer">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          {!loading && dummyCompetitions.length === 0 && (
            <div className="flex justify-center items-center p-8 text-xl font-bold">
              No competitions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
