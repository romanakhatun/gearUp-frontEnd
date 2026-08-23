"use server";

import { cookies } from "next/headers";

export const getAdminRentals = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
    headers: {
      Cookie: `${accessToken?.name}=${accessToken?.value}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};
