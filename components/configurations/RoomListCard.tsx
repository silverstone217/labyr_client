"use client";
import React from "react";

type Room = {
  id: string;
  name: string;
};

type Props = {
  room: Room;
  onDelete: (id: string) => void;
  onEdit: (room: Room) => void;
};

const RoomListCard = ({ room, onDelete, onEdit }: Props) => {
  return (
    <div
      className="group flex items-center justify-between p-4 rounded-2xl border border-gray-200
     bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* LEFT */}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-800">
          {room.name}
        </span>
        <span className="text-xs text-gray-400">ID: {room.id}</span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-2 ">
        {/* EDIT */}
        <button
          onClick={() => onEdit(room)}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition"
        >
          Modifier
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(room.id)}
          className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default RoomListCard;
