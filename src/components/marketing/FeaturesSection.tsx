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
    <section className="bg-[#020617] py-20 text-white">
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold sm:text-4xl"
          >
            Everything you need in one fintech platform
          </motion.h2>
          <p className="mt-3 text-slate-400">
            From everyday payments to business loans, WalletIQ delivers a
            premium experience across every touchpoint.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} delay={index * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
