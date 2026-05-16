/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Wallet } from "lucide-react";
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

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useAddMoneyMutation } from "@/redux/features/transaction/transaction.api";

import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";

type TAddMoneyForm = {
  amount: number;
  type: "ADD";
  pin: string;
};

export default function AddMoney() {
  const navigate = useNavigate();

  const [addMoney, { isLoading: isAddingMoney }] = useAddMoneyMutation();

  const { data: myWallet, isLoading } = useMyWalletQuery(undefined);

  const form = useForm<TAddMoneyForm>({
    defaultValues: {
      amount: 0,
      type: "ADD",
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

  const onSubmit = async (data: TAddMoneyForm) => {
    try {
      const payload = {
        amount: Number(data.amount),
        type: "ADD",
        pin: data.pin,
      };

      const res = await addMoney(payload).unwrap();

      toast.success(res?.message || "Redirecting to payment gateway");

      const paymentUrl = res?.data?.paymentUrl;

      if (paymentUrl) {
        window.open(res.data.paymentUrl);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to initialize payment");
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
              <div className="rounded-2xl bg-indigo-500/10 p-4">
                <Wallet className="size-7 text-indigo-400" />
              </div>

              <div>
                <CardTitle className="text-2xl text-white">Add Money</CardTitle>

                <CardDescription className="text-slate-400">
                  Securely add money into your wallet
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup className="space-y-5">
                <Field>
                  <FieldLabel className="text-slate-300">Amount</FieldLabel>

                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("amount", {
                      required: true,
                      min: 1,
                    })}
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-slate-300">Wallet PIN</FieldLabel>

                  <Input
                    type="password"
                    placeholder="Enter wallet pin"
                    maxLength={6}
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("pin", {
                      required: true,
                    })}
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={isAddingMoney}
                className="h-12 w-full rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isAddingMoney ? "Processing..." : "Continue Payment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
