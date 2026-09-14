/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import img from "@/assets/images/login.png";
import bg from "@/assets/images/bg.jpg";

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useLoginMutation } from "@/redux/features/auth/auth.api";
import config from "@/config";

type LoginInputs = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const form = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await login(data).unwrap();

      toast.success("Welcome back 👋");
      navigate("/");
    } catch (err: any) {
      const message = err?.data?.message;

      if (message === "User is not verified") {
        toast.error("Account not verified");
        navigate("/verify", { state: { email: data.email } });
        return;
      }

      toast.error(message || "Login failed");
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
      <div className="w-full mx-auto flex items-center justify-center  max-w-7xl ">
        <div className="flex justify-center">
          <img src={img} alt="Login" className="max-w-147.5 rounded-l-3xl  object-contain" />
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Card */}
          <Card className="shadow-lg border-muted/60 ">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Sign in</CardTitle>
              <CardDescription>Enter your credentials below</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FieldGroup className="space-y-4">
                  {/* EMAIL */}
                  <Controller
                    name="email"
                    control={form.control}
                    rules={{
                      required: "Email is required",
                    }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="h-11"
                        />
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
                    rules={{
                      required: "Password is required",
                    }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="h-11"
                        />
                        <FieldDescription>
                          Must be at least 6 characters
                        </FieldDescription>
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FieldGroup>

                {/* ACTION BUTTON */}
                <Button type="submit" className="w-full h-11">
                  Sign in
                </Button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t" />
                <span className="absolute bg-background px-3 text-xs text-muted-foreground">
                  OR
                </span>
              </div>

              {/* GOOGLE LOGIN */}
              <Button
                onClick={() =>
                  window.open(`${config.baseUrl}/auth/google`, "_self")
                }
                type="button"
                variant="outline"
                className="w-full h-11"
              >
                Continue with Google
              </Button>
            </CardContent>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Create account
              </Link>
            </p>
          </Card>

          {/* Footer */}
          {/* <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Create account
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}
