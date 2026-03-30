"use client";

import React from "react";
import Link from "next/link";
import {
  Rocket,
  Package,
  Laptop,
  Server,
  BarChart3,
  Globe2,
  ArrowRight,
} from "lucide-react";

type Tutorial = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const tutorials: Tutorial[] = [
  {
    title: "Install MEDfl (Python)",
    description: "Set up a virtualenv and install MEDfl via pip in minutes.",
    href: "/docs/tutorials/install-python",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Run the Desktop App",
    description:
      "Install the desktop app on Windows, macOS, or Linux and connect to a server.",
    href: "/docs/tutorials/desktop-app",
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    title: "Start a Federated Server",
    description:
      "Spin up a FedAvg server with Strategy and track 10 rounds of training.",
    href: "/docs/tutorials/start-server",
    icon: <Server className="h-5 w-5" />,
  },
  {
    title: "Connect a Client",
    description:
      "Configure XGBoost params, join the federation, and report metrics.",
    href: "/docs/tutorials/xgb-client",
    icon: <BarChart3 className="h-5 w-5" />,
  },

  {
    title: "Tailscale / LAN Setup",
    description:
      "Connect clients securely over Tailscale or on a local network.",
    href: "/docs/tutorials/tailscale",
    icon: <Globe2 className="h-5 w-5" />,
  },
  {
    title: "Tailscale / LAN Setup",
    description:
      "Connect clients securely over Tailscale or on a local network.",
    href: "/docs/tutorials/tailscale",
    icon: <Globe2 className="h-5 w-5" />,
  },
];

export default function TutorialsSection() {
  return (
    <section className="relative w-full  text-text" id="tutos">
      {/* soft radial accents */}
      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_450px_at_80%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(700px_350px_at_10%_90%,rgba(6,182,212,0.06),transparent_50%)]" /> */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs">
              <Rocket className="h-3.5 w-3.5" />
              <span>Tutorials</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-[1.05]">
              Learn by building, step by step
            </h2>
            <p className="mt-3 max-w-2xl text-text/80">
              Follow focused, practical guides to get MEDfl running — from pip
              install to multi-site federated training.
            </p>
          </div>

          {/* Optional: "View all" */}
          <Link
            href="/docs/tutorials"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm hover:bg-white/[0.1] transition"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid of tutorial cards */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tutorials.map((t, i) => (
            <TutorialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TutorialCard({ title, description, href, icon }: Tutorial) {
  return (
    <div className="group relative rounded-2xl border  border-foreground/10 bg-foreground/[0.03]  p-5 pt-10  md:p-6 md:pt-10 transition">
      {/* glow on hover */}
      <div className="absolute left-5 top-3 rounded-full bg-red-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-9 top-3 rounded-full bg-green-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-13 top-3 rounded-full bg-yellow-400  w-3 h-3 text-xs"></div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent  transition" />

      <div className="flex items-center gap-3 text-sm text-text/70 mb-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10">
          {icon}
        </div>
        <span className="uppercase tracking-wide">Tutorial</span>
      </div>

      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-text/75">{description}</p>

      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 hover:bg-primary text-sm rounded-lg px-3 bg-primary/10 py-2 border border-primary/20 text-text  transition"
        aria-label={`Open tutorial: ${title}`}
      >
        Open tutorial
        <ArrowRight className="h-4 w-4" />
      </Link>

      {/* make whole card clickable (accessible) */}
      <Link
        href={href}
        aria-hidden
        className="absolute inset-0"
        tabIndex={-1}
      />
    </div>
  );
}
