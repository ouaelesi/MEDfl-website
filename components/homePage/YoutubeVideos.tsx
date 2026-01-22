"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Youtube, PlayCircle, ArrowRight } from "lucide-react";
import {videos} from "@/data/youtubeVideos";


function YouTubeEmbed({ youtubeId, playlistId }: { youtubeId?: string; playlistId?: string }) {
  const src = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
    : playlistId
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`
    : "";

  if (!src) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      {/* 16:9 */}
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title="YouTube tutorial"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

export default function VideoTutorialsSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative w-full bg-background text-text">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-sm">
            <Youtube className="h-4 w-4 text-red-500" />
            Video tutorials
          </div>

          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Learn MEDfl with guided videos
          </h2>
          <p className="mx-auto mt-3 text-pretty opacity-80">
            Short, practical walkthroughs—from client onboarding and validation to pipelines,
            training, and results.
          </p>

          {/* Top actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://www.youtube.com/playlist?list=PLEPy2VhC4-D7Y4lkGMRpHG8ydVZQonkMJ"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary px-4 py-2 text-sm font-medium text-black transition hover:brightness-95"
              aria-label="Open YouTube channel"
            >
              <PlayCircle className="h-4 w-4" />
              Watch on YouTube
            </Link>

            <Link
              href="/docs/quickstart"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-transparent px-4 py-2 text-sm transition hover:bg-foreground/10"
              aria-label="Open Quickstart"
            >
              Quickstart
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <motion.article
              key={v.title}
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.04 }}
              className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4 backdrop-blur-sm"
            >
              {/* window dots */}
              <div className="absolute left-5 top-3 h-3 w-3 rounded-full bg-red-400" />
              <div className="absolute left-9 top-3 h-3 w-3 rounded-full bg-green-400" />
              <div className="absolute left-[3.25rem] top-3 h-3 w-3 rounded-full bg-yellow-400" />

              <div className="pt-5">
                <YouTubeEmbed youtubeId={v.youtubeId} playlistId={v.playlistId} />

                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {v.level && <Badge>{v.level}</Badge>}
                    {v.duration && <Badge>{v.duration}</Badge>}
                  </div>

                  {v.href && (
                    <Link
                      href={v.href}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      aria-label={`Open on YouTube: ${v.title}`}
                    >
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-bold">{v.title}</h3>
                {v.description && <p className="mt-1 text-sm opacity-80">{v.description}</p>}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="https://www.youtube.com"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-transparent px-5 py-2 text-sm transition hover:bg-foreground/10"
            aria-label="View all tutorials"
          >
            View all tutorials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
