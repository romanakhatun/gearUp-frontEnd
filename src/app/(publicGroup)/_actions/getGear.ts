"use server";

type GearFilters = {
  search?: string;
  brand?: string;
  category?: string;
  priceMin?: string;
  priceMax?: string;
};

export const getGear = async (filters?: GearFilters) => {
  const params = new URLSearchParams();
  console.log(params, "params");

  if (filters?.search) params.set("search", filters.search);
  if (filters?.brand) params.set("brand", filters.brand);
  if (filters?.category) params.set("category", filters.category);
  if (filters?.priceMin) params.set("priceMin", filters.priceMin);
  if (filters?.priceMax) params.set("priceMax", filters.priceMax);

  const query = params.toString();
  console.log("Query string:", query);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear${query ? `?${query}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      next: {
        revalidate: 0,
        tags: ["gear"],
      },
    },
  );

  const data = await res.json();
  // console.log("GEAR:", data);
  return data;
};

export const getGearById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`);
  const data = await res.json();
  // console.log("GEAR BY ID:", data);
  return data;
};
