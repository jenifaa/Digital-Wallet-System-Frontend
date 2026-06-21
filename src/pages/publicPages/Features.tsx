import PublicPageHero from "@/components/marketing/PublicPageHero";
import PageTransition from "@/components/shared/PageTransition";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BellRing,
  Bot,
  CheckCircle2,
  CreditCard,
  Landmark,
  LockKeyhole,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
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

const highlights = [
  { value: "Instant", label: "wallet transfers" },
  { value: "24/7", label: "AI support" },
  { value: "Secure", label: "account controls" },
  { value: "Unified", label: "admin visibility" },
];

const productLayers = [
  {
    icon: WalletCards,
    title: "For Customers",
    items: [
      "Send and receive money instantly",
      "Track balances and transaction history",
      "Pay bills, merchants, and saved contacts",
      "Get loan status and repayment reminders",
    ],
  },
  {
    icon: Users,
    title: "For Agents",
    items: [
      "Manage assisted cash-in and cash-out",
      "View customer transaction summaries",
      "Track commissions and service activity",
      "Support onboarding from one dashboard",
    ],
  },
  {
    icon: BadgeCheck,
    title: "For Admins",
    items: [
      "Monitor wallet status and risk alerts",
      "Review loan requests and approvals",
      "Control sessions, roles, and access",
      "Analyze payments and platform growth",
    ],
  },
];

const capabilities = [
  {
    icon: QrCode,
    title: "QR Payments",
    description:
      "Fast scan-to-pay checkout for merchants, agents, and everyday transfers.",
  },
  {
    icon: BellRing,
    title: "Smart Reminders",
    description:
      "Automated bill, repayment, and payment reminders that keep users on track.",
  },
  {
    icon: LockKeyhole,
    title: "Account Protection",
    description:
      "PIN controls, session handling, fraud alerts, and wallet status management.",
  },
  {
    icon: ReceiptText,
    title: "Clear Records",
    description:
      "Readable transaction summaries for customers, agents, and operations teams.",
  },
  {
    icon: Banknote,
    title: "Loan Workflows",
    description:
      "Request, approve, schedule, and repay loans from a connected finance flow.",
  },
  {
    icon: TrendingUp,
    title: "Growth Insights",
    description:
      "Analytics-ready activity data for smarter decisions across the platform.",
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-3xl font-bold tracking-tight text-slate-500">
                {item.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-indigo-500">
              <Sparkles className="size-4" />
              Complete digital finance toolkit
            </div>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
              Everything your customers, agents, and operations team need in one
              connected platform.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              WalletIQ brings wallet management, payments, loans, AI support,
              agent operations, and security controls into a single modern
              experience. The result is faster service, clearer oversight, and
              a smoother journey for every user type.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featureGroups.slice(0, 4).map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-500 transition group-hover:bg-indigo-500 group-hover:text-white">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                Feature categories
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Built for real financial workflows
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Each module is designed to work together, so users can move from
              wallet activity to payments, credit, support, and account controls
              without friction.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureGroups.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-slate-500 transition group-hover:bg-indigo-500 group-hover:text-white">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {productLayers.map((layer) => (
            <div
              key={layer.title}
              className="rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
                <layer.icon className="size-6" />
              </div>
              <h3 className="text-xl font-semibold">{layer.title}</h3>
              <div className="mt-5 space-y-4">
                {layer.items.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-500" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                Platform depth
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Small details that make WalletIQ feel complete
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              From QR checkout to audit-friendly records, these capabilities
              help your product feel polished, trustworthy, and ready for daily
              financial use.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="rounded-2xl border bg-background p-5"
              >
                <capability.icon className="size-6 text-indigo-500" />
                <h3 className="mt-4 font-semibold">{capability.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border bg-slate-500 p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Designed for confident digital finance.
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-white/80">
                Give users, agents, and administrators the tools they need to
                move money faster, safer, and with better visibility.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-white/90"
            >
              Talk to our team
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
