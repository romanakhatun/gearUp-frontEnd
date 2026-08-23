"use server";

import { cookies } from "next/headers";

export const updateUserStatus = async (userId: string, status: string) => {
  console.log(userId, status, "userID, status");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  const data = await res.json();

  return data;
};
