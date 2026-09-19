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
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </motion.div>
  );
};

export default FeaturedVideo;


