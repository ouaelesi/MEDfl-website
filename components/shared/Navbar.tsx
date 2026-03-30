"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, PropsWithChildren } from "react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";

export type NavLink = { label: string; href: string; external?: boolean };

type Props = {
  links?: NavLink[];
  cta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
};

function NavA({
  href,
  external,
  className,
  onClick,
  children,
  ...rest
}: PropsWithChildren<{
  href: string;
  external?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick} // ✅ This now works
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default function Navbar({
  links = [
    { label: "Docs", href: "https://medomicslab.gitbook.io/medfl-app-docs" ,  external: true, },
    
    { label: "Installation", href: "/#installation" },
    { label: "Tutorials", href: "/#tutos" },
  ],
  cta = { label: "Quickstart", href: "https://medomicslab.gitbook.io/medfl-app-docs/medfl-review",
    external: true, },
  secondaryCta = {
    label: "GitHub",
    href: "https://github.com/MEDomics-UdeS/MEDfl",
    external: true,
  },
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkBase =
    "rounded px-1 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40";
  const isActive = (href: string) => href !== "/" && pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur text-text">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="MEDfl home"
        >
          <Image
            src="/medfl_logo.png"
            width={160}
            height={40}
            alt="MEDfl logo"
            className="h-auto w-[70px]"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-6 text-sm text-white/80">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <NavA
                    href={l.href}
                    external={l.external}
                    className={[
                      linkBase,
                      active ? "text-white" : "text-text",
                      active
                        ? "underline underline-offset-8 decoration-primary/70"
                        : "hover:text-white",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                  </NavA>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right cluster: Theme + CTA(s) (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {/* Secondary CTA (GitHub) */}
          {secondaryCta && (
            <NavA
              href={secondaryCta.href}
              external={secondaryCta.external}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-3 py-2 text-sm font-semibold text-text transition hover:bg-foreground/10"
              aria-label={secondaryCta.label}
            >
              <Github className="h-4 w-4" />
              {secondaryCta.label}
            </NavA>
          )}
          {/* Primary CTA */}
          <NavA
            href={cta.href}
            external={cta.external}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
            aria-label={cta.label}
          >
            {cta.label}
          </NavA>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className={`h-5 w-5 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg
            className={`h-5 w-5 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-white/10 bg-background`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-white/90">
          {/* Theme + Secondary at top */}
          <li className="mb-1 flex items-center justify-between">
            <ThemeToggle />
            {secondaryCta && (
              <NavA
                href={secondaryCta.href}
                external={secondaryCta.external}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-3 py-2 text-sm transition hover:bg-foreground/10"
                onClick={() => setOpen(false)}
              >
                <Github className="h-4 w-4" />
                {secondaryCta.label}
              </NavA>
            )}
          </li>

          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <NavA
                  href={l.href}
                  external={l.external}
                  className={[
                    "block rounded-md px-3 py-2",
                    active ? "bg-white/10 text-white" : "hover:bg-white/5",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavA>
              </li>
            );
          })}

          <li className="mt-2">
            <NavA
              href={cta.href}
              external={cta.external}
              className="mx-auto block w-2/3 items-center justify-center rounded-full bg-secondary px-4 py-2 text-center text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </NavA>
          </li>
        </ul>
      </div>
    </header>
  );
}
