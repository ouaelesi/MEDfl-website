"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Github,
  Globe,
  Handshake,
  Play,
  Rocket,
  ShieldCheck,
  Smile,
  Sparkles,
  Zap,
} from "lucide-react";
import PartnersSlider from "./PartnersSlider";
import Image from "next/image";
import { motion, Variants, animate, useInView } from "framer-motion";
import GlobeDemo from "../globe-demo";
import Link from "next/link";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Tiny count-up that starts when visible
function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative md:pb-40 h-screen isolate flex flex-col justify-center  text-text">
      {/* glows + grid */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pt-7 md:px-10 lg:grid-cols-12 lg:gap-16 lg:pt-20">
        {/* LEFT: copy */}
        <div className="pb-15 relative flex flex-col justify-center gap-4 lg:col-span-6 xl:col-span-6">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            <span className="text-secondary relative">
              <span className=" relative">MEDfl</span>
            </span>
            , A <span className="relative text-primary">Collaborative</span>{" "}
            Framework for Federated Learning in{" "}
            <span className="text-primary relative">
              <span className="relative">Medicine</span>
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-lg">
            Train clinical AI models across hospitals without moving data. MEDfl
            connects sites, orchestrates real-world and simulation experiments.
          </p>

          <div className="flex gap-4">
            <Link
              href="/docs/overview"
              className="inline-flex items-center gap-2 rounded-full bg-secondary md:px-5 px-3 py-3 text-sm font-medium text-black shadow-lg transition hover:brightness-95"
            >
              <BookOpen className="h-4 w-4" />
              
               <span className="hidden md:block">Documentation</span> 
            </Link>
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-full bg-primary md:px-5 px-3 py-3 text-sm font-medium text-black shadow-lg transition hover:brightness-95"
            >
              <Rocket className="h-4 w-4" /> 
               <span className="hidden md:block">Quickstart</span> 
              
            </Link>
            <a
              href="https://github.com/MEDomics-UdeS/MEDfl"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 md:px-5 px-3 py-3  text-sm font-medium transition hover:bg-foreground/10"
            >
              <Github className="h-4 w-4" />
              <span className="hidden md:block">GitHub</span> 
            </a>
          </div>

          <div className="mt-2 relative">
            <PartnersSlider />
            {/* <div
              className="absolute w-1/2 left-20 -inset-6 rounded-[2.5rem] bg-emerald-400/10 blur-3xl transition-opacity duration-500"
              aria-hidden
            /> */}
          </div>
        </div>

        {/* RIGHT: image + floating badges/cards */}
        <div className="lg:col-span-6 xl:col-span-6  hidden md:block ">
          <div className="relative mx-auto">
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[2.5rem]  blur-3xl transition-opacity duration-500"
                aria-hidden
              />
              <div className="relative  -mt-10 rounded-[1.75rem] ">
                {/* <Image
                  className="absolute top-50 opacity-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full "
                  src="/medfl_logo.png"
                  width={1200}
                  height={1200}
                  alt="medfl logo"
                ></Image> */}
                <GlobeDemo />
              </div>

              {/* Left-top badge */}
              <div className="absolute right-0 top-20 -translate-y-1/2 sm:block md:left-0 ">
                <div className="inline-flex items-center gap-2 rounded-xl bg-foreground/10   px-4 py-2 backdrop-blur-sm ">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg">
                    <Globe className="h-4 w-4 text-secondary " />
                  </span>
                  <span className="text-sm font-medium text-text/90">
                    Real-World & Simulation FL
                  </span>
                </div>
              </div>

              {/* Right-middle chip */}
              <div className="absolute right-0 top-2/3 -translate-y-1/2 sm:block md:-right-10 md:top-1/2">
                <div className="inline-flex items-center rounded-full bg-foreground/10  px-2 py-2 backdrop-blur-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </span>
                </div>
              </div>

              {/* Bottom-left stats card with count-up */}
              <div className="absolute right-0 bottom-20 -translate-y-1/2 sm:block md:left-0">
                <div className="inline-flex items-center gap-2 rounded-xl bg-foreground/10   px-4 py-2 backdrop-blur-sm ">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg">
                    <Handshake className="h-4 w-4 text-primary " />
                  </span>
                  <span className="text-sm font-medium text-text/90">
                    Simplifying research collaboration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
