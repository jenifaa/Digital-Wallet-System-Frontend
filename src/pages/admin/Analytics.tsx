/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Activity,
  CreditCard,
  ShieldCheck,
  UserCog,
  Users,
  Wallet,
  Sparkles,
  TrendingUp,
  BarChart3,
  BadgeDollarSign,
  ShieldX,
  UserCheck,
  CalendarDays,
  ArrowUpRight,
  Zap,
} from "lucide-react";

import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
 
} from "recharts";



import { Badge } from "@/components/ui/badge";

import {
  usePaymentQuery,
  useTransactionQuery,
  useUserQuery,
  useWalletQuery,
} from "@/redux/features/stats/stats.api";

// ─── Reusable sub-components ──────────────────────────────────────────────────

function SectionBadge({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ElementType;
  label: string;
  color: "violet" | "indigo" | "emerald" | "cyan";
}) {
  const palettes: Record<string, string> = {
    violet: "border-violet-500/25 bg-violet-500/10 text-violet-300",
    indigo: "border-indigo-500/25 bg-indigo-500/10 text-indigo-300",
    emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase ${palettes[color]}`}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  badge,
  glow,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  badge?: string;
  glow: string; // tailwind color token, e.g. "violet"
}) {
  const glowMap: Record<string, string> = {
    violet: "from-violet-600/20 via-slate-900 to-slate-950 shadow-violet-900/30",
    cyan: "from-cyan-600/20 via-slate-900 to-slate-950 shadow-cyan-900/30",
    emerald: "from-emerald-600/20 via-slate-900 to-slate-950 shadow-emerald-900/30",
    amber: "from-amber-600/20 via-slate-900 to-slate-950 shadow-amber-900/30",
    indigo: "from-indigo-600/20 via-slate-900 to-slate-950 shadow-indigo-900/30",
    rose: "from-rose-600/20 via-slate-900 to-slate-950 shadow-rose-900/30",
  };

  const iconMap: Record<string, string> = {
    violet: "bg-violet-500/15 text-violet-300 ring-violet-500/20",
    cyan: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/20",
    emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/20",
    amber: "bg-amber-500/15 text-amber-300 ring-amber-500/20",
    indigo: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/20",
    rose: "bg-rose-500/15 text-rose-300 ring-rose-500/20",
  };

  const badgeMap: Record<string, string> = {
    violet: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    rose: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br ${glowMap[glow]} p-6 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:shadow-2xl`}
    >
      {/* glow orb */}
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full blur-3xl opacity-50 bg-${glow}-500/30`}
      />

      {/* top row */}
      <div className="relative flex items-start justify-between">
        <div
          className={`flex items-center justify-center rounded-2xl p-3 ring-1 ${iconMap[glow]}`}
        >
          <Icon className="size-6" />
        </div>

        {badge && (
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeMap[glow]}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* value */}
      <div className="relative mt-8">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <p className="mt-1.5 text-4xl font-black tracking-tight text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  count,
  total,
  colorClass,
}: {
  label: string;
  count: number;
  total: number;
  colorClass: string;
}) {
  const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2.5">
          <span className={`size-2 rounded-full ${colorClass}`} />
          <span className="font-medium text-slate-200">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{pct}%</span>
          <span className="font-bold text-white">{count}</span>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/80">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusPill({
  status,
  count,
  total,
}: {
  status: string;
  count: number;
  total: number;
}) {
  const colorMap: Record<string, string> = {
    SUCCESS: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    PENDING: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    FAILED: "border-rose-500/25 bg-rose-500/10 text-rose-300",
  };
  const dotMap: Record<string, string> = {
    SUCCESS: "bg-emerald-400",
    PENDING: "bg-amber-400",
    FAILED: "bg-rose-400",
  };
  const cls = colorMap[status] ?? "border-slate-700 bg-slate-800 text-slate-300";
  const dot = dotMap[status] ?? "bg-slate-400";
  const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-5 py-4 ${cls}`}
    >
      <div className="flex items-center gap-3">
        <span className={`size-2.5 rounded-full ${dot}`} />
        <div>
          <p className="text-xs opacity-70 uppercase tracking-widest">Status</p>
          <p className="font-bold text-white">{status}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-3xl font-black text-white">{count}</p>
        <p className="text-xs opacity-60">{pct}%</p>
      </div>
    </div>
  );
}

// ─── Custom Recharts Tooltip ───────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-white">{payload[0].value}</p>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Analytics() {
  const { data: transactionStats } = useTransactionQuery(undefined);
  const { data: paymentStats } = usePaymentQuery(undefined);
  const { data: userStats } = useUserQuery(undefined);
  const { data: walletStats } = useWalletQuery(undefined);

  const txTypeColors = ["bg-violet-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"];
  const roleColors = ["bg-indigo-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"];
  const walletColors = ["bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];

  return (
    <div className="min-h-screen bg-[#080c14] font-sans text-white">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-150 w-150 rounded-full bg-indigo-700/10 blur-[160px]" />
        <div className="absolute right-[-5%] top-[10%] h-125 w-125 rounded-full bg-violet-700/10 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[30%] h-100 w-100 rounded-full bg-cyan-700/8 blur-[140px]" />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl space-y-16 p-6 md:p-10">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-indigo-300 text-xs tracking-widest uppercase font-semibold">
              <Sparkles className="mr-2 size-3.5" />
              Wallet Analytics Platform
            </Badge>

            <h1 className="mt-5 text-5xl font-black leading-none tracking-tight md:text-6xl">
              Analytics{" "}
              <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
              Monitor user growth, transactions, payments, wallet activity and
              system performance — all in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] px-5 py-3.5 lg:self-auto">
            <div className="relative">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">System Status</p>
              <p className="text-sm font-bold text-emerald-300">All Operational</p>
            </div>
            <ShieldCheck className="ml-2 size-5 text-emerald-400" />
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════
            TRANSACTION ANALYTICS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          {/* section header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionBadge icon={Activity} label="Transaction Overview" color="violet" />
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Transaction Analytics
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Volume, unique users, status breakdown and top payments.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-3.5 backdrop-blur-sm">
              <div className="rounded-xl bg-violet-500/10 p-2.5">
                <BadgeDollarSign className="size-5 text-violet-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Total Volume
                </p>
                <p className="text-xl font-black text-white">
                  {transactionStats?.data?.totalTransactions ?? 0}
                </p>
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              icon={Activity}
              label="Total Transactions"
              value={transactionStats?.data?.totalTransactions ?? 0}
              badge="+18%"
              glow="violet"
            />
            <KpiCard
              icon={Users}
              label="Unique Users"
              value={transactionStats?.data?.totalUniqueUsers ?? 0}
              badge="Active"
              glow="cyan"
            />
            <KpiCard
              icon={TrendingUp}
              label="Last 7 Days"
              value={transactionStats?.data?.transactionsLast7Days ?? 0}
              badge="Weekly"
              glow="emerald"
            />
            <KpiCard
              icon={BarChart3}
              label="Last 30 Days"
              value={transactionStats?.data?.transactionsLast30Days ?? 0}
              badge="Monthly"
              glow="amber"
            />
          </div>

          {/* Three info panels */}
          <div className="grid gap-6 xl:grid-cols-3">
            {/* Types */}
            <div className="rounded-3xl border border-white/6 bg-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Transaction Types</h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Distribution across categories
              </p>
              <div className="space-y-5">
                {transactionStats?.data?.transactionsByType?.map(
                  (item: any, i: number) => (
                    <ProgressRow
                      key={i}
                      label={item?._id}
                      count={item?.count}
                      total={transactionStats?.data?.totalTransactions}
                      colorClass={txTypeColors[i % txTypeColors.length]}
                    />
                  )
                )}
              </div>
            </div>

            {/* Status */}
            <div className="rounded-3xl border border-white/6 bg-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Status Breakdown</h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Successful and pending states
              </p>
              <div className="space-y-3">
                {transactionStats?.data?.totalTransactionByStatus?.map(
                  (item: any, i: number) => (
                    <StatusPill
                      key={i}
                      status={item?._id}
                      count={item?.count}
                      total={transactionStats?.data?.totalTransactions}
                    />
                  )
                )}
              </div>
            </div>

            {/* Top transaction */}
            <div className="rounded-3xl border border-white/6 bg-linear-to-br from-violet-600/10 to-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Top Transaction</h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Highest recorded transaction
              </p>

              {transactionStats?.data?.highestTransactions?.[0] && (
                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/8 p-5">
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-violet-500/15 p-3 ring-1 ring-violet-500/20">
                      <BadgeDollarSign className="size-6 text-violet-300" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        transactionStats.data.highestTransactions[0].status ===
                        "SUCCESS"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      }`}
                    >
                      {transactionStats.data.highestTransactions[0].status}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      Amount
                    </p>
                    <p className="mt-1 text-5xl font-black tracking-tight text-white">
                      ${transactionStats.data.highestTransactions[0].amount}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 text-xs">
                    <div>
                      <p className="text-slate-500">Type</p>
                      <p className="mt-0.5 font-bold text-slate-200">
                        {transactionStats.data.highestTransactions[0].type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500">ID</p>
                      <p className="mt-0.5 font-mono font-bold text-slate-200">
                        #
                        {transactionStats.data.highestTransactions[0]._id.slice(
                          0,
                          6
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Transactions table */}
          <div className="rounded-3xl border border-white/6 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Recent Highest Transactions
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Top activity sorted by amount
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/80 p-2.5">
                <Activity className="size-5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-3">
              {transactionStats?.data?.highestTransactions?.map(
                (tx: any, i: number) => (
                  <div
                    key={tx?._id}
                    className="group flex items-center justify-between rounded-2xl border border-white/5 bg-slate-800/40 px-5 py-4 transition-all duration-200 hover:border-violet-500/20 hover:bg-slate-800/70"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-black text-violet-300 ring-1 ring-violet-500/20">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{tx?.type}</p>
                        <p className="mt-0.5 font-mono text-xs text-slate-500">
                          {tx?._id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-slate-500">
                          Amount
                        </p>
                        <p className="mt-0.5 text-2xl font-black text-white">
                          ${tx?.amount}
                        </p>
                      </div>
                      <span
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                          tx?.status === "SUCCESS"
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        }`}
                      >
                        {tx?.status}
                      </span>
                      <ArrowUpRight className="size-4 text-slate-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            USER ANALYTICS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionBadge icon={Users} label="User Overview" color="indigo" />
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                User Analytics
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Growth, activity, account status and role distribution.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-3.5 backdrop-blur-sm">
              <div className="rounded-xl bg-indigo-500/10 p-2.5">
                <UserCheck className="size-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Total Users
                </p>
                <p className="text-xl font-black text-white">
                  {userStats?.data?.totalUsers ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              icon={Users}
              label="Total Users"
              value={userStats?.data?.totalUsers ?? 0}
              badge="Platform"
              glow="indigo"
            />
            <KpiCard
              icon={UserCheck}
              label="Active Users"
              value={userStats?.data?.totalActiveUsers ?? 0}
              badge="Active"
              glow="emerald"
            />
            <KpiCard
              icon={TrendingUp}
              label="New (7 Days)"
              value={userStats?.data?.newUsersInLast7Days ?? 0}
              badge="Weekly"
              glow="violet"
            />
            <KpiCard
              icon={CalendarDays}
              label="New (30 Days)"
              value={userStats?.data?.newUsersInLast30Days ?? 0}
              badge="Monthly"
              glow="amber"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {/* Role distribution */}
            <div className="rounded-3xl border border-white/6 bg-slate-900/60 p-6 backdrop-blur-sm xl:col-span-2">
              <h3 className="text-lg font-bold text-white">
                User Role Distribution
              </h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Breakdown of users by system role
              </p>
              <div className="space-y-4">
                {userStats?.data?.usersByRole?.map(
                  (role: any, i: number) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/5 bg-slate-800/50 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`size-3 rounded-full ${
                              roleColors[i % roleColors.length]
                            }`}
                          />
                          <div>
                            <p className="text-xs text-slate-500">Role</p>
                            <p className="font-bold text-white">
                              {role?._id ?? "UNKNOWN"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black text-white">
                            {role?.count}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(
                              (role?.count / userStats?.data?.totalUsers) *
                              100
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            roleColors[i % roleColors.length]
                          }`}
                          style={{
                            width: `${(role?.count / userStats?.data?.totalUsers) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Status cards */}
            <div className="rounded-3xl border border-white/6 bg-linear-to-br from-indigo-600/8 to-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Account Status</h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Current account activity
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-emerald-400/70">Active</p>
                      <p className="mt-1 text-4xl font-black text-white">
                        {userStats?.data?.totalActiveUsers ?? 0}
                      </p>
                    </div>
                    <div className="rounded-xl bg-emerald-500/15 p-3">
                      <UserCheck className="size-6 text-emerald-300" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-amber-400/70">Inactive</p>
                      <p className="mt-1 text-4xl font-black text-white">
                        {userStats?.data?.totalInActiveUsers ?? 0}
                      </p>
                    </div>
                    <div className="rounded-xl bg-amber-500/15 p-3">
                      <UserCog className="size-6 text-amber-300" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/8 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-rose-400/70">Blocked</p>
                      <p className="mt-1 text-4xl font-black text-white">
                        {userStats?.data?.totalBlockedUsers ?? 0}
                      </p>
                    </div>
                    <div className="rounded-xl bg-rose-500/15 p-3">
                      <ShieldX className="size-6 text-rose-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PAYMENT ANALYTICS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionBadge icon={CreditCard} label="Payment Overview" color="emerald" />
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Payment Analytics
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Revenue flow, successful payments and performance.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-3.5 backdrop-blur-sm">
              <div className="rounded-xl bg-emerald-500/10 p-2.5">
                <BadgeDollarSign className="size-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Total Revenue
                </p>
                <p className="text-xl font-black text-white">
                  ${paymentStats?.data?.totalRevenue ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              icon={CreditCard}
              label="Total Payments"
              value={paymentStats?.data?.totalPayments ?? 0}
              badge="Payments"
              glow="emerald"
            />
            <KpiCard
              icon={Wallet}
              label="Total Revenue"
              value={`$${paymentStats?.data?.totalRevenue ?? 0}`}
              badge="Revenue"
              glow="cyan"
            />
            <KpiCard
              icon={BadgeDollarSign}
              label="Avg Payment"
              value={`$${paymentStats?.data?.avgPaymentAmount ?? 0}`}
              badge="Average"
              glow="violet"
            />
            <KpiCard
              icon={TrendingUp}
              label="Status Types"
              value={paymentStats?.data?.totalPaymentByStatus?.length ?? 0}
              badge="Growth"
              glow="amber"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* Payment status */}
            <div className="rounded-3xl border border-white/6 bg-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Payment Status</h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Overview of payment states
              </p>

              {paymentStats?.data?.totalPaymentByStatus?.length > 0 ? (
                <div className="space-y-3">
                  {paymentStats.data.totalPaymentByStatus.map(
                    (item: any, i: number) => (
                      <StatusPill
                        key={i}
                        status={item?._id}
                        count={item?.count}
                        total={paymentStats?.data?.totalPayments}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-800/20 text-center">
                  <div className="rounded-2xl bg-slate-800 p-4">
                    <CreditCard className="size-8 text-slate-600" />
                  </div>
                  <p className="mt-4 font-bold text-white">No Payment Data</p>
                  <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-slate-500">
                    Analytics will appear here once users start making payments.
                  </p>
                </div>
              )}
            </div>

            {/* Revenue summary */}
            <div className="rounded-3xl border border-white/6 bg-linear-to-br from-emerald-600/8 to-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Revenue Summary</h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Financial overview and earnings insights
              </p>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-emerald-500/15 p-4">
                    <BadgeDollarSign className="size-8 text-emerald-300" />
                  </div>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    Revenue Stats
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Total Platform Revenue
                  </p>
                  <p className="mt-2 text-6xl font-black tracking-tight text-white">
                    ${paymentStats?.data?.totalRevenue ?? 0}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Avg Payment
                      </p>
                      <p className="mt-1.5 text-2xl font-black text-white">
                        ${paymentStats?.data?.avgPaymentAmount ?? 0}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Total Payments
                      </p>
                      <p className="mt-1.5 text-2xl font-black text-white">
                        {paymentStats?.data?.totalPayments ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            WALLET ANALYTICS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionBadge icon={Wallet} label="Wallet Overview" color="cyan" />
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Wallet Analytics
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Balances, liquidity and wallet status distribution.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-3.5 backdrop-blur-sm">
              <div className="rounded-xl bg-cyan-500/10 p-2.5">
                <BadgeDollarSign className="size-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  System Balance
                </p>
                <p className="text-xl font-black text-white">
                  ${walletStats?.data?.totalBalance ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              icon={Wallet}
              label="Total Wallets"
              value={walletStats?.data?.totalWallets ?? 0}
              badge="Wallets"
              glow="cyan"
            />
            <KpiCard
              icon={BadgeDollarSign}
              label="Total Balance"
              value={`$${walletStats?.data?.totalBalance ?? 0}`}
              badge="Liquidity"
              glow="emerald"
            />
            <KpiCard
              icon={TrendingUp}
              label="Avg Balance"
              value={`$${Number(walletStats?.data?.avgBalance ?? 0).toFixed(2)}`}
              badge="Average"
              glow="violet"
            />
            <KpiCard
              icon={ShieldCheck}
              label="Status Types"
              value={walletStats?.data?.walletStatusStats?.length ?? 0}
              badge="Status"
              glow="amber"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {/* Wallet status distribution */}
            <div className="rounded-3xl border border-white/6 bg-slate-900/60 p-6 backdrop-blur-sm xl:col-span-2">
              <h3 className="text-lg font-bold text-white">
                Wallet Status Distribution
              </h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Current state of all wallets across the system
              </p>
              <div className="space-y-4">
                {walletStats?.data?.walletStatusStats?.map(
                  (wallet: any, i: number) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/5 bg-slate-800/50 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`size-3 rounded-full ${
                              walletColors[i % walletColors.length]
                            }`}
                          />
                          <div>
                            <p className="text-xs text-slate-500">Status</p>
                            <p className="font-bold text-white">
                              {wallet?._id ?? "UNKNOWN"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black text-white">
                            {wallet?.count}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(
                              (wallet?.count / walletStats?.data?.totalWallets) *
                              100
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            walletColors[i % walletColors.length]
                          }`}
                          style={{
                            width: `${(wallet?.count / walletStats?.data?.totalWallets) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Wallet summary */}
            <div className="rounded-3xl border border-white/6 bg-linear-to-br from-cyan-600/8 to-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Wallet Summary</h3>
              <p className="mb-6 mt-1 text-xs text-slate-500">
                Overall performance insights
              </p>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/8 p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-cyan-500/15 p-4">
                    <Wallet className="size-8 text-cyan-300" />
                  </div>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
                    Wallet Stats
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Total Liquidity
                  </p>
                  <p className="mt-2 text-6xl font-black tracking-tight text-white">
                    ${walletStats?.data?.totalBalance ?? 0}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Avg Balance
                      </p>
                      <p className="mt-1.5 text-2xl font-black text-white">
                        $
                        {Number(walletStats?.data?.avgBalance ?? 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Wallets
                      </p>
                      <p className="mt-1.5 text-2xl font-black text-white">
                        {walletStats?.data?.totalWallets ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CHART — Transaction Types Overview
        ═══════════════════════════════════════════════════════════════ */}
        <section>
          <div className="rounded-3xl border border-white/6 bg-slate-900/60 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl bg-violet-500/10 p-2.5">
                    <Activity className="size-5 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Transaction Types Overview
                  </h3>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Comparison of transaction activity by type
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-2">
                <Zap className="size-4 text-violet-400" />
                <span className="text-xs font-semibold text-violet-300">
                  Live Data
                </span>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionStats?.data?.transactionsByType ?? []}
                  barCategoryGap="30%"
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="2 4"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="_id"
                    stroke="#475569"
                    tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#475569"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(139,92,246,0.05)" }} />
                  <Bar
                    dataKey="count"
                    fill="url(#barGrad)"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* footer spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}