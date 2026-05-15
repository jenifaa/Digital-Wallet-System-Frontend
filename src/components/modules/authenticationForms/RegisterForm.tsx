/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";

import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";


const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }),
    email: z.email(),
    phone: z.string().min(10, { message: "Invalid phone number" }),
    password: z.string().min(8, { message: "Password too short" }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterInputs = z.infer<typeof registerSchema>;

export default function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterInputs) => {
    try {
      const { ...userInfo } = data;

      await registerUser(userInfo).unwrap();

      toast.success("Account created successfully 🎉");
      navigate("/verify", { state: { email: data.email } });
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4 bg-muted/30",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join us and start managing your wallet
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-lg border-muted/60">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Fill in your details to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FieldGroup className="space-y-4">

                {/* NAME */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input {...field} placeholder="John Doe" />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* EMAIL */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input {...field} type="email" placeholder="you@example.com" />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* PHONE */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Phone</FieldLabel>
                      <Input {...field} placeholder="+8801XXXXXXXXX" />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* PASSWORD */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <Input {...field} type="password" placeholder="••••••••" />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* CONFIRM PASSWORD */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Confirm Password</FieldLabel>
                      <Input {...field} type="password" placeholder="••••••••" />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button type="submit" className="w-full h-11">
                Create account
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}