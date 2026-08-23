"use server";

import { cookies } from "next/headers";

export const confirmPayment = async (sessionId: string) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/confirm`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
      }),
      cache: "no-store",
    },
  );

  return await res.json();
};
