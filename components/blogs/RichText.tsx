/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1200).height(800).fit("max").url();
      const alt = value?.alt || "Image";
      return (
        <figure className="my-6 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
          />
          {alt && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-mt-28 text-2xl font-semibold tracking-tight text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="leading-relaxed text-gray-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary/60 pl-4 italic text-gray-800">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
        <code>{children}</code>
      </pre>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 text-[0.9em]">
        {children}
      </code>
    ),
  },
};

export default function RichText({ value }: { value: any }) {
  return (
    <div
      className="prose prose-zinc max-w-none prose-headings:tracking-tight prose-p:leading-relaxed
      prose-a:text-primary hover:prose-a:opacity-80
      prose-img:rounded-xl prose-hr:my-10"
    >
      <PortableText value={value} components={components} />
    </div>
  );
}