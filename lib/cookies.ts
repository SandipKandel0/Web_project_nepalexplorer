"use server";

import { cookies } from "next/headers";

export const setAuthToken = async (token: string) => {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

export const getAuthToken = async () => {
  return (await cookies()).get("token")?.value;
};


export const setUserData = async (user: any) => {
  (await cookies()).set("user", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

export const getUserData = async () => {
  const user = (await cookies()).get("user")?.value;
  return user ? JSON.parse(user) : null;
};

export const clearAuthCookies = async () => {
  (await cookies()).delete("token");
  (await cookies()).delete("user");
};
