"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Authform from "@/components/configurations/Authform";
import { medievalSharp } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("token");
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Déférer le setState pour éviter l'erreur de cascade
    const t = sessionStorage.getItem("token");
    // ✅ méthode safe
    setTimeout(() => {
      setToken(t);
      setLoading(false);
    }, 0);
  }, []);

  if (loading) return <p>Chargement…</p>;

  if (!token) {
    return <Authform />; // non connecté
  }

  return (
    <div>
      <header
        className={cn("flex items-center p-6 gap-1", medievalSharp.className)}
      >
        <Link href={"/"} className="text-xl">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-primary/80">Configurations</span>
      </header>
      <main>{children}</main>
    </div>
  );
}
