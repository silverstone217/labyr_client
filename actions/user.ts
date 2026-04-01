"use server";

import { UserLoginType } from "@/schema";
import { ENDPOINT_URL } from "@/utils/envVariables";
import { cookies } from "next/headers";

export const login = async (data: UserLoginType) => {
  try {
    const response = await fetch(`${ENDPOINT_URL}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      console.log("NOT OK RESPONSE");
      return {
        message: "Impossible d'effectuer cette action!",
        error: true,
        token: null,
      };
    }
    const text = await response.json();
    console.log(text);
  } catch (error) {
    console.log(error);
    return {
      message: "Impossible d'effectuer cette action!",
      error: true,
      token: null,
    };
  }
};

export const getToken = async (): Promise<string> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    return token ?? "";
  } catch (error) {
    console.log(error);
    return "";
  }
};
