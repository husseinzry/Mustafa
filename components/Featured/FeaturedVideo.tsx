"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const FeaturedVideo = ({ refForward, ...props }: { refForward?: any; [key: string]: any }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: refForward,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.97, 1.02]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[490px] aspect-[4/5] overflow-hidden rounded-[26px] sm:rounded-[32px] shadow-2xl bg-neutral-900 border border-theme-border/40 z-20 group"
      {...props}
    >
      <Image
        src="/featured-portrait.jpg"
        alt="Mustafa Ali"
        fill
        priority
        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 42vw, 490px"
        referrerPolicy="no-referrer"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Faded bottom vignette & subtle bottom border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent pointer-events-none z-10"
      />
    </motion.div>
  );
};

export default FeaturedVideo;


