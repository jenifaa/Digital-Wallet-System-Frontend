/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import PageTransition from "@/components/shared/PageTransition";
import PageSkeleton from "@/components/shared/PageSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllWalletsQuery, useUpdateWalletStatusMutation } from "@/redux/features/wallet/wallet.api";
import { toast } from "sonner";
import { Wallet } from "lucide-react";

export default function AllWallet() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    status: string;
    userName: string;
  } | null>(null);

  const { data: wallets, isLoading, refetch } = useAllWalletsQuery(undefined);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateWalletStatusMutation();

const walletData = wallets?.data ?? [];

const filteredWallets = useMemo(() => {
  return walletData.filter((wallet: any) => {
    const query = search.toLowerCase();
    const user = wallet.user;
    const matchesSearch =
      typeof user === "object"
        ? user?.name?.toLowerCase().includes(query) ||
          user?.email?.toLowerCase().includes(query)
        : true;
    const matchesStatus = status === "all" || wallet.status === status;
    return matchesSearch && matchesStatus;
  });
}, [walletData, search, status]);

  const handleConfirm = async () => {
    if (!confirmAction) return;
    try {
      const res = await updateStatus({
        id: confirmAction.id,
        status: confirmAction.status,
      }).unwrap();
      toast.success(res?.message || "Wallet status updated");
      setConfirmAction(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Unable to update wallet status");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <PageSkeleton />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#020617] p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6 text-white">
        <div>
          <h1 className="text-2xl font-bold">Wallet Management</h1>
          <p className="text-sm text-slate-400">
            Monitor and manage all user wallets
          </p>
        </div>

        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by user name or email..."
          statusValue={status}
          onStatusChange={setStatus}
          statusOptions={[
            { label: "All statuses", value: "all" },
            { label: "Active", value: "ACTIVE" },
            { label: "Blocked", value: "BLOCKED" },
            { label: "Deactivated", value: "DEACTIVATED" },
          ]}
          onReset={() => {
            setSearch("");
            setStatus("all");
          }}
        />

        {filteredWallets.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No wallets found"
            description="Wallet records will appear here once users register."
          />
        ) : (
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60 text-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800">
                    <TableHead className="text-white">User</TableHead>
                    <TableHead className="text-white">Balance</TableHead>
                    <TableHead className="text-white">Currency</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWallets.map((wallet: any) => {
                    const user = wallet.user;
                    const name = typeof user === "object" ? user?.name : "—";
                    const email = typeof user === "object" ? user?.email : typeof user === "string" ? user : "—";

                    return (
                      <TableRow key={wallet._id} className="border-slate-800">
                        <TableCell>
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-slate-400">{email}</p>
                          </div>
                        </TableCell>
                        <TableCell>৳{wallet.balance?.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="text-xs text-slate-400">{wallet.currency ?? "BDT"}</span>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={wallet.status ?? "ACTIVE"} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {wallet.status !== "ACTIVE" && (
                              <Button
                                size="sm"
                                className="rounded-xl"
                                onClick={() =>
                                  setConfirmAction({
                                    id: wallet._id,
                                    status: "ACTIVE",
                                    userName: name ?? "User",
                                  })
                                }
                              >
                                Activate
                              </Button>
                            )}
                            {wallet.status !== "BLOCKED" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-xl text-black"
                                onClick={() =>
                                  setConfirmAction({
                                    id: wallet._id,
                                    status: "BLOCKED",
                                    userName: name ?? "User",
                                  })
                                }
                              >
                                Block
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmationDialog
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title="Update wallet status?"
        description={`This will set ${confirmAction?.userName}'s wallet to ${confirmAction?.status?.toLowerCase()}.`}
        confirmLabel="Update Status"
        onConfirm={handleConfirm}
        isLoading={isUpdating}
      />
    </PageTransition>
  );
}