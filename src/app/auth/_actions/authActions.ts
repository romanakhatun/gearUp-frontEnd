"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (prevState: any, formData: FormData) => {
  // console.log(formData);
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    email,
    password,
  };
  // console.log(process.env.BACKEND_API_URL, "backend url");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  // console.log("LOGIN RESPONSE:", result);

  if (result && result.success && result.data) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const decoded = jwt.decode(result.data.accessToken) as JwtPayload;
    // console.log("decoded", decoded);
    if (decoded?.role == "ADMIN") {
      redirect("/dashboard/admin", "replace");
    } else if (decoded?.role == "PROVIDER") {
      redirect("/dashboard/provider", "replace");
    } else if (decoded?.role == "CUSTOMER") {
      redirect("/dashboard/customer", "replace");
    }
  }

  return result;
};

export const registerAction = async (prevState: any, formData: FormData) => {
  console.log(formData, "registation form data");

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const payload = {
    name,
    email,
    password,
    role,
  };

  console.log("PAYLOAD GOING TO BACKEND:", payload);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log("REGISTER RESPONSE:", result);
  return result;
};
