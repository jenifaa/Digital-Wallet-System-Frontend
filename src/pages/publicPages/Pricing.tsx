import PublicPageHero from "@/components/marketing/PublicPageHero";
import PageTransition from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Personal",
    price: "Free",
    description: "Perfect for everyday wallet users",
    features: [
      "Free wallet account",
      "Standard transfers",
      "Transaction history",
      "Basic support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Business",
    price: "৳499",
    period: "/month",
    description: "For growing merchants and agents",
    features: [
      "Lower transaction fees",
      "Priority loan processing",
      "Advanced analytics",
      "Dedicated agent tools",
      "Premium support",
    ],
    cta: "Start Business Plan",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Custom fee structure",
      "API integrations",
      "Dedicated account manager",
      "SLA-backed uptime",
      "Compliance reporting",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const fees = [
  { label: "Send Money", value: "1.5%" },
  { label: "Cash Out", value: "1.8%" },
  { label: "Loan Processing", value: "2.5%" },
  { label: "Bill Payment", value: "৳10 flat" },
];

export default function Pricing() {
  return (
    <PageTransition>
      <PublicPageHero
        badge="Pricing"
        title="Simple, transparent"
        highlight="pricing"
        description="No hidden charges. Choose the plan that fits your financial journey."
      />

      <section className="mx-auto w-11/12 max-w-7xl py-20">
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fees.map((fee) => (
            <div
              key={fee.label}
              className="rounded-2xl border bg-card p-5 text-center shadow-sm"
            >
              <p className="text-sm text-muted-foreground">{fee.label}</p>
              <p className="mt-2 text-2xl font-bold text-indigo-500">{fee.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-3xl border p-8 ${
                plan.highlighted
                  ? "border-indigo-500 bg-indigo-500/5 shadow-xl shadow-indigo-500/10"
                  : "bg-card shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-6 text-4xl font-black">
                {plan.price}
                {plan.period && (
                  <span className="text-base font-normal text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </p>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={plan.name === "Enterprise" ? "/contact" : "/register"}>
                <Button
                  className={`mt-8 h-12 w-full rounded-2xl ${
                    plan.highlighted ? "" : "variant-outline"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
