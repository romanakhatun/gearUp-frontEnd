"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type ActionState = {
  success: boolean;
  message: string;
};

export async function createReview(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  const gearItemId = formData.get("gearItemId") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;

  if (!gearItemId || !rating || !comment) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        gearItemId,
        rating,
        comment,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Failed to submit review.",
      };
    }

    revalidatePath("/dashboard/customer/reviews");
    return { success: true, message: "Review submitted successfully!" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}
