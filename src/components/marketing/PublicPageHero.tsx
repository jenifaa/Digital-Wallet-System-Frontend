import { AnimatePresence, motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
            className="mb-4 inline-block rounded-full border text-slate-400 border-[#8B90D0]/20 bg-[#8B90D0]/10 px-4 py-1.5 text-sm "
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl font-medium tracking-tight sm:text-5xl text-white"
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
          className="mx-auto mt-5 max-w-2xl text-lg text-slate-400 "
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights?: string[];
  tag?: string;
  active?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

interface Coords {
  top: number;
  left: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  highlights,
  tag,
  active,
  onHover,
  onLeave,
}: FeatureCardProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<Coords | null>(null);

  // Track the icon's real position so the portaled popup stays anchored
  // to it regardless of scroll, and is never clipped by a parent's
  // overflow-hidden or covered by a later section.
  useEffect(() => {
    if (!active || !iconRef.current) return;

    const updatePosition = () => {
      const rect = iconRef.current!.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 18,
        left: rect.left + rect.width / 2,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [active]);

  return (
    <div
      ref={iconRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative flex justify-center"
    >
      {/* ICON */}
      <motion.div
        whileHover={{ y: -8 }}
        className="
  relative
  flex h-16 w-16 items-center justify-center
  rounded-2xl
  border border-white/15
  bg-[#222954]/90
  text-[#8B90D0]
  shadow-[0_18px_45px_rgba(31,35,64,0.28)]
  backdrop-blur-md
  cursor-pointer
  transition-all
  duration-300
  hover:-translate-y-1
  hover:border-[#8B90D0]/60
  hover:shadow-[0_22px_55px_rgba(99,102,241,0.35)]
"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B90D0]/15">
          <Icon className="h-6 w-6 text-[#9BA3FF]" strokeWidth={2.2} />
        </div>
      </motion.div>

      {/* POPUP CARD — portaled to body, positioned via fixed coords so it
          escapes any ancestor overflow-hidden and always renders above
          whatever section comes next. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {active && coords && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                style={{
                  position: "fixed",
                  top: coords.top,
                  left: coords.left,
                  transform: "translateX(-50%)",
                }}
                className="
                  z-100
                  w-80
                  rounded-3xl
                  border border-white/10
                  bg-[#151A36]/95
                  backdrop-blur-xl
                  shadow-[0_20px_80px_rgba(99,102,241,0.35)]
                  overflow-hidden
                "
              >
                {/* Caret pointing up at the icon */}
                <div
                  className="
                    absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2
                    rotate-45 border-l border-t border-white/10 bg-[#151A36]
                  "
                />

                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                      <Icon className="h-6 w-6 text-indigo-400" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{title}</h3>
                        {tag && (
                          <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[11px] font-medium text-indigo-300">
                            {tag}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {description}
                      </p>
                    </div>
                  </div>

                  {highlights && highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      {highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-slate-300"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
