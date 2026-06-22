import { motion, useInView } from "framer-motion";
import {
  BadgeDollarSign,
  Gem,
  Landmark,
  ScanBarcode,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CountUp({
  end,
  suffix = "+",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.floor(eased * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const features = [
  {
    icon: Gem,
    title: "Innovation",
    text: "Smart wallet technology built to keep your financial life simple, fast, and secure.",
  },
  {
    icon: BadgeDollarSign,
    title: "Integration",
    text: "Connect payments, cards, transfers, and merchant tools in one seamless platform.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    text: "Bank-level protection, encrypted sessions, and fraud monitoring for every transaction.",
  },
  {
    icon: Timer,
    title: "Speed",
    text: "Instant transfers and real-time updates keep your money moving without delays.",
  },
];

const stats = [
  { value: 100, label: "Active Users", suffix: "B+" },
  { value: 97, label: "Currencies", suffix: "+" },
  { value: 765, label: "Transactions", suffix: "K+" },
  { value: 43, label: "Merchants", suffix: "K+" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8FAFC] px-6 pb-10 pt-20 text-[#1F2340] dark:bg-black">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[#8B90D0]/40 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#6C72B8]">
            Why Choose Us
          </span>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl dark:text-white">
            Embrace the{" "}
            <span className="bg-linear-to-r from-[#D6D2F0] via-[#8B90D0] to-[#6C72B8] bg-clip-text text-transparent">
              future
            </span>{" "}
            of finance.
          </h2>

          <p className="mx-auto  max-w-2xl text-lg leading-8 text-slate-500">
            We ensure secure, seamless, and efficient transactions.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr_1fr]">
          <div className="grid gap-8">
            <FeatureCard {...features[0]} />
            <FeatureCard {...features[2]} tone="soft" />
          </div>

          <div className="relative flex min-h-115 items-end justify-center overflow-hidden rounded-[28px] bg-[#EDEBFA]">
            <div className="absolute top-6 text-7xl font-black text-[#8B90D0]/55 sm:text-8xl">
              Future
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,144,208,0.28),transparent_35%)]" />

            <Landmark className="absolute bottom-10 h-48 w-48 text-[#8B90D0]/10" />

            <div className="relative z-10 mb-12 flex h-64 w-52 items-center justify-center rounded-[32px] border border-white/70 bg-white/50 shadow-[0_24px_80px_rgba(31,35,64,0.12)] backdrop-blur-xl">
              <ScanBarcode className="h-24 w-24 text-[#6C72B8]" />
            </div>
          </div>

          <div className="grid gap-8">
            <FeatureCard {...features[1]} />
            <FeatureCard {...features[3]} tone="soft" />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white px-8 py-7 text-center shadow-[0_18px_55px_rgba(31,35,64,0.08)]"
            >
              <div className="text-4xl font-black tracking-tight text-[#1F2340]">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-base font-medium text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
  tone = "main",
}: {
  icon: typeof Gem;
  title: string;
  text: string;
  tone?: "main" | "soft";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`min-h-52.5 rounded-[28px] p-8 shadow-[0_18px_55px_rgba(31,35,64,0.06)] ${
        tone === "main" ? "bg-[#EDEBFA]" : "bg-[#F1F4FF]"
      }`}
    >
      <div className="mb-8 flex justify-end">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-[#6C72B8] shadow-sm">
          <Icon className="h-9 w-9" strokeWidth={2.2} />
        </div>
      </div>

      <h3 className="text-2xl font-black text-[#1F2340]">{title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">{text}</p>
    </motion.div>
  );
}