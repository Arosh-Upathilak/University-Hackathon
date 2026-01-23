"use client";
import React from "react";
import PrivateRouter from "@/components/PrivateRouter";
import NavBar from "@/components/Navbar/DesktopNavBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRouter allowedRoles={["User"]}>
      <NavBar />
      <div className="overflow-hidden">{children}</div>
    </PrivateRouter>
  );
}
