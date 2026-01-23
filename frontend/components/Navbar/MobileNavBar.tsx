import { navBarLink } from "@/constant/data";
import { MobileNavBarProps } from "@/constant/Type";
import Link from "next/link";
import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { UserContext } from "@/context/userContext";

function MobileNavBar({
  showMobileNavBar,
  setShowMobileNavBar,
}: MobileNavBarProps) {
  const openNavBar = showMobileNavBar ? "translate-x-0" : "translate-x-[100%]";
  const {  handleLogout } = useContext(UserContext);
  
  return (
    <>
      <div
        className={`fixed inset-0 ${openNavBar} transform transition-all duration-200 w-full h-screen bg-black/50 z-50`}
      >
        <div
          className={`text-white ${openNavBar} right-0 fixed h-full w-[80%] bg-cyan-800 transform transition-all duration-200 delay-300 flex  flex-col p-8 justify-between`}
        >
          <div>
            <div className="flex items-end justify-end">
              <RxCross2 size={20} onClick={() => setShowMobileNavBar(false)} />
            </div>
            <div className="flex flex-col space-y-5 ">
              {navBarLink.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className="cursor-pointer hover:text-black/50 transition-all duration-200 text-lg"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <hr />
            <Link href="/" className="links text-xl">
              <CgProfile />
              &nbsp;See the Profile
            </Link>
            <button className="links text-xl" onClick={handleLogout}>
              <IoIosLogOut size={25}/>
              &nbsp;LogOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNavBar;
