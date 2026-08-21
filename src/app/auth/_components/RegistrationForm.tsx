"use client";
import React, { useActionState, useEffect } from "react";
import { registerAction } from "../_actions/authActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [state, action, pending] = useActionState(registerAction, null);
  console.log(state, "STATE", action, pending);
  const router = useRouter();
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful");
      router.push("/auth/login");
    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  return (
    <div>
      <form className="space-y-5" action={action}>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" />
        </div> */}

        <div className="space-y-2">
          <Label>Account Type</Label>

          <Select name="role">
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
              <SelectItem value="PROVIDER">Provider</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Create Account</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
