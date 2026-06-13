"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import {
  Target,
  Users,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  FileSignature,
  Type,
  Code,
  Database,
  BrainCircuit,
  CalendarClock,
  Mail,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const toolsDetailed = [
  {
    title: "PDF Editor",
    href: "/tools/pdf-editor",
    icon: FileSignature,
    color: "bg-pink-400",
    summary:
      "Annotate PDFs in the browser: add text, drop in images, and white out sensitive areas. Your file stays on your device for typical workflows, so you can work quickly without waiting on uploads.",
  },
  {
    title: "Tolly Humaniser",
    href: "/tools/humaniser",
    icon: Type,
    color: "bg-purple-400",
    summary:
      "When drafts sound obviously AI-generated, this tool rewrites them toward natural, readable prose. It keeps your facts intact while smoothing rhythm, vocabulary, and tone so the result fits blogs, essays, and professional writing.",
  },
  {
    title: "Regex Generator",
    href: "/tools/regex-generator",
    icon: Code,
    color: "bg-orange-400",
    summary:
      "Describe a match in English and get a regex, or paste a pattern and receive a structured explanation. Useful when you are learning, debugging, or do not want to memorize every escape sequence.",
  },
  {
    title: "SQL Query Generator",
    href: "/tools/sql-query-generator",
    icon: Database,
    color: "bg-emerald-400",
    summary:
      "State the report or filter you need in plain language and receive SQL you can paste into a client. The model assumes sensible table and column names when needed and defaults to PostgreSQL-style syntax unless you specify another engine.",
  },
  {
    title: "Context Passport",
    href: "https://github.com/iamshubham1704/passport.git",
    external: true,
    icon: BrainCircuit,
    color: "bg-yellow-400",
    summary:
      "A separate project: a browser extension idea built around saving, compressing, and moving AI chat context between tools. It is for people who live in multiple assistants and want less copy-paste friction.",
  },
  {
    title: "Mail-N-End",
    href: "https://mainn-end.vercel.app/",
    external: true,
    icon: Mail,
    color: "bg-blue-400",
    summary:
      "A specialized cold email outreach platform for staging and managing personalized campaigns. Import contacts, customize templates with variables, and track your overall sending performance and metrics.",
  },
  {
    title: "Time & Attendance Manager",
    href: "/tools",
    icon: CalendarClock,
    color: "bg-green-400",
    comingSoon: true,
    summary:
      "Planned for the roadmap: track hours, see patterns, and manage schedules with less spreadsheet pain. It is not live yet; watch the Tools page for updates.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#80808033_2px,transparent_2px),linear-gradient(to_bottom,#80808033_2px,transparent_2px)] bg-size-[60px_60px]" />
      <div className="absolute top-32 right-8 w-20 h-20 bg-yellow-400 rounded-full border-4 border-foreground -z-10" />
      <div className="absolute bottom-40 left-8 w-28 h-28 bg-pink-400 border-4 border-foreground rotate-6 -z-10" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-20 md:pt-16">
        <header className="text-center mb-20 md:mb-28">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-cyan-400 text-black px-5 py-2 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-sm mb-8"
          >
            <Sparkles size={18} strokeWidth={2.5} />
            The full picture
          </motion.div>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-foreground drop-shadow-[6px_6px_0px_rgba(244,114,182,1)] mb-8 leading-tight"
          >
            About TollyPips
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl font-bold text-foreground/85 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            TollyPips is a growing collection of practical tools and experiments in one place. This page explains what we
            build, why it exists, and how each piece fits together so you know exactly what you are using.
          </motion.p>
        </header>

        <article className="space-y-20 md:space-y-28">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="bg-white border-4 border-foreground rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.85)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-green-400 border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Target className="w-7 h-7 text-black" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-black">What TollyPips is</h2>
            </div>
            <div className="space-y-5 text-lg md:text-xl font-bold text-black/85 leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              <p>
                At its core, TollyPips is a <strong className="text-black">tool backpack</strong>: small, focused utilities
                you can open in a tab, use immediately, and leave without installing heavy software. We care about clarity,
                speed, and a visual language that feels intentional rather than generic.
              </p>
              <p>
                Some tools run entirely in your browser. Others call an AI model on the server to interpret text you send
                (for example, humanising copy or generating SQL). In every case, the goal is the same:{" "}
                <strong className="text-black">remove friction</strong> from repetitive or intimidating tasks so you can
                spend attention on decisions that actually need you.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="bg-yellow-300 border-4 border-foreground rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.85)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Users className="w-7 h-7 text-black" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-black">Who it is for</h2>
            </div>
            <ul className="space-y-4 text-lg md:text-xl font-bold text-black/85 leading-relaxed list-none" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              <li className="flex gap-3">
                <span className="text-black font-black shrink-0">Students</span>
                <span>— polish essays, experiment with regex and SQL for coursework, and edit PDF handouts without extra desktop apps.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-black font-black shrink-0">Professionals</span>
                <span>— draft and refine written material, prep data questions for analysts or your own queries, and handle PDF markups in a hurry.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-black font-black shrink-0">Builders &amp; curious folks</span>
                <span>— try ideas quickly: explain a pattern, sketch a query, or explore the Context Passport project if you live across many AI tabs.</span>
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-orange-400 border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="w-7 h-7 text-black" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-foreground">The toolbox, explained</h2>
            </div>
            <p className="text-lg md:text-xl font-bold text-foreground/85 mb-10 max-w-3xl leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Below is each current or upcoming offering with a bit more depth than the short blurbs on the home page. Follow a link to try the live tool when it is available.
            </p>
            <div className="space-y-6">
              {toolsDetailed.map((tool, i) => {
                const Inner = (
                  <div
                    className={`rounded-3xl border-4 border-foreground p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.85)] ${tool.color} flex flex-col md:flex-row md:items-start gap-6 transition-transform hover:-translate-y-0.5`}
                  >
                    <div className="w-16 h-16 shrink-0 bg-white border-4 border-foreground rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <tool.icon className="w-8 h-8 text-black" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-black">{tool.title}</h3>
                        {tool.comingSoon && (
                          <span className="text-xs font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-foreground rounded-full">
                            Coming soon
                          </span>
                        )}
                      </div>
                      <p className="text-base md:text-lg font-bold text-black/85 leading-relaxed mb-4" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                        {tool.summary}
                      </p>
                      <span className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-sm text-black border-b-4 border-black pb-0.5">
                        {tool.comingSoon ? "See tools list" : tool.external ? "Open project" : "Open tool"}
                        <ArrowRight size={16} strokeWidth={3} />
                      </span>
                    </div>
                  </div>
                );
                const key = tool.title;
                if ("external" in tool && tool.external) {
                  return (
                    <motion.a
                      key={key}
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.05 * i }}
                      className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 rounded-3xl"
                    >
                      {Inner}
                    </motion.a>
                  );
                }
                return (
                  <motion.div key={key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.05 * i }}>
                    <Link href={tool.href} className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 rounded-3xl">
                      {Inner}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-cyan-300 border-4 border-foreground rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.85)]">
              <div className="w-12 h-12 rounded-xl bg-white border-4 border-foreground flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-wider text-black mb-4">Speed and simplicity</h3>
              <p className="text-lg font-bold text-black/85 leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                Interfaces are deliberately loud and direct: fewer nested menus, more obvious actions. We want you to find
                the tool, do the job, and move on. That is why many flows skip account creation and keep copy-paste and
                export front and center.
              </p>
            </div>
            <div className="bg-purple-300 border-4 border-foreground rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.85)]">
              <div className="w-12 h-12 rounded-xl bg-white border-4 border-foreground flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Shield className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-wider text-black mb-4">Using AI responsibly</h3>
              <p className="text-lg font-bold text-black/85 leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                AI-assisted tools can hallucinate or misinterpret requests. Treat generated regex, SQL, and rewritten text
                as <strong className="text-black">starting points</strong>: review before production use, especially for
                security, compliance, or customer-facing systems. The PDF editor’s local-first design is one way we reduce
                unnecessary data movement for that class of task.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="bg-foreground text-background border-4 border-foreground rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(52,211,153,1)]"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-6 text-green-400">How this fits the rest of the site</h2>
            <p className="text-lg md:text-xl font-bold leading-relaxed text-white/90 mb-8" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              The home page introduces the vibe and the highlights. The{" "}
              <Link href="/how-it-works" className="underline decoration-4 underline-offset-4 decoration-pink-400 hover:text-pink-400 transition-colors">
                How it works
              </Link>{" "}
              page is the three-step rhythm: show up, pick a tool, use your output wherever you need. The{" "}
              <Link href="/tools" className="underline decoration-4 underline-offset-4 decoration-yellow-400 hover:text-yellow-300 transition-colors">
                Tools
              </Link>{" "}
              page is the catalog and launchpad. This About page is the longer answer when you want context before you dive in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 bg-green-400 text-black px-8 py-4 rounded-xl border-4 border-white font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:brightness-110 transition-all"
              >
                Browse tools
                <ArrowRight strokeWidth={3} size={20} />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl border-4 border-white font-black uppercase tracking-widest hover:bg-transparent hover:text-white transition-colors"
              >
                How it works
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border-4 border-white/50 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Back home
              </Link>
            </div>
          </motion.section>
        </article>
      </div>

      <Footer />
    </div>
  );
}
