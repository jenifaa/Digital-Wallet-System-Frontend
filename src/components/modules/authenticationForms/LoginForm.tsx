/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import img from "@/assets/images/login.png";
import bg from "@/assets/images/bg.jpg";
import google from "@/assets/icons/google.png";
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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";

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

   const [showPassword, setShowPassword] = React.useState(false);

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
      <div className="w-full mx-auto md:flex items-center justify-center   max-w-7xl ">
        <div className="flex justify-center  ">
          <img
            src={img}
            alt="Login"
            className="max-w-sm md:max-w-130 lg:max-w-146 md:rounded-l-3xl  object-contain md:border-t-2 md:border-b-2 md:border-l-2 md:border-r-0 md:border-white shadow-2xl"
          />
        </div>

        <div className="w-full max-w-sm  lg:max-w-md sm:mx-auto md:mx-0 lg:space-y-6">
          {/* Card */}
          <Card className="  bg-[#e3e3f8] md:h-123 lg:h-full  p-5 rounded-none md:rounded-r-3xl md:border-t-2 md:border-b-2 md:border-r-2 md:border-l-0 md:border-white shadow-2xl">
            <CardHeader className="">
              <CardTitle className="text-xl text-black font-semibold">
                Sign in
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter your credentials below
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-black">
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="lg:space-y-4"
              >
                <FieldGroup className="lg:space-y-4">
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
                          className="h-11 border-2 border-gray-400"
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
                        <InputGroup className="h-11 border-2 border-gray-400">
                          <InputGroupInput
                           {...field}
                            id="inline-end-input"
                           type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className=""
                          />
                          <InputGroupAddon align="inline-end">
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="text-muted-foreground hover:text-foreground"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </button>
                          </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>
                          Must be at least 6 characters
                        </FieldDescription>
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>

                      // <Field data-invalid={fieldState.invalid}>
                      //   <FieldLabel>Password</FieldLabel>
                      //   <Input
                      //     {...field}
                      //     type="password"
                      //     placeholder="••••••••"
                      //     className="h-11 border-2 border-gray-400"
                      //   />
                      //   <FieldDescription>
                      //     Must be at least 6 characters
                      //   </FieldDescription>
                      //   {fieldState.error && (
                      //     <FieldError errors={[fieldState.error]} />
                      //   )}
                      // </Field>
                    )}
                  />

                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-black hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FieldGroup>

                {/* ACTION BUTTON */}
                <Button type="submit" className="w-full h-11 border-2 border-gray-400">
                  Sign in
                </Button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-black" />
                <span className="absolute bg-[#e3e3f8]  px-3 text-xs text-black font-semibold">
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
                <img src={google} alt="Google" className="w-5 h-5 " />
                Continue with Google
              </Button>
            </CardContent>
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-black hover:underline"
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
