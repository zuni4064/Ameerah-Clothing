import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  y?: number;
} & MotionProps;

export default function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  y = 14,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

