"use client";
import { cinzel } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React, { Suspense, useEffect, useState } from "react";
import NewRoom from "./NewRoom";
import LogoutBtn from "./LogoutBtn";
import { ENDPOINT_URL } from "@/utils/envVariables";
import RoomListCard from "./RoomListCard";

const RoomsList = ({ token }: { token: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRooms = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${ENDPOINT_URL}/api/rooms`, {
          method: "GET",
          credentials: "include", // 🔥 important si tu utilises cookie auth
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.message || "Erreur lors du fetch");
        }

        const data = await res.json();
        setRooms(data);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        console.error("Erreur fetch rooms:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();

    return () => controller.abort(); // cleanup clean
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
        <h3 className={cn("text-xl font-semibold", cinzel.className, "")}>
          Liste des rooms
        </h3>

        <button
          className="bg-primary hover:bg-primary/75 text-white py-2 px-4 rounded
        text-sm font-medium transition-colors duration-200 ease-in-out
        "
          onClick={() => setIsOpen(true)}
        >
          Creer une room
        </button>

        {/* DECONNEXION */}
        <LogoutBtn />
      </div>

      {isOpen && (
        <NewRoom
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          token={token}
        />
      )}

      {/* List */}
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && rooms.length === 0 && (
            <p className="text-gray-500">Aucune room trouvée.</p>
          )}
          {!loading &&
            !error &&
            rooms.length > 0 &&
            rooms.map((room, id) => (
              <div key={id}>
                <RoomListCard
                  room={room}
                  onDelete={() => {}}
                  onEdit={() => {}}
                />
              </div>
            ))}
        </div>
      </Suspense>
    </div>
  );
};

export default RoomsList;
