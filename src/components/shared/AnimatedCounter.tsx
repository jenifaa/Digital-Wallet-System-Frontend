import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString(),
  );
  const [text, setText] = useState("0");

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => setText(latest));
  }, [display]);

  return (
    <motion.span className={className}>
      {prefix}
      {text}
      {suffix}
    </motion.span>
  );
}
