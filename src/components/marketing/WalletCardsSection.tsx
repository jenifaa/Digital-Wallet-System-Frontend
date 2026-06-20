"use client";

import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    image: "https://i.ibb.co.com/PsV0BqP5/hnd.png",
    animation: {
      x: -250,
      y: 100,
      rotate: -15,
    },
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/YFdS5qhc/wl3.png",
    animation: {
      y: 250,
      scale: 0.7,
    },
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/6c2kW3nm/wl.png",
    animation: {
      x: 250,
      y: 100,
      rotate: 15,
    },
  },
];

export default function WalletCardsSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-24 text-[#1F2340]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(139,144,208,0.16),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.12),transparent_28%)]" />

      <div className="relative mx-auto w-11/12 max-w-7xl px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-[#8B90D0]/30 bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#6C72B8] shadow-sm">
            Wallet Experience
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-5xl">
            Smart Digital{" "}
            <span className="bg-linear-to-r from-[#D6D2F0] via-[#8B90D0] to-[#6C72B8] bg-clip-text text-transparent">
              Wallet
            </span>{" "}
            Experience
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Easy to use mobile app that supports Android and iOS with secure
            payments, transfers, and card management.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/60 p-4 shadow-[0_30px_100px_rgba(31,35,64,0.12)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="absolute inset-x-10 bottom-8 h-24 rounded-full bg-[#8B90D0]/20 blur-3xl" />
          <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#F59E0B]/15 blur-2xl" />
          <div className="absolute right-10 top-16 h-32 w-32 rounded-full bg-[#8B90D0]/20 blur-2xl" />

          <div className="relative grid overflow-hidden rounded-[32px] bg-[#EEF0FF] md:grid-cols-3">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{
                  opacity: 0,
                  ...card.animation,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.95,
                  delay: index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  flex justify-center overflow-hidden bg-[#EEF0FF]
                  ${index === 0 ? "md:rounded-l-[32px]" : ""}
                  ${index === cards.length - 1 ? "md:rounded-r-[32px]" : ""}
                `}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex h-[460px] w-full items-end justify-center sm:h-[520px] lg:h-[580px]"
                >
                  <div className="absolute inset-x-8 bottom-6 h-16 rounded-full bg-[#1F2340]/16 blur-2xl" />

                  <img
                    src={card.image}
                    alt={`wallet-${card.id}`}
                    className="relative z-10 h-full w-full object-contain drop-shadow-[0_24px_35px_rgba(31,35,64,0.18)]"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}