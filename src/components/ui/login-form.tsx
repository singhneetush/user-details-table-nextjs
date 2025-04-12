"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("User Sign In credentials:", formData);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (user: { email: string; password: string }) =>
        user.email.trim() === formData.email.trim() &&
        user.password === formData.password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

      setFormData({
        email: "",
        password: "",
      });

      setErrors({
        email: "",
        password: "",
      });

      router.push("/items");
    } else {
      console.error("No user present in storage, please sign-up");

      setErrors({
        email: "No user found. Please sign up.",
        password: "No user found. Please sign up.",
      });

      router.push("/sign-up");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Hi User</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
