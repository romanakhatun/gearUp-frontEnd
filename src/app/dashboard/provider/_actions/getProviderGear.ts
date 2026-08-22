"use server";

import { cookies } from "next/headers";

export const getProviderGear = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return {
      success: false,
      data: null,
      message: "Unauthorized",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    headers: {
      Cookie: `${accessToken.name}=${accessToken.value}`,
    },
  });
  const data = await res.json();
  return data;
};
