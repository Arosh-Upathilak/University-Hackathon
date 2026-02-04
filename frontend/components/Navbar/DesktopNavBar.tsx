"use client";
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { navBarLink } from "@/constant/data";
import Link from "next/link";
import ShowLogOutBox from "../ShowLogOutBox";
import { HiBars3BottomRight } from "react-icons/hi2";
import MobileNavBar from "./MobileNavBar";
import { usePathname } from "next/navigation";

function DesktopNavBar() {
  const [userName, setUsername] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    setUsername(user.userName);
  }, []);
  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const [showMobileNavBar, setShowMobileNavBar] = useState<boolean>(false);
  return (
    <div className=" fixed bg-white w-full  h-[12vh] z-30">
      <div className="flex justify-between items-center h-full w-[90%] mx-auto">
        <div className="flex  items-center gap-4">
          <FaCode size={32} color="#2563eb" />
          <h1>Hackathon Portal</h1>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {navBarLink.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`cursor-pointer ${
                  pathname === item.link ? "text-blue-800 " : ""
                } hover:text-black/50 transition-all duration-200`}
              >
                {item.name}
              </Link>
            );
          })}
          <div
            className="w-10 h-10 rounded-full bg-amber-200 flex justify-center items-center cursor-pointer"
            onClick={() => setShowLogOut(true)}
          >
            <p>{userName.slice(0, 1)}</p>
          </div>
        </div>
        <div className="md:hidden text-black cursor-pointer">
          {!showMobileNavBar && (
            <HiBars3BottomRight
              className="w-10 h-10"
              onClick={() => setShowMobileNavBar(true)}
            />
          )}
          <MobileNavBar
            showMobileNavBar={showMobileNavBar}
            setShowMobileNavBar={setShowMobileNavBar}
          />
        </div>

        <ShowLogOutBox showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
      </div>
    </div>
  );
}

export default DesktopNavBar;
