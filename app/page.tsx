"use client";
import MedievalButton from "@/components/MedievalButton";
import { useSocket } from "@/components/providers/SocketProvider";
import { medievalSharp } from "@/lib/fonts";
import background from "@/public/images/laby-background.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // get token from socket.io server
  const { socket, socketId } = useSocket();

  const handleStart = () => {
    console.log("Début du labyrinthe !");
  };

  return (
    <main className="h-screen relative">
      {/* Image basckground  */}
      <div className="absolute inset-0 -z-10">
        <Image
          alt="labyrinth image"
          src={background}
          fill
          priority
          className="object-cover "
        />
      </div>

      {socketId && (
        <div className="p-2 text-sm absolute top-4 right-4">
          <p>ID : {socketId}</p>
        </div>
      )}

      <div className="h-full flex items-center flex-col justify-center p-6 ">
        <div className="space-y-1.5">
          <h3 className={`text-4xl font-bold ${medievalSharp.className}`}>
            Bienvenue, sur <span>LABYR </span>!
          </h3>

          <p
            className={`${medievalSharp.className}
        mx-auto max-w-sm text-sm text-foreground/85
          `}
          >
            Rejoigner la grande communaute et parcourez les salles de Labyr!
          </p>
        </div>

        <div className="mt-8" />

        <MedievalButton
          title="Commencer l’aventure"
          onClick={handleStart}
          className="text-xl px-8 py-4"
          disabled={!socket || !socketId}
        />
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col justify-center items-center">
        <Link
          href={"/configurations"}
          className="text-sm hover:underline underline-offset-1 "
        >
          Configurations
        </Link>
      </div>
    </main>
  );
}
