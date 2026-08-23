"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type RentalActionState = {
  success?: boolean;
  message?: string;
  orderId?: string;
};

export async function createRentalOrder(
  prevState: RentalActionState,
  formData: FormData,
): Promise<RentalActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in! Please log in to get access.",
    };
  }

  const gearItemId = formData.get("gearItemId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const totalAmount = parseFloat(formData.get("totalAmount") as string);

  // Validation Check
  if (!gearItemId || !startDate || !endDate || isNaN(totalAmount)) {
    return { success: false, message: "Please select valid rental dates." };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `${accessToken.name}=${accessToken.value}`,
      },
      body: JSON.stringify({
        gearItemId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalAmount,
      }),
      cache: "no-store",
      next: {
        tags: ["rentals"],
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    revalidatePath(`/gear/${gearItemId}`);
    return { success: true, message: "Rental request placed successfully!" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to place order.",
    };
  }
}
