export const loginAction = async (prevState: any, formData: FormData) => {
  console.log(formData);
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    email,
    password,
  };
  console.log(process.env.BACKEND_API_URL, "backend url");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
};

export const registerAction = async () => {};
