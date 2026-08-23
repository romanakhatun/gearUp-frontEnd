"use server";

import { cookies } from "next/headers";

export const getPayments = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return await res.json();
};
