
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
    highlights: ["Live mid-market exchange rates", "No hidden conversion fees"],
  },
];

export default function FeaturesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  return (
    <section className="relative mt-20  overflow-visible bg-[#F8FAFC] dark:bg-black">
      <div className="relative py-20">
        <div className="mx-auto w-11/12 max-w-7xl ">
          <div className="mx-auto flex flex-wrap justify-center gap-10 gap-y-5">
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
    // <section className="relative overflow-visible bg-[#F8FAFC]">
    //   <div className="relative z-20 -translate-y-1/2">
    //     <div className="mx-auto w-11/12 max-w-7xl ">
    //       <div className="mx-auto flex flex-wrap justify-center gap-10 gap-y-5">
    //         {features.map((feature, index) => (
    //           <FeatureCard
    //             key={feature.title}
    //             {...feature}
    //             active={activeCard === index}
    //             onHover={() => setActiveCard(index)}
    //             onLeave={() => setActiveCard(null)}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
