"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

export type Category = { title?: string } | string;

export type Post = {
  id?: string;
  title: string;
  image: string;
  href?: string;
  category: Category[];
};

function catTitle(c: Category) {
  return typeof c === "string" ? c : c?.title || "";
}

export default function BlogGrid({ posts = [] }: { posts?: Post[] }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeCat, setActiveCat] = useState<string>("Toutes");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 200);
    return () => clearTimeout(t);
  }, [query]);

  const categories = useMemo(() => {
    const all = new Set<string>();
    for (const p of posts) {
      for (const c of p.category || []) {
        const t = catTitle(c).trim();
        if (t) all.add(t);
      }
    }
    return ["Toutes", ...Array.from(all).sort((a, b) => a.localeCompare(b, "fr"))];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const titleOk = !debounced || p.title.toLowerCase().includes(debounced);

      const catOk =
        activeCat === "Toutes" ||
        (p.category || []).some((c) => catTitle(c).trim() === activeCat);

      return titleOk && catOk;
    });
  }, [posts, debounced, activeCat]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 md:px-0">
      {/* Controls */}
      <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-black/5  md:mx-0">
        <div className="mx-4 py-4 md:mx-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-neutral-500" />
              </div>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article"
                aria-label="Rechercher"
                className="w-full rounded-2xl border border-foreground/20 bg-background py-2.5 pl-10 pr-10 text-sm outline-none ring-0 transition focus:border-foreground/20"
              />
              {query && (
                <button
                  aria-label="Effacer la recherche"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-500 hover:text-neutral-800"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <select
                value={activeCat}
                onChange={(e) => setActiveCat(e.target.value)}
                className="w-full rounded-2xl border border-foreground/20 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-foreground/20 sm:w-auto"
                aria-label="Catégorie"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
          {filtered.map((p, i) => {
            const firstCat = p.category?.[0];
            const first = catTitle(firstCat);
            const extraCount = Math.max(0, (p.category?.length || 0) - 1);

            return (
              <article key={p.id ?? `${p.title}-${i}`} className="text-left">
                <Link href={p.href ?? "#"} className="group block">
                  <div className="relative overflow-hidden rounded-[20px] bg-gray-100">
                    <Image
                      width={1000}
                      height={1000}
                      src={p.image}
                      alt={p.title}
                      className="aspect-[1/1] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {!!first && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-medium text-gray-800 shadow">
                        {first}
                        {extraCount > 0 ? `  +${extraCount}` : ""}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-[13px] font-semibold leading-snug text-gray-900 sm:text-[14px]">
                    {p.title}
                  </h3>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-10 text-center text-gray-500">
          Aucun article ne correspond à votre recherche.
        </p>
      )}
    </section>
  );
}
