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
import {
  useAllLoansQuery,
  useApproveLoanMutation,
  useRejectLoanMutation,
} from "@/redux/features/loan/loan.api";
import { toast } from "sonner";
import { Landmark } from "lucide-react";

export default function AdminLoans() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject";
    id: string;
  } | null>(null);

  const { data, isLoading, refetch } = useAllLoansQuery(
    status !== "all" ? { status } : undefined,
  );
  const [approveLoan, { isLoading: isApproving }] = useApproveLoanMutation();
  const [rejectLoan, { isLoading: isRejecting }] = useRejectLoanMutation();

  const loans = data?.data ?? [];

  const filteredLoans = useMemo(() => {
    return loans.filter((loan: any) => {
      const query = search.toLowerCase();
      return (
        loan.user?.name?.toLowerCase().includes(query) ||
        loan.user?.email?.toLowerCase().includes(query) ||
        loan._id?.includes(query)
      );
    });
  }, [loans, search]);

  const handleConfirm = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction.type === "approve") {
        const res = await approveLoan(confirmAction.id).unwrap();
        toast.success(res?.message || "Loan approved");
      } else {
        const res = await rejectLoan(confirmAction.id).unwrap();
        toast.success(res?.message || "Loan rejected");
      }
      setConfirmAction(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed");
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
    <PageTransition className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Loan Management</h1>
          <p className="text-sm text-slate-400">
            Review, approve, or reject loan requests
          </p>
        </div>

        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by user or loan ID..."
          statusValue={status}
          onStatusChange={setStatus}
          statusOptions={[
            { label: "All statuses", value: "all" },
            { label: "Pending", value: "PENDING" },
            { label: "Approved", value: "APPROVED" },
            { label: "Rejected", value: "REJECTED" },
          ]}
          onReset={() => {
            setSearch("");
            setStatus("all");
          }}
        />

        {filteredLoans.length === 0 ? (
          <EmptyState
            icon={Landmark}
            title="No loan requests"
            description="Loan requests from users will appear here."
          />
        ) : (
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60 text-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader >
                  <TableRow className="border-slate-800 text-white">
                    <TableHead className="text-white">User</TableHead>
                    <TableHead className="text-white">Amount</TableHead>
                    <TableHead className="text-white">Duration</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLoans.map((loan: any) => (
                    <TableRow key={loan._id} className="border-slate-800">
                      <TableCell>
                        <div>
                          <p className="font-medium">{loan.user?.name ?? "—"}</p>
                          <p className="text-xs text-slate-400">
                            {loan.user?.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>৳{loan.amount?.toLocaleString()}</TableCell>
                      <TableCell>{loan.duration} mo</TableCell>
                      <TableCell>
                        <StatusBadge status={loan.status} />
                      </TableCell>
                      <TableCell>
                        {new Date(loan.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {loan.status === "PENDING" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              className="rounded-xl"
                              onClick={() =>
                                setConfirmAction({
                                  type: "approve",
                                  id: loan._id,
                                })
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-xl border-rose-500/30 text-rose-400"
                              onClick={() =>
                                setConfirmAction({
                                  type: "reject",
                                  id: loan._id,
                                })
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmationDialog
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={
          confirmAction?.type === "approve"
            ? "Approve this loan?"
            : "Reject this loan?"
        }
        description={
          confirmAction?.type === "approve"
            ? "The user will be notified and the loan will become active."
            : "This loan request will be rejected and the user will be notified."
        }
        confirmLabel={confirmAction?.type === "approve" ? "Approve" : "Reject"}
        variant={confirmAction?.type === "reject" ? "destructive" : "default"}
        onConfirm={handleConfirm}
        isLoading={isApproving || isRejecting}
      />
    </PageTransition>
  );
}
