"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidEther from "../LiquidEther/LiquidEther";

// Stable color stop for fluid simulation
const HERO_LIQUID_COLORS = ["#D9E6FF"];

const SplitChars = ({ text, className, id }: { text: string; className?: string; id?: string }) => {
  return (
    <span className={className} id={id}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loaderCounterRef = useRef<HTMLDivElement | null>(null);
  const stroke1Ref = useRef<HTMLDivElement | null>(null);
  const stroke2Ref = useRef<HTMLDivElement | null>(null);
  const endLineRef = useRef<HTMLDivElement | null>(null);
  const parallaxInstanceRef = useRef<any>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    document.body.style.overflow = "hidden";

    const headingChars = headingRef.current?.querySelectorAll(".hero-char") || [];

    // Hide hero elements initially
    gsap.set(headingChars, { autoAlpha: 0, y: 100 });
    if (imgRef.current) gsap.set(imgRef.current, { autoAlpha: 0, y: 30, scale: 0.95 });
    if (stroke1Ref.current && stroke2Ref.current) {
      gsap.set([stroke1Ref.current, stroke2Ref.current], { autoAlpha: 0, width: "0%" });
    }
    if (endLineRef.current) gsap.set(endLineRef.current, { autoAlpha: 0 });

    // Breaker line: invisible at the top of the page, fades in as the user scrolls down
    const endLineTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=300",
      scrub: true,
      animation: endLineRef.current ? gsap.to(endLineRef.current, { autoAlpha: 1, ease: "none" }) : undefined,
    });

    // Request gyro permissions on iOS 13+ if supported
    const requestGyroPermission = () => {
      if (
        typeof (window as any).DeviceOrientationEvent !== "undefined" &&
        typeof (window as any).DeviceOrientationEvent.requestPermission === "function"
      ) {
        (window as any).DeviceOrientationEvent.requestPermission().catch(() => {});
      }
    };

    const handleFirstGesture = () => {
      requestGyroPermission();
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
    };

    window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("click", handleFirstGesture, { once: true });

    // Initialize parallax-js after reveal completes
    const initParallax = async () => {
      if (typeof window === "undefined" || !sectionRef.current) return;
      const isTouch =
        window.matchMedia("(hover: none), (pointer: coarse)").matches ||
        window.innerWidth < 1024;
      try {
        const mod = await import("parallax-js");
        const Parallax = mod.default || mod;
        if (!sectionRef.current) return;
        parallaxInstanceRef.current = new Parallax(sectionRef.current, {
          relativeInput: true,
          hoverOnly: isTouch, // On mobile, avoid gyro tilts displacing the centered layout
          selector: ".hero-layer",
          scalarX: 2,
          scalarY: 2,
          limitX: isTouch ? 12 : false,
          limitY: isTouch ? 12 : false,
          frictionX: 0.1,
          frictionY: 0.1,
        });
      } catch (err) {
        // Smooth fallback if parallax-js is unavailable
      }
    };

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const stroke1Width = isMobile ? "40vw" : "22vw";
    const stroke2Width = isMobile ? "30vw" : "16vw";

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
        initParallax();
      },
    });

    const counter = { value: 0 };

    // Loader counter: 0 → 100
    tl.to(
      counter,
      {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (loaderCounterRef.current) {
            loaderCounterRef.current.innerText = `${Math.floor(counter.value)}`;
          }
        },
      },
      "anim"
    );

    // Loader slide up
    if (loaderRef.current) {
      tl.to(
        loaderRef.current,
        {
          y: "-100%",
          duration: 1.8,
          ease: "power3.out",
        },
        "anim+=2.2"
      );
    }

    // Counter fade out
    if (loaderCounterRef.current) {
      tl.to(
        loaderCounterRef.current,
        {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
        },
        "anim+=2"
      );
    }

    // Heading chars animation
    if (headingChars.length > 0) {
      tl.to(
        headingChars,
        {
          autoAlpha: 1,
          y: 0,
          stagger: {
            amount: 0.5,
            from: "start",
          },
          duration: 1,
          ease: "power3.out",
        },
        "anim+=3.2"
      );
    }

    // Image animation (smooth fade + slight rise into center)
    if (imgRef.current) {
      tl.to(
        imgRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "anim+=4.0"
      );
    }

    // Stroke 2 animation (right side)
    if (stroke2Ref.current) {
      tl.to(
        stroke2Ref.current,
        {
          autoAlpha: 1,
          width: stroke2Width,
          duration: 1,
          ease: "power2.out",
        },
        "anim+=4.3"
      );
    }

    // Stroke 1 animation (left side)
    if (stroke1Ref.current) {
      tl.to(
        stroke1Ref.current,
        {
          autoAlpha: 1,
          width: stroke1Width,
          duration: 1,
          ease: "power2.out",
        },
        "anim+=4.5"
      );
    }

    return () => {
      tl.kill();
      endLineTrigger.kill();
      if (parallaxInstanceRef.current) {
        try {
          parallaxInstanceRef.current.destroy();
        } catch (e) {}
        parallaxInstanceRef.current = null;
      }
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="loader" ref={loaderRef} aria-hidden={loaderDone}>
        <div id="loader-counter" ref={loaderCounterRef}>0</div>
      </div>

      {/* Hero — direct children of #hero-section are parallax layers */}
      <div id="hero-section" ref={sectionRef}>
        {/* Animated fluid background */}
        <div id="hero-bg-fluid">
          <LiquidEther
            colors={HERO_LIQUID_COLORS}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {/* Back stroke (behind heading) */}
        <div className="hero-layer" data-depth="0.20" style={{ zIndex: 4 }}>
          <div id="hero-stroke-2" ref={stroke2Ref}>
            <img src="/Svg_Stroke.png" alt="" draggable="false" />
          </div>
        </div>

        {/* Heading text (deepest, moves least) */}
        <div className="hero-layer pointer-events-none" data-depth="0.10" style={{ zIndex: 5 }}>
          <div id="hero-heading-wrap">
            <div id="hero-heading" ref={headingRef}>
              <SplitChars text="MUSTAFA" />
            </div>
          </div>
        </div>

        {/* Portrait image (foreground, moves more) */}
        <div className="hero-layer pointer-events-none" data-depth="0.30" style={{ zIndex: 10 }}>
          <div id="hero-img-wrap">
            <div id="hero-img" ref={imgRef}>
              <img
                src="/Portfolio_Img-4.png"
                alt="Mustafa Ali"
                draggable="false"
              />
            </div>
          </div>
        </div>

        {/* Front stroke (top-most) */}
        <div className="hero-layer" data-depth="0.30" style={{ zIndex: 11 }}>
          <div id="hero-stroke-1" ref={stroke1Ref}>
            <img src="/Svg_Stroke.png" alt="" draggable="false" />
          </div>
        </div>

        {/* End-of-hero indicator line */}
        <div className="hero-end-line" ref={endLineRef}></div>
      </div>
    </>
  );
};

export default HeroSection;
