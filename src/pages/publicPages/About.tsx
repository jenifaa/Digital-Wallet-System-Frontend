import PublicPageHero from "@/components/marketing/PublicPageHero";
import PageTransition from "@/components/shared/PageTransition";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Globe2,
  Heart,
  Lightbulb,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router";

const stats = [
  { value: "2M+", label: "active wallet users" },
  { value: "99.98%", label: "platform uptime" },
  { value: "18+", label: "markets supported" },
  { value: "24/7", label: "risk monitoring" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust First",
    description:
      "Security, compliance, and transparency guide every product and operational decision.",
  },
  {
    icon: Lightbulb,
    title: "Practical Innovation",
    description:
      "We use AI, analytics, and modern UX patterns to make finance easier, not louder.",
  },
  {
    icon: Heart,
    title: "Customer Obsession",
    description:
      "Every feature starts with a real financial problem faced by people and businesses.",
  },
  {
    icon: Rocket,
    title: "Speed With Care",
    description:
      "We move fast while protecting customers, partners, and the financial ecosystem.",
  },
];

const pillars = [
  {
    icon: LockKeyhole,
    title: "Secure by design",
    description:
      "Layered authentication, transaction monitoring, and audit-ready controls are built into the platform foundation.",
  },
  {
    icon: WalletCards,
    title: "One connected wallet",
    description:
      "Customers can manage transfers, payments, savings, and credit from one calm, consistent experience.",
  },
  {
    icon: TrendingUp,
    title: "Built to scale",
    description:
      "Our infrastructure supports high-volume transaction flows for individuals, agents, merchants, and enterprises.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "WalletIQ begins",
    description:
      "Founded with a mission to remove friction from everyday money movement.",
  },
  {
    year: "2022",
    title: "Agent network launch",
    description:
      "Expanded access through local partners and assisted digital finance services.",
  },
  {
    year: "2024",
    title: "Business payments",
    description:
      "Introduced merchant tools, bulk disbursement, and smarter settlement workflows.",
  },
  {
    year: "2026",
    title: "Intelligent finance layer",
    description:
      "Delivering AI-powered insights, stronger risk controls, and more personalized financial journeys.",
  },
];

const team = [
  {
    name: "Alex Morgan",
    role: "CEO & Co-founder",
    focus: "Strategy, partnerships, and financial inclusion",
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    focus: "Platform architecture, security, and data systems",
  },
  {
    name: "David Chen",
    role: "Head of Product",
    focus: "Wallet experience, merchant tools, and growth",
  },
  {
    name: "Fatima Rahman",
    role: "Head of Compliance",
    focus: "Risk governance, licensing, and regulatory operations",
  },
];

export default function About() {
  return (
    <PageTransition>
      <PublicPageHero
        badge="Our Story"
        title="Building the future of"
        highlight="digital finance"
        description="WalletIQ was founded to make financial services accessible, secure, and beautifully simple for everyone."
      />

      <section className="mx-auto w-11/12 max-w-7xl py-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-3xl font-bold tracking-tight text-slate-500">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-indigo-500">
              <Sparkles className="size-4" />
              Purpose-built for modern money movement
            </div>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
              We are simplifying financial access for people, agents, and
              growing businesses.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
              We started WalletIQ with a clear mission: remove friction from
              everyday money movement. Today, we serve individuals, agents, and
              businesses with a unified platform for wallets, payments, credit,
              and intelligent financial operations.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Instant transfers", "Smart risk controls", "Merchant-ready tools", "Simple onboarding"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-indigo-500" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="rounded-2xl bg-indigo-500/10 p-6">
              <Building2 className="size-10 text-indigo-500" />
              <h3 className="mt-6 text-2xl font-bold">Company Story</h3>
              <p className="mt-4 leading-8 text-muted-foreground">
                WalletIQ brings together secure wallet infrastructure,
                customer-first product thinking, and compliance discipline so
                financial services feel effortless without becoming careless.
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-5">
                <div className="mb-3 flex items-center gap-2 text-indigo-500">
                  <Target className="size-5" />
                  <h3 className="font-semibold">Mission</h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Empower people with fast, secure, and intelligent financial
                  tools.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-5">
                <div className="mb-3 flex items-center gap-2 text-indigo-500">
                  <Globe2 className="size-5" />
                  <h3 className="font-semibold">Vision</h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Become the most trusted digital wallet ecosystem in emerging
                  markets.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                What guides us
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Core Values
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              These principles shape how we build, support customers, and earn
              long-term trust in the financial ecosystem.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-500 transition group-hover:bg-indigo-500 group-hover:text-white">
                  <value.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="mb-4 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
                <Award className="size-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                How we build better financial products
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Professional digital finance is more than a beautiful app. It
                needs resilient systems, clear controls, helpful support, and
                constant learning from customer behavior.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border bg-background p-5">
                  <pillar.icon className="size-6 text-indigo-500" />
                  <h3 className="mt-4 font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
              Our journey
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              From wallet idea to trusted finance platform
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Each stage of WalletIQ has focused on one thing: making financial
              tools more useful, reliable, and accessible for the people who
              depend on them every day.
            </p>
          </div>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="grid gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:grid-cols-[96px_1fr]"
              >
                <div className="text-2xl font-bold text-indigo-500">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
                <Users className="size-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                  Leadership
                </p>
                <h2 className="text-3xl font-bold tracking-tight">
                  Team behind WalletIQ
                </h2>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              A cross-functional leadership group bringing together financial
              operations, product craft, engineering depth, and compliance
              experience.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl font-bold text-indigo-500">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-indigo-500">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {member.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border bg-slate-500 p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to experience smarter digital finance?
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-white/80">
                WalletIQ helps customers and businesses move money with more
                confidence, clarity, and control.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-white/90"
            >
              Contact our team
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
