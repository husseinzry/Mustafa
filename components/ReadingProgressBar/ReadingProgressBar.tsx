"use client";

import React, { useEffect, useRef } from "react";

export default function ReadingProgressBar() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      
      const currentProgress =
        scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${currentProgress})`;
      }
      if (trackRef.current) {
        trackRef.current.style.opacity = currentProgress > 0.002 ? "1" : "0";
        trackRef.current.setAttribute(
          "aria-valuenow",
          String(Math.round(currentProgress * 100))
        );
      }
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    let lenisUnsub: (() => void) | null = null;
    const checkLenis = () => {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.on === "function") {
        const handler = () => onScrollOrResize();
        lenis.on("scroll", handler);
        lenisUnsub = () => {
          if (typeof lenis.off === "function") {
            lenis.off("scroll", handler);
          }
        };
        return true;
      }
      return false;
    };

    if (!checkLenis()) {
      const timeoutId = setTimeout(checkLenis, 300);
      return () => {
        clearTimeout(timeoutId);
        if (lenisUnsub) lenisUnsub();
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
      };
    }

    return () => {
      if (lenisUnsub) lenisUnsub();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      id="reading-progress-track"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[100005] h-[2.5px] pointer-events-none select-none bg-theme-border/20 backdrop-blur-xs transition-opacity duration-300 opacity-0"
    >
      <div
        ref={fillRef}
        id="reading-progress-fill"
        className="h-full w-full bg-gradient-to-r from-accent via-accent to-brblue shadow-[0_0_8px_rgba(74,131,255,0.7)]"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left center",
          willChange: "transform",
        }}
      />
    </div>
  );
}
