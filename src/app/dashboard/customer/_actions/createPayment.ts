"use server";

import { cookies } from "next/headers";

export const createPayment = async (orderId: string) => {
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
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
      }),
      cache: "no-store",
    },
  );

  return await res.json();
};
