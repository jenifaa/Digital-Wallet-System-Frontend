import { Link, useSearchParams } from "react-router";
import {
  CheckCircle2,
  ArrowRight,
  Wallet,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Success() {
  const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10 text-white">
      {/* Glow */}
      <div className="absolute -left-30 -top-30 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-30 -right-30 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <Card className="w-full max-w-2xl rounded-[32px] border border-emerald-500/20 bg-slate-950/80 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="size-14 text-emerald-400" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Payment Successful 🎉
            </h1>

            <p className="mt-4 text-slate-400">
              {message || "Transaction completed successfully"}
            </p>

            {/* Transaction Info */}
            <div className="mt-10 w-full space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <span className="text-slate-400">Transaction ID</span>

                <span className="font-medium text-white">
                  {transactionId}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <span className="text-slate-400">Amount</span>

                <span className="font-bold text-emerald-400">
                  ৳ {amount}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <span className="text-slate-400">Status</span>

                <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">
                  <BadgeCheck className="size-4" />

                  {status}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/user/dashboard">
                <Button className="h-12 rounded-2xl bg-emerald-600 px-8 text-white hover:bg-emerald-700">
                  Dashboard
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>

              <Link to="/user/history">
                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-slate-700 bg-slate-900 px-8 text-white hover:bg-slate-800"
                >
                  Transaction History
                </Button>
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <Wallet className="size-4" />
              Secure Digital Wallet Payment
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}