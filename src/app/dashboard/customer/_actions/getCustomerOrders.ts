"use server";

import { cookies } from "next/headers";

export const getCustomerOrders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: {
      cookie: `${accessToken.name}=${accessToken.value}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};
