"use client";
import { UseContextProps, UserProps } from "@/constant/Type";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext<UseContextProps>({
  url: "",
  user: null,
  setUser: () => {},
  fetchUserData: async () => {},
  handleLogout: () => {},
  loading: false,
  error: null,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5056/api";
  const [user, setUser] = useState<UserProps|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${url}/User/Profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (err: unknown) {
      console.error("Profile API error:", err);
      localStorage.removeItem("token");
      setUser(null);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        url,
        user,
        setUser,
        fetchUserData,
        handleLogout,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
