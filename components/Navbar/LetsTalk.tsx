"use client";
import React from "react";
import { useSpring, animated } from "@react-spring/web";

const EMAIL = "fhfabadgshei@gmail.com";

const LetsTalk = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
    x: -10,
  }));

  const [opacitySprings, opacityApi] = useSpring(() => ({
    opacity: 1,
    x: 0,
  }));

  const [opacitySpringsReverse, opacityApiReverse] = useSpring(() => ({
    opacity: 0,
    x: -10,
  }));

  return (
    <a
      href={`mailto:${EMAIL}`}
      aria-label={`Email ${EMAIL}`}
      className="nav_btn_lg nav_btn_dark flex items-center justify-center hover:bg-brblue py-6 transition-colors duration-300"
      onMouseEnter={() => {
        api.start({ x: 20 });
        opacityApi.start({ opacity: 0, x: 20 });
        opacityApiReverse.start({ opacity: 1, x: 0 });
      }}
      onMouseLeave={() => {
        api.start({ x: -10 });
        opacityApi.start({ opacity: 1, x: 0 });
        opacityApiReverse.start({ opacity: 0, x: -10 });
      }}
    >
      <div className="flex relative">
        <animated.div style={opacitySprings}>LET&apos;S TALK</animated.div>
        <animated.div
          className="absolute text-[#F9F8FF]"
          style={opacitySpringsReverse}
        >
          LET&apos;S TALK
        </animated.div>
      </div>
      <animated.div style={springs} className="ml-1">
        •
      </animated.div>
    </a>
  );
};

export default LetsTalk;
