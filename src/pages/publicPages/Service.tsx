import PublicPageHero from "@/components/marketing/PublicPageHero";
import PageTransition from "@/components/shared/PageTransition";
import {
  ArrowRight,

  Bot,

  CheckCircle2,
  CreditCard,
  HandCoins,

  Landmark,
  LockKeyhole,
 
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Store,
  Users,
  WalletCards,
} from "lucide-react";

const services = [
  {
    icon: WalletCards,
    title: "Digital Wallet Services",
    description:
      "Secure wallet accounts for customers with instant balance access, transfers, statements, and wallet controls.",
    points: ["Send and receive money", "Balance and history tracking", "PIN and session protection"],
  },
  {
    icon: CreditCard,
    title: "Payments & Bill Pay",
    description:
      "Simple payment tools for everyday bills, merchant checkout, saved recipients, and scheduled reminders.",
    points: ["Bill payment", "Merchant checkout", "Payment reminders"],
  },
  {
    icon: Landmark,
    title: "Loan Management",
    description:
      "A connected credit flow for loan requests, approval tracking, repayment schedules, and credit history.",
    points: ["Loan applications", "Approval workflow", "Repayment tracking"],
  },
  {
    icon: Users,
    title: "Agent Banking",
    description:
      "Agent tools for assisted customer onboarding, cash-in, cash-out, summaries, and commission visibility.",
    points: ["Agent onboarding", "Cash-in and cash-out", "Commission records"],
  },
  {
    icon: Store,
    title: "Merchant Services",
    description:
      "Payment collection and transaction visibility for businesses that need fast, reliable digital checkout.",
    points: ["QR collection", "Settlement records", "Business payment history"],
  },
  {
    icon: Bot,
    title: "AI Customer Support",
    description:
      "Always-on support for transaction questions, account recovery, loan guidance, and product help.",
    points: ["24/7 chatbot support", "Account help", "Product guidance"],
  },
];

const processSteps = [
  {
    icon: Smartphone,
    title: "Onboard",
    description:
      "Customers, agents, and merchants can join with a guided account setup flow.",
  },
  {
    icon: LockKeyhole,
    title: "Verify",
    description:
      "Security checks and access controls help keep every wallet protected.",
  },
  {
    icon: HandCoins,
    title: "Transact",
    description:
      "Users can transfer, pay, borrow, withdraw, and manage money from one place.",
  },
  {
    icon: ReceiptText,
    title: "Track",
    description:
      "Clear records and summaries make every financial action easy to review.",
  },
];

const trustPoints = [
  "Encrypted wallet and transaction flows",
  "Fraud alerts and session management",
  "Role-based controls for agents and admins",
  "Readable activity records for audits and support",
];

export default function Services() {
  return (
    <PageTransition>
      <PublicPageHero
        badge="Our Services"
        title="Financial services built for"
        highlight="modern digital life"
        description="WalletIQ brings wallet, payments, credit, agent banking, merchant tools, and AI support into one secure financial ecosystem."
      />

      <section className="mx-auto w-11/12 max-w-7xl py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-3xl font-bold text-slate-200">6+</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              connected service areas
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-3xl font-bold text-slate-200">24/7</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              digital support access
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-3xl font-bold text-slate-200">Secure</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              wallet-first platform design
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                What we provide
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Services for customers, agents, and businesses
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Each service is designed to work together, giving users a smoother
              way to move, manage, borrow, and receive money.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-500 transition group-hover:bg-indigo-500 group-hover:text-white">
                  <service.icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-5 space-y-3">
                  {service.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-500" />
                      <p className="text-sm text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
              Service flow
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              A simple journey from onboarding to daily finance
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              WalletIQ keeps the experience clear from the first account setup
              to every payment, loan request, customer support conversation, and
              transaction record.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <step.icon className="size-6 text-indigo-500" />
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
                <ShieldCheck className="size-7" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Built with trust, security, and visibility at the center
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Financial services need more than speed. WalletIQ helps teams
                protect accounts, monitor activity, support customers, and keep
                records clear across the full platform.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border bg-background p-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-500" />
                  <p className="text-sm leading-6 text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border bg-slate-500 p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Bring smarter financial services to your users.
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-white/80">
                WalletIQ gives your platform the tools to serve customers,
                agents, and businesses with speed, clarity, and confidence.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-white/90"
            >
              Discuss services
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
