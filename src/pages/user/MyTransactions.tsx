/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  BadgeDollarSign,
  Download,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageSkeleton from "@/components/shared/PageSkeleton";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import { useMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";



const ITEMS_PER_PAGE = 10;

export default function MyTransactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data, isLoading } = useMyTransactionsQuery(undefined);

  const transactions = data?.data || [];

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (tx: any) =>
          tx.transactionId?.toLowerCase().includes(query) ||
          tx.type?.toLowerCase().includes(query),
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((tx: any) => tx.type === typeFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((tx: any) => tx.status === statusFilter);
    }

    result.sort((a: any, b: any) => {
      if (sortBy === "amount-high") return b.amount - a.amount;
      if (sortBy === "amount-low") return a.amount - b.amount;
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

    return result;
  }, [transactions, search, sortBy, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "SEND":
        return (
          <ArrowUpRight className="size-4 text-rose-400" />
        );

      case "ADD":
        return (
          <Wallet className="size-4 text-emerald-400" />
        );

      case "CASH_IN":
        return (
          <ArrowDownLeft className="size-4 text-emerald-400" />
        );

      case "CASH_OUT":
        return (
          <BadgeDollarSign className="size-4 text-orange-400" />
        );

      default:
        return (
          <Wallet className="size-4 text-indigo-400" />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <PageSkeleton />
      </div>
    );
  }

  const handleExport = () => {
    const csv = [
      ["Type", "Entry", "Amount", "Fee", "Status", "Transaction ID", "Date"],
      ...filteredTransactions.map((tx: any) => [
        tx.type,
        tx.entry,
        tx.amount,
        tx.fee || 0,
        tx.status,
        tx.transactionId,
        new Date(tx.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="rounded-3xl border border-slate-800 bg-slate-950/60">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl text-white">
                  Transaction History
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Advanced filters, sorting, and export for all wallet activities.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-slate-700"
                onClick={handleExport}
              >
                <Download className="size-4" />
                Export CSV
              </Button>
            </div>

            <SearchFilterBar
              searchValue={search}
              onSearchChange={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
              searchPlaceholder="Search by transaction ID or type..."
              statusValue={typeFilter}
              onStatusChange={(value) => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
              statusOptions={[
                { label: "All types", value: "all" },
                { label: "Send", value: "SEND" },
                { label: "Add Money", value: "ADD" },
                { label: "Cash In", value: "CASH_IN" },
                { label: "Cash Out", value: "CASH_OUT" },
              ]}
              sortValue={sortBy}
              onSortChange={setSortBy}
              sortOptions={[
                { label: "Newest first", value: "newest" },
                { label: "Amount: High to low", value: "amount-high" },
                { label: "Amount: Low to high", value: "amount-low" },
              ]}
              onReset={() => {
                setSearch("");
                setTypeFilter("all");
                setStatusFilter("all");
                setSortBy("newest");
                setCurrentPage(1);
              }}
            />
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 bg-slate-900/70 hover:bg-slate-900/70">
                    <TableHead className="text-slate-300">
                      Type
                    </TableHead>

                    <TableHead className="text-slate-300">
                      Entry
                    </TableHead>

                    <TableHead className="text-slate-300">
                      Amount
                    </TableHead>

                    <TableHead className="text-slate-300">
                      Fee
                    </TableHead>

                    <TableHead className="text-slate-300">
                      Status
                    </TableHead>

                    <TableHead className="text-slate-300">
                      Transaction ID
                    </TableHead>

                    <TableHead className="text-slate-300">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map(
                      (transaction: any) => (
                        <TableRow
                          key={transaction._id}
                          className="border-slate-800 hover:bg-slate-900/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2 font-medium text-white">
                              {getTransactionIcon(
                                transaction.type,
                              )}

                              {transaction.type.replace(
                                "_",
                                " ",
                              )}
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge
                              className={`rounded-full px-3 py-1 text-xs ${
                                transaction.entry ===
                                "CREDIT"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {transaction.entry}
                            </Badge>
                          </TableCell>

                          <TableCell
                            className={`font-semibold ${
                              transaction.entry ===
                              "CREDIT"
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            {transaction.entry ===
                            "CREDIT"
                              ? "+"
                              : "-"}
                            ৳{transaction.amount}
                          </TableCell>

                          <TableCell className="text-slate-300">
                            ৳{transaction.fee || 0}
                          </TableCell>

                          <TableCell>
                            <Badge
                              className={`rounded-full px-3 py-1 text-xs ${
                                transaction.status ===
                                "SUCCESS"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : transaction.status ===
                                      "PENDING"
                                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>

                          <TableCell className="max-w-45 truncate text-slate-400">
                            {transaction.transactionId}
                          </TableCell>

                          <TableCell className="text-slate-400">
                            {new Date(
                              transaction.createdAt,
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-10 text-center text-slate-400"
                      >
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();

                          if (currentPage > 1) {
                            setCurrentPage(
                              currentPage - 1,
                            );
                          }
                        }}
                        className="border border-slate-800 bg-slate-900 text-white hover:bg-slate-800"
                      />
                    </PaginationItem>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            isActive={
                              currentPage === index + 1
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(index + 1);
                            }}
                            className="border border-slate-800 bg-slate-900 text-white hover:bg-slate-800"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    {totalPages > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();

                          if (
                            currentPage < totalPages
                          ) {
                            setCurrentPage(
                              currentPage + 1,
                            );
                          }
                        }}
                        className="border border-slate-800 bg-slate-900 text-white hover:bg-slate-800"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

