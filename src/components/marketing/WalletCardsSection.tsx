"use client";

import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    // image: "https://i.ibb.co.com/vpr0gvL/wallet.png",
    image: "https://i.ibb.co.com/PsV0BqP5/hnd.png",
    animation: {
      x: -250,
      y: 100,
      rotate: -15,
    },
  },
  {
    id: 2,
    // image: "https://i.ibb.co.com/rfNsKkcY/wal.png",
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
  //   {
  //     id: 3,
  //     image: "https://i.ibb.co.com/ccV51H29/wal3.png",
  //     animation: {
  //       x: 250,
  //       y: 100,
  //       rotate: 15,
  //     },
  //   },
];

export default function WalletCardsSection() {
  return (
    <section className="overflow-hidden  py-24">
      <div className="mx-auto max-w-300 px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Smart Digital Wallet Experience
          </h2>

          <p className="mt-5 text-lg text-slate-500">
            Easy to use mobile app that supports Android and iOS with secure
            payments, transfers and card management.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="p-12 border-4">
          {" "}
          <div className="grid grid-cols-3  ">
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
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="flex justify-center"
              >
                <motion.div
               
                  className="w-full"
                >
                  <img
                    src={card.image}
                    alt={`wallet-${card.id}`}
                    className="
                    h-140
                    w-full
                    object-contain
                  
                  "
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
