/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  Clock,
  Users,
} from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import StatusBadge from "@/components/shared/StatusBadge";

const summaryCards = [
  {
    title: "Today's Cash In",
    value: "৳ 45,200",
    icon: ArrowDownLeft,
    color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  },
  {
    title: "Today's Cash Out",
    value: "৳ 32,800",
    icon: ArrowUpRight,
    color: "from-rose-500/20 to-rose-500/5 border-rose-500/20",
  },
  {
    title: "Customer Transactions",
    value: "128",
    icon: Users,
    color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20",
  },
  {
    title: "Pending Approvals",
    value: "2",
    icon: Clock,
    color: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
  },
];

export default function AgentAnalytics() {
  const { data: userInfo } = useUserInfoQuery(undefined);

  return (
    <PageTransition className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Agent Dashboard</p>
            <h1 className="text-2xl font-bold">
              Welcome, {userInfo?.data?.name ?? "Agent"}
            </h1>
          </div>
          <StatusBadge status="APPROVED" />
        </div>

        <Card className="rounded-3xl border border-indigo-500/20 bg-linear-to-br from-indigo-600 to-slate-950">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <p className="text-sm text-indigo-100/70">Agent Profile</p>
              <h2 className="text-xl font-bold">{userInfo?.data?.name}</h2>
              <p className="text-sm text-indigo-100/70">{userInfo?.data?.email}</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2">
              <BadgeCheck className="size-5 text-emerald-300" />
              <span className="text-sm">Verified Agent</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card
              key={card.title}
              className={`rounded-3xl border bg-linear-to-br ${card.color} border-slate-800 bg-slate-950/60`}
            >
              <CardContent className="p-5">
                <div className="mb-4 inline-flex rounded-2xl bg-slate-900/80 p-3">
                  <card.icon className="size-5 text-white" />
                </div>
                <p className="text-sm text-slate-400">{card.title}</p>
                <p className="mt-1 text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/user/cash-in">
            <Button className="h-16 w-full rounded-2xl text-base">
              Process Cash In
            </Button>
          </Link>
          <Link to="/user/cash-out">
            <Button
              variant="outline"
              className="h-16 w-full rounded-2xl border-slate-700 text-base text-white"
            >
              Process Cash Out
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
