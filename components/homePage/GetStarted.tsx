"use client";

import Link from "next/link";
import React from "react";
import CodeBlock from "./CodeBlocs";
import {
  Package,
  Download,
  BookOpen,
  Github,
  Terminal,
  Server,
  Laptop,
  Rocket,
} from "lucide-react";
import Image from "next/image";

export default function GetStartedSection() {
  const [tab, setTab] = React.useState<"python" | "desktop">("python");

  const pipCmd = `pip install MEDfl`;

  const serverExample = `from MEDfl.rw.server import FederatedServer, Strategy

custom_strategy = Strategy(
    name="FedAvg",
    fraction_fit=1,
    min_fit_clients=1,
    min_evaluate_clients=1,
    min_available_clients=1,
    local_epochs=1,
    threshold=0.5,
    learning_rate=0.01,
    optimizer_name="SGD",
    saveOnRounds=3,
    savingPath="./",
    total_rounds=10,
    # Adjust "target" to your label column name
    datasetConfig={"isGlobal": True, "globalConfig": {"target": "label", "testFrac": 0.2}}
)

server = FederatedServer(
    host="0.0.0.0",
    port=8080,
    num_rounds=10,
    strategy=custom_strategy,
)
server.start()`;

  const clientExample = `from MEDfl.rw.client import FlowerClient, DPConfig

# Example hyperparameters for XGBoost
xgb_params = {
    "objective": "binary:logistic",
    "eval_metric": "logloss",
    "eta": 0.1,
    "max_depth": 6,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "tree_method": "hist",  # GPU: "gpu_hist"
}

client = FlowerClient(
    server_address="100.65.215.27:8080",
    data_path="../data/client1.csv",
    dp_config=None,         # DP is only for NN
    model_type="xgb",       # run XGBoost mode
    xgb_params=xgb_params,  # 🔑 required for XGBoost
    xgb_rounds=10           # 🔑 local boosting steps per FL round
)

client.start()`;

  return (
    <section className="relative w-full  text-text">
      <Image
        src={tab == "python" ? "/images/code.png" : "/images/tutos/home.png"}
        width={2050}
        height={2050}
        alt="Medfl"
        className={`absolute top-0 right-0 w-1/2  ${
          tab == "python" ? "opacity-10" : "opacity-5"
        } `}
      />

      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_400px_at_80%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(600px_300px_at_10%_90%,rgba(6,182,212,0.06),transparent_50%)]" /> */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10  bg-foreground/[0.03]  px-3 py-1 text-xs">
              <Rocket className="h-3.5 w-3.5 text-secondary" />
              <span className="text-secondary">Get started</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-[1.05]">
              Install, run, and federate in minutes
            </h2>
            <p className="mt-3 max-w-2xl text-text/80">
              Use MEDfl as a Python package or install the desktop application.
              Start a server, connect clients, and track federated rounds.
            </p>
          </div>

          {/* Quick links */}
        
        </div>

        {/* Tabs */}
        <div className="mt-10 inline-flex rounded-2xl border border-foreground/10  bg-foreground/[0.04]   p-1">
          <TabButton
            active={tab === "python"}
            onClick={() => setTab("python")}
            icon={<Package className="h-4 w-4" />}
            label="Python package"
          />
          <TabButton
            active={tab === "desktop"}
            onClick={() => setTab("desktop")}
            icon={<Laptop className="h-4 w-4 " />}
            label="Desktop app"
          />
        </div>

        {/* Content */}
        {tab === "python" ? (
          <div>
              <div className="flex gap-2 mt-8">
            <CTA
              href="https://medfl.readthedocs.io/en/latest/"
              icon={<BookOpen className="h-4 w-4 text-primary" />}
            >
              Docs
            </CTA>
            <CTA
              href="https://pypi.org/project/medfl/"
              icon={<Download className="h-4 w-4 text-secondary" />}
            >
              Installation
            </CTA>
            <CTA
              href="https://github.com/medfl-org/medfl"
              icon={<Github className="h-4 w-4 text-yellow-400" />}
            >
              GitHub
            </CTA>
          </div>
  <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <Card
              title="Install with pip"
              icon={<Terminal className="h-5 w-5" />}
            >
              <CodeBlock lang="bash" code={pipCmd} />
              <p className="mt-3 text-sm text-text/70">
                Requires Python 3.9+. Create a virtual environment for best
                results.
              </p>
            </Card>

       {/*      <Card
              title="Server: minimal FedAvg"
              icon={<Server className="h-5 w-5" />}
            >
              <CodeBlock lang="python" code={serverExample} />
            </Card> */}

    {/*         <Card
              title="Client: XGBoost example"
              icon={<Package className="h-5 w-5" />}
            >
              <CodeBlock lang="python" code={clientExample} />
            </Card> */}

      {/*       <Card title="Next steps" icon={<BookOpen className="h-5 w-5" />}>
              <ul className="text-sm space-y-2 text-text/80 list-disc pl-5">
                <li>
                  Run the server, then start multiple clients on different
                  machines.
                </li>
                <li>Open the dashboard to monitor rounds and metrics.</li>
                <li>
                  Try DP (NN mode) or compare strategies and export results.
                </li>
              </ul>
              <div className="mt-4 flex gap-2">
                <SmallLink href="/docs/quickstart">Quickstart</SmallLink>
                <SmallLink href="/docs/api">API Reference</SmallLink>
              </div>
            </Card> */}
          </div>
          </div>
        
        ) : (
          <div>
            <div className="flex gap-2 mt-8">
            <CTA
              href="https://medfl.readthedocs.io/en/latest/"
              icon={<BookOpen className="h-4 w-4 text-primary" />}
            >
              Docs
            </CTA>
            <CTA
              href="https://pypi.org/project/medfl/"
              icon={<Download className="h-4 w-4 text-secondary" />}
            >
              Installation
            </CTA>
            <CTA
              href="https://github.com/MEDomicsLab/MEDomics/tree/dev_medfl_sqllite"
              icon={<Github className="h-4 w-4 text-yellow-400" />}
            >
              GitHub
            </CTA>
          </div>
          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <Card title="Download" icon={<Download className="h-5 w-5" />}>
              <div className="grid grid-cols-1 gap-2">
                <LinkBtn href="/download#windows">Windows (.exe)</LinkBtn>
                <LinkBtn href="/download#macos">macOS (.dmg)</LinkBtn>
                <LinkBtn href="/download#linux">Linux (.AppImage)</LinkBtn>
              </div>
              <p className="mt-3 text-sm text-text/70">
                Check the install guide for first-run permissions and network
                access.
              </p>
              <div className="mt-3">
                <SmallLink href="/docs/desktop/install">
                  Install guide
                </SmallLink>
              </div>
            </Card>
{/* 
            <Card title="Run & connect" icon={<Server className="h-5 w-5" />}>
              <ul className="text-sm space-y-2 text-text/80 list-disc pl-5">
                <li>
                  Launch the MEDfl app and choose <em>Server</em> or{" "}
                  <em>Client</em> mode.
                </li>
                <li>
                  Enter your server address (e.g.,{" "}
                  <code>100.65.215.27:8080</code>).
                </li>
                <li>
                  Pick your model type (NN/XGBoost), set rounds, and start.
                </li>
              </ul>
              <div className="mt-3">
                <SmallLink href="/docs/desktop/quickstart">
                  Desktop quickstart
                </SmallLink>
              </div>
            </Card> */}

           {/*  <Card
              title="Where to next?"
              icon={<BookOpen className="h-5 w-5" />}
            >
              <ul className="text-sm space-y-2 text-text/80 list-disc pl-5">
                <li>Configure Differential Privacy (NN only) with Opacus.</li>
                <li>Compare results across runs and export charts.</li>
                <li>Join us on GitHub for issues and feature requests.</li>
              </ul>
              <div className="mt-3 flex gap-2">
                <SmallLink href="/docs">Docs</SmallLink>
                <SmallLink href="https://github.com/medfl-org/medfl">
                  GitHub
                </SmallLink>
              </div>
            </Card> */}
          </div>
          </div>
               
        )}
      </div>
    </section>
  );
}

/* ------- UI helpers ------- */

function CTA({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="blank"
      className="inline-flex items-center gap-2 rounded-xl border border-foreground/15   bg-foreground/[0.06]   px-3 py-2 text-sm hover:bg-white/[0.1] transition"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm transition
      ${
        active
          ? "bg-secondary text-black font-medium"
          : "text-text hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-foreground/10  bg-foreground/[0.03]  p-4 md:p-5 md:pt-10">
      <div className="absolute left-5 top-3 rounded-full bg-red-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-9 top-3 rounded-full bg-green-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-13 top-3 rounded-full bg-yellow-400  w-3 h-3 text-xs"></div>
      <div className="flex items-center gap-2 text-sm text-text/70 my-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06]   border border-white/10">
          {icon}
        </div>
        <span className="uppercase tracking-wide">{title}</span>
      </div>
      {children}
    </div>
  );
}

function SmallLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg px-2 py-1 text-xs bg-foreground/[0.06]   border border-foreground/10 hover:bg-white/[0.1] transition"
    >
      {children}
    </Link>
  );
}

function LinkBtn({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm bg-white text-black hover:opacity-90 transition"
    >
      {children}
    </Link>
  );
}
