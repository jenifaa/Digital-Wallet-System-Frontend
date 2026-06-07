import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PublicPageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
}

export default function PublicPageHero({
  badge,
  title,
  highlight,
  description,
}: PublicPageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#1F2340] pb-16 pt-28 ">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,144,208,0.18),transparent_30%)]" />
      <div className="relative z-10 mx-auto w-11/12 max-w-4xl px-6 text-center">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full border border-[#8B90D0]/20 bg-[#8B90D0]/10 px-4 py-1.5 text-sm "
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl font-black tracking-tight sm:text-5xl"
        >
          {title}{" "}
          {highlight && (
            <span className="bg-linear-to-r from-[#D6D2F0] to-[#8B90D0] bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-lg "
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-linear-to-b
        from-[#222954]
        to-[#1B2144]
        p-8
        text-white
        transition-colors
        duration-300
        hover:border-indigo-500/40
      "
    >
      {/* 1. REMOVED the absolute h-1 top gradient line element from here */}

      {/* Icon Wrapper */}
      <div
        className="
          mb-6
          flex h-12 w-12 items-center justify-center
          rounded-2xl
          bg-indigo-500/10
          text-indigo-400
          border border-indigo-500/20
        "
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* 2. FIXED: Changed text-slate-900 to text-white for visibility */}
      <h3 className="mb-3 text-xl font-bold text-white">
        {title}
      </h3>

      {/* 3. FIXED: Changed text-slate-600 to text-slate-300 for readable contrast */}
      <p className="leading-relaxed text-slate-300">
        {description}
      </p>
    </motion.div>
  );
}
