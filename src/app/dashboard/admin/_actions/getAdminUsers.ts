"use server";

import { cookies } from "next/headers";

export const getAdminUsers = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return {
      success: false,
      data: [],
      message: "Unauthorized",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    headers: {
      Cookie: `${accessToken.name}=${accessToken.value}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};
