import PublicPageHero from "@/components/marketing/PublicPageHero";
import PageTransition from "@/components/shared/PageTransition";
import {
  Heart,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust First",
    description:
      "Security and transparency are at the core of every product decision.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously improve with AI, analytics, and modern UX patterns.",
  },
  {
    icon: Heart,
    title: "Customer Obsession",
    description:
      "Every feature is designed to solve real financial pain points.",
  },
  {
    icon: Rocket,
    title: "Speed",
    description: "Instant transfers, fast approvals, and responsive support.",
  },
];

const team = [
  { name: "Alex Morgan", role: "CEO & Co-founder" },
  { name: "Priya Sharma", role: "CTO" },
  { name: "David Chen", role: "Head of Product" },
  { name: "Fatima Rahman", role: "Head of Compliance" },
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
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Company Story</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              We started WalletIQ with a simple mission: remove friction from
              everyday money movement. Today, we serve individuals, agents, and
              businesses with a unified platform for wallets, payments, and
              credit.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border p-6">
              <div className="mb-2 flex items-center gap-2 text-indigo-500">
                <Target className="size-5" />
                <h3 className="font-semibold">Mission</h3>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Empower people with fast, secure, and intelligent financial tools.
              </p>
            </div>
            <div className="rounded-3xl border p-6">
              <div className="mb-2 flex items-center gap-2 text-indigo-500">
                <Rocket className="size-5" />
                <h3 className="font-semibold">Vision</h3>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Become the most trusted digital wallet ecosystem in emerging markets.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold">Core Values</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
                  <value.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex items-center gap-2">
            <Users className="size-6 text-indigo-500" />
            <h2 className="text-2xl font-bold">Leadership Team</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-indigo-500/10 text-xl font-bold text-indigo-500">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
