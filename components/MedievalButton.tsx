"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MedievalButtonProps {
  title: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const MedievalButton: React.FC<MedievalButtonProps> = ({
  title,
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        // Base parchemin sombre
        "relative flex items-center justify-center px-12 py-3",
        "bg-linear-to-b from-[#2c1f0e] to-[#493522] text-[#f3e2c7]",
        "font-[Cinzel_Decorative] font-bold text-lg tracking-wide shadow-inner border-2 border-[#5c3a1a]/60",
        "transition-transform duration-300 hover:scale-105 active:scale-95",
        "disabled:opacity-70 disabled:grayscale cursor-pointer disabled:cursor-not-allowed",
        className,
      )}
    >
      {/* Texture de parchemin subtile */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')]" />

      {loading ? (
        <span className="animate-pulse flex items-center gap-2">
          <span className="h-2 w-2 bg-[#f3e2c7] rounded-full animate-bounce" />
          Préparation...
        </span>
      ) : (
        <span className="relative z-10">{title}</span>
      )}
    </button>
  );
};

export default MedievalButton;
