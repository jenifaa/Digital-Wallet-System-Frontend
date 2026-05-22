/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";

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

import { useSetPhoneMutation } from "@/redux/features/auth/auth.api";

type PhoneInputs = {
  phone: string;
};

export default function SetPhoneForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [setPhone, { isLoading }] = useSetPhoneMutation();

  const userId = searchParams.get("userId");

  const form = useForm<PhoneInputs>({
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<PhoneInputs> = async (data) => {
    try {
      if (!userId) {
        toast.error("User ID missing. Please login again.");
        return;
      }

      await setPhone({
        userId,
        phone: data.phone,
      }).unwrap();

      toast.success("Phone added successfully 🎉");

      navigate("/dashboard");
    } catch (err: any) {
      const message = err?.data?.message;
      toast.error(message || "Failed to set phone number");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4 bg-muted/30",
        className,
      )}
      {...props}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Add your phone number to activate your wallet
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-lg border-muted/60">
          <CardHeader>
            <CardTitle>Phone Number</CardTitle>
            <CardDescription>
              This will be used for wallet verification
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              id="set-phone-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FieldGroup>
                <Controller
                  name="phone"
                  control={form.control}
                  rules={{
                    required: "Phone number is required",
                    minLength: {
                      value: 10,
                      message: "Phone number is too short",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Phone Number</FieldLabel>

                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your phone number"
                        className="h-11"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
