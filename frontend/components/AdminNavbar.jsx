"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { IoTrophySharp, IoPeopleSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { BsTerminalPlus } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { UserContext } from "@/context/userContext";

const AdminNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);

  const { handleLogout } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      if (width < 640) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (screenWidth < 640) return;
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    { icon: MdDashboard, label: "Dashboard", href: "/admin" },
    { icon: IoTrophySharp, label: "Competitions", href: "/admin/competitions" },
    { icon: IoPeopleSharp, label: "Participants", href: "/admin/participants" },
    { icon: FaGraduationCap, label: "Mentor", href: "/admin/mentor" },
  ];

  const currentMenu =
    menuItems.find((item) => pathname === item.href)?.label ||
    pathname
      .replace("/admin/", "")
      .split("/")
      .map(
        (part) =>
          part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join(" / ") ||
    "Dashboard";

  return (
    <div className="flex min-h-screen">
      <aside
        className={`
          w-16
          ${isOpen ? "sm:w-64" : "sm:w-16"}
          bg-white transition-all duration-300 flex flex-col shadow-md
        `}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-end">
            <button
              onClick={toggleSidebar}
              className="hidden sm:block text-xl text-blue-700 hover:text-blue-900 transition"
            >
              {isOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="bg-blue-600 p-2 rounded-full text-white">
              <BsTerminalPlus size={20} />
            </div>
            {isOpen && (
              <p className="font-bold text-lg whitespace-nowrap">
                ADMIN DASHBOARD
              </p>
            )}
          </div>

          <hr className="mt-4 h-0.5 bg-gray-300 border-0" />

          <nav className="mt-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <p key={item.label}  >
                    <button
                      onClick={() => router.push(item.href)}
                      className={`w-full flex items-center gap-3 p-2 rounded-md transition cursor-pointer
                        ${isActive
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-blue-50 hover:text-blue-600"
                        }
                        ${!isOpen && "justify-center"}
                      `}
                    >
                      <item.icon size={25} />
                      {isOpen && (
                        <span className="text-md">{item.label}</span>
                      )}
                    </button>
                  </p>
                );
              })}
            </div>
          </nav>

          <div className="mt-auto">
            <hr className="my-4 h-px bg-gray-300 border-0" />
            <button
              onClick={handleLogout}
              title={!isOpen ? "Logout" : ""}
              className={`flex items-center gap-3 p-2 rounded-md transition 
                bg-blue-600 text-white hover:bg-blue-800 w-full
                ${!isOpen && "justify-center"}
              `}
            >
              <FiLogOut size={25} />
              {isOpen && <span className="text-md">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100">
        <div className="bg-white p-4 shadow-xl">
          <p className="text-lg text-gray-600">
            Admin / <span className="font-semibold">{currentMenu}</span>
          </p>
        </div>

        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default AdminNavbar;
