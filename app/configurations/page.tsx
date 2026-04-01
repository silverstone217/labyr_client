"use client";

import RoomsList from "@/components/configurations/RoomsList";
import { getToken } from "@/utils/getToken";
import React from "react";

function page() {
  const token = getToken();

  return (
    <div className="p-6 flex flex-col w-full">
      <RoomsList token={token} />
    </div>
  );
}

export default page;
