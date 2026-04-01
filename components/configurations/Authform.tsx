"use client";

import { cinzel } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { UserLoginType } from "@/schema";
import { ENDPOINT_URL } from "@/utils/envVariables";
import Link from "next/link";
import React, { useState } from "react";

const Authform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${ENDPOINT_URL}/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password } as UserLoginType),
        credentials: "include",
      });

      const data = await response.json(); // toujours lire une fois

      // console.log("STATUS:", response.status);
      // console.log("DATA:", data);

      if (!response.ok) {
        setError(data?.message || "Erreur");
        return;
      }

      console.log("SUCCESS:", data);
      location.href = "/configurations";
    } catch (err) {
      console.error(err);
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-xl flex flex-col gap-6">
        {/* Title */}
        <div className="text-center">
          <h2 className={cn("text-3xl tracking-wide", cinzel.className)}>
            Connexion
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Accède à ton espace sécurisé
          </p>
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm text-muted-foreground">
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="ex: chevalier_noir"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            spellCheck={false}
            disabled={loading}
            className="
              w-full rounded-lg px-4 py-2.5
              bg-input text-foreground
              border border-border
              placeholder-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-primary
              focus:border-transparent
              transition-all duration-200
            "
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-muted-foreground">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
            className="
              w-full rounded-lg px-4 py-2.5
              bg-input text-foreground
              border border-border
              placeholder-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-primary
              focus:border-transparent
              transition-all duration-200
            "
          />
        </div>

        {/* error */}
        {error && (
          <span className="text-destructive text-center text-xs mx-auto w-fit wrap-break-word">
            {error}
          </span>
        )}

        {/* Button */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className="
            w-full py-2.5 rounded-lg font-medium
            bg-primary text-primary-foreground
            hover:bg-accent
            active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-200
            shadow-md
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
              Connexion...
            </span>
          ) : (
            "Se connecter"
          )}
        </button>

        <Link
          href={"/"}
          className="mt-4 text-foreground/60 text-sm w-fit mx-auto
          hover:underline underline-offset-2
          "
        >
          {"Retour a l'Accueil"}
        </Link>
      </div>
    </div>
  );
};

export default Authform;
