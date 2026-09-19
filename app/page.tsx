"use client";

import React, { Suspense, useRef, useEffect } from "react";
import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader from "@/components/Featured/SubHeader";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import SmoothScroll from "@/components/SmoothScroll";
import GradualBlur from "@/components/GradualBlur/GradualBlur";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const blurRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const blur = blurRef.current;
    const footer = document.getElementById("main-footer");
    if (!blur || !footer) return;

    // GradualBlur is visible across the site, but fades out when the footer enters the viewport
    const setVisible = (visible: boolean) =>
      gsap.to(blur, { autoAlpha: visible ? 1 : 0, duration: 0.3 });

    const footerInView = footer.getBoundingClientRect().top < window.innerHeight;
    gsap.set(blur, { autoAlpha: footerInView ? 0 : 1 });

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => setVisible(false),
      onEnterBack: () => setVisible(false),
      onLeave: () => setVisible(false),
      onLeaveBack: () => setVisible(true),
    });

    return () => trigger.kill();
  }, []);

  return (
    <SmoothScroll>
      <Suspense
        fallback={
          <div className="w-screen bg-black h-screen text-white text-4xl md:text-7xl flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <div className="bg-bg text-fg min-h-screen w-full overflow-x-hidden">
          <Navbar />
          <HeroSection />

          <div
            id="about"
            className="relative w-full overflow-hidden mt-16 sm:mt-24 md:mt-32 pb-20 md:pb-32 px-5 sm:px-8 md:px-12 lg:px-20"
            ref={ref}
          >
            <Skiggle />
            <Header />
            <div className="relative z-10 w-full mt-10 md:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
              <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-start">
                <FeaturedVideo refForward={ref} />
              </div>
              <div className="md:col-span-7 lg:col-span-7">
                <SubHeader />
              </div>
            </div>
          </div>

          <Projects />
          <HorizontalScroll />
          <Contact />
          <SiteFooter />

          {/* GradualBlur bottom vignette */}
          <div
            ref={blurRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 99999,
            }}
          >
            <GradualBlur
              target="parent"
              position="bottom"
              height="6rem"
              strength={2}
              divCount={6}
              curve="bezier"
              exponential={false}
              opacity={0.9}
              zIndex={1}
            />
          </div>
        </div>
      </Suspense>
    </SmoothScroll>
  );
}
