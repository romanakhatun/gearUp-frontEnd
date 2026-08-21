"use server";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken") || null;

  if (!refreshToken) {
    return { success: false, message: "User not Logged in" };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      headers: {
        //   Authorization: `Bearer ${accessToken.value}`,
        Cookie: `${refreshToken.name}=${refreshToken.value}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();
  // console.log("REFRESH RESULT:", result);
  return result;
};
