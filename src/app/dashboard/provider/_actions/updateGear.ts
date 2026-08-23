"use server";

import { cookies } from "next/headers";

export const updateGear = async (prevState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      success: false,
      message: "Gear ID is required",
    };
  }

  const image = formData.get("image")?.toString();

  const payload: {
    title: string | undefined;
    description: string | undefined;
    category: string | undefined;
    brand: string | undefined;
    price: number;
    stock: number;
    location: string | undefined;
    images?: string[];
  } = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    category: formData.get("category")?.toString(),
    brand: formData.get("brand")?.toString(),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    location: formData.get("location")?.toString(),
  };

  // Image থাকলে only update images
  if (image) {
    payload.images = [image];
  }

  console.log("UPDATE GEAR PAYLOAD:", payload);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${accessToken?.name}=${accessToken?.value}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  console.log("UPDATE GEAR RESPONSE:", data);

  return data;
};
