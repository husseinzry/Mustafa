"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";

const FeaturedVideo = ({ refForward, ...props }: { refForward?: any; [key: string]: any }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("/featured-portrait.jpg");

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

  useEffect(() => {
    // Check if user uploaded photo exists in public directory
    const candidates = [
      "/IMG_20260201_014714_949.jpg",
      "/IMG_20260201_014714_949.jpeg",
      "/IMG_20260201_014714_949.png",
      "/img_20260201_014714_949.jpg",
      "/new-portrait.jpg",
      "/new-portrait.png",
    ];

    const checkCandidate = async () => {
      for (const candidate of candidates) {
        try {
          const res = await fetch(candidate, { method: "HEAD" });
          if (res.ok) {
            setImgSrc(candidate);
            return;
          }
        } catch {
          // continue checking
        }
      }
    };

    checkCandidate();
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={progress > 0.5 ? "animate" : "initial"}
      className="relative md:absolute mx-auto md:mx-0 mt-4 md:mt-0 md:top-[55vh] md:left-20 md:translate-x-0 md:translate-y-0 z-30 w-[82vw] md:w-[40vw] max-w-[22rem] md:max-w-[856px] aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl shadow-2xl"
      {...props}
    >
      <Image
        src={imgSrc}
        alt="Featured portrait of Mustafa Ali"
        fill
        priority
        sizes="(max-width: 768px) 80vw, 40vw"
        className="object-cover"
      />
    </motion.div>
  );
};

export default FeaturedVideo;


