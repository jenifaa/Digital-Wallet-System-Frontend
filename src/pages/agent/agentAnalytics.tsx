/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  Clock,
  Wallet,
  History,
  Users,
  Banknote,
} from "lucide-react";
import { Link } from "react-router";
import PageTransition from "@/components/shared/PageTransition";
import StatusBadge from "@/components/shared/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";

export default function AgentAnalytics() {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { data: transactionData, isLoading } =
    useMyTransactionsQuery(undefined);

  const transactions = transactionData?.data || [];

  const cashIn = transactions
    .filter((t: any) => t.type === "CASH_IN" && t.status === "SUCCESS")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const cashOut = transactions
    .filter((t: any) => t.type === "CASH_OUT" && t.status === "SUCCESS")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const pending = transactions.filter(
    (t: any) => t.status === "PENDING",
  ).length;

  const completed = transactions.filter(
    (t: any) => t.status === "SUCCESS",
  ).length;

  const recentTransactions = [...transactions]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const summaryCards = [
    {
      title: "Cash In",
      value: `৳ ${cashIn.toLocaleString()}`,
      icon: ArrowDownLeft,
      color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    },
    {
      title: "Cash Out",
      value: `৳ ${cashOut.toLocaleString()}`,
      icon: ArrowUpRight,
      color: "from-rose-500/20 to-rose-500/5 border-rose-500/20",
    },
    {
      title: "Completed",
      value: completed,
      icon: BadgeCheck,
      color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
    },
  ];

  return (
    <PageTransition className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Agent Dashboard</p>

            <h1 className="text-3xl font-bold">
              Welcome, {userInfo?.data?.name}
            </h1>
          </div>

          <StatusBadge status="APPROVED" />
        </div>

        {/* Profile */}

        <Card className="overflow-hidden rounded-[32px] border border-indigo-500/20 bg-[#1F2340]">
          <CardContent className="p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Agent Information</p>

                <h2 className="mt-1 text-2xl font-bold">
                  {userInfo?.data?.name}
                </h2>

                <p className="text-indigo-100/80">{userInfo?.data?.email}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5">
                <Wallet className="size-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.title}
                className={`rounded-3xl border bg-linear-to-br ${card.color} bg-slate-950/60`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-2xl bg-slate-900 p-3">
                    <Icon className="size-6 text-white" />
                  </div>

                  <p className="text-slate-400">{card.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {isLoading ? "Loading..." : card.value}
                  </h2>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}

        <div>
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link to="/agent/cash-in">
              <Button className="h-16 w-full rounded-2xl text-base">
                Process Cash In
              </Button>
            </Link>

            <Link to="/agent/cash-out">
              <Button
                variant="outline"
                className="h-16 w-full rounded-2xl border-slate-700 text-black"
              >
                Process Cash Out
              </Button>
            </Link>

            <Link to="/agent/history">
              <Button
                variant="outline"
                className="h-16 w-full rounded-2xl border-slate-700 text-black"
              >
                <History className="mr-2 size-5" />
                Transactions
              </Button>
            </Link>

            <Button
              variant="outline"
              className="h-16 rounded-2xl border-slate-700 text-black"
            >
              <Users className="mr-2 size-5" />
              Customers Served
            </Button>
          </div>
        </div>
        {/* Recent Transactions + Stats */}

        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          {/* Recent Transactions */}

          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Recent Transactions</h2>

                  <p className="text-sm text-slate-400">
                    Latest customer activities
                  </p>
                </div>

                <Link to="/agent/history">
                  <Button
                    variant="outline"
                    className="rounded-xl border-slate-700 bg-slate-900 text-white"
                  >
                    View All
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentTransactions.length === 0 && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center text-slate-400">
                    No transactions found.
                  </div>
                )}

                {recentTransactions.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-2xl p-3 ${
                          item.type === "CASH_IN"
                            ? "bg-emerald-500/10"
                            : "bg-rose-500/10"
                        }`}
                      >
                        {item.type === "CASH_IN" ? (
                          <ArrowDownLeft className="size-5 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="size-5 text-rose-400" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-medium capitalize">
                          {item.type.replace("_", " ")}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          item.type === "CASH_IN"
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        ৳ {item.amount.toLocaleString()}
                      </p>

                      <p
                        className={`text-xs ${
                          item.status === "SUCCESS"
                            ? "text-emerald-400"
                            : item.status === "PENDING"
                              ? "text-amber-400"
                              : "text-rose-400"
                        }`}
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Side */}

          <div className="space-y-6">
            {/* Overview */}

            <Card className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 to-slate-950">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-semibold">Today's Overview</h2>

                  <Banknote className="size-6 text-indigo-400" />
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Cash In</span>

                    <span className="font-semibold text-emerald-400">
                      ৳ {cashIn.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Cash Out</span>

                    <span className="font-semibold text-rose-400">
                      ৳ {cashOut.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Completed</span>

                    <span className="font-semibold">{completed}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pending</span>

                    <span className="font-semibold text-amber-400">
                      {pending}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commission */}

            <Card className="rounded-3xl border border-indigo-500/20 bg-linear-to-br from-indigo-600 to-indigo-950">
              <CardContent className="p-6">
                <p className="text-sm text-indigo-100/80">
                  Estimated Commission
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  ৳ {(cashIn * 0.01).toLocaleString()}
                </h2>

                <p className="mt-3 text-sm text-indigo-100/70">
                  Estimated at 1% of today's successful cash-in amount.
                </p>

                <Button className="mt-6 rounded-2xl bg-white text-slate-900 hover:bg-slate-100">
                  View Earnings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
