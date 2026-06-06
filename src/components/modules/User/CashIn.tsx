import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft } from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";

export default function CashIn() {
  return (
    <PageTransition className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-xl">
        <Card className="rounded-3xl border border-emerald-500/20 bg-slate-950/70">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-4">
                <ArrowDownLeft className="size-7 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-white">Cash In</CardTitle>
                <p className="text-sm text-slate-400">
                  Process customer cash-in transactions as a verified agent
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              Agent cash-in workflow integrates with the backend transaction
              API. Use the transaction module to complete verified cash deposits
              for customers.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
