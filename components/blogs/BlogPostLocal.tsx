"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type Category = { title?: string } | string;

type Block =
  | { _type: "h2" | "h3"; text: string }
  | { _type: "p"; text: string }
  | { _type: "ul"; items: string[] }
  | { _type: "code"; code: string; lang?: string }
  | { _type: "quote"; text: string }
  | { _type: "image"; url: string; alt?: string };

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  author?: { name?: string; avatar?: string };
  category?: Category[];
  mainImage?: { url?: string; alt?: string };
  body?: Block[];
};

function catTitle(c?: Category) {
  if (!c) return "";
  return typeof c === "string" ? c : c.title || "";
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Scroll progress for the whole page (robust + simple)
 */
function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="h-full rounded-full bg-primary transition-[width] duration-150 ease-linear"
      style={{ width: `${progress}%` }}
    />
  );
}

export default function BlogPostLocal({ post }: { post: BlogPost }) {
  const title = post.title || "Article";
  const excerpt = post.excerpt || "";
  const heroImage = post.mainImage?.url;
  const heroAlt = post.mainImage?.alt || title;

  const authorName = post.author?.name || "";
  const authorAvatar = post.author?.avatar || "/images/Logo.png";

  const dateStr = React.useMemo(() => {
    if (!post.publishedAt) return "";
    const d = new Date(post.publishedAt);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [post.publishedAt]);

  const mainCategory = catTitle(post.category?.[0]);

  // TOC from h2/h3 blocks
  const toc = React.useMemo(() => {
    const t: { title: string; id: string }[] = [];
    for (const b of post.body ?? []) {
      if (b._type === "h2" || b._type === "h3") {
        const text = b.text?.trim();
        if (!text) continue;
        t.push({ title: text, id: slugify(text) });
      }
    }
    return t;
  }, [post.body]);

  const [activeId, setActiveId] = React.useState<string>(toc[0]?.id || "");

  React.useEffect(() => {
    // ensure active id is valid when toc changes
    if (!toc.length) return;
    setActiveId((prev) => (toc.some((t) => t.id === prev) ? prev : toc[0].id));
  }, [toc]);

  React.useEffect(() => {
    if (!toc.length) return;

    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // prefer the most visible intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        // mark section as "active" when it passes under the header
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [toc]);

  return (
    <article className="relative isolate bg-background text-text">
      {/* Header */}
      <header className="relative overflow-hidden bg-[#0c2b2e] text-white">
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

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-10">
          <div className="mb-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15"
            >
              <span aria-hidden>←</span>
              <span>Retour</span>
            </Link>
          </div>

          <h1 className="text-pretty text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {!!excerpt && <p className="mt-4 max-w-3xl text-white/80">{excerpt}</p>}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={authorAvatar}
                alt={authorName || "Auteur"}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
              />
              <div className="text-sm text-white/90">
                {authorName && <span className="font-medium">{authorName}</span>}
                {authorName && dateStr ? <span className="px-2">•</span> : null}
                {dateStr && <span className="text-white/70">{dateStr}</span>}
              </div>
            </div>

            {!!mainCategory && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15">
                {mainCategory}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      {heroImage && (
        <div className="relative -mt-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <Image
                width={1500}
                height={900}
                src={heroImage}
                alt={heroAlt}
                className="h-[320px] w-full object-cover sm:h-[460px] md:h-[520px]"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Content */}
          <div className="prose prose-zinc max-w-none prose-headings:tracking-tight prose-p:leading-relaxed">
            {(post.body ?? []).map((b, idx) => {
              if (b._type === "h2")
                return (
                  <h2 key={idx} id={slugify(b.text)}>
                    {b.text}
                  </h2>
                );

              if (b._type === "h3")
                return (
                  <h3 key={idx} id={slugify(b.text)}>
                    {b.text}
                  </h3>
                );

              if (b._type === "p") return <p key={idx}>{b.text}</p>;

              if (b._type === "quote") return <blockquote key={idx}>{b.text}</blockquote>;

              if (b._type === "ul")
                return (
                  <ul key={idx}>
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );

              if (b._type === "code")
                return (
                  <pre key={idx}>
                    <code>{b.code}</code>
                  </pre>
                );

              if (b._type === "image")
                return (
                  <figure key={idx}>
                    <Image
                      src={b.url}
                      alt={b.alt || "Image"}
                      width={1200}
                      height={800}
                      className="rounded-xl"
                    />
                    {b.alt ? <figcaption>{b.alt}</figcaption> : null}
                  </figure>
                );

              return null;
            })}
          </div>

          {/* TOC */}
          {!!toc.length && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 backdrop-blur-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text">
                  Sommaire
                </p>

                <nav className="space-y-1">
                  {toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={[
                          "block rounded-md px-2 py-1.5 text-sm transition",
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "text-text/80 hover:bg-foreground/10 hover:text-text",
                        ].join(" ")}
                      >
                        {item.title}
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                  <ReadingProgress />
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>
    </article>
  );
}
