"use client";

import React, { useState } from "react";
import { useToken } from "../providers/TokenProvider";

const LogoutBtn = () => {
  const { setToken } = useToken(); // accès au token et setter
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      // Supprime le token côté client et dans le provider
      setToken(null);

      // Optionnel : rediriger vers login ou page d'accueil
      location.href = "/configurations";
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
      {loading ? "En cours..." : "Déconnexion"}
    </button>
  );
};

export default LogoutBtn;
