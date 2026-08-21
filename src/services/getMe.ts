"use server";
import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken") || null;

  if (!accessToken) {
    return { success: false, message: "User not Logged in" };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      //   Authorization: `Bearer ${accessToken.value}`,
      Cookie: `${accessToken.name}=${accessToken.value}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 1, // Cache for 1 hour
      tags: ["my-profile"],
    },
  });

  const result = await res.json();
  return result;
};
