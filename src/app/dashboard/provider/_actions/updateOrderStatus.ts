"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          cookie: `${accessToken?.name}=${accessToken?.value}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    const data = await res.json();
    revalidatePath("/dashboard/provider/orders");
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update order status",
    };
  }
};
