"use server";

import { cookies } from "next/headers";

export const createGear = async (preState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const image = formData.get("image") as string;
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    brand: formData.get("brand"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    location: formData.get("location"),
    images: [image],
  };

  console.log(payload);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Cookie: `${accessToken?.name}=${accessToken?.value}`,
    },
    body: JSON.stringify(payload),
    // cache: "no-store",
    // next: {
    //   revalidate: 0,
    //   tags: ["gear"],
    // },
  });
  const data = await res.json();
  console.log("CREATE GEAR RES", data);
  return data;
};
