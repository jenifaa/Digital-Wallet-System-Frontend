import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowUpRight, Milestone, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const stats = [
  { label: "Active Users", value: 250000, suffix: "+" },
  { label: "Transactions", value: 1200000, suffix: "+" },
  { label: "Countries", value: 45, suffix: "+" },
  { label: "Uptime", value: 99, suffix: ".9%" },
];

/* ==========================================================================
   1. STATS SECTION (Tailwind v4.0 Dynamic Grid & Blurs)
   ========================================================================== */
export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#1F2340] py-28 text-white">
      {/* TAILWIND v4.0 NOTE: 
        Arbitrary background-size values with commas must now be written without spaces, 
        or using underscores `bg-[size:70px_70px]` to maintain precise engine parsing.
      */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px] opacity-3" />
      
      {/* Ambient Radial Mesh Layer */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-125 w-250 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl">
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8B90D0]/30 bg-[#8B90D0]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#D6D2F0] uppercase">
            <Milestone className="size-3.5 text-[#8B90D0]" /> Platform Metrics
          </span>
          {/* TAILWIND v4.0 NOTE: `bg-gradient-to-b` is fully supported, but clean semantic pairs are preferred */}
          <h2 className="mt-4 bg-linear-to-b from-white via-[#D6D2F0] to-[#8B90D0] bg-clip-text text-3xl font-black uppercase tracking-tight text-transparent sm:text-5xl">
            Trusted by thousands worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#B6BCD3]/70 font-medium">
            Real numbers from a production-ready engine built for maximum global throughput and financial scaling.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative group overflow-hidden rounded-[24px] border border-white/5 bg-white/2 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#8B90D0]/30 hover:bg-white/4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="absolute -right-12 -top-12 size-24 bg-white/5 blur-xl rounded-full transition-opacity group-hover:opacity-100" />
              
              <p className="bg-linear-to-r from-[#D6D2F0] via-[#8B90D0] to-[#6C72B8] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#B6BCD3]/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   2. CTA SECTION (Tailwind v4.0 Linear Gradients)
   ========================================================================== */
export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#1F2340] py-24 text-white border-t border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px] opacity-3" />
      
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 size-72 bg-indigo-600/20 blur-[100px] rounded-full" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 size-72 bg-[#6C72B8]/20 blur-[100px] rounded-full" />

      <div className="relative z-10 mx-auto w-11/12 max-w-5xl">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-linear-to-b from-white/4 to-transparent p-10 text-center backdrop-blur-2xl sm:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-linear-to-r from-transparent via-[#8B90D0]/50 to-transparent" />

          {/* TAILWIND v4.0 NOTE: `bg-gradient-to-*` is now natively shortened to `bg-linear-to-*` */}
          <h2 className="mx-auto max-w-3xl text-3xl font-black uppercase tracking-tight sm:text-5xl leading-tight text-transparent bg-clip-text bg-linear-to-b from-white via-[#D6D2F0] to-[#8B90D0]">
            Ready to transform your financial experience?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base text-[#B6BCD3]/70 font-medium leading-relaxed">
            Join WalletIQ today and enjoy seamless instant digital payments, high-performance infrastructure tools, and bank-grade modular security architecture.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="group inline-flex h-14 items-center rounded-2xl bg-[#D6D2F0] px-8 font-black text-slate-950 transition-all duration-200 hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(214,210,240,0.4)]"
            >
              Get Started Free
              <ArrowUpRight className="ml-2 size-4 stroke-[3px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-14 items-center rounded-2xl border border-white/10 bg-white/5 px-8 font-bold text-white backdrop-blur-xl transition duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   3. TESTIMONIALS SECTION (Tailwind v4.0 Color Accents)
   ========================================================================== */
export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Small Business Owner",
      quote: "WalletIQ transformed how I manage payments. Transfers are instant and the dashboard gives me full visibility over our dynamic capital routing pipelines.",
    },
    {
      name: "James Wilson",
      role: "Freelancer",
      quote: "The flexible allocation parameters helped me scale my workflow. Completely transparent structural fee metrics and an incredibly smooth user experience.",
    },
    {
      name: "Maria Lopez",
      role: "Agent Partner",
      quote: "As a local regional operations partner, the agent deposit and settlement modules are incredibly optimized. My end clients immediately notice the uptime reliability.",
    },
  ];

  return (
    <section className="bg-slate-50 py-10 transition-colors duration-300 dark:bg-[#0F1225] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-size-[70px_70px] opacity-1.5 dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] dark:opacity-2" />

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl">
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-white/5 dark:bg-white/5 dark:text-[#8B90D0]">
            <Sparkles className="size-3.5" /> Social Proof
          </span>
          <h2 className="mt-4 text-3xl font-medium uppercase tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Loved by our community
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col justify-between rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:border-white/5 dark:bg-[#151933] dark:shadow-none relative group"
            >
              <span className="absolute right-8 top-6 text-6xl select-none font-serif text-slate-100 dark:text-white/2 group-hover:text-indigo-500/10 transition-colors duration-300 pointer-events-none">
                “
              </span>

              <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-600 dark:text-[#B6BCD3]/80 relative z-10">
                &ldquo;{item.quote}&rdquo;
              </p>
              
              <footer className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-3.5">
                <div className="size-10 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-[#D6D2F0]">
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs font-semibold text-slate-400 dark:text-[#B6BCD3]/40 mt-0.5">
                    {item.role}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}