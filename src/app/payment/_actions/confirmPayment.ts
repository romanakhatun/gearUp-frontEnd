"use server";

import { cookies } from "next/headers";

export const confirmPayment = async (sessionId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized. Please log in again.",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/confirm`,
      {
        method: "POST",
        headers: {
          cookie: `${accessToken.name}=${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
        cache: "no-store",
      },
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to connect to the payment server.",
      data: null,
    };
  }
};
