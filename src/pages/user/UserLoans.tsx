/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Landmark, History, Receipt } from "lucide-react";

import PageTransition from "@/components/shared/PageTransition";
import PageSkeleton from "@/components/shared/PageSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useMyLoansQuery,
  useMyRepaymentsQuery,
  useRequestLoanMutation,
} from "@/redux/features/loan/loan.api";

const schema = z.object({
  amount: z.number().min(100, "Minimum loan amount is ৳100"),
  duration: z.number().min(1, "Duration must be at least 1 month"),
  purpose: z.string().min(10, "Please describe your loan purpose"),
});

type FormValues = z.infer<typeof schema>;

export default function UserLoans() {
  const [activeTab, setActiveTab] = useState<"request" | "history" | "repayments">(
    "request",
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data: loansData, isLoading: loansLoading } = useMyLoansQuery(undefined);
  const { data: repaymentsData, isLoading: repaymentsLoading } =
    useMyRepaymentsQuery(undefined);
  const [requestLoan, { isLoading: isSubmitting }] = useRequestLoanMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 1000, duration: 6, purpose: "" },
  });

  const loans = loansData?.data ?? [];
  const repayments = repaymentsData?.data ?? [];

  const filteredLoans = useMemo(() => {
    return loans.filter((loan: any) => {
      const matchesSearch =
        loan.purpose?.toLowerCase().includes(search.toLowerCase()) ||
        loan._id?.includes(search);
      const matchesStatus = status === "all" || loan.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [loans, search, status]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await requestLoan(data).unwrap();
      toast.success(res?.message || "Loan request submitted successfully");
      form.reset({ amount: 1000, duration: 6, purpose: "" });
      setActiveTab("history");
    } catch (err: any) {
      toast.error(err?.data?.message || "Unable to submit loan request");
    }
  };

  if (loansLoading || repaymentsLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <PageSkeleton />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Loan Management</h1>
          <p className="text-sm text-slate-400">
            Request loans, view history, and track repayments
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "request", label: "Request Loan", icon: Landmark },
            { id: "history", label: "Loan History", icon: History },
            { id: "repayments", label: "Repayments", icon: Receipt },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="gap-2 rounded-xl"
            >
              <tab.icon className="size-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === "request" && (
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
            <CardHeader>
              <CardTitle className="text-white">Request a Loan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FieldGroup className="grid gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel className="text-slate-300">Amount (৳)</FieldLabel>
                    <Input
                      type="number"
                      className="border-slate-800 bg-slate-900"
                      {...form.register("amount", { valueAsNumber: true })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-slate-300">
                      Duration (months)
                    </FieldLabel>
                    <Input
                      type="number"
                      className="border-slate-800 bg-slate-900"
                      {...form.register("duration", { valueAsNumber: true })}
                    />
                  </Field>
                </FieldGroup>
                <Field>
                  <FieldLabel className="text-slate-300">Purpose</FieldLabel>
                  <Textarea
                    rows={4}
                    className="border-slate-800 bg-slate-900"
                    {...form.register("purpose")}
                  />
                </Field>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <SearchFilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search loans..."
              statusValue={status}
              onStatusChange={setStatus}
              statusOptions={[
                { label: "All statuses", value: "all" },
                { label: "Pending", value: "PENDING" },
                { label: "Approved", value: "APPROVED" },
                { label: "Rejected", value: "REJECTED" },
                { label: "Active", value: "ACTIVE" },
                { label: "Paid", value: "PAID" },
              ]}
              onReset={() => {
                setSearch("");
                setStatus("all");
              }}
            />

            {filteredLoans.length === 0 ? (
              <EmptyState
                icon={Landmark}
                title="No loans found"
                description="Submit a loan request to get started."
                actionLabel="Request Loan"
                onAction={() => setActiveTab("request")}
              />
            ) : (
              <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead>ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLoans.map((loan: any) => (
                        <TableRow key={loan._id} className="border-slate-800">
                          <TableCell className="font-mono text-xs">
                            {loan._id.slice(-8)}
                          </TableCell>
                          <TableCell>৳{loan.amount?.toLocaleString()}</TableCell>
                          <TableCell>{loan.duration} mo</TableCell>
                          <TableCell>
                            <StatusBadge status={loan.status} />
                          </TableCell>
                          <TableCell>
                            {new Date(loan.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "repayments" && (
          <>
            {repayments.length === 0 ? (
              <EmptyState
                icon={Receipt}
                title="No repayments yet"
                description="Repayment records will appear once your loan is approved."
              />
            ) : (
              <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Paid At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repayments.map((item: any) => (
                        <TableRow key={item._id} className="border-slate-800">
                          <TableCell>৳{item.amount?.toLocaleString()}</TableCell>
                          <TableCell>
                            {new Date(item.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={item.status} />
                          </TableCell>
                          <TableCell>
                            {item.paidAt
                              ? new Date(item.paidAt).toLocaleDateString()
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}
