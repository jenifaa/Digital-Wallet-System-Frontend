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
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function ChangePasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success(res?.message || "Password changed successfully");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Unable to change password");
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
          <h1 className="text-3xl font-bold tracking-tight">Change password</h1>
          <p className="text-sm text-muted-foreground">
            Update your account password securely
          </p>
        </div>

        <Card className="border-muted/60 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Security settings</CardTitle>
            <CardDescription>
              Use a strong password you don&apos;t use elsewhere
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FieldGroup className="space-y-4">
                <Controller
                  name="currentPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Current password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        className="h-11"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="newPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>New password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        className="h-11"
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
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Confirm new password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
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
                {isLoading ? "Saving..." : "Update password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          <Link to="/profile" className="font-medium text-primary hover:underline">
            Back to profile
          </Link>
        </p>
      </div>
    </div>
  );
}
