// utils/getToken.ts
export const getToken = () => {
  if (typeof window !== "undefined") {
    // côté client
    return sessionStorage.getItem("token") ?? "";
  }
  return ""; // côté server, pas accessible
};
