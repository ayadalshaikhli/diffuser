import { gsap, Expo } from "gsap/dist/gsap";
import React, { useEffect } from "react";
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

export default function FrontPage() {
  useEffect(() => {
    tl.from(".line", 2.5, {
      opacity: 0,
      y: -100,
      delay: 1,
    });
  });

  return (
    <div style={{ height: "70vh" }} className="relative text-white">
      <div className="justify-center text-center">
        <div className="line pt-48 text-4xl font-mono">
          <span>Boost Your Immunity</span>
        </div>
        <div className="line font-mono py-5 text-xl">
          <span>
            The Orcale Diffuser is a truly unique 2 in 1 oil diffuser and indoor
            fireplace.
          </span>
        </div>
      </div>
    </div>
  );
}
