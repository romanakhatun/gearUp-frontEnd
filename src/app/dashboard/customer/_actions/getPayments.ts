"use server";

import { cookies } from "next/headers";

export const getPayments = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized. Please log in.",
        data: [],
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch payment history",
      data: [],
    };
  }
};
