/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";

import { useSetPinMutation } from "@/redux/features/wallet/wallet.api";

type TSetPinForm = {
  pin: string;
  confirmPin: string;
};

export default function SetPin() {
  const navigate = useNavigate();

  const { data: myWallet, isLoading } = useMyWalletQuery(undefined);

  const [setPin, { isLoading: isSettingPin }] = useSetPinMutation();

  const form = useForm<TSetPinForm>({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  useEffect(() => {
    const isPinSet = myWallet?.data?.security?.isPinSet;

    if (isPinSet) {
      toast.info("PIN already set");

      navigate("/user/analytics");
    }
  }, [myWallet, navigate]);

  const onSubmit = async (data: TSetPinForm) => {
    if (data.pin !== data.confirmPin) {
      toast.error("PIN does not match");
      return;
    }

    if (!/^\d{6,}$/.test(data.pin)) {
      toast.error("PIN must be at least 6 digits");
      return;
    }

    try {
      const payload = {
        pin: data.pin,
      };

      const res = await setPin(payload).unwrap();

      toast.success(res?.message || "PIN set successfully 🔐");

      form.reset();

      navigate("/user/analytics");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to set PIN");
    }
  };



  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-md">
        <Card className="rounded-3xl border border-indigo-500/20 bg-slate-950/70 shadow-2xl shadow-indigo-950/20">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-indigo-500/10 p-4">
                <LockKeyhole className="size-7 text-indigo-400" />
              </div>

              <div>
                <CardTitle className="text-2xl text-white">
                  Set Wallet PIN
                </CardTitle>

                <CardDescription className="text-slate-400">
                  Create a secure wallet pin
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup className="space-y-5">
                <Field>
                  <FieldLabel className="text-slate-300">Enter PIN</FieldLabel>

                  <Input
                    type="password"
                    maxLength={6}
                    placeholder="******"
                    className="h-12 border-slate-800 bg-slate-900 text-center text-xl tracking-[10px] text-white"
                    {...form.register("pin", {
                      required: "PIN is required",
                    })}
                  />

                  {form.formState.errors.pin && (
                    <FieldError errors={[form.formState.errors.pin]} />
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-slate-300">
                    Confirm PIN
                  </FieldLabel>

                  <Input
                    type="password"
                    maxLength={6}
                    placeholder="******"
                    className="h-12 border-slate-800 bg-slate-900 text-center text-xl tracking-[10px] text-white"
                    {...form.register("confirmPin", {
                      required: "Confirm PIN is required",
                    })}
                  />

                  {form.formState.errors.confirmPin && (
                    <FieldError errors={[form.formState.errors.confirmPin]} />
                  )}
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={isSettingPin}
                className="h-12 w-full rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isSettingPin ? "Saving PIN..." : "Save PIN"}
              </Button>

             
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
