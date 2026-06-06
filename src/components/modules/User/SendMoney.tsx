/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Mail, Phone, Search, Send, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { useSendMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import {
  useLazySearchUsersQuery,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";

type TSendMoneyForm = {
  receiver: string;
  amount: number;
  pin: string;
  type: "SEND";
};

const TRANSACTION_FEE_RATE = 0.015;

export default function SendMoney() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<"phone" | "email">("phone");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<TSendMoneyForm | null>(null);

  const [sendMoney, { isLoading: isSendingMoney }] = useSendMoneyMutation();
  const { data: myWallet, isLoading } = useMyWalletQuery(undefined);
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [searchUsers, { data: searchResults, isFetching: isSearching }] =
    useLazySearchUsersQuery();

  const form = useForm<TSendMoneyForm>({
    defaultValues: {
      receiver: "",
      amount: 0,
      pin: "",
      type: "SEND",
    },
  });

  const amount = Number(form.watch("amount") || 0);
  const fee = useMemo(() => Math.ceil(amount * TRANSACTION_FEE_RATE), [amount]);
  const total = amount + fee;

  useEffect(() => {
    if (!isLoading) {
      const isPinSet = myWallet?.data?.security?.isPinSet;
      if (!isPinSet) {
        toast.error("Please set your wallet PIN first");
        navigate("/user/set-pin");
      }
    }
  }, [myWallet, isLoading, navigate]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const timer = setTimeout(() => {
        searchUsers(searchQuery);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, searchUsers]);

  const handleSelectRecipient = (user: any) => {
    setSelectedRecipient(user);
    form.setValue(
      "receiver",
      searchType === "phone" ? user.phone : user.email,
    );
    setSearchQuery("");
  };

  const onSubmit = (data: TSendMoneyForm) => {
    const receiverValue = data.receiver.trim();
    const currentEmail = userInfo?.data?.email;
    const currentPhone = userInfo?.data?.phone;

    if (
      receiverValue === currentEmail ||
      receiverValue === currentPhone
    ) {
      toast.error("You cannot send money to yourself");
      return;
    }

    if (amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (total > (myWallet?.data?.balance ?? 0)) {
      toast.error("Insufficient balance including transaction fee");
      return;
    }

    setPendingData(data);
    setShowConfirm(true);
  };

  const handleConfirmSend = async () => {
    if (!pendingData) return;

    try {
      const payload = {
        receiver: pendingData.receiver,
        amount: Number(pendingData.amount),
        pin: pendingData.pin,
        type: "SEND" as const,
      };

      const res = await sendMoney(payload).unwrap();
      toast.success(res?.message || "Money sent successfully");
      form.reset();
      setSelectedRecipient(null);
      setShowConfirm(false);
      setPendingData(null);
    } catch (error: any) {
      if (error?.data?.message === "Insufficient balance") {
        toast.error("Insufficient balance. Please add money to your wallet.");
      } else {
        toast.error(error?.data?.message || "Transfer failed");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <PageSkeleton />
      </div>
    );
  }

  const results = searchResults?.data ?? [];

  return (
    <div className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-xl space-y-6">
        <Card className="rounded-3xl border border-indigo-500/20 bg-slate-950/70 shadow-2xl shadow-indigo-950/20">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-indigo-500/10 p-4">
                <Send className="size-7 text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">
                  Send Money
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Search by email or phone and transfer instantly
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={searchType === "phone" ? "default" : "outline"}
                className="flex-1 rounded-xl"
                onClick={() => setSearchType("phone")}
              >
                <Phone className="mr-2 size-4" />
                Phone
              </Button>
              <Button
                type="button"
                variant={searchType === "email" ? "default" : "outline"}
                className="flex-1 rounded-xl"
                onClick={() => setSearchType("email")}
              >
                <Mail className="mr-2 size-4" />
                Email
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === "phone"
                    ? "Search by phone number..."
                    : "Search by email..."
                }
                className="h-12 border-slate-800 bg-slate-900 pl-10 text-white"
              />
              {isSearching && (
                <p className="mt-2 text-xs text-slate-400">Searching...</p>
              )}
              {results.length > 0 && searchQuery.length >= 3 && (
                <div className="absolute z-10 mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                  {results.map((user: any) => (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => handleSelectRecipient(user)}
                      className="flex w-full items-center gap-3 border-b border-slate-800 px-4 py-3 text-left last:border-0 hover:bg-slate-900"
                    >
                      <div className="rounded-full bg-indigo-500/10 p-2">
                        <User className="size-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-slate-400">
                          {user.email} • {user.phone}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedRecipient && (
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                <p className="text-xs text-indigo-300">Recipient</p>
                <p className="font-semibold">{selectedRecipient.name}</p>
                <p className="text-sm text-slate-400">
                  {selectedRecipient.email}
                </p>
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup className="space-y-5">
                <Field>
                  <FieldLabel className="text-slate-300">
                    {searchType === "phone" ? "Receiver Phone" : "Receiver Email"}
                  </FieldLabel>
                  <Input
                    type="text"
                    placeholder={
                      searchType === "phone" ? "01XXXXXXXXX" : "user@example.com"
                    }
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("receiver", { required: true })}
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-slate-300">Amount (৳)</FieldLabel>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("amount", { required: true, min: 1 })}
                  />
                </Field>

                {amount > 0 && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Transfer amount</span>
                      <span>৳{amount.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-slate-400">
                      <span>Fee (1.5%)</span>
                      <span>৳{fee.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 flex justify-between font-semibold text-white">
                      <span>Total</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Field>
                  <FieldLabel className="text-slate-300">PIN</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Enter wallet PIN"
                    maxLength={6}
                    className="h-12 border-slate-800 bg-slate-900 text-white"
                    {...form.register("pin", { required: true })}
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={isSendingMoney}
                className="h-12 w-full rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Review Transfer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <ConfirmationDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Confirm transfer"
        description={`Send ৳${amount.toLocaleString()} with a fee of ৳${fee.toLocaleString()} to ${pendingData?.receiver}? Total debit: ৳${total.toLocaleString()}.`}
        confirmLabel="Send Money"
        onConfirm={handleConfirmSend}
        isLoading={isSendingMoney}
      />
    </div>
  );
}
