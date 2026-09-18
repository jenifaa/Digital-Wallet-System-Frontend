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

  // Today's date
  const today = new Date();

  const isToday = (date: string) => {
    const transactionDate = new Date(date);

    return (
      transactionDate.getDate() === today.getDate() &&
      transactionDate.getMonth() === today.getMonth() &&
      transactionDate.getFullYear() === today.getFullYear()
    );
  };

  // Today's transactions only
  const todayTransactions = transactions.filter((transaction: any) =>
    isToday(transaction.createdAt),
  );

  // Send Money
  const sendMoney = transactions
    .filter((t: any) => t.type === "SEND" && t.status === "SUCCESS")
    .reduce((sum: number, t: any) => sum + Number(t.amount || 0), 0);

  // Add Money
  const addMoney = transactions
    .filter((t: any) => t.type === "ADD" && t.status === "SUCCESS")
    .reduce((sum: number, t: any) => sum + Number(t.amount || 0), 0);

  // Today's Cash In
  const cashIn = todayTransactions
    .filter((t: any) => t.type === "CASH_IN" && t.status === "SUCCESS")
    .reduce((sum: number, t: any) => sum + Number(t.amount || 0), 0);

  // Today's Cash Out
  const cashOut = todayTransactions
    .filter((t: any) => t.type === "CASH_OUT" && t.status === "SUCCESS")
    .reduce((sum: number, t: any) => sum + Number(t.amount || 0), 0);

  // Today's pending transactions
  const pending = transactions.filter(
    (t: any) => t.status === "PENDING",
  ).length;

  // Today's completed transactions
  const completed = transactions.filter(
    (t: any) => t.status === "SUCCESS",
  ).length;

  // Recent transactions
  const recentTransactions = [...transactions]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const summaryCards = [
    {
      title: "Send Money",
      url: "/agent/send-money",
      value: `৳ ${sendMoney.toLocaleString()}`,
      icon: ArrowDownLeft,
      color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    },
    {
      title: "Add Money",
      url: "/agent/add-money",
      value: `৳ ${addMoney.toLocaleString()}`,
      icon: ArrowDownLeft,
      color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    },
    {
      title: "Cash In",
      url: "/agent/cash-in",
      value: `৳ ${cashIn.toLocaleString()}`,
      icon: ArrowDownLeft,
      color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    },
    {
      title: "Cash Out",
      url: "/agent/cash-out",
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

          <StatusBadge status={userInfo?.data?.agentStatus || "APPROVED"} />
        </div>

        {/* Profile */}
        <Card className="overflow-hidden rounded-[32px] border border-indigo-500/20 bg-[#1F2340]">
          <CardContent className="p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Agent Information</p>

                <h2 className="mt-1 text-2xl font-bold text-white">
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
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            const content = (
              <Card
                className={`group h-full rounded-2xl border bg-linear-to-br ${card.color} bg-slate-950/70 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-950/20`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Left */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-900/80 p-2.5 transition-colors group-hover:bg-slate-800">
                        <Icon className="size-5 text-white" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-300">
                          {card.title}
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-white">
                          {isLoading ? "..." : card.value}
                        </h2>
                      </div>
                    </div>

                    {/* Arrow */}
                    {card.url && (
                      <ArrowUpRight className="size-4 text-slate-500 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );

            return card.url ? (
              <Link key={card.title} to={card.url} className="block">
                {content}
              </Link>
            ) : (
              <div key={card.title}>{content}</div>
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
                className="h-16 w-full rounded-2xl border-slate-700 text-black dark:text-white"
              >
                Process Cash Out
              </Button>
            </Link>

            <Link to="/agent/history">
              <Button
                variant="outline"
                className="h-16 w-full rounded-2xl border-slate-700 text-black dark:text-white"
              >
                <History className="mr-2 size-5" />
                Transactions
              </Button>
            </Link>

            <Button
              variant="outline"
              className="h-16 rounded-2xl border-slate-700 text-black dark:text-white"
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

                {recentTransactions.map((item: any) => {
                  const isCashIn = item.type === "CASH_IN";

                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-2xl p-3 ${
                            isCashIn ? "bg-emerald-500/10" : "bg-rose-500/10"
                          }`}
                        >
                          {isCashIn ? (
                            <ArrowDownLeft className="size-5 text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="size-5 text-rose-400" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium capitalize text-white">
                            {item.type?.replaceAll("_", " ").toLowerCase()}
                          </h3>

                          <p className="text-sm text-slate-400">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            isCashIn ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          ৳ {Number(item.amount || 0).toLocaleString()}
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
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Overview */}
            <Card className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 to-slate-950">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-semibold text-white">Today's Overview</h2>

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

                    <span className="font-semibold text-blue-500">{completed}</span>
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
