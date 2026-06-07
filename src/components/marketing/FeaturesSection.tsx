import { motion } from "framer-motion";
import {
  Bot,
  CreditCard,
  Landmark,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";

import { FeatureCard } from "@/components/marketing/PublicPageHero";

const features = [
  {
    icon: Smartphone,
    title: "Digital Wallet",
    description:
      "Send, receive, and manage money instantly with a secure digital wallet built for everyday use.",
  },
  {
    icon: CreditCard,
    title: "Smart Payments",
    description:
      "Pay bills, recharge mobile, and handle merchant payments with transparent fees and real-time tracking.",
  },
  {
    icon: Landmark,
    title: "Flexible Loans",
    description:
      "Request loans with clear terms, track repayments, and manage your credit profile in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade Security",
    description:
      "PIN protection, encrypted sessions, and proactive fraud monitoring keep your funds safe.",
  },
  {
    icon: Bot,
    title: "AI Support",
    description:
      "Get instant answers from our AI assistant for transactions, account issues, and product guidance.",
  },
  {
    icon: Users,
    title: "Agent Network",
    description:
      "Cash in and cash out through verified agents with full transaction visibility and audit trails.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      {/* 1. EXTENDED GRADIENT TRANSITION: 
         Starts dark at the top, stays dark through the hero merge, 
         and transitions very gradually down to the light color, ending at 80%.
      */}
      <div className="absolute inset-0 bg-linear-to-b from-[#1F2340] via-[#2A3158] via-20% to-[#F8FAFC] to-80% " />

{/* <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#8B90D0]/30 blur-3xl" /> */}
<div className="absolute -right-5 -top-20 h-72 w-72 rounded-full bg-[#8B90D0]/25 blur-3xl" />


<div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#8B90D0]/20 blur-3xl" />




      {/* 2. EXTENDED GRID LINES: 
         The grid lines now fade out much lower down the page (at 65%) 
         to match your longer background color transition perfectly.
      */}
      <div 
        className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-size-[60px_60px]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 30%, transparent 65%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 30%, transparent 65%)'
        }}
      />

      <div className="relative z-10">
        <div className="h-16" />

        <div className="mx-auto w-11/12 max-w-7xl pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-20 max-w-3xl text-center"
          >
            {/* Clean badge styling for dark/transitioning area */}
            <span className="inline-block rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-200">
              Premium Fintech Features
            </span>

            {/* FIXED: Shifted back to light text colors because the long transition 
               keeps this upper section beautifully dark and blue. 
            */}
            <h2 className="mt-6 text-4xl font-black text-white md:text-5xl tracking-tight">
              Everything you need in one fintech platform
            </h2>

            <p className="mt-6 text-lg text-slate-200 font-normal">
              From everyday payments to business loans, WalletIQ delivers a
              premium experience across every touchpoint.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}