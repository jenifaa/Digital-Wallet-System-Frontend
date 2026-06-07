"use client";

import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Visa Support",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    bg: "bg-blue-600",
    animation: {
      x: -250,
      y: 100,
      rotate: -15,
    },
  },
  {
    id: 2,
    title: "Always There",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
    bg: "bg-slate-100",
    animation: {
      y: 250,
      scale: 0.7,
    },
  },
  {
    id: 3,
    title: "Personalized Card",
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600",
    bg: "bg-black",
    animation: {
      x: 250,
      y: 100,
      rotate: 15,
    },
  },
];

export default function WalletCardsSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Smart Digital Wallet Experience
          </h2>

          <p className="mt-5 text-lg text-slate-500">
            Easy to use mobile app that supports Android and iOS with
            secure payments, transfers and card management.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
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
              whileHover={{
                y: -15,
                scale: 1.03,
              }}
              className={`relative overflow-hidden rounded-[32px] ${card.bg} shadow-2xl`}
            >
              {/* Floating effect */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="p-8">
                  <h3
                    className={`text-4xl font-bold ${
                      card.id === 2
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    {card.title}
                  </h3>

                  <div className="mt-10">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-87.5 w-full rounded-3xl object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}