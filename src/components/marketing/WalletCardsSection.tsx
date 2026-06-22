"use client";

import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    image: "https://i.ibb.co.com/PsV0BqP5/hnd.png",
    animation: { x: -70, y: 45, rotate: -8 },
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/YFdS5qhc/wl3.png",
    animation: { y: 70, scale: 0.88 },
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/6c2kW3nm/wl.png",
    animation: { x: 70, y: 45, rotate: 8 },
  },
];

export default function WalletCardsSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-14 text-[#1F2340] dark:bg-black sm:py-18 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,144,208,0.22),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(245,158,11,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#8B90D0]/50 to-transparent" />

      <div className="relative mx-auto w-11/12 max-w-6xl px-1 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-8 max-w-3xl text-center dark:text-white sm:mb-10 lg:mb-12"
        >
          <span className="inline-flex rounded-full border border-[#8B90D0]/30 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C72B8] shadow-sm backdrop-blur sm:px-5 sm:text-xs">
            Wallet Experience
          </span>

          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Smart Digital{" "}
            <span className="bg-linear-to-r from-[#D6D2F0] via-[#8B90D0] to-[#6C72B8] bg-clip-text text-transparent">
              Wallet
            </span>{" "}
            Experience
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base md:text-md">
            Easy to use mobile app that supports Android and iOS with secure
            payments, transfers, and card management.
          </p>
        </motion.div>

        <div className="relative overflow-visible rounded-[20px] border border-white/80 bg-white/70 p-1.5 shadow-[0_24px_70px_rgba(31,35,64,0.12)] backdrop-blur-xl sm:rounded-[28px] sm:p-3 lg:p-4">
          <div className="pointer-events-none absolute inset-x-8 bottom-6 h-20 rounded-full bg-[#8B90D0]/25 blur-3xl" />
          <div className="pointer-events-none absolute left-4 top-4 h-20 w-20 rounded-full bg-[#F59E0B]/15 blur-2xl" />
          <div className="pointer-events-none absolute right-4 top-8 h-24 w-24 rounded-full bg-[#8B90D0]/20 blur-2xl" />

          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="absolute -right-2 -top-8 z-30 rounded-2xl border border-white/80 bg-white/90 px-3 py-2 shadow-[0_18px_45px_rgba(31,35,64,0.16)] backdrop-blur-md sm:-right-5 sm:-top-10 sm:px-4 sm:py-3"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B90D0]">
              Balance
            </p>
            <p className="mt-1 text-base font-black text-[#1F2340] sm:text-xl">
              $12,480
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="absolute -bottom-8 -left-2 z-30 rounded-2xl border border-white/80 bg-white/90 px-3 py-2 shadow-[0_18px_45px_rgba(31,35,64,0.16)] backdrop-blur-md sm:-bottom-10 sm:-left-5 sm:px-4 sm:py-3"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F59E0B]">
              Transfer
            </p>
            <p className="mt-1 text-base font-black text-[#1F2340] sm:text-xl">
              Instant Pay
            </p>
          </motion.div>

          <div className="relative grid grid-cols-3 overflow-hidden rounded-[18px] bg-linear-to-b from-[#F4F5FF] to-[#E7EAFF] sm:rounded-[24px]">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, ...card.animation }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.95,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex min-w-0 justify-center overflow-visible"
              >
                <div className="pointer-events-none absolute inset-x-2 bottom-2 h-10 rounded-full bg-[#1F2340]/15 blur-2xl sm:inset-x-5 sm:bottom-4 sm:h-12" />

                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex h-56 w-full items-end justify-center px-0 pt-4 sm:h-86 lg:h-112"
                >
                  <img
                    src={card.image}
                    alt={`wallet-${card.id}`}
                    className={`
                      relative z-10 h-full w-[128%] max-w-none object-contain drop-shadow-[0_18px_28px_rgba(31,35,64,0.18)] sm:w-[120%] lg:w-[114%]
                      ${index === 0 ? "translate-x-10 sm:translate-x-14 lg:translate-x-18" : ""}
                      ${index === 2 ? "-translate-x-10 sm:-translate-x-14 lg:-translate-x-18" : ""}
                    `}
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