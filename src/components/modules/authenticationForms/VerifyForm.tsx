/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { cn } from "@/lib/utils";

import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";

/* ---------------- Schema ---------------- */

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type VerifyInputs = z.infer<typeof FormSchema>;

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || location.state;

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const [sendOtp, { isLoading: sendingOtp }] =
    useSendOtpMutation();

  const [verifyOtp, { isLoading: verifyingOtp }] =
    useVerifyOtpMutation();

  const form = useForm<VerifyInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  /* ---------------- Redirect ---------------- */

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  /* ---------------- Timer ---------------- */

  useEffect(() => {
    if (!otpSent || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* ---------------- Send OTP ---------------- */

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP...");

    try {
      const res = await sendOtp({ email }).unwrap();

      if (res.success) {
        toast.success("OTP sent successfully", {
          id: toastId,
        });

        setOtpSent(true);
        setTimer(120);
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to send OTP",
        {
          id: toastId,
        }
      );
    }
  };

  /* ---------------- Verify OTP ---------------- */

  const onSubmit = async (data: VerifyInputs) => {
    const toastId = toast.loading("Verifying OTP...");

    try {
      const res = await verifyOtp({
        email,
        otp: data.pin,
      }).unwrap();

      if (res.success) {
        toast.success("OTP verified successfully 🎉", {
          id: toastId,
        });

        navigate("/login");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Invalid OTP",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">

        <Card className="shadow-xl border-muted/60">

          {/* HEADER */}
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">
              Verify your email
            </CardTitle>

            <CardDescription>
              {otpSent ? (
                <>
                  Enter the 6-digit verification code sent to
                  <br />
                  <span className="font-medium text-foreground">
                    {email}
                  </span>
                </>
              ) : (
                <>
                  We&apos;ll send a verification code to
                  <br />
                  <span className="font-medium text-foreground">
                    {email}
                  </span>
                </>
              )}
            </CardDescription>
          </CardHeader>

          {/* SEND OTP */}
          {!otpSent ? (
            <CardFooter>
              <Button
                onClick={handleSendOtp}
                disabled={sendingOtp}
                className="w-full h-11"
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
              </Button>
            </CardFooter>
          ) : (
            <>
              {/* OTP FORM */}
              <CardContent>
                <form
                  id="otp-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FieldGroup>

                    <Controller
                      control={form.control}
                      name="pin"
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="items-center"
                        >
                          <FieldLabel>
                            One-Time Password
                          </FieldLabel>

                          <div className="flex justify-center pt-2">
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              onChange={field.onChange}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                              </InputOTPGroup>

                              <Dot className="mx-1 text-muted-foreground" />

                              <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>

                          <FieldDescription className="text-center pt-2">

                            {timer > 0 ? (
                              <>
                                Resend OTP in{" "}
                                <span className="font-medium text-foreground">
                                  {timer}s
                                </span>
                              </>
                            ) : (
                              <Button
                                type="button"
                                variant="link"
                                onClick={handleSendOtp}
                                className={cn(
                                  "p-0 h-auto text-sm"
                                )}
                              >
                                Resend OTP
                              </Button>
                            )}
                          </FieldDescription>

                          {fieldState.error && (
                            <FieldError
                              errors={[fieldState.error]}
                            />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              </CardContent>

              {/* FOOTER */}
              <CardFooter>
                <Button
                  form="otp-form"
                  type="submit"
                  disabled={verifyingOtp}
                  className="w-full h-11"
                >
                  {verifyingOtp
                    ? "Verifying..."
                    : "Verify Email"}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}