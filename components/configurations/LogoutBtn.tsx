"use client";
import { ENDPOINT_URL } from "@/utils/envVariables";
import React, { useState } from "react";

const LogoutBtn = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ENDPOINT_URL}/api/logout`, {
        method: "POST",
        credentials: "include", // très important pour envoyer/recevoir le cookie
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }

      location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm 
      font-medium transition-colors duration-200 ease-in-out"
      disabled={loading}
    >
      {loading ? "En cours..." : "Deconnexion"}
    </button>
  );
};

export default LogoutBtn;
