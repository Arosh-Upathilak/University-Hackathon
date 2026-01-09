"use client";
import { UserContext } from "@/context/userContext";
import React, { useContext } from "react";

const UserHome = () => {
  const { user, loading,handleLogout} = useContext(UserContext);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div>Loading user data...</div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl mb-4">Welcome, User!</h2>
          <p>ID: {user?.id}</p>
          <p>Email: {user?.email}</p>
          <p>Username: {user?.userName}</p>
          <p>Role: {user?.role}</p>
        </div>
      )}

      <button 
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
    </div>
  );
};

export default UserHome;
