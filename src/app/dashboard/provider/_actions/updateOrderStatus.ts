"use server";

import { cookies } from "next/headers";

export const updateOrderStatus = async (orderId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
    },
  );

  const data = await res.json();

  console.log("UPDATE ORDER STATUS:", data);

  return data;
};
