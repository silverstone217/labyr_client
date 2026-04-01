import { getToken } from "@/actions/user";
import RoomsList from "@/components/configurations/RoomsList";
import React from "react";

async function page() {
  const token = await getToken();

  return (
    <div className="p-6 flex flex-col w-full">
      <RoomsList token={token} />
    </div>
  );
}

export default page;
