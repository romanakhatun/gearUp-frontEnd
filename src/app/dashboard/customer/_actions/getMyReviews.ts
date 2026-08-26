// app/dashboard/customer/reviews/_actions/getMyReviews.ts
"use server";

import { cookies } from "next/headers";

export async function getMyReviews() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: [] };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/review/my-reviews`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch my reviews:", error);
    return { success: false, data: [] };
  }
}
