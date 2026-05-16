import {
  Activity,
  ArrowUpRight,
  BadgeDollarSign,
  CreditCard,
  ShieldCheck,
  UserCheck,
  UserCog,
  UserMinus,
  Users,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
];

export default function Analytics() {
  const userStats = {
    totalUsers: 12450,
    totalActiveUsers: 10800,
    totalInActiveUsers: 900,
    totalBlockedUsers: 750,
    newUsersInLast7Days: 210,
    newUsersInLast30Days: 1240,
    usersByRole: [
      { _id: "USER", count: 9000 },
      { _id: "AGENT", count: 2500 },
      { _id: "ADMIN", count: 950 },
    ],
  };

  const walletStats = {
    totalWallets: 10400,
    avgBalance: 5400,
    totalBalance: 5300000,
    walletStatusStats: [
      { _id: "ACTIVE", count: 9200 },
      { _id: "BLOCKED", count: 700 },
      { _id: "SUSPENDED", count: 500 },
    ],
  };

  const transactionStats = {
    totalTransactions: 154000,
    transactionsLast7Days: 3400,
    transactionsLast30Days: 14500,
    transactionsByType: [
      { _id: "CASH_IN", count: 4000 },
      { _id: "CASH_OUT", count: 3200 },
      { _id: "SEND_MONEY", count: 5200 },
      { _id: "PAYMENT", count: 2100 },
    ],
  };

  const paymentStats = {
    totalPayments: 43000,
    totalRevenue: 850000,
    avgPaymentAmount: 480,
  };

  const cards = [
    {
      title: "Total Users",
      value: userStats.totalUsers,
      icon: Users,
      color:
        "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20",
    },
    {
      title: "Active Users",
      value: userStats.totalActiveUsers,
      icon: UserCheck,
      color:
        "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    },
    {
      title: "Blocked Users",
      value: userStats.totalBlockedUsers,
      icon: UserMinus,
      color:
        "from-rose-500/20 to-rose-500/5 border-rose-500/20",
    },
    {
      title: "Total Wallets",
      value: walletStats.totalWallets,
      icon: Wallet,
      color:
        "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
    },
    {
      title: "Transactions",
      value: transactionStats.totalTransactions,
      icon: Activity,
      color:
        "from-violet-500/20 to-violet-500/5 border-violet-500/20",
    },
    {
      title: "Revenue",
      value: `$${paymentStats.totalRevenue}`,
      icon: BadgeDollarSign,
      color:
        "from-amber-500/20 to-amber-500/5 border-amber-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="space-y-8 p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Monitor platform growth, transactions, wallet activity
              and revenue.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-indigo-500/20 bg-slate-900/80 px-4 py-2">
            <ShieldCheck className="size-5 text-indigo-400" />
            <span className="text-sm text-slate-300">
              System Stable
            </span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Card
                key={index}
                className={`border bg-linear-to-br ${card.color} rounded-3xl bg-slate-950/60 backdrop-blur-xl`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-400">
                        {card.title}
                      </p>

                      <h2 className="mt-3 text-3xl font-bold">
                        {card.value}
                      </h2>

                      <div className="mt-4 flex items-center gap-1 text-sm text-emerald-400">
                        <ArrowUpRight className="size-4" />
                        +12.4%
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-800/70 p-3">
                      <Icon className="size-6 text-indigo-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                User Roles Distribution
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userStats.usersByRole}
                      dataKey="count"
                      nameKey="_id"
                      outerRadius={110}
                    >
                      {userStats.usersByRole.map((_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[index % COLORS.length]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Transaction Types
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={transactionStats.transactionsByType}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                    />

                    <XAxis
                      dataKey="_id"
                      stroke="#94a3b8"
                    />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-indigo-500/10 p-3">
                  <UserCog className="size-6 text-indigo-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    New Users (7 Days)
                  </p>

                  <h2 className="text-2xl font-bold">
                    {userStats.newUsersInLast7Days}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-cyan-500/10 p-3">
                  <CreditCard className="size-6 text-cyan-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Avg Payment
                  </p>

                  <h2 className="text-2xl font-bold">
                    ${paymentStats.avgPaymentAmount}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-500/10 p-3">
                  <Wallet className="size-6 text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Avg Wallet Balance
                  </p>

                  <h2 className="text-2xl font-bold">
                    ${walletStats.avgBalance}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}