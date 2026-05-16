/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
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

import { useSendMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";

type TSendMoneyForm = {
  receiver: string;
  amount: number;
  pin: string;
  type: "SEND";
};

export default function SendMoney() {
  const navigate = useNavigate();

  const [sendMoney, { isLoading: isSendingMoney }] = useSendMoneyMutation();

  const { data: myWallet, isLoading } = useMyWalletQuery(undefined);

  const form = useForm<TSendMoneyForm>({
    defaultValues: {
      receiver: "",
      amount: 0,
      pin: "",
      type: "SEND",
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

  const onSubmit = async (data: TSendMoneyForm) => {
    try {
      const payload = {
        receiver: data.receiver,
        amount: Number(data.amount),
        pin: data.pin,
        type: "SEND",
      };

      const res = await sendMoney(payload).unwrap();

      toast.success(res?.message || "Money sent successfully");

      form.reset();
    } catch (error: any) {
      console.log(error);
      if (
        error?.status === 400 &&
        error?.data?.message === "Insufficient balance"
      ) {
        toast.error("Insufficient balance. Please add money to your wallet.");
      }
   
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
                <Send className="size-7 text-indigo-400" />
              </div>

              <div>
                <CardTitle className="text-2xl text-white">
                  Send Money
                </CardTitle>

                <CardDescription className="text-slate-400">
                  Instantly transfer money to another wallet
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup className="space-y-5">
                <Field>
                  <FieldLabel className="text-slate-300">
                    Receiver Phone Number
                  </FieldLabel>

                  <Input
                    type="text"
                    placeholder="01XXXXXXXXX"
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("receiver", { required: true })}
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-slate-300">Amount</FieldLabel>

                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("amount", { required: true, min: 1 })}
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-slate-300">PIN</FieldLabel>

                  <Input
                    type="password"
                    placeholder="Enter wallet PIN"
                    maxLength={6}
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("pin", { required: true })}
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={isSendingMoney}
                className="h-12 w-full rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isSendingMoney ? "Sending..." : "Send Money"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
