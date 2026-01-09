'use client'
import { RoleRouteProps } from "@/constant/Type";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

const PrivateRouter = ({ children, allowedRoles }: RoleRouteProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (!token || !userData) {
        router.push("/");
        return;
      }
      
      try {
        const user = JSON.parse(userData);
        
        if (allowedRoles && !allowedRoles.includes(user.role as "User" | "Admin")) {
          router.push("/");
          return;
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
      }
    };
    
    checkAuth();
  }, [router, allowedRoles]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRouter;