// components/blogsPage/BlogContent.tsx
/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";

type SanityImage = { url?: string; alt?: string };
type SanityAuthor = { name?: string; image?: { url?: string } | string };
type SanityCategory = { title?: string } | string;

export type SanityPost = {
  title?: string;
  excerpt?: string;
  category?: SanityCategory | SanityCategory[];
  mainImage?: SanityImage;
  author?: SanityAuthor;
  publishedAt?: string;
  body?: any[];
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getTextFromChildren(children: any[]): string {
  return (children ?? [])
    .map((c: any) => (typeof c.text === "string" ? c.text : ""))
    .join("")
    .trim();
}

function extractTocFromPT(blocks: any[]) {
  const toc: { title: string; id: string }[] = [];
  for (const b of blocks ?? []) {
    if (b?._type === "block" && (b.style === "h2" || b.style === "h3")) {
      const title = getTextFromChildren(b.children || []);
      if (!title) continue;
      toc.push({ title, id: slugify(title) });
    }
  }
  return toc;
}

const headingWithIds = (Tag: "h2" | "h3") =>
  function Heading(props: any) {
    const raw = Array.isArray(props?.children)
      ? props.children.join(" ")
      : String(props?.children ?? "");
    const id = slugify(raw);
    return (
      <Tag id={id} className="text-2xl font-semibold mb-3 scroll-mt-28">
        {props.children}
      </Tag>
    );
  };

const components: PortableTextComponents = {
  block: {
    h2: headingWithIds("h2"),
    h3: headingWithIds("h3"),
  },
};

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = document.querySelector("article");
      if (!el) return;
      const total = (el as HTMLElement).scrollHeight - window.innerHeight;
      const current = window.scrollY - (el as HTMLElement).offsetTop;
      const p = Math.min(
        100,
        Math.max(0, (current / Math.max(1, total)) * 100)
      );
      setProgress(p);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      style={{ width: `${progress}%` }}
      className="h-full rounded-full bg-primary transition-[width] duration-150 ease-linear"
    />
  );
}

export default function BlogPostUI({
  post,
  recentSlot, // 👈 server-rendered JSX passed in by the page
}: {
  post: SanityPost;
  recentSlot?: React.ReactNode;
}) {
  const title = post.title ?? "Article";
  const excerpt = post.excerpt ?? "";
  const heroImage =
    typeof post.mainImage?.url === "string" ? post.mainImage.url : undefined;
  const heroAlt = post.mainImage?.alt || title;
  const authorName =
    typeof post.author?.name === "string" ? post.author.name : undefined;
  const authorAvatar =
    (typeof post.author?.image === "string"
      ? post.author?.image
      : post.author?.image?.url) || "/images/Logo.png";
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
      })
    : "";

  const category = Array.isArray(post.category)
    ? ((post.category[0] as any)?.title ?? String(post.category[0] ?? ""))
    : ((post.category as any)?.title ?? String(post.category ?? "")) || "";

  const toc = useMemo(() => extractTocFromPT(post.body ?? []), [post.body]);
  const [activeId, setActiveId] = useState<string>(toc[0]?.id);

  useEffect(() => {
    if (!toc.length) return;
    const headings = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] }
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <article className="relative isolate">
      <header className="relative bg-[#0c2b2e] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "-1px -1px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-28">
          <div className="mb-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Retour</span>
            </Link>
          </div>

          <h1 className="text-pretty text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {!!excerpt && (
            <p className="mt-4 max-w-3xl text-white/80">{excerpt}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={authorAvatar}
                alt={authorName || "Auteur"}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
                width={32}
                height={32}
              />
              <div className="text-sm text-white/90">
                {authorName && (
                  <span className="font-medium">{authorName}</span>
                )}
                {authorName && dateStr ? <span className="px-2">•</span> : null}
                {dateStr && <span className="text-white/70">{dateStr}</span>}
              </div>
            </div>

            {category && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15">
                {category}
              </span>
            )}
          </div>
        </div>
      </header>

      {heroImage && (
        <div className="relative -mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="overflow-hidden rounded-2xl bg-white">
              <Image
                width={1500}
                height={1500}
                src={heroImage}
                alt={heroAlt}
                className="h-[420px] w-full object-cover sm:h-[520px]"
              />
            </div>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="prose prose-zinc max-w-none prose-headings:tracking-tight prose-p:leading-relaxed">
            <PortableText value={post.body ?? []} components={components} />
          </div>

          {!!toc.length && (
            <aside className="lg:block">
              <div className="sticky top-24 rounded-xl bg-foreground p-4 shadow-sm relative overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    backgroundPosition: "-1px -1px",
                  }}
                />
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white">
                  Sommaire
                </p>
                <nav className="space-y-1">
                  {toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block rounded-md px-2 py-1.5 text-sm transition ${
                          isActive
                            ? "text-white"
                            : "text-white hover:bg-primary/50"
                        }`}
                      >
                        {item.title}
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                  <ReadingProgress />
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* 👇 server-rendered recent list injected from page.tsx */}
        <div className="mt-10">{recentSlot}</div>
      </section>
    </article>
  );
}