"use server";

import { cookies } from "next/headers";

export async function getProviderRentals() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in! Please log in to get access.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: `${accessToken.name}=${accessToken.value}`,
        },
      },
    );

    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching provider orders:", error);
    return {
      success: false,
      message: "Failed to fetch provider orders",
    };
  }
}
