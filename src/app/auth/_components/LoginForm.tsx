"use client";
import { useActionState, useEffect } from "react";
import { loginAction } from "../_actions/authActions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import router from "next/router";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);

  useEffect(() => {
    if (!state) return;

    // if (state.success) {
    //   toast.success(state.message || "Login Successful");
    //   router.push("/");
    // }

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <>
      <form className="space-y-5" action={action}>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            required
          />
        </div>

        <Button className="w-full" disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
