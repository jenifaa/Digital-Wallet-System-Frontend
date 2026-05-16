import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  Gift,
  History,
  Home,
  Phone,
  QrCode,
  ScanLine,
  Send,
  Wallet,
} from "lucide-react";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const quickActions = [
  {
    title: "Send Money",
    icon: Send,
    link: "send-money",
    color:
      "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20",
  },
  {
    title: "Add Money",
    icon: ArrowDownLeft,
    link: "add-money",
    color:
      "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  },
  {
    title: "Cash Out",
    icon: ArrowUpRight,
    link: "cash-out",
    color:
      "from-rose-500/20 to-rose-500/5 border-rose-500/20",
  },
  {
    title: "Payment",
    icon: CreditCard,
    link: "payment",
    color:
      "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
  },
  {
    title: "Scan QR",
    icon: QrCode,
    link: "scan-qr",
    color:
      "from-violet-500/20 to-violet-500/5 border-violet-500/20",
  },
  {
    title: "Mobile Recharge",
    icon: Phone,
    link: "mobile-recharge",
    color:
      "from-amber-500/20 to-amber-500/5 border-amber-500/20",
  },
  {
    title: "Offers",
    icon: Gift,
    link: "offers",
    color:
      "from-pink-500/20 to-pink-500/5 border-pink-500/20",
  },
  {
    title: "History",
    icon: History,
    link: "history",
    color:
      "from-slate-500/20 to-slate-500/5 border-slate-500/20",
  },
];

const recentTransactions = [
  {
    title: "Cash In",
    amount: "+৳5,000",
    time: "2 min ago",
  },
  {
    title: "Send Money",
    amount: "-৳1,250",
    time: "10 min ago",
  },
  {
    title: "Payment",
    amount: "-৳430",
    time: "1 hour ago",
  },
  {
    title: "Cash Out",
    amount: "-৳2,000",
    time: "3 hours ago",
  },
];

export default function UserAnalytics() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Welcome Back 👋
            </p>

            <h1 className="text-2xl font-bold">
              Nahida Rahman
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 transition hover:border-indigo-500/30">
              <Bell className="size-5 text-slate-300" />
            </button>

            <div className="size-11 overflow-hidden rounded-2xl border border-slate-700">
              <img
                src="https://i.pravatar.cc/300"
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <Card className="overflow-hidden rounded-[32px] border border-indigo-500/20 bg-linear-to-br from-indigo-600 via-indigo-700 to-slate-950 shadow-2xl shadow-indigo-950/40">
          <CardContent className="relative p-7">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-100/70">
                    Total Balance
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <h2 className="text-4xl font-bold tracking-tight">
                      {showBalance
                        ? "৳ 1,25,450"
                        : "৳ ••••••"}
                    </h2>

                    <button
                      onClick={() =>
                        setShowBalance(!showBalance)
                      }
                    >
                      {showBalance ? (
                        <EyeOff className="size-5 text-indigo-100/80" />
                      ) : (
                        <Eye className="size-5 text-indigo-100/80" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xl">
                  <Wallet className="size-7 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link to="/user/cash-in">
                  <Button className="h-14 w-full rounded-2xl bg-white text-slate-900 hover:bg-slate-100">
                    Add Money
                  </Button>
                </Link>

                <Link to="/user/cash-out">
                  <Button
                    variant="outline"
                    className="h-14 w-full rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                  >
                    Withdraw
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Quick Actions
            </h2>

            <button className="text-sm text-indigo-400">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-4">
            {quickActions.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  to={`/user/${item.link}`}
                  className="block"
                >
                  <Card
                    className={`group rounded-3xl border bg-linear-to-br ${item.color} cursor-pointer border-slate-800 bg-slate-950/60 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30`}
                  >
                    <CardContent className="flex flex-col items-center justify-center gap-4 p-3">
                      <div className="rounded-2xl bg-slate-900/80 p-2 transition group-hover:scale-105">
                        <Icon className="size-6 text-white" />
                      </div>

                      <p className="text-center text-sm font-medium text-slate-200">
                        {item.title}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Recent Transactions
                  </h2>

                  <p className="text-sm text-slate-400">
                    Your latest wallet activities
                  </p>
                </div>

                <Link to="/user/history">
                  <Button
                    variant="outline"
                    className="rounded-xl border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
                  >
                    View More
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl bg-indigo-500/10 p-3">
                        <ScanLine className="size-5 text-indigo-400" />
                      </div>

                      <div>
                        <h3 className="font-medium">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {item.time}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`font-semibold ${
                        item.amount.startsWith("+")
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {item.amount}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 to-slate-950">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-semibold">
                    Wallet Overview
                  </h2>

                  <Home className="size-5 text-indigo-400" />
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-400">
                        Monthly Spending
                      </span>

                      <span>৳ 24,000</span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-2 w-[70%] rounded-full bg-indigo-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-400">
                        Savings Goal
                      </span>

                      <span>৳ 80,000</span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-2 w-[45%] rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-indigo-500/20 bg-linear-to-br from-indigo-600 to-indigo-950">
              <CardContent className="p-6">
                <p className="text-sm text-indigo-100/80">
                  Special Cashback
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Get 15% Cashback
                </h2>

                <p className="mt-2 text-sm text-indigo-100/70">
                  On mobile recharge and utility bill payments.
                </p>

                <Link to="/user/offers">
                  <Button className="mt-5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100">
                    Claim Offer
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}