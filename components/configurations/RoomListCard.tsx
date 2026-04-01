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
     bg-white shadow-sm hover:shadow-md transition-all duration-200 flex-wrap gap-y-2"
    >
      {/* LEFT */}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-800 capitalize">
          {room.name}
        </span>
        <span className="text-xs text-gray-400">ID: {room.id}</span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-2 ml-auto">
        {/* EDIT */}
        <button
          onClick={() => onEdit(room)}
          className="px-3 py-1.5 text-xs xl:text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition"
        >
          Modifier
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(room.id)}
          className="px-3 py-1.5 text-xs xl:text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default RoomListCard;
