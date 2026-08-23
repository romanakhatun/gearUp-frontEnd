"use server";

import { cookies } from "next/headers";

export const getPaymentById = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await res.json();
};
