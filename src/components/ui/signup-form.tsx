"use client";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
      valid = false;
    } else if (formData.name.trim().length < 4) {
      newErrors.name = "Name should be at least 4 characters";
      valid = false;
    } else if (formData.name.trim().length > 30) {
      newErrors.name = "Name should not be more than 30 characters";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please enter your password again";
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = storedUsers.some(
      (user: { email: string }) => user.email === formData.email
    );

    if (userExists) {
      setErrors((prev) => ({
        ...prev,
        email: "User with this email already exists",
      }));
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    console.log("User registered:", newUser);
    router.push("/login");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome!</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={inputChange}
                  autoComplete="off"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={inputChange}
                  autoComplete="off"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  value={formData.password}
                  onChange={inputChange}
                  autoComplete="off"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={inputChange}
                  autoComplete="off"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By signing up, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
