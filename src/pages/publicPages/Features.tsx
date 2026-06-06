import PublicPageHero, { FeatureCard } from "@/components/marketing/PublicPageHero";
import PageTransition from "@/components/shared/PageTransition";
import {
  Bot,
  CreditCard,
  Landmark,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";

const featureGroups = [
  {
    icon: Smartphone,
    title: "Wallet Features",
    description:
      "Instant transfers, balance tracking, PIN security, QR payments, and multi-device access.",
  },
  {
    icon: ShieldCheck,
    title: "Security Features",
    description:
      "End-to-end encryption, session management, fraud alerts, and wallet status controls.",
  },
  {
    icon: Landmark,
    title: "Loan Features",
    description:
      "Flexible loan requests, approval tracking, repayment schedules, and credit history.",
  },
  {
    icon: Bot,
    title: "AI Chatbot Features",
    description:
      "24/7 support for transactions, account recovery, loan queries, and product guidance.",
  },
  {
    icon: Users,
    title: "Agent Features",
    description:
      "Agent onboarding, cash-in/out operations, customer transaction summaries, and commissions.",
  },
  {
    icon: CreditCard,
    title: "Payment Features",
    description:
      "Bill pay, merchant checkout, add money, and automated payment reminders.",
  },
];

export default function Features() {
  return (
    <PageTransition>
      <PublicPageHero
        badge="Platform Features"
        title="Powerful tools for"
        highlight="every financial need"
        description="Explore the complete WalletIQ feature set designed for users, agents, and administrators."
      />
      <section className="mx-auto w-11/12 max-w-7xl py-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureGroups.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} delay={index * 0.05} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
