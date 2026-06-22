"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  Crown,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for individuals starting with digital payments.",
    icon: CreditCard,
    button: "Start Free",
    popular: false,
    features: [
      "Digital wallet account",
      "Send and receive money",
      "Basic transaction history",
      "QR payments",
      "Standard support",
    ],
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "For active users who need smarter money tools.",
    icon: Crown,
    button: "Choose Premium",
    popular: true,
    features: [
      "Everything in Starter",
      "Virtual card management",
      "Instant wallet transfers",
      "Advanced spending analytics",
      "Priority support",
    ],
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    description: "For merchants and teams managing payments at scale.",
    icon: ShieldCheck,
    button: "Go Business",
    popular: false,
    features: [
      "Everything in Premium",
      "Merchant payment tools",
      "Team wallet access",
      "API integration support",
      "Fraud monitoring dashboard",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] px-6 py-10 text-[#1F2340] dark:bg-black dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,144,208,0.18),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(245,158,11,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8B90D0]/30 bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#6C72B8] shadow-sm">
            <Sparkles className="h-4 w-4" />
            Pricing Plans
          </span>

          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Simple pricing for{" "}
            <span className="bg-linear-to-r from-[#D6D2F0] via-[#8B90D0] to-[#6C72B8] bg-clip-text text-transparent">
              every wallet
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-md leading-8 text-slate-500">
            Choose the plan that fits your payments, transfers, cards, and
            business needs.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative overflow-hidden rounded-[32px] border p-8 shadow-[0_24px_80px_rgba(31,35,64,0.09)] ${
                  plan.popular
                    ? "border-[#8B90D0]/40 bg-[#1F2340] text-white"
                    : "border-white/80 bg-white/75 text-[#1F2340]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-6 top-6 rounded-full bg-[#8B90D0] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1F2340]">
                    Popular
                  </div>
                )}

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    plan.popular
                      ? "bg-white/10 text-[#D6D2F0]"
                      : "bg-[#EDEBFA] text-[#6C72B8]"
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-7 text-2xl font-black">{plan.name}</h3>

                <p
                  className={`mt-3 min-h-14 text-base leading-7 ${
                    plan.popular ? "text-[#C8CEE5]" : "text-slate-500"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-8 flex items-end gap-1">
                  <span className="text-5xl font-black tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`pb-2 text-base ${
                      plan.popular ? "text-[#C8CEE5]" : "text-slate-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <Link
                  to="/register"
                  className={`group mt-8 flex h-14 w-full items-center justify-center rounded-2xl text-base font-bold transition ${
                    plan.popular
                      ? "bg-[#8B90D0] text-[#1F2340] hover:bg-[#A2A7E6]"
                      : "bg-[#1F2340] text-white hover:bg-[#30385F]"
                  }`}
                >
                  {plan.button}
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                <div
                  className={`my-8 h-px ${
                    plan.popular ? "bg-white/10" : "bg-slate-200"
                  }`}
                />

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.popular
                            ? "bg-[#8B90D0]/20 text-[#D6D2F0]"
                            : "bg-[#EDEBFA] text-[#6C72B8]"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>

                      <span
                        className={`text-sm leading-6 ${
                          plan.popular ? "text-[#E8E6F0]" : "text-slate-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.popular && (
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#8B90D0]/20 blur-3xl" />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-[#8B90D0]/20 bg-white/70 px-5 py-4 text-sm font-medium text-slate-600 shadow-sm">
            <Zap className="h-5 w-5 text-[#6C72B8]" />
            No hidden fees. Upgrade or cancel anytime.
          </div>
        </div>
      </div>
    </section>
  );
}