import React from "react";

export default function BlogsHeader() {
  return (
    <section className="relative isolate overflow-hidden  text-white">
      {/* background grid */}
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

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10">
        {/* Heading */}
        <div className="text-center md:w-8/10 mx-auto">
          <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl  ">
            Des conseils d&apos;experts et des stratégies de{" "}
            <span className="text-primary">croissance.</span>
          </h2>
          <p className="mx-auto mt-4  text-balance text-white/80">
            Gardez une longueur d&apos;avance grâce aux conseils d&apos;experts
            en marketing, aux tendances du secteur et aux informations
            exploitables pour faire évoluer et développer votre entreprise avec
            succès.
          </p>
        </div>
      </div>
    </section>
  );
}