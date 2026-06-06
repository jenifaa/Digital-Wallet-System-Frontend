/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { cn } from "@/lib/utils";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success(res?.message || "Password reset link sent to your email");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Unable to send reset link");
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-muted/30 px-4",
        className,
      )}
      {...props}
    >
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Forgot password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <Card className="border-muted/60 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Reset your password</CardTitle>
            <CardDescription>
              We&apos;ll email you instructions to create a new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
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
              </FieldGroup>
              <Button type="submit" className="h-11 w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
