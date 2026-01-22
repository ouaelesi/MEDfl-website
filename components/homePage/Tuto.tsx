"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  Variants,
} from "motion/react";
import {
  Plug,
  ShieldCheck,
  Network,
  Workflow,
  FileCog,
  BookOpen,
  Rocket,
  PlayCircle,
  LineChart,
  BarChart3,
  Play,
  Github,
} from "lucide-react";

type Action = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "primary" | "ghost" | "red" | "yellow";
  aria?: string;
};

type Step = {
  title: string;
  body: string;
  img: string; // public path e.g. /images/tutorial/01.png
  alt?: string;
  color: string;
  icon: React.ReactNode;
  link?: string; // default/primary link (Guide)
  actions?: Action[];
};

const steps: Step[] = [
  {
    title: "Connect Clients Securely",
    body: "Onboard hospitals via Tailscale VPN and WebSockets. Generate auth keys and scripts, then invite collaborators.",
    img: "/images/tutos/home.png",
    alt: "Onboarding clients",
    color: "bg-red-400",
    icon: <Plug className="h-5 w-5 text-primary" />,
    link: "/docs/real-world/connect-clients",
    actions: [
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open connect clients guide",
      },
      {
        label: " ",
        href: "/docs/quickstart#connect",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Open quickstart connect",
      },
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open connect clients guide",
      },
    ],
  },
  {
    title: "Build Your Network",
    body: "Discover available clients, verify socket/VPN status, and select the cohort for training.",
    img: "/images/tutos/network.png",
    alt: "Network assembly",
    color: "bg-green-400",
    icon: <Network className="h-5 w-5 text-secondary" />,
    link: "/docs/real-world/network-view",
    actions: [
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open connect clients guide",
      },
      {
        label: " ",
        href: "/docs/quickstart#connect",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Open quickstart connect",
      },
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open connect clients guide",
      },
    ],
  },
  {
    title: "Validate Compatibility",
    body: "Run dataset and system checks: schema, columns, nulls, stats, OS/GPU. Be green before you train.",
    img: "/images/tutos/dataStats.png",
    alt: "Data stats and checks",
    color: "bg-yellow-400",
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    link: "/docs/real-world/validate-network",
    actions: [
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open connect clients guide",
      },
      {
        label: " ",
        href: "/docs/quickstart#connect",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Open quickstart connect",
      },
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open connect clients guide",
      },
    ],
  },
  {
    title: "Configure Pipelines",
    body: "Drag-and-drop nodes (Model, Network, Optimize, Strategy). Toggle DP/TL, set rounds and metrics.",
    img: "/images/tutos/configs.png",
    alt: "Pipeline builder",
    color: "bg-blue-400",
    icon: <Workflow className="h-5 w-5 text-secondary" />,
    link: "/docs/pipelines/builder",
    actions: [
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open connect clients guide",
      },
      {
        label: " ",
        href: "/docs/quickstart#connect",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Open quickstart connect",
      },
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open connect clients guide",
      },
    ],
  },
  {
    title: "Review & Launch",
    body: "Inspect the final configuration, confirm client readiness, then start federated rounds when minimum criteria are met.",
    img: "/images/tutos/checkConfig.png",
    alt: "Review configuration",
    color: "bg-purple-400",
    icon: <PlayCircle className="h-5 w-5 text-primary" />,
    link: "/docs/run-and-monitor",
    actions: [
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open connect clients guide",
      },
      {
        label: " ",
        href: "/docs/quickstart#connect",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Open quickstart connect",
      },
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open connect clients guide",
      },
    ],
  },
  {
    title: "Analyze & Export",
    body: "Compare runs, visualize AUC/ROC and losses, then export artifacts and persist results for reproducibility.",
    img: "/images/tutos/results.png",
    alt: "Results and analytics",
    color: "bg-emerald-400",
    icon: <LineChart className="h-5 w-5 text-secondary" />,
    link: "/docs/results-and-exports",
    actions: [
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open connect clients guide",
      },
      {
        label: " ",
        href: "/docs/quickstart#connect",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Open quickstart connect",
      },
      {
        label: "",
        href: "/docs/real-world/connect-clients",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open connect clients guide",
      },
    ],
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function ScrollTutorial() {
  const [active, setActive] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative container mx-auto w-full text-text">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-text md:text-5xl">
          From Setup to Breakthroughs
        </h2>
        <p className="mx-auto mt-3 px-4 w-full font-medium text-text md:w-3/5">
          Connect sites securely, validate datasets, design pipelines, launch
          federated rounds, and analyze results—end to end.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT: scroll steps */}
          <div className="lg:col-span-5">
            <ol className="relative">
              {steps.map((s, i) => (
                <StepBlock
                  key={i}
                  index={i}
                  step={s}
                  onEnter={() => setActive(i)}
                  active={active === i}
                  reducedMotion={!!prefersReducedMotion}
                />
              ))}
            </ol>
          </div>

          {/* RIGHT: sticky stage */}
          <div className="relative lg:col-span-7 hidden md:block">
            <div className="relative h-[60vh] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] lg:sticky lg:top-56 md:h-[45vh]">
              <div className="absolute inset-0 -z-0 rounded-xl bg-gradient-to-r from-primary via-secondary to-red-primary opacity-50 blur-2xl"></div>
              <Image
                className="absolute left-1/2 top-70 w-full -translate-x-1/2 -translate-y-1/2 opacity-60"
                src="/medfl_logo.png"
                width={1200}
                height={1200}
                alt="medfl logo"
              />
              <AnimatePresence mode="popLayout" initial={false}>
                {steps.map((s, i) =>
                  i === active ? (
                    <motion.div
                      key={i}
                      className="absolute inset-0 w-full p-5 pt-8"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.985 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, scale: 1 }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 1.005 }
                      }
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <Image
                        src={s.img}
                        alt={s.alt ?? s.title}
                        width={1920}
                        height={1080}
                        className="h-full w-full rounded-xl object-cover"
                        priority
                      />
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>

              {/* Simple progress chip */}
              <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs">
                {active + 1} / {steps.length}
              </div>
              <div className="absolute left-5 top-3 h-3 w-3 rounded-full bg-red-400 text-xs"></div>
              <div className="absolute left-9 top-3 h-3 w-3 rounded-full bg-green-400 text-xs"></div>
              <div className="absolute left-[3.25rem] top-3 h-3 w-3 rounded-full bg-yellow-400 text-xs"></div>
            </div>

            {/* Mobile: inline images (when no sticky) */}
            <div className="mt-6 space-y-6 lg:hidden">
              {steps.map((s, i) => (
                <div
                  key={`m-${i}`}
                  className="overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={s.img}
                    alt={s.alt ?? s.title}
                    width={1920}
                    height={1080}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One scroll-triggered step */
function StepBlock({
  step,
  index,
  onEnter,
  active,
  reducedMotion,
}: {
  step: Step;
  index: number;
  onEnter: () => void;
  active: boolean;
  reducedMotion: boolean;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-10% 0px -10% 0px" });

  React.useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  return (
    <li ref={ref} className="flex md:min-h-[70vh] items-center py-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: inView ? 0 : 10,
          opacity: inView ? 1 : 0.6,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
        className="max-w-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
              ${active ? "text-black" : "bg-white/10 text-white/80"} ${
              step.color
            }`}
          >
            {index + 1}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground/10">
              {step.icon}
            </span>
            <h3 className="text-xl font-bold md:text-2xl">{step.title}</h3>
          </div>
        </div>

        <p className="text-sm opacity-80 md:text-base">{step.body}</p>

        {/* Actions */}
        {(step.link || step.actions?.length) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {/* {step.link && (
              <Link
                href={step.link}
                aria-label={`Open guide: ${step.title}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary px-3 py-2 text-sm font-medium text-black transition hover:brightness-95"
              >
                <BookOpen className="h-4 w-4" />
                Guide
              </Link>
            )} */}
            {step.actions?.map((a, idx) => (
              <Link
                key={`${step.title}-action-${idx}`}
                href={a.href}
                aria-label={a.aria || a.label}
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                  a.variant === "primary"
                    ? "text-primary border border-primary/20  hover:brightness-95"
                    : a.variant === "red"
                    ? "text-secondary border border-secondary/40  hover:brightness-95"
                    : "border border-foreground/20 bg-transparent hover:bg-foreground/10",
                ].join(" ")}
              >
                {a.icon}
                {a.label}
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </li>
  );
}
