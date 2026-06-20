import { motion } from "framer-motion";
import {
  Bot,
  CreditCard,
  Globe2,
  Landmark,
  QrCode,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";

import { FeatureCard } from "@/components/marketing/PublicPageHero";
import { useState } from "react";

const features = [
  {
    icon: Smartphone,
    title: "Digital Wallet",
    description:
      "Send, receive, and manage money instantly with a secure digital wallet built for everyday use.",
    highlights: [
      "Real-time balance across all linked accounts",
      "Instant peer-to-peer transfers, no fees",
    ],
  },
  {
    icon: CreditCard,
    title: "Smart Payments",
    description:
      "Pay bills, recharge mobile, and handle merchant payments with transparent fees and real-time tracking.",
    highlights: [
      "Auto-categorized spending history",
      "Saved billers for one-tap repeat payments",
    ],
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description:
      "Move money between wallets in seconds, with live status updates from request to settlement.",
    tag: "New",
    highlights: [
      "Sub-second settlement on wallet-to-wallet transfers",
      "Live tracking from request to completion",
    ],
  },
  {
    icon: Landmark,
    title: "Flexible Loans",
    description:
      "Request loans with clear terms, track repayments, and manage your credit profile in one place.",
    highlights: [
      "Transparent interest with no hidden charges",
      "Automated repayment reminders",
    ],
  },
  {
    icon: QrCode,
    title: "QR Checkout",
    description:
      "Scan to pay at any verified merchant, no card or cash required, with an instant receipt every time.",
    highlights: [
      "Works with any verified merchant terminal",
      "Digital receipts saved automatically",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade Security",
    description:
      "PIN protection, encrypted sessions, and proactive fraud monitoring keep your funds safe.",
    highlights: [
      "End-to-end encrypted sessions",
      "24/7 automated fraud monitoring",
    ],
  },
  {
    icon: Bot,
    title: "AI Support",
    description:
      "Get instant answers from our AI assistant for transactions, account issues, and product guidance.",
    tag: "Popular",
    highlights: [
      "Resolves most account queries in under a minute",
      "Escalates to a human agent when needed",
    ],
  },
  {
    icon: Users,
    title: "Agent Network",
    description:
      "Cash in and cash out through verified agents with full transaction visibility and audit trails.",
    highlights: [
      "Nationwide network of verified agents",
      "Full audit trail on every transaction",
    ],
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "Send and receive across borders with transparent exchange rates and no hidden fees.",
    highlights: [
      "Live mid-market exchange rates",
      "No hidden conversion fees",
    ],
  },
];

export default function FeaturesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      {/* 1. EXTENDED GRADIENT TRANSITION: 
         Starts dark at the top, stays dark through the hero merge, 
         and transitions very gradually down to the light color, ending at 80%.
      */}
      <div className="absolute inset-0 bg-linear-to-b from-[#1F2340] via-[#2A3158] via-20% to-[#F8FAFC] to-80% " />

      <div className="absolute -right-5 -top-20 h-72 w-72 rounded-full bg-[#8B90D0]/25 blur-3xl" />

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#8B90D0]/20 blur-3xl" />

      {/* 2. EXTENDED GRID LINES: 
         The grid lines now fade out much lower down the page (at 65%) 
         to match your longer background color transition perfectly.
      */}
      <div
        className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-size-[60px_60px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 30%, transparent 65%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <div className="h-16" />

        <div className="mx-auto w-11/12 max-w-7xl pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto  text-start"
          >
            <span className="inline-block rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-200">
              Premium Fintech Features
            </span>
          </motion.div>

          {/* Cards */}
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-12 gap-y-24">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                active={activeCard === index}
                onHover={() => setActiveCard(index)}
                onLeave={() => setActiveCard(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}