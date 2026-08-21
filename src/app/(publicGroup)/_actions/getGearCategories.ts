"use server";

export const getGearCategories = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/category`);
  const data = await res.json();
  //   console.log(data, "categories");
  return data;
};
