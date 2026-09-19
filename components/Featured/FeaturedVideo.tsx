"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";

const FeaturedVideo = ({ refForward, ...props }: { refForward?: any; [key: string]: any }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const variants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: { scale: 1.08, x: 0, y: 0 },
  };

  const { scrollYProgress } = useScroll({
    target: refForward,
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={progress > 0.4 ? "animate" : "initial"}
      className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[520px] aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl transition-shadow duration-300"
      {...props}
    >
      <Image
        src="/featured-portrait.jpg"
        alt="Featured portrait of Mustafa Ali"
        fill
        priority
        sizes="(max-width: 640px) 90vw, (max-width: 768px) 70vw, (max-width: 1200px) 40vw, 520px"
        className="object-cover"
      />
    </motion.div>
  );
};

export default FeaturedVideo;


