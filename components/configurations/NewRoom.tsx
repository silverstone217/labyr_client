"use client";

import { ENDPOINT_URL } from "@/utils/envVariables";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  token: string;
};

// Directions options
const directions = ["LEFT", "RIGHT", "UP", "DOWN"] as const;

const NewRoom = ({ isOpen, onClose, token }: Props) => {
  const [roomName, setRoomName] = useState("");
  const [exits, setExits] = useState<{ direction: string; toRoomId: string }[]>(
    [],
  );
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Close on ESCAPE key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Add new exit
  const handleAddExit = () => {
    setExits([...exits, { direction: "LEFT", toRoomId: "" }]);
  };

  // Handlers for changing direction and target room ID
  const handleChangeExit = (index: number, field: string, value: string) => {
    const updated = [...exits];
    updated[index][field as "direction" | "toRoomId"] = value;
    setExits(updated);
  };

  // Remove an exit
  const handleRemoveExit = (index: number) => {
    setExits((prev) => prev.filter((_, i) => i !== index));
  };

  // SUBMIT
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      console.log({ token });
      const result = await fetch(`${ENDPOINT_URL}/api/rooms/nouveau`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({ name: roomName, exits, message }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || "Failed to create room");
      }

      setRoomName("");
      setExits([]);

      onClose();
    } catch (error) {
      console.error("Error creating room:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Nouvelle Room
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              disabled={loading}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Créez une nouvelle room et définissez ses directions.
            </p>

            {/* Room Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Nom de la room
              </label>
              <input
                type="text"
                placeholder="Ex: Salle A"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm
                focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                disabled={loading}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>

            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100
              min-h-12 max-h-24 resize-y-none
              "
              placeholder="Message affiché à l'entrée de la room"
              disabled={loading}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Directions */}
            <div className="space-y-3">
              {exits.map((exit, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 items-center"
                >
                  {/* Direction */}
                  <select
                    className="border border-gray-200 rounded-lg px-2 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-primary"
                    value={exit.direction}
                    onChange={(e) =>
                      handleChangeExit(index, "direction", e.target.value)
                    }
                  >
                    {directions.map((dir) => (
                      <option key={dir} value={dir}>
                        {dir}
                      </option>
                    ))}
                  </select>

                  {/* Target room */}
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="ID room cible"
                    value={exit.toRoomId}
                    onChange={(e) =>
                      handleChangeExit(index, "toRoomId", e.target.value)
                    }
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveExit(index)}
                    className="flex items-center justify-center h-full
        rounded-lg border border-red-200 text-red-500
        hover:bg-red-50 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add direction */}
            <button
              type="button"
              onClick={handleAddExit}
              className="w-full bg-primary/10 text-primary border border-primary/20
              px-3 py-2 rounded-lg text-sm hover:bg-primary/20 transition"
              disabled={
                loading ||
                exits.length >= directions.length ||
                exits.some((e) => !e.toRoomId)
              }
            >
              + Ajouter une direction
            </button>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200
              hover:bg-gray-100 transition disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-white
              hover:bg-primary/80 transition disabled:opacity-50"
              onClick={handleSubmit}
            >
              Créer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
