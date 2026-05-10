import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Mail, MapPin, ArrowRight, Terminal, Zap, Database, Cloud, Shield, Activity, Cpu, GitBranch, Layers, Server, Globe, Clock, Award, BookOpen, Code, Box, Workflow, Radio, ChevronRight, X, Monitor, Smartphone } from "lucide-react";

// ─── Design Tokens ───
const palette = {
  bg: "#07080A",
  bgCard: "rgba(17,19,24,0.7)",
  bgCardHover: "rgba(22,25,32,0.85)",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(99,160,255,0.2)",
  blue: "#4F8EF7",
  blueGlow: "rgba(79,142,247,0.15)",
  purple: "#8B5CF6",
  purpleGlow: "rgba(139,92,246,0.12)",
  cyan: "#22D3EE",
  green: "#34D399",
  amber: "#FBBF24",
  text: "#E8ECF4",
  textMuted: "#8B95A8",
  textDim: "#505A6E",
};

const font = `'Space Grotesk', 'SF Pro Display', -apple-system, sans-serif`;
const fontMono = `'JetBrains Mono', 'Fira Code', monospace`;

// ─── Utility Components ───
const GlowLine = () => (
  <div style={{ width: "100%", height: 1, background: `linear-gradient(90deg, transparent, ${palette.blue}40, ${palette.purple}30, transparent)`, margin: "0 auto" }} />
);

const SectionLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, border: `1px solid ${palette.border}`, background: palette.blueGlow, marginBottom: 16, fontSize: 12, fontWeight: 500, color: palette.blue, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: fontMono }}
  >
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: palette.blue, boxShadow: `0 0 8px ${palette.blue}` }} />
    {children}
  </motion.div>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 48 }}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: palette.text, lineHeight: 1.15, margin: 0, fontFamily: font }}
    >
      {children}
    </motion.h2>
    {sub && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 16, color: palette.textMuted, marginTop: 12, maxWidth: 560, lineHeight: 1.6, fontFamily: font }}
      >
        {sub}
      </motion.p>
    )}
  </div>
);

const Container = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>
);

const Section = ({ children, id, style = {} }) => (
  <section id={id} style={{ padding: "100px 0", position: "relative", ...style }}>
    {children}
  </section>
);

// ─── Animated Counter ───
function AnimCounter({ end, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── Grid Background ───
const GridBG = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `linear-gradient(${palette.border} 1px, transparent 1px), linear-gradient(90deg, ${palette.border} 1px, transparent 1px)`,
      backgroundSize: "64px 64px",
      maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 70%)",
      WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 70%)",
      opacity: 0.5
    }} />
    <div style={{ position: "absolute", top: "10%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${palette.blueGlow}, transparent 70%)`, filter: "blur(80px)" }} />
    <div style={{ position: "absolute", top: "60%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${palette.purpleGlow}, transparent 70%)`, filter: "blur(80px)" }} />
  </div>
);

// ─── Nav ───
const navItems = [
  { label: "Impact", href: "#impact" },
  { label: "Experience", href: "#experience" },
  { label: "Architecture", href: "#architecture" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleNav = (href) => {
    const id = href.replace("#", "");
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 24px",
          background: scrolled || mobileOpen ? "rgba(7,8,10,0.92)" : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? `1px solid ${palette.border}` : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
          <button onClick={() => scrollTo("")} style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: palette.text, letterSpacing: -0.5, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <span style={{ color: palette.blue }}>ahmed</span>.magdy
          </button>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {navItems.map(n => (
              <button key={n.href} onClick={() => handleNav(n.href)} style={{ padding: "6px 14px", fontSize: 13, color: palette.textMuted, fontFamily: font, fontWeight: 500, borderRadius: 8, transition: "all 0.2s", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => { e.target.style.color = palette.text; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { e.target.style.color = palette.textMuted; e.target.style.background = "transparent"; }}
              >{n.label}</button>
            ))}
            <button onClick={() => handleNav("#contact")} style={{ marginLeft: 8, padding: "7px 18px", fontSize: 13, fontWeight: 600, color: "#fff", background: palette.blue, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: font, transition: "all 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
            >Let's Talk</button>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, color: palette.text }}>
            {mobileOpen ? <X size={22} /> : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="nav-mobile-menu"
              style={{ overflow: "hidden", borderTop: `1px solid ${palette.border}`, paddingBottom: 16 }}
            >
              {navItems.map(n => (
                <button key={n.href} onClick={() => handleNav(n.href)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", fontSize: 15, color: palette.textMuted, fontFamily: font, fontWeight: 500, background: "none", border: "none", cursor: "pointer", borderBottom: `1px solid ${palette.border}` }}>
                  {n.label}
                </button>
              ))}
              <button onClick={() => handleNav("#contact")} style={{ marginTop: 12, padding: "12px 24px", fontSize: 14, fontWeight: 600, color: "#fff", background: palette.blue, borderRadius: 10, border: "none", cursor: "pointer", fontFamily: font, width: "100%" }}>
                Let's Talk
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// ─── Hero ───
const heroMetrics = [
  { value: "7+", label: "Years Engineering" },
  { value: "3.2M+", label: "Records / Month" },
  { value: "47K+", label: "Concurrent WS" },
  { value: "99.99%", label: "Uptime SLA" },
];

const terminalLines = [
  { prompt: "~", cmd: "kubectl get pods -n production", delay: 0 },
  { prompt: "", cmd: "NAME                          READY   STATUS    RESTARTS", delay: 400 },
  { prompt: "", cmd: "booking-api-7d8f9c6b5-x2k4n   1/1     Running   0", delay: 600 },
  { prompt: "", cmd: "payment-saga-5c4d3b2a1-m8j7    1/1     Running   0", delay: 800 },
  { prompt: "", cmd: "notification-engine-9e8f7-q3w   1/1     Running   0", delay: 1000 },
  { prompt: "~", cmd: "echo '32 microservices healthy ✓'", delay: 1400 },
  { prompt: "", cmd: "32 microservices healthy ✓", delay: 1600 },
];

function HeroTerminal() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const timers = terminalLines.map((l, i) =>
      setTimeout(() => setVisible(i + 1), 1200 + l.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      style={{
        background: "rgba(12,14,18,0.9)", border: `1px solid ${palette.border}`, borderRadius: 14,
        padding: 0, fontFamily: fontMono, fontSize: 12.5, lineHeight: 1.7, maxWidth: 520, width: "100%",
        backdropFilter: "blur(20px)", overflow: "hidden",
        boxShadow: `0 0 60px ${palette.blueGlow}, 0 20px 60px rgba(0,0,0,0.5)`
      }}
    >
      <div style={{ padding: "10px 16px", borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <span style={{ color: palette.textDim, fontSize: 11, marginLeft: 8 }}>production-cluster</span>
      </div>
      <div style={{ padding: "14px 18px", minHeight: 160 }}>
        {terminalLines.slice(0, visible).map((l, i) => (
          <div key={i} style={{ color: l.prompt ? palette.textMuted : palette.textDim, display: "flex", gap: 8 }}>
            {l.prompt && <span style={{ color: palette.blue }}>❯</span>}
            <span style={{ color: l.prompt ? palette.text : (l.cmd.includes("Running") ? palette.green : l.cmd.includes("✓") ? palette.green : palette.textDim) }}>{l.cmd}</span>
          </div>
        ))}
        {visible < terminalLines.length && (
          <span style={{ display: "inline-block", width: 8, height: 16, background: palette.blue, animation: "blink 1s steps(2) infinite", verticalAlign: "middle" }} />
        )}
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", paddingTop: 80 }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, border: `1px solid ${palette.border}`, background: "rgba(52,211,153,0.06)", marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: palette.green, boxShadow: `0 0 10px ${palette.green}`, animation: "pulse 2s ease infinite" }} />
                <span style={{ fontSize: 12, color: palette.green, fontFamily: fontMono, fontWeight: 500 }}>Available for opportunities</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{ fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 800, lineHeight: 1.05, color: palette.text, margin: "0 0 10px", fontFamily: font, letterSpacing: -2 }}
            >
              Ahmed<br />
              <span style={{ background: `linear-gradient(135deg, ${palette.blue}, ${palette.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Magdy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: 18, fontWeight: 500, color: palette.textMuted, fontFamily: font, margin: "0 0 8px", letterSpacing: 0.5 }}
            >
              Senior Full-Stack Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ fontSize: 15, color: palette.textDim, fontFamily: font, margin: "0 0 36px", maxWidth: 440, lineHeight: 1.6 }}
            >
              Building scalable distributed systems that power millions of transactions across fintech, healthtech & enterprise SaaS.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <a onClick={(e) => { e.preventDefault(); scrollTo("impact"); }} href="#" style={{
                padding: "12px 24px", fontSize: 14, fontWeight: 600, color: "#fff", background: palette.blue,
                borderRadius: 10, textDecoration: "none", fontFamily: font, display: "inline-flex", alignItems: "center", gap: 8,
                boxShadow: `0 0 20px ${palette.blueGlow}`, transition: "all 0.2s", cursor: "pointer"
              }}>Explore Impact <ArrowRight size={15} /></a>
              <a onClick={(e) => { e.preventDefault(); scrollTo("architecture"); }} href="#" style={{
                padding: "12px 24px", fontSize: 14, fontWeight: 600, color: palette.text,
                background: "rgba(255,255,255,0.04)", border: `1px solid ${palette.border}`,
                borderRadius: 10, textDecoration: "none", fontFamily: font, display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.2s", cursor: "pointer"
              }}>View Architecture</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 56, borderTop: `1px solid ${palette.border}`, paddingTop: 28 }}
            >
              {heroMetrics.map((m, i) => (
                <div key={i} style={{ textAlign: i === 0 ? "left" : "center", borderLeft: i > 0 ? `1px solid ${palette.border}` : "none", paddingLeft: i > 0 ? 20 : 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: palette.text, fontFamily: font, letterSpacing: -1 }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: palette.textDim, fontFamily: fontMono, marginTop: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HeroTerminal />
          </div>
        </div>
      </Container>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}
      >
        <ChevronDown size={20} color={palette.textDim} />
      </motion.div>
    </section>
  );
}

// ─── Impact Metrics ───
const impactData = [
  { icon: <Zap size={20} />, value: 4200, suffix: "+", label: "Concurrent Booking Sessions", sub: "Sub-300ms p95 latency", color: palette.blue },
  { icon: <Activity size={20} />, value: 52000, suffix: "+", label: "Monthly Lab Orders", sub: "32-microservice platform", color: palette.cyan },
  { icon: <Cpu size={20} />, value: 108000, suffix: "+", label: "Daily Jobs Processed", sub: "99.97% completion rate", color: palette.purple },
  { icon: <Database size={20} />, value: 3200000, suffix: "+", label: "Monthly Financial Records", sub: "Zero data loss • 12 months", color: palette.amber },
  { icon: <Shield size={20} />, value: 99.98, suffix: "%", label: "System Reliability", sub: "Event-driven backbone", color: palette.green },
  { icon: <Server size={20} />, value: 65, suffix: "%", label: "Latency Reduction", sub: "Multi-layer caching", color: palette.blue },
  { icon: <GitBranch size={20} />, value: 95, suffix: "%", label: "Downtime Reduction", sub: "Blue/green + auto-rollback", color: palette.cyan },
  { icon: <Code size={20} />, value: 180, suffix: "K+ LOC", label: "Healthcare Platform", sub: "NestJS monorepo • 32 services", color: palette.purple },
];

function ImpactSection() {
  return (
    <Section id="impact">
      <Container>
        <SectionLabel>Engineering Impact</SectionLabel>
        <SectionTitle sub="Production metrics from systems I've designed, built, and operated at scale.">
          Numbers that<br />speak for themselves
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
          {impactData.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{
                padding: 28, borderRadius: 16, background: palette.bgCard, border: `1px solid ${palette.border}`,
                cursor: "default", transition: "all 0.3s ease", position: "relative", overflow: "hidden"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = d.color + "40"; e.currentTarget.style.background = palette.bgCardHover; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = palette.border; e.currentTarget.style.background = palette.bgCard; }}
            >
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: d.color, opacity: 0.03, filter: "blur(30px)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ color: d.color, opacity: 0.8 }}>{d.icon}</div>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: palette.text, fontFamily: font, letterSpacing: -1.5, marginBottom: 6 }}>
                {typeof d.value === "number" && d.value > 100 ? <AnimCounter end={d.value} suffix={d.suffix} /> : <>{d.value}{d.suffix}</>}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: palette.textMuted, fontFamily: font, marginBottom: 4 }}>{d.label}</div>
              <div style={{ fontSize: 12, color: palette.textDim, fontFamily: fontMono }}>{d.sub}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Experience Timeline ───
const experiences = [
  {
    company: "Globant",
    role: "Senior Backend Engineer",
    period: "Jan 2024 – May 2025",
    location: "Remote — LATAM, USA",
    color: palette.blue,
    highlights: [
      "Built booking engine from zero to production (~26K LOC, NestJS) — multi-tenant system sustaining 4,200+ concurrent sessions at sub-300ms p95 for a $1B+ entertainment mega-project",
      "Unified 5 external APIs into single transactional workflow via Saga pattern, eliminating ~$12K/month in orphaned-payment leaks",
      "Resolved critical race condition using Redis SETNX distributed locking — booking conflicts from ~340/week to zero",
      "10-stage GitLab CI/CD pipeline with SAST/DAST, 80%+ coverage, canary K8s deploys — zero failed releases across 94 deployments",
    ],
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Kubernetes", "GitLab CI", "Saga Pattern"],
  },
  {
    company: "PwC",
    role: "Senior Associate Full Stack Engineer",
    period: "Sep 2023 – Jan 2025",
    location: "Hybrid — Cairo, Egypt",
    color: palette.cyan,
    highlights: [
      "Single-handedly delivered backend API layer (47 endpoints, 18 entities) for 2,200+ daily consultants, replacing legacy PHP system",
      "PostgreSQL audit on 5.2M-row dataset — p95 query time from 8.4s to 1.2s (85% reduction)",
      "Real-time Salesforce CRM sync processing 14,000+ daily events at 99.97% success",
      "Introduced Terraform IaC (2,400+ lines) — environment setup from 2 days to 12 minutes",
    ],
    stack: ["NestJS", "PostgreSQL", "Salesforce", "Terraform", "GCP Cloud Run"],
  },
  {
    company: "FH Health",
    role: "Senior Full Stack Engineer",
    period: "Jun 2023 – Aug 2024",
    location: "Remote — Canada",
    color: palette.green,
    highlights: [
      "Owned 32-microservice healthcare platform (180K+ LOC) processing 52K+ monthly lab orders under PIPEDA/PHIPA — zero data breaches",
      "Saga-pattern coordination for lab-order-to-billing pipeline — 99.8% completion on 52K+ monthly transactions",
      "Delivered clinic portal for 2,200+ practitioners — check-in from 8 min to 90 seconds",
      "99.93% uptime over 14 months, personally resolved 6 P1 incidents at MTTR under 22 minutes",
    ],
    stack: ["NestJS", "React", "Next.js", "GCP", "Terraform", "Stripe", "MongoDB"],
  },
  {
    company: "Wellnite",
    role: "Senior Full Stack Engineer",
    period: "Nov 2021 – Oct 2022",
    location: "Remote — USA",
    color: palette.purple,
    highlights: [
      "Real-time therapy infrastructure: 47K+ daily concurrent WebSocket/WebRTC connections with 99.99% uptime",
      "Replaced fragile cron system with Redis/BullMQ engine — 108K+ daily jobs at 99.97% completion",
      "Resilient integration layer for 6 external platforms using adapter pattern with per-provider circuit breakers",
    ],
    stack: ["Node.js", "WebSocket", "WebRTC", "Redis", "BullMQ", "MongoDB", "GCP Vertex AI"],
  },
  {
    company: "Kuyua",
    role: "Senior Full Stack Engineer",
    period: "Dec 2020 – Nov 2021",
    location: "Remote — Hamburg, Germany",
    color: palette.amber,
    highlights: [
      "Led monolithic Django → NestJS migration via Strangler Fig pattern — 45% API improvement, 30% infra cost reduction, 3x feature velocity",
      "Restructured PostgreSQL for 1.1M+ ESG records — slowest query from 12.3s to 1.8s",
      "Automated ingestion of 520K+ monthly records from 8 APIs with anomaly detection and dedup",
    ],
    stack: ["NestJS", "PostgreSQL", "PgBouncer", "JSON Schema", "Strangler Fig"],
  },
  {
    company: "Binary Limited",
    role: "Senior Full Stack Engineer",
    period: "Jan 2019 – Dec 2020",
    location: "Remote — Hong Kong",
    color: palette.blue,
    highlights: [
      "Built FinTech bookkeeping SaaS from zero — 10,400+ active accounts, 108K+ monthly transactions, SOC 2 Type II compliant",
      "Event-driven microservices backbone (RabbitMQ + Kafka) processing 3.2M+ monthly financial records — zero data loss for 12 months",
      "Reduced platform downtime from 14 hours/month to under 45 minutes (95% reduction)",
    ],
    stack: ["NestJS", "RabbitMQ", "Kafka", "PostgreSQL", "Docker", "Prometheus", "Grafana"],
  },
];

function ExperienceTimeline() {
  const [expanded, setExpanded] = useState(null);
  return (
    <Section id="experience" style={{ background: "rgba(12,14,18,0.4)" }}>
      <Container>
        <SectionLabel>Career Path</SectionLabel>
        <SectionTitle sub="Seven years of designing, building, and operating production systems at scale across fintech, healthtech, enterprise SaaS, and e-commerce.">
          Experience
        </SectionTitle>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${palette.blue}40, ${palette.purple}20, transparent)` }} />
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ marginBottom: 24, position: "relative" }}
            >
              <div style={{ position: "absolute", left: -32, top: 24, width: 16, height: 16, borderRadius: "50%", border: `2px solid ${exp.color}`, background: palette.bg, zIndex: 2 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: exp.color, margin: 2, boxShadow: `0 0 8px ${exp.color}60` }} />
              </div>
              <div
                style={{
                  padding: "24px 28px", borderRadius: 16, background: palette.bgCard, border: `1px solid ${palette.border}`,
                  cursor: "pointer", transition: "all 0.3s"
                }}
                onClick={() => setExpanded(expanded === i ? null : i)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = exp.color + "30"; e.currentTarget.style.background = palette.bgCardHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = palette.border; e.currentTarget.style.background = palette.bgCard; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: palette.text, fontFamily: font }}>{exp.company}</div>
                    <div style={{ fontSize: 14, color: exp.color, fontFamily: font, fontWeight: 500, marginTop: 2 }}>{exp.role}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: palette.textMuted, fontFamily: fontMono }}>{exp.period}</div>
                    <div style={{ fontSize: 11, color: palette.textDim, fontFamily: fontMono, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 2 }}>
                      <MapPin size={10} /> {exp.location}
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${palette.border}` }}>
                        {exp.highlights.map((h, j) => (
                          <div key={j} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                            <ChevronRight size={14} style={{ marginTop: 3, flexShrink: 0, color: exp.color }} />
                            <span style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, fontFamily: font }}>{h}</span>
                          </div>
                        ))}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                          {exp.stack.map((s, j) => (
                            <span key={j} style={{ padding: "4px 10px", fontSize: 11, fontFamily: fontMono, color: palette.textMuted, background: "rgba(255,255,255,0.04)", border: `1px solid ${palette.border}`, borderRadius: 6 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: palette.textDim, fontFamily: fontMono }}>
                  {expanded === i ? "Click to collapse" : "Click to expand"} <ChevronDown size={12} style={{ transform: expanded === i ? "rotate(180deg)" : "rotate(0)", transition: "0.3s" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Architecture Section — SVG-based Animated Flow Diagrams ───

// Architecture node
function ArchNode({ label, icon, color, type = "service", delay = 0, sub }) {
  const bg = { client: "rgba(255,255,255,0.03)", service: color + "08", data: color + "06", external: "rgba(255,255,255,0.02)", queue: color + "0A", monitor: "rgba(255,255,255,0.02)" };
  const bdr = { client: palette.border, service: color + "30", data: color + "20", external: palette.border, queue: color + "25", monitor: palette.border };
  const ic = { client: <Monitor size={13} />, service: <Box size={13} />, data: <Database size={13} />, external: <Globe size={13} />, queue: <Layers size={13} />, monitor: <Activity size={13} /> };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      style={{ padding: "10px 16px", borderRadius: 10, background: bg[type], border: `1px solid ${bdr[type]}`, display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}
    >
      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: delay * 2 }} style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}80`, flexShrink: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: color + "90" }}>{icon || ic[type]}</span>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: palette.text, fontFamily: fontMono, whiteSpace: "nowrap" }}>{label}</span>
        </div>
        {sub && <span style={{ fontSize: 9.5, color: palette.textDim, fontFamily: fontMono }}>{sub}</span>}
      </div>
    </motion.div>
  );
}

// Horizontal SVG arrow
function HArrow({ color, w = 48, delay = 0 }) {
  return (
    <svg width={w} height="20" style={{ flexShrink: 0, display: "block", overflow: "visible" }}>
      <line x1="0" y1="10" x2={w} y2="10" stroke={color} strokeOpacity="0.2" strokeWidth="2" />
      <polygon points={`${w},10 ${w-6},6 ${w-6},14`} fill={color} opacity="0.45" />
      <circle r="3.5" cy="10" fill={color}>
        <animate attributeName="cx" from="0" to={w} dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// Vertical SVG arrow
function VArrow({ color, h = 36, delay = 0 }) {
  return (
    <svg width="20" height={h} style={{ flexShrink: 0, display: "block", overflow: "visible" }}>
      <line x1="10" y1="0" x2="10" y2={h} stroke={color} strokeOpacity="0.2" strokeWidth="2" />
      <polygon points={`10,${h} 6,${h-6} 14,${h-6}`} fill={color} opacity="0.45" />
      <circle r="3.5" cx="10" fill={color}>
        <animate attributeName="cy" from="0" to={h} dur="1s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="1s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// Row & Column helpers
function FlowRow({ children, gap = 0 }) {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap }}>{children}</div>;
}
function FlowCol({ children }) {
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{children}</div>;
}

// FanOut: measures actual child positions with refs, then draws SVG fork overlay
function FanOut({ items, color, delay = 0, gap = 24 }) {
  const containerRef = useRef(null);
  const childRefs = useRef([]);
  const [lines, setLines] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const positions = childRefs.current.map(el => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { cx: r.left + r.width / 2 - containerRect.left, top: r.top - containerRect.top };
      }).filter(Boolean);
      if (positions.length === items.length) {
        setLines({
          containerW: containerRect.width,
          parentCx: containerRect.width / 2,
          children: positions,
        });
      }
    };
    // measure after a short delay to let layout settle
    const t = setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, [items.length]);

  const forkH = 44;
  const stemEnd = 14;
  const barY = stemEnd;
  const branchEnd = forkH - 2;

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {/* SVG fork connector — absolute overlay matching container width */}
      {lines && (
        <svg
          width={lines.containerW}
          height={forkH}
          viewBox={`0 0 ${lines.containerW} ${forkH}`}
          style={{ display: "block", overflow: "visible" }}
        >
          {/* Stem down from parent center */}
          <line x1={lines.parentCx} y1="0" x2={lines.parentCx} y2={barY} stroke={color} strokeOpacity="0.2" strokeWidth="2" />
          {/* Horizontal bar */}
          <line
            x1={lines.children[0].cx}
            y1={barY}
            x2={lines.children[lines.children.length - 1].cx}
            y2={barY}
            stroke={color} strokeOpacity="0.15" strokeWidth="2"
          />
          {/* Branch to each child */}
          {lines.children.map((child, i) => {
            const cc = items[i].color || color;
            return (
              <g key={i}>
                <line x1={child.cx} y1={barY} x2={child.cx} y2={branchEnd} stroke={cc} strokeOpacity="0.2" strokeWidth="2" />
                <polygon points={`${child.cx},${branchEnd + 5} ${child.cx - 3.5},${branchEnd} ${child.cx + 3.5},${branchEnd}`} fill={cc} opacity="0.45" />
                <circle r="3" cx={child.cx} fill={cc}>
                  <animate attributeName="cy" from={barY} to={branchEnd + 3} dur="0.9s" begin={`${delay + i * 0.2}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="0.9s" begin={`${delay + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
          {/* Stem pulse */}
          <circle r="3" cx={lines.parentCx} fill={color}>
            <animate attributeName="cy" from="0" to={barY} dur="0.5s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="0.5s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        </svg>
      )}
      {/* Spacer when no lines yet */}
      {!lines && <div style={{ height: forkH }} />}
      {/* Child nodes */}
      <div style={{ display: "flex", justifyContent: "center", gap, flexWrap: "nowrap" }}>
        {items.map((item, i) => (
          <div key={i} ref={el => childRefs.current[i] = el} style={{ display: "flex", justifyContent: "center" }}>
            <ArchNode {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 1) Booking Engine Flow ───
function BookingEngineFlow() {
  const c = palette.blue;
  return (
    <FlowCol>
      <FlowRow>
        <ArchNode label="Client App" type="client" color={c} delay={0} sub="3 markets" />
        <HArrow color={c} delay={0} />
        <ArchNode label="API Gateway" type="service" color={c} delay={0.1} sub="Rate limit + Auth" />
        <HArrow color={c} delay={0.3} />
        <ArchNode label="Booking Service" type="service" color={c} delay={0.2} sub="26K LOC • NestJS" />
      </FlowRow>
      <VArrow color={c} delay={0.4} />
      <ArchNode label="Saga Orchestrator" type="service" color={c} delay={0.35} sub="Compensating txns" icon={<Workflow size={13} />} />
      <FanOut color={c} delay={0.5} items={[
        { label: "HyperPay", type: "external", color: palette.amber, delay: 0.6, sub: "Payment API", icon: <Zap size={13} /> },
        { label: "Magento", type: "external", color: palette.cyan, delay: 0.7, sub: "Inventory sync", icon: <Globe size={13} /> },
        { label: "Visit Planner", type: "external", color: palette.purple, delay: 0.8, sub: "Slot allocation", icon: <Globe size={13} /> },
      ]} />
      <VArrow color={c} delay={1} />
      <FlowRow>
        <ArchNode label="Redis Lock" type="data" color={palette.green} delay={0.9} sub="SETNX • Distributed" icon={<Shield size={13} />} />
        <HArrow color={palette.green} delay={1.1} />
        <ArchNode label="PostgreSQL" type="data" color={palette.green} delay={1} sub="Row-level versioning" />
        <HArrow color={palette.cyan} delay={1.3} />
        <ArchNode label="CDN Cache" type="data" color={palette.cyan} delay={1.1} sub="L3 • Edge" icon={<Cloud size={13} />} />
      </FlowRow>
    </FlowCol>
  );
}

// ─── 2) Event-Driven Financial Pipeline ───
function FinancialPipelineFlow() {
  const c = palette.purple;
  return (
    <FlowCol>
      <FlowRow gap={12}>
        <ArchNode label="Txn Service" type="service" color={c} delay={0} sub="Producer" />
        <ArchNode label="Reconciliation" type="service" color={c} delay={0.1} sub="Producer" />
        <ArchNode label="Audit Logger" type="service" color={c} delay={0.15} sub="Producer" />
      </FlowRow>
      <VArrow color={c} delay={0.3} />
      <FlowRow>
        <ArchNode label="RabbitMQ" type="queue" color={palette.amber} delay={0.3} sub="Quorum queues" icon={<Layers size={13} />} />
        <HArrow color={palette.amber} delay={0.5} w={56} />
        <ArchNode label="Kafka" type="queue" color={palette.cyan} delay={0.4} sub="Partitioned topics" icon={<Layers size={13} />} />
      </FlowRow>
      <VArrow color={c} delay={0.6} />
      <ArchNode label="Consumer Group" type="service" color={c} delay={0.55} sub="Idempotent • At-least-once" icon={<Cpu size={13} />} />
      <FanOut color={c} delay={0.7} gap={40} items={[
        { label: "PostgreSQL", type: "data", color: palette.green, delay: 0.8, sub: "3.2M+ records/mo" },
        { label: "Dead Letter Queue", type: "queue", color: "#EF4444", delay: 0.9, sub: "Failed → Retry", icon: <Radio size={13} /> },
      ]} />
      <VArrow color={palette.cyan} delay={1} />
      <FlowRow>
        <ArchNode label="Prometheus" type="monitor" color={palette.cyan} delay={1} sub="Metrics scrape" icon={<Activity size={13} />} />
        <HArrow color={palette.cyan} delay={1.2} />
        <ArchNode label="Grafana" type="monitor" color={palette.cyan} delay={1.1} sub="SLO dashboards" icon={<Monitor size={13} />} />
      </FlowRow>
    </FlowCol>
  );
}

// ─── 3) Real-Time Therapy Infrastructure ───
function TherapyInfraFlow() {
  const c = palette.cyan;
  return (
    <FlowCol>
      <FlowRow gap={12}>
        <ArchNode label="Web Client" type="client" color={c} delay={0} sub="React" icon={<Monitor size={13} />} />
        <ArchNode label="Mobile" type="client" color={c} delay={0.05} sub="iOS / Android" icon={<Smartphone size={13} />} />
      </FlowRow>
      <VArrow color={c} delay={0.2} />
      <ArchNode label="Load Balancer" type="service" color={c} delay={0.15} sub="Sticky sessions" icon={<Server size={13} />} />
      <VArrow color={c} delay={0.35} />
      <FlowRow>
        <ArchNode label="WS Gateway 1" type="service" color={c} delay={0.3} sub="Horizontal pod" />
        <HArrow color={c} delay={0.5} w={28} />
        <ArchNode label="WS Gateway 2" type="service" color={c} delay={0.35} sub="Horizontal pod" />
        <HArrow color={c} delay={0.6} w={28} />
        <ArchNode label="WS Gateway N" type="service" color={c} delay={0.4} sub="Auto-scaled" />
      </FlowRow>
      <VArrow color={c} delay={0.6} />
      <ArchNode label="Session Router" type="service" color={palette.purple} delay={0.55} sub="47K+ concurrent" icon={<Workflow size={13} />} />
      <FanOut color={palette.purple} delay={0.7} items={[
        { label: "Redis State", type: "data", color: palette.green, delay: 0.8, sub: "Session store" },
        { label: "WebRTC TURN", type: "external", color: palette.amber, delay: 0.85, sub: "Media relay", icon: <Radio size={13} /> },
        { label: "Heartbeat", type: "monitor", color: "#EF4444", delay: 0.9, sub: "Ping/pong", icon: <Activity size={13} /> },
      ]} />
    </FlowCol>
  );
}

// ─── 4) Healthcare Microservices ───
function HealthcarePlatformFlow() {
  const c = palette.green;
  return (
    <FlowCol>
      <FlowRow gap={12}>
        <ArchNode label="Clinic Portal" type="client" color={c} delay={0} sub="React + Next.js" icon={<Monitor size={13} />} />
        <ArchNode label="Patient App" type="client" color={c} delay={0.05} sub="2,200+ practitioners" icon={<Smartphone size={13} />} />
      </FlowRow>
      <VArrow color={c} delay={0.2} />
      <FlowRow>
        <ArchNode label="API Gateway" type="service" color={c} delay={0.15} sub="Auth + Rate limit" icon={<Shield size={13} />} />
        <HArrow color={c} delay={0.35} />
        <ArchNode label="Auth Service" type="service" color={c} delay={0.2} sub="PIPEDA/PHIPA" icon={<Shield size={13} />} />
      </FlowRow>
      <VArrow color={c} delay={0.4} />
      <ArchNode label="Saga Coordinator" type="service" color={palette.purple} delay={0.35} sub="7-step pipeline" icon={<Workflow size={13} />} />
      <FanOut color={palette.purple} delay={0.5} gap={14} items={[
        { label: "Lab Orders", type: "service", color: c, delay: 0.6, sub: "52K+/mo" },
        { label: "Billing", type: "service", color: palette.amber, delay: 0.7, sub: "Stripe • $2.1M/mo" },
        { label: "Appointments", type: "service", color: palette.cyan, delay: 0.8, sub: "18K+/mo" },
        { label: "Notifications", type: "service", color: palette.blue, delay: 0.9, sub: "Multi-channel" },
      ]} />
      <VArrow color={c} delay={1} />
      <FlowRow>
        <ArchNode label="Health Probes" type="monitor" color={palette.cyan} delay={1} sub="Circuit breakers" icon={<Activity size={13} />} />
        <HArrow color={palette.cyan} delay={1.2} />
        <ArchNode label="K8s Autoscaler" type="service" color={palette.cyan} delay={1.1} sub="Queue-depth pods" icon={<Server size={13} />} />
        <HArrow color={palette.cyan} delay={1.4} />
        <ArchNode label="Terraform" type="service" color={palette.cyan} delay={1.2} sub="GCP IaC" icon={<Cloud size={13} />} />
      </FlowRow>
    </FlowCol>
  );
}

// Architecture tab data
const archTabs = [
  { key: "booking", label: "Booking Engine", color: palette.blue, company: "Globant", desc: "Saga-orchestrated multi-tenant reservation system with distributed locking, multi-layer caching, and compensating transactions across 5 external APIs.", metric: "4,200+ concurrent • Sub-300ms p95", Component: BookingEngineFlow },
  { key: "finpipe", label: "Financial Pipeline", color: palette.purple, company: "Binary Ltd", desc: "RabbitMQ + Kafka backbone processing 3.2M+ monthly financial records with idempotent consumers, dead-letter routing, and exactly-once semantics.", metric: "3.2M+ records/mo • Zero data loss", Component: FinancialPipelineFlow },
  { key: "therapy", label: "Therapy Infra", color: palette.cyan, company: "Wellnite", desc: "Horizontally-scalable WebSocket/WebRTC gateway with sticky routing, heartbeat monitoring, and state-recovery reconnection.", metric: "47K+ concurrent WS • 99.99% uptime", Component: TherapyInfraFlow },
  { key: "health", label: "Healthcare Platform", color: palette.green, company: "FH Health", desc: "32-service NestJS monorepo with Saga coordination, circuit breakers, queue-depth autoscaling, and PIPEDA/PHIPA compliance.", metric: "52K+ orders/mo • 32 microservices", Component: HealthcarePlatformFlow },
];

function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = archTabs[activeTab];

  return (
    <Section id="architecture">
      <Container>
        <SectionLabel>System Design</SectionLabel>
        <SectionTitle sub="Production architectures I've designed and operated — animated to show how data flows through each system.">
          Architecture Showcase
        </SectionTitle>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32, flexWrap: "wrap" }}>
          {archTabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "8px 18px", fontSize: 13, fontWeight: 600,
                fontFamily: font, borderRadius: 10, cursor: "pointer",
                border: `1px solid ${activeTab === i ? tab.color + "50" : palette.border}`,
                background: activeTab === i ? tab.color + "12" : "rgba(255,255,255,0.02)",
                color: activeTab === i ? tab.color : palette.textMuted,
                transition: "all 0.25s",
                boxShadow: activeTab === i ? `0 0 16px ${tab.color}15` : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active diagram card */}
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            borderRadius: 20, background: palette.bgCard, border: `1px solid ${active.color}20`,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Layers size={18} color={active.color} />
                <span style={{ fontSize: 20, fontWeight: 700, color: palette.text, fontFamily: font }}>{active.label}</span>
                <span style={{ fontSize: 11, fontFamily: fontMono, color: active.color, padding: "2px 8px", background: active.color + "10", borderRadius: 6 }}>{active.company}</span>
              </div>
              <p style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, fontFamily: font, margin: 0, maxWidth: 600 }}>{active.desc}</p>
            </div>
            <div style={{ padding: "6px 14px", borderRadius: 8, background: active.color + "08", border: `1px solid ${active.color}15`, fontSize: 12, fontFamily: fontMono, color: active.color, whiteSpace: "nowrap" }}>
              {active.metric}
            </div>
          </div>

          {/* Flow diagram */}
          <div style={{ padding: "20px 20px 28px", overflowX: "auto" }}>
            <div style={{ minWidth: 520, display: "flex", justifyContent: "center" }}>
              <active.Component />
            </div>
          </div>

          {/* Legend */}
          <div style={{ padding: "12px 28px 16px", borderTop: `1px solid ${palette.border}`, display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { label: "Service", color: active.color },
              { label: "Data Store", color: palette.green },
              { label: "External API", color: palette.amber },
              { label: "Queue / Broker", color: palette.purple },
              { label: "Monitoring", color: palette.cyan },
            ].map((leg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontFamily: fontMono, color: palette.textDim }}>
                <span style={{ width: 7, height: 7, borderRadius: 3, background: leg.color, opacity: 0.6 }} />
                {leg.label}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontFamily: fontMono, color: palette.textDim, marginLeft: "auto" }}>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 12, height: 3, borderRadius: 2, background: active.color, display: "inline-block" }}
              />
              Animated data flow
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// ─── Projects Section ───
const projects = [
  {
    title: "Multi-Tenant Booking Engine",
    company: "Globant",
    problem: "Build revenue-critical reservation system for $1B+ entertainment project across 3 markets with zero tolerance for payment leaks.",
    scale: "4,200+ concurrent sessions • Sub-300ms p95 • 26K LOC",
    stack: ["NestJS", "PostgreSQL", "Redis", "Kubernetes", "Saga Pattern"],
    outcome: "Eliminated $12K/month in orphaned payments, zero booking conflicts from 340/week, zero failed releases across 94 deploys.",
    color: palette.blue,
  },
  {
    title: "Real-Time Therapy Platform",
    company: "Wellnite",
    problem: "Deliver reliable telehealth infrastructure for 47K+ simultaneous therapy sessions with sub-second reconnection guarantees.",
    scale: "47,000+ daily concurrent WS connections • 99.99% uptime",
    stack: ["WebSocket", "WebRTC", "Redis", "BullMQ", "Node.js"],
    outcome: "Replaced fragile cron losing 6,500 jobs/month. New engine: 108K+ daily jobs at 99.97% completion rate.",
    color: palette.purple,
  },
  {
    title: "Healthcare Microservices Platform",
    company: "FH Health",
    problem: "Architect a PIPEDA/PHIPA-compliant platform processing lab orders, appointments, and billing across 32 microservices.",
    scale: "52K+ monthly lab orders • $2.1M+ monthly Stripe billing • 180K+ LOC",
    stack: ["NestJS", "React", "Next.js", "GCP", "Terraform", "Stripe"],
    outcome: "99.93% uptime over 14 months, zero data breaches, clinic check-in reduced from 8 min to 90 seconds.",
    color: palette.green,
  },
  {
    title: "FinTech Accounting SaaS",
    company: "Binary Limited",
    problem: "Build ACID-compliant double-entry bookkeeping platform from zero with SOC 2 Type II auditability.",
    scale: "10,400+ active accounts • 3.2M+ monthly financial records",
    stack: ["NestJS", "RabbitMQ", "Kafka", "PostgreSQL", "Docker"],
    outcome: "Zero data loss across 12 months, 95% downtime reduction, SOC 2 auditors cited as exceeding compliance requirements.",
    color: palette.amber,
  },
  {
    title: "Salesforce CRM Sync Pipeline",
    company: "PwC",
    problem: "Replace 200+ person-hours/month of manual data reconciliation between enterprise platform and Salesforce CRM.",
    scale: "14,000+ daily events • 99.97% success rate",
    stack: ["NestJS", "Salesforce API", "PostgreSQL", "GCP", "Terraform"],
    outcome: "Eliminated manual reconciliation entirely. Idempotent upserts with conflict resolution and exponential backoff.",
    color: palette.cyan,
  },
  {
    title: "Real-Time Notification Engine",
    company: "CrossWorkers",
    problem: "Deliver 1.2M+ monthly events across 3 channels with exactly-once semantics and sub-800ms latency.",
    scale: "1.2M+ events/month • 3 channels • 99.95% reliability",
    stack: ["GCP Pub/Sub", "Firestore", "FCM", "Twilio", "SendGrid"],
    outcome: "Dead-letter retries, exactly-once delivery, 35% reduction in PostgreSQL read traffic via Redis caching strategy.",
    color: palette.blue,
  },
];

function ProjectsSection() {
  const [selected, setSelected] = useState(null);
  return (
    <Section id="projects" style={{ background: "rgba(12,14,18,0.4)" }}>
      <Container>
        <SectionLabel>Case Studies</SectionLabel>
        <SectionTitle sub="Deep dives into production systems I've designed, built, and shipped.">
          Featured Projects
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(i)}
              style={{
                padding: 24, borderRadius: 16, background: palette.bgCard, border: `1px solid ${palette.border}`,
                cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "40"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = palette.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontFamily: fontMono, color: p.color, padding: "3px 8px", background: p.color + "10", borderRadius: 6 }}>{p.company}</span>
                <ExternalLink size={14} color={palette.textDim} />
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: palette.text, fontFamily: font, marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, fontFamily: font, marginBottom: 16, flex: 1 }}>{p.problem}</div>
              <div style={{ fontSize: 12, color: palette.textDim, fontFamily: fontMono, marginBottom: 14, padding: "8px 12px", background: "rgba(0,0,0,0.2)", borderRadius: 8 }}>{p.scale}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.stack.map((s, j) => (
                  <span key={j} style={{ padding: "3px 8px", fontSize: 10, fontFamily: fontMono, color: palette.textDim, border: `1px solid ${palette.border}`, borderRadius: 5 }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: 600, width: "100%", background: "#0E1015", border: `1px solid ${palette.border}`, borderRadius: 20, padding: 36, position: "relative" }}
              >
                <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: palette.textMuted }}>
                  <X size={20} />
                </button>
                <span style={{ fontSize: 11, fontFamily: fontMono, color: projects[selected].color, padding: "3px 8px", background: projects[selected].color + "10", borderRadius: 6 }}>{projects[selected].company}</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: palette.text, fontFamily: font, marginTop: 12, marginBottom: 20 }}>{projects[selected].title}</h3>
                
                {[
                  { label: "Problem", value: projects[selected].problem },
                  { label: "Scale", value: projects[selected].scale },
                  { label: "Outcome", value: projects[selected].outcome },
                ].map((item, idx) => (
                  <div key={idx} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 10, fontFamily: fontMono, color: projects[selected].color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.7, fontFamily: font }}>{item.value}</div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 10, fontFamily: fontMono, color: projects[selected].color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Tech Stack</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {projects[selected].stack.map((s, j) => (
                      <span key={j} style={{ padding: "5px 12px", fontSize: 12, fontFamily: fontMono, color: palette.textMuted, background: "rgba(255,255,255,0.04)", border: `1px solid ${palette.border}`, borderRadius: 8 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}

// ─── Tech Stack ───
const stackCategories = [
  { name: "Backend & APIs", color: palette.blue, techs: ["Node.js", "NestJS", "Express", "TypeScript", "GraphQL", "REST", "WebSocket", "Saga", "CQRS", "Event-Driven"] },
  { name: "Frontend", color: palette.cyan, techs: ["React 18", "Next.js 14", "Redux", "Tailwind", "Material-UI", "SSR"] },
  { name: "Databases & Caching", color: palette.green, techs: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "DynamoDB", "Elasticsearch"] },
  { name: "Cloud & Infra", color: palette.purple, techs: ["AWS", "GCP", "Terraform", "Docker", "Kubernetes", "Helm", "GitOps"] },
  { name: "CI/CD & Quality", color: palette.amber, techs: ["GitLab CI", "GitHub Actions", "Semgrep", "Invicti", "Trivy", "Jest", "Cypress", "TDD"] },
  { name: "Messaging", color: palette.blue, techs: ["RabbitMQ", "Kafka", "BullMQ", "GCP Pub/Sub", "SQS"] },
  { name: "Observability", color: palette.cyan, techs: ["Prometheus", "Grafana", "OpenTelemetry", "Sentry", "PagerDuty"] },
  { name: "Security & IAM", color: palette.green, techs: ["OAuth2", "JWT", "Okta", "Auth0", "SCIM", "RBAC", "OWASP"] },
  { name: "AI Engineering", color: palette.purple, techs: ["Claude Code", "Cursor", "Copilot", "RAG Pipelines", "Agentic Workflows"] },
];

function StackSection() {
  return (
    <Section id="stack">
      <Container>
        <SectionLabel>Technical Arsenal</SectionLabel>
        <SectionTitle sub="Production-tested technologies across the full stack, from infrastructure to AI-assisted development.">
          Tech Stack
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {stackCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{ padding: 24, borderRadius: 16, background: palette.bgCard, border: `1px solid ${palette.border}`, transition: "all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = cat.color + "30"}
              onMouseLeave={e => e.currentTarget.style.borderColor = palette.border}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: cat.color, fontFamily: font, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 3, background: cat.color, opacity: 0.6 }} />
                {cat.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cat.techs.map((t, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.03 }}
                    style={{
                      padding: "6px 12px", fontSize: 12, fontFamily: fontMono, color: palette.textMuted,
                      background: "rgba(255,255,255,0.03)", border: `1px solid ${palette.border}`, borderRadius: 8,
                      transition: "all 0.2s", cursor: "default"
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = cat.color + "40"; e.target.style.color = palette.text; }}
                    onMouseLeave={e => { e.target.style.borderColor = palette.border; e.target.style.color = palette.textMuted; }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── AI Engineering Section ───
function AISection() {
  const aiLines = [
    { type: "comment", text: "// AI-augmented engineering workflow" },
    { type: "code", text: "const pipeline = new RAGPipeline({" },
    { type: "code", text: "  embeddings: 'text-embedding-3-large'," },
    { type: "code", text: "  vectorStore: new PGVector(pool)," },
    { type: "code", text: "  retriever: { topK: 5, threshold: 0.78 }," },
    { type: "code", text: "  llm: new Claude({ model: 'sonnet' })" },
    { type: "code", text: "});" },
    { type: "output", text: "→ Context-aware code review ready" },
  ];

  return (
    <Section id="ai" style={{ background: "rgba(12,14,18,0.4)" }}>
      <Container>
        <SectionLabel>AI Engineering</SectionLabel>
        <SectionTitle sub="Integrating AI-assisted development tools and building intelligent systems — from RAG pipelines to agentic workflows.">
          Modern AI-Aware Engineering
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
          <div>
            {[
              { icon: <Terminal size={18} />, title: "AI-Assisted Development", desc: "Claude Code, Cursor, and GitHub Copilot integrated into daily engineering workflow for accelerated feature delivery and intelligent code review." },
              { icon: <Workflow size={18} />, title: "RAG Pipelines", desc: "Production RAG implementations with vector stores, embedding optimization, and retrieval-augmented generation for context-aware applications." },
              { icon: <Cpu size={18} />, title: "Agentic Workflows", desc: "Designing and building autonomous agent systems with tool use, multi-step reasoning, and orchestrated LLM pipelines." },
              { icon: <Radio size={18} />, title: "LLM Integration", desc: "API integration with Claude, GPT, and open-source models for production AI features — testing, monitoring, and cost optimization." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: 20, borderRadius: 14, background: palette.bgCard, border: `1px solid ${palette.border}`,
                  marginBottom: 12, display: "flex", gap: 16, alignItems: "flex-start",
                  transition: "all 0.3s"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = palette.purple + "30"}
                onMouseLeave={e => e.currentTarget.style.borderColor = palette.border}
              >
                <div style={{ color: palette.purple, marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: palette.text, fontFamily: font, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, fontFamily: font }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              background: "rgba(12,14,18,0.9)", border: `1px solid ${palette.border}`, borderRadius: 14,
              overflow: "hidden", boxShadow: `0 0 40px ${palette.purpleGlow}`
            }}
          >
            <div style={{ padding: "10px 16px", borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
              </div>
              <span style={{ color: palette.textDim, fontSize: 11, fontFamily: fontMono }}>ai-pipeline.ts</span>
            </div>
            <div style={{ padding: "16px 20px", fontFamily: fontMono, fontSize: 12.5, lineHeight: 1.8 }}>
              {aiLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{ color: l.type === "comment" ? palette.textDim : l.type === "output" ? palette.green : palette.textMuted }}
                >
                  {l.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Certifications ───
const certs = [
  { issuer: "University of Alberta", title: "Software Design & Architecture Specialization", sub: "Architecture • SOA • OO Design • Design Patterns", icon: <BookOpen size={18} />, color: palette.blue },
  { issuer: "IBM", title: "RAG & Agentic AI Professional Certificate", sub: "RAG pipelines • Agentic workflows • Production AI", icon: <Cpu size={18} />, color: palette.purple },
  { issuer: "O'Reilly", title: "AWS Technical Essentials — Ultimate Program", sub: "Lambda • EC2 • S3 • API Gateway • Cloud Architecture", icon: <Cloud size={18} />, color: palette.amber },
  { issuer: "LinkedIn Learning", title: "Engineering Leadership Track", sub: "Leading without Authority • Emotional Intelligence • Collaboration", icon: <Award size={18} />, color: palette.green },
];

function CertsSection() {
  return (
    <Section id="certs">
      <Container>
        <SectionLabel>Certifications</SectionLabel>
        <SectionTitle sub="Continuous investment in architecture, AI engineering, and leadership.">
          Professional Development
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {certs.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: 24, borderRadius: 16, background: palette.bgCard, border: `1px solid ${palette.border}`,
                transition: "all 0.3s"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = c.color + "30"}
              onMouseLeave={e => e.currentTarget.style.borderColor = palette.border}
            >
              <div style={{ color: c.color, marginBottom: 14 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontFamily: fontMono, color: c.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{c.issuer}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: palette.text, fontFamily: font, marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: palette.textDim, fontFamily: fontMono, lineHeight: 1.5 }}>{c.sub}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Contact ───
function ContactSection() {
  return (
    <Section id="contact" style={{ background: "rgba(12,14,18,0.4)", paddingBottom: 60 }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto" }}>
          <SectionLabel>Get in Touch</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: palette.text, lineHeight: 1.1, margin: "0 0 16px", fontFamily: font, letterSpacing: -1.5 }}
          >
            Let's build systems<br />
            <span style={{ background: `linear-gradient(135deg, ${palette.blue}, ${palette.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>that scale.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 15, color: palette.textMuted, lineHeight: 1.7, fontFamily: font, marginBottom: 36 }}
          >
            Open to senior and staff-level opportunities worldwide. Remote-first, with a track record of shipping production systems across 4 time zones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}
          >
            <a href="mailto:ahmed.magdy.fullstack@gmail.com" style={{
              padding: "14px 28px", fontSize: 14, fontWeight: 600, color: "#fff", background: palette.blue,
              borderRadius: 12, textDecoration: "none", fontFamily: font, display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: `0 0 30px ${palette.blueGlow}`, transition: "all 0.2s"
            }}>
              <Mail size={16} /> Send Email
            </a>
            <a href="https://linkedin.com/in/amwadoud" target="_blank" rel="noopener" style={{
              padding: "14px 28px", fontSize: 14, fontWeight: 600, color: palette.text,
              background: "rgba(255,255,255,0.04)", border: `1px solid ${palette.border}`,
              borderRadius: 12, textDecoration: "none", fontFamily: font, display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.2s"
            }}>
              <ExternalLink size={16} /> LinkedIn
            </a>
          </motion.div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {[
              { icon: <MapPin size={14} />, text: "Cairo, Egypt" },
              { icon: <Globe size={14} />, text: "Remote Worldwide" },
              { icon: <Clock size={14} />, text: "UTC+2" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: palette.textDim, fontFamily: fontMono }}>
                {item.icon} {item.text}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{ padding: "24px 0", borderTop: `1px solid ${palette.border}` }}>
      <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: palette.textDim, fontFamily: fontMono }}>
          <span style={{ color: palette.blue }}>ahmed</span>.magdy © 2025
        </span>
        <span style={{ fontSize: 11, color: palette.textDim, fontFamily: fontMono }}>
          Engineered with precision
        </span>
      </Container>
    </footer>
  );
}

// ─── Main App ───
export default function Portfolio() {
  return (
    <div style={{ background: palette.bg, color: palette.text, fontFamily: font, minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${palette.bg}; }
        ::selection { background: ${palette.blue}40; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${palette.bg}; }
        ::-webkit-scrollbar-thumb { background: ${palette.border}; border-radius: 3px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        a:hover { opacity: 0.9; }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-toggle { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <GridBG />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <Hero />
        <GlowLine />
        <ImpactSection />
        <GlowLine />
        <ExperienceTimeline />
        <GlowLine />
        <ArchitectureSection />
        <GlowLine />
        <ProjectsSection />
        <GlowLine />
        <StackSection />
        <GlowLine />
        <AISection />
        <GlowLine />
        <CertsSection />
        <GlowLine />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}