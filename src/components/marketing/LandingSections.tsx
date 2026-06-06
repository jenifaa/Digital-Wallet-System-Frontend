import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const stats = [
  { label: "Active Users", value: 250000, suffix: "+" },
  { label: "Transactions", value: 1200000, suffix: "+" },
  { label: "Countries", value: 45, suffix: "+" },
  { label: "Uptime", value: 99, suffix: ".9%" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#020617] py-20 text-white">
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Trusted by thousands worldwide
          </h2>
          <p className="mt-3 text-slate-400">
            Real numbers from a platform built for scale and reliability
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 text-center"
            >
              <p className="text-3xl font-black text-indigo-400">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 to-slate-950 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_50%)]" />
      <div className="relative z-10 mx-auto w-11/12 max-w-4xl text-center">
        <h2 className="text-3xl font-black sm:text-4xl">
          Ready to transform your financial experience?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-indigo-100/80">
          Join WalletIQ today and enjoy seamless payments, smart loans, and
          bank-grade security in one modern platform.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="group inline-flex h-14 items-center rounded-2xl bg-white px-8 font-bold text-slate-900 transition hover:bg-slate-100"
          >
            Get Started Free
            <ArrowUpRight className="ml-2 size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-14 items-center rounded-2xl border border-white/20 bg-white/10 px-8 font-semibold backdrop-blur-xl transition hover:bg-white/20"
          >
            Talk to Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Small Business Owner",
      quote:
        "WalletIQ transformed how I manage payments. Transfers are instant and the dashboard gives me full visibility.",
    },
    {
      name: "James Wilson",
      role: "Freelancer",
      quote:
        "The loan feature helped me scale my business. Transparent fees and a smooth repayment experience.",
    },
    {
      name: "Maria Lopez",
      role: "Agent Partner",
      quote:
        "As an agent, cash-in and cash-out tools are intuitive. My customers love the reliability.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 dark:bg-[#0B1020]">
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Loved by our community
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-5">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
