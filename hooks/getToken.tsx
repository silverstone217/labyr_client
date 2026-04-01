"use client";

import { useEffect, useState } from "react";

export function useToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/token", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token));
  }, []);

  return token ? token : "";
}
