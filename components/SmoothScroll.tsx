"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScroll = ({ children }: { children?: React.ReactNode }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none), (pointer: coarse)").matches ||
        window.innerWidth < 1024);

    const lenis = new Lenis({
      duration: isTouch ? 1.0 : 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: isTouch ? 1.5 : 0.25,
    });

    if (typeof window !== "undefined") {
      (window as any).__lenis = lenis;
    }

    lenis.on("scroll", ScrollTrigger.update);

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerHandler);
      if (typeof window !== "undefined" && (window as any).__lenis === lenis) {
        delete (window as any).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
