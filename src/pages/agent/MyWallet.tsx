
import {
  AlertTriangle,
  Lock,
  Shield,
  Wallet as WalletIcon,
} from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";
import PageSkeleton from "@/components/shared/PageSkeleton";
import StatusBadge from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const statusMessages: Record<string, { title: string; description: string }> = {
  ACTIVE: {
    title: "Your wallet is active",
    description: "All wallet features are available. You can send, receive, and withdraw funds.",
  },
  BLOCKED: {
    title: "Your wallet is blocked",
    description:
      "Outgoing transactions are restricted. Please contact support to resolve this issue.",
  },
  DEACTIVATED: {
    title: "Your wallet is deactivated",
    description:
      "This wallet has been deactivated. Reactivation requires verification with our support team.",
  },
};

export default function MyWallet() {
  const { data, isLoading } = useMyWalletQuery(undefined);
  const { data: userInfo } = useUserInfoQuery(undefined);

  const wallet = data?.data;
  const status = wallet?.status ?? "ACTIVE";
  const statusInfo = statusMessages[status] ?? statusMessages.ACTIVE;
  const restrictions = wallet?.restrictions ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <PageSkeleton />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Wallet Details</h1>
          <p className="text-sm text-slate-400">
            View your wallet status, balance, and restrictions
          </p>
        </div>

        <Card
          className={`rounded-3xl border ${
            status === "ACTIVE"
              ? "border-emerald-500/20 bg-emerald-500/5"
              : "border-rose-500/20 bg-rose-500/5"
          }`}
        >
          <CardContent className="flex flex-wrap items-start gap-4 p-6">
            <div
              className={`rounded-2xl p-3 ${
                status === "ACTIVE" ? "bg-emerald-500/10" : "bg-rose-500/10"
              }`}
            >
              {status === "ACTIVE" ? (
                <Shield className="size-6 text-emerald-400" />
              ) : (
                <AlertTriangle className="size-6 text-rose-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold">{statusInfo.title}</h2>
                <StatusBadge status={status} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{statusInfo.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <WalletIcon className="size-5 text-indigo-400" />
                Balance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Current Balance</p>
                <p className="text-3xl font-bold text-white">
                  ৳ {wallet?.balance?.toLocaleString() ?? "0"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Account Holder</p>
                <p className="font-medium">{userInfo?.data?.name}</p>
                <p className="text-sm text-slate-400">{userInfo?.data?.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">PIN Status</p>
                <p className="font-medium">
                  {wallet?.security?.isPinSet ? "PIN is set" : "PIN not set"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="size-5 text-indigo-400" />
                Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {restrictions.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No active restrictions on your wallet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {restrictions.map((restriction: string) => (
                    <li
                      key={restriction}
                      className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm text-rose-300"
                    >
                      {restriction}
                    </li>
                  ))}
                </ul>
              )}

              {!wallet?.security?.isPinSet && (
                <Link to="/user/set-pin" className="mt-4 block">
                  <Button className="w-full rounded-2xl">Set Wallet PIN</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
