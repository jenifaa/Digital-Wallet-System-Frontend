/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";
// import img from "@/assets/images/login.png";
import bg from "@/assets/images/bg.jpg";
import img from "@/assets/images/login.png";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name is too short",
    }),

    email: z.string().email({
      message: "Invalid email",
    }),

    phone: z.string().min(10, {
      message: "Invalid phone number",
    }),

    password: z.string().min(8, {
      message: "Password too short",
    }),

    confirmPassword: z.string().min(8),

    role: z.enum(["USER", "AGENT"], {
      message: "Please select a role",
    }),
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
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  const form = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: RegisterInputs) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      };

      await register(userInfo).unwrap();

      toast.success("Account created successfully 🎉");

      navigate("/verify", {
        state: { email: data.email },
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4 py-10",
        className,
      )}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      {...props}
    >
      <div className="w-full mx-auto flex items-center justify-center ">
        <div className="flex justify-center ">
          <img
            src={img}
            alt="Login"
            className="max-w-119  rounded-l-3xl object-contain border-t-2 border-b-2 border-l-2 border-r-0 border-white shadow-2xl"
          />
        </div>
        <div className="w-full max-w-150 space-y-6 ">
          <Card className=" px-5 py-8 bg-[#D7D7FC] text-black rounded-none rounded-r-3xl border-t-2 border-b-2 border-r-2 border-l-0 border-white shadow-2xl">
            <CardHeader>
              <CardTitle className="font-semibold ">Create Your Account</CardTitle>

              <CardDescription>
                Fill in your details to create an account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 "
              >
                <FieldGroup className="space-y-4 ">
                  <div className="flex  items-center justify-between">
                    <div className="space-y-4">
                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Name</FieldLabel>

                            <Input {...field} placeholder="John Doe" className="border-2 border-gray-400" />

                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Email</FieldLabel>

                            <Input
                              {...field}
                              type="email"
                              placeholder="you@example.com"
                              className="border-2 border-gray-400"
                            />

                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Phone</FieldLabel>

                            <Input {...field} placeholder="+8801XXXXXXXXX" className="border-2 border-gray-400" />

                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                    <div className="space-y-4">
                      <Controller
                        name="role"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Select Role</FieldLabel>

                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose role" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="USER">USER</SelectItem>

                                <SelectItem value="AGENT">AGENT</SelectItem>
                              </SelectContent>
                            </Select>

                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Password</FieldLabel>

                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="border-2 border-gray-400"
                            />

                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Confirm Password</FieldLabel>

                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="border-2 border-gray-400"
                            />

                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  </div>
                </FieldGroup>

                <Button type="submit" className="h-11 w-full mt-3 border-2 border-gray-400">
                  Create account
                </Button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-black hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p> */}
        </div>
      </div>
    </div>
  );
}
