'use client'
import { LogoutProps } from "@/constant/Type";
import Link from "next/link";
import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { UserContext } from "@/context/userContext";


function ShowLogOutBox({ showLogOut, setShowLogOut }: LogoutProps) {
    const { user, loading, handleLogout } = useContext(UserContext);

  return (
    <>
      {showLogOut && (
        <div className="fixed z-50 right-8 top-16 bg-white/85 p-4 rounded-xl flex flex-col gap-4">
          <div className="flex items-end justify-end w-full cursor-pointer hover:text-re">
            <RxCross2 onClick={() => setShowLogOut(false)} />
          </div>
          <hr className="border-black/20" />
          <Link href="/" className="links">
            <CgProfile size={20} />
            &nbsp;&nbsp;See the Profile
          </Link>
          <button className="links" onClick={handleLogout}>
            <IoIosLogOut size={20} />
            &nbsp;&nbsp;LogOut
          </button>
        </div>
      )}
    </>
  );
}

export default ShowLogOutBox;
