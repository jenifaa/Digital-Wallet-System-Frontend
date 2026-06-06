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
    <section className="relative overflow-hidden bg-[#1F2340] pb-16 pt-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,144,208,0.18),transparent_30%)]" />
      <div className="relative z-10 mx-auto w-11/12 max-w-4xl px-6 text-center">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full border border-[#8B90D0]/20 bg-[#8B90D0]/10 px-4 py-1.5 text-sm text-[#D6D2F0]"
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
          className="mx-auto mt-5 max-w-2xl text-lg text-[#B6BCD3]"
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
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-shadow hover:shadow-xl hover:shadow-indigo-950/20"
    >
      <div className="mb-4 inline-flex rounded-2xl bg-[#8B90D0]/10 p-3 text-[#D6D2F0]">
        <Icon className="size-6" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#B6BCD3]">{description}</p>
    </motion.div>
  );
}
