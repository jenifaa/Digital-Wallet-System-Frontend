/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowUpRight } from "lucide-react";
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

import { useCashOutMutation } from "@/redux/features/transaction/transaction.api";

import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";

type TCashOutForm = {
  agent: string;
  amount: number;
  type: "CASH_OUT";
  pin: string;
};

export default function CashOut() {
  const navigate = useNavigate();

  const [cashOut, { isLoading: isCashingOut }] = useCashOutMutation();

  const { data: myWallet, isLoading } = useMyWalletQuery(undefined);

  const form = useForm<TCashOutForm>({
    defaultValues: {
      agent: "",
      amount: 0,
      type: "CASH_OUT",
      pin: "",
    },
  });

  useEffect(() => {
    if (!isLoading) {
      const isPinSet = myWallet?.data?.security?.isPinSet;

      if (!isPinSet) {
        toast.error("Please set your wallet PIN first");

        navigate("/user/set-pin");
      }
    }
  }, [myWallet, isLoading, navigate]);

  const onSubmit = async (data: TCashOutForm) => {
    try {
      const payload = {
        agent: data.agent,
        amount: Number(data.amount),
        type: "CASH_OUT",
        pin: data.pin,
      };

      const res = await cashOut(payload).unwrap();

      toast.success(res?.message || "Cash-out successful");

      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cash out");
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
      <div className="mx-auto max-w-xl">
        <Card className="rounded-3xl border border-indigo-500/20 bg-slate-950/70 shadow-2xl shadow-indigo-950/20">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-rose-500/10 p-4">
                <ArrowUpRight className="size-7 text-rose-400" />
              </div>

              <div>
                <CardTitle className="text-2xl text-white">Cash Out</CardTitle>

                <CardDescription className="text-slate-400">
                  Withdraw money through an authorized agent
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup className="space-y-5">
                <Field>
                  <FieldLabel className="text-slate-300">Agent ID</FieldLabel>

                  <Input
                    type="text"
                    placeholder="Enter agent ID"
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("agent", {
                      required: "Agent ID is required",
                    })}
                  />

                  {form.formState.errors.agent && (
                    <FieldError errors={[form.formState.errors.agent]} />
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-slate-300">Amount</FieldLabel>

                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("amount", {
                      required: "Amount is required",
                      min: {
                        value: 1,
                        message: "Amount must be greater than 0",
                      },
                    })}
                  />

                  {form.formState.errors.amount && (
                    <FieldError errors={[form.formState.errors.amount]} />
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-slate-300">Wallet PIN</FieldLabel>

                  <Input
                    type="password"
                    placeholder="Enter wallet PIN"
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("pin", {
                      required: "PIN is required",
                      minLength: {
                        value: 4,
                        message: "PIN must be at least 4 digits",
                      },
                    })}
                  />

                  {form.formState.errors.pin && (
                    <FieldError errors={[form.formState.errors.pin]} />
                  )}
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={isCashingOut}
                className="h-12 w-full rounded-2xl bg-rose-600 text-white hover:bg-rose-700"
              >
                {isCashingOut ? "Processing..." : "Cash Out Now"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
