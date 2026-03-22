import Head from "next/head";
import NavBar from "../components/NavBar";
import styles from "../styles/canvas.module.css";

type Pal = { fill: string; badge: string };

const PALETTE = {
  bg:    "#0f172a",
  devex: { fill: "#4f46e5", badge: "#818cf8" },   // indigo  — DevEx
  cicd:  { fill: "#d97706", badge: "#fbbf24" },   // amber   — CI/CD
  infra: { fill: "#0369a1", badge: "#38bdf8" },   // sky     — Infra
  sec:   { fill: "#166534", badge: "#4ade80" },   // green   — Security
  obs:   { fill: "#0f766e", badge: "#2dd4bf" },   // teal    — Observability
  gov:   { fill: "#be185d", badge: "#f472b6" },   // pink    — Governance
  data:  { fill: "#0891b2", badge: "#22d3ee" },   // cyan    — Data
  prod:  { fill: "#7c3aed", badge: "#a78bfa" },   // violet  — Products
  strat: { fill: "#334155", badge: "#94a3b8" },   // slate   — Strategy
};

const Tag = ({ label, color }: { label: string; color: string }) => (
  <span style={{ display:"inline-block", background:`${color}22`, color, border:`1px solid ${color}55`, borderRadius:4, fontSize:9.5, padding:"1px 6px", margin:"2px 2px 0 0", fontFamily:"monospace", fontWeight:700, whiteSpace:"nowrap" }}>{label}</span>
);

const Num = ({ n, color }: { n: string; color: string }) => (
  <div style={{ width:30, height:30, borderRadius:"50%", border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color, flexShrink:0, background:`${color}18`, fontFamily:"Inter, system-ui, sans-serif" }}>{n}</div>
);

const Divider = ({ label }: { label: string }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, margin:"6px 0" }}>
    <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }}/>
    <div style={{ fontSize:9.5, color:"#475569", fontWeight:700, letterSpacing:2, textTransform:"uppercase", whiteSpace:"nowrap" }}>{label}</div>
    <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }}/>
  </div>
);

type Domain = {
  num: string;
  pal: Pal;
  title: string;
  desc: string;
  items: string[];
  tools: string[];
  metrics: string[];
};

const DomainCard = ({ num, pal, title, desc, items, tools, metrics }: Domain) => (
  <div style={{ background:`${pal.fill}14`, border:`1.5px solid ${pal.fill}55`, borderRadius:10, padding:"12px 14px", display:"flex", flexDirection:"column", gap:8, height:"100%" }}>
    <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
      <Num n={num} color={pal.badge} />
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:800, fontSize:12.5, color:"#f1f5f9", fontFamily:"Inter, system-ui, sans-serif" }}>{title}</div>
        <div style={{ fontSize:10, color:"#94a3b8", marginTop:1, fontFamily:"Inter, system-ui, sans-serif", lineHeight:1.4 }}>{desc}</div>
      </div>
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:5, fontSize:10.5, color:"#cbd5e1", fontFamily:"Inter, system-ui, sans-serif" }}>
          <span style={{ color:pal.badge, marginTop:1, flexShrink:0 }}>›</span><span>{it}</span>
        </div>
      ))}
    </div>
    {tools.length > 0 && (
      <div style={{ display:"flex", flexWrap:"wrap" }}>
        {tools.map((t, i) => <Tag key={i} label={t} color={pal.badge} />)}
      </div>
    )}
    <div style={{ marginTop:"auto", paddingTop:8, borderTop:`1px solid ${pal.fill}33` }}>
      <div style={{ fontSize:9, color:pal.badge, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:4, fontFamily:"Inter, system-ui, sans-serif" }}>Key Metrics</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>
        {metrics.map((m, i) => (
          <span key={i} style={{ fontSize:9.5, background:`${pal.fill}22`, border:`1px solid ${pal.fill}44`, borderRadius:4, padding:"1px 6px", color:"#94a3b8", fontFamily:"Inter, system-ui, sans-serif" }}>{m}</span>
        ))}
      </div>
    </div>
  </div>
);

const DOMAINS: Domain[] = [
  {
    num: "1",
    pal: PALETTE.devex,
    title: "Developer Experience (DevEx)",
    desc: "Self-service, golden paths, and cognitive-load reduction for engineering teams",
    items: [
      "Self-Service Portal — Backstage, Port (service catalog)",
      "Golden Path Templates — scaffolding, ADR starters, repo init",
      "CLI Tooling — custom CLIs, scripts, inner-source tools",
      "Docs & Runbooks — Confluence, Notion, MkDocs, living docs",
      "Local Dev Setup — devcontainers, Nix, dotfiles standard",
      "IDE Plugins & Extensions — standardised config across org",
      "Onboarding Automation — day-0 to first merged PR",
      "Support & ChatOps — Slack bots, self-serve before ticket",
      "DORA Metrics & Developer Satisfaction Surveys",
    ],
    tools: ["Backstage", "Port", "devcontainer", "GitHub Codespaces", "MkDocs"],
    metrics: ["Onboarding → first PR (days)", "DORA lead time", "Portal adoption %", "P90 support response"],
  },
  {
    num: "2",
    pal: PALETTE.cicd,
    title: "CI/CD & Delivery",
    desc: "Pipeline engines, GitOps, release strategies, and multi-environment promotion",
    items: [
      "Pipeline Engine — GitHub Actions, GitLab CI, Jenkins",
      "Artifact Registry — ECR, Artifactory, GHCR",
      "GitOps — ArgoCD, Flux (single source of truth: Git)",
      "Release Strategy — blue/green, canary, progressive delivery",
      "Feature Flags — LaunchDarkly, Unleash (decouple deploy/release)",
      "Build Cache & Optimisation — layer caching, remote caches",
      "Smoke & Gate Tests in Pipeline — quality enforcement",
      "Multi-env Promotion — dev → stg → prod with approvals",
      "Deployment Frequency & Change Lead Time Metrics",
    ],
    tools: ["GitHub Actions", "GitLab CI", "ArgoCD", "Flux", "LaunchDarkly"],
    metrics: ["Deployment frequency", "Lead time for changes", "Change failure rate", "MTTR"],
  },
  {
    num: "3",
    pal: PALETTE.infra,
    title: "Infrastructure & Cloud",
    desc: "IaC, Kubernetes, service mesh, networking, FinOps, and DR strategy",
    items: [
      "IaC — Terraform, Pulumi, Crossplane (GitOps-native)",
      "Cloud Providers — AWS, GCP, Azure (multi-cloud aware)",
      "Kubernetes — EKS, GKE, AKS (standardise on one distro)",
      "Service Mesh — Istio, Linkerd (mTLS, traffic management)",
      "Networking — VPC, DNS, CDN, ingress controllers",
      "Storage — S3, GCS, PVs, NFS (lifecycle policies)",
      "Cost Management — FinOps, budgets, rightsizing, waste alerts",
      "DR & Multi-region Strategy — RTO/RPO definitions",
    ],
    tools: ["Terraform", "Crossplane", "EKS", "GKE", "Istio", "ArgoCD"],
    metrics: ["Infra cost/unit", "Provisioning lead time", "Cloud waste %", "DR RTO / RPO"],
  },
  {
    num: "4",
    pal: PALETTE.sec,
    title: "Security & Compliance",
    desc: "Secrets management, SAST/DAST, image scanning, policy as code, zero trust",
    items: [
      "Secrets Mgmt — Vault, AWS SSM, 1Password Connect",
      "SAST / DAST — Snyk, SonarQube, Semgrep",
      "Image Scanning — Trivy, Grype (block on critical CVEs)",
      "RBAC & IAM Policies — least-privilege, just-in-time access",
      "Policy as Code — OPA, Kyverno (enforce at admission)",
      "Audit Logging & Compliance — immutable logs, SOC2/ISO",
      "Zero Trust Networking — mTLS, no implicit trust",
      "CVE Patching Cycle & SLAs — critical ≤ 24 h, high ≤ 7 d",
    ],
    tools: ["Vault", "Trivy", "OPA", "Kyverno", "Snyk", "SonarQube"],
    metrics: ["MTTR security incidents", "Compliance score %", "CVE exposure window", "Critical CVEs unpatched"],
  },
  {
    num: "5",
    pal: PALETTE.obs,
    title: "Observability & Reliability",
    desc: "Metrics, logs, traces, alerting, SLOs, error budgets, and on-call hygiene",
    items: [
      "Metrics — Prometheus, Datadog, Victoria Metrics",
      "Logs — ELK, Loki, Splunk (structured JSON, correlation IDs)",
      "Traces — Jaeger, Tempo, OpenTelemetry (full stack tracing)",
      "Alerting & On-call — PagerDuty, Opsgenie (SLO-driven alerts)",
      "SLOs & Error Budgets — define before you monitor",
      "Dashboards — Grafana, Kibana (golden signals per service)",
      "MTTD / MTTR & Availability SLA Tracking",
    ],
    tools: ["Prometheus", "Grafana", "OpenTelemetry", "PagerDuty", "Loki", "Jaeger"],
    metrics: ["MTTD", "MTTR", "Availability SLA %", "On-call incidents / week"],
  },
  {
    num: "6",
    pal: PALETTE.gov,
    title: "Platform Governance",
    desc: "Paved roads, tech radar, ADRs, roadmap, deprecation, and team topology",
    items: [
      "Paved Roads & Standards — opinionated defaults with escape hatches",
      "Tech Radar & ADRs — adopt / trial / assess / hold decisions",
      "Platform Roadmap & OKRs — platform as product, quarterly review",
      "Deprecation & Migration Plans — sunset with support window",
      "SLA / SLO Definition — platform commits to internal customers",
      "Team Topology — platform team, enabling team, stream-aligned",
      "Platform NPS & Internal Adoption Rate surveys",
    ],
    tools: ["Backstage", "Confluence", "Linear", "Notion"],
    metrics: ["Platform NPS", "Internal adoption %", "Time-to-migrate", "OKR completion rate"],
  },
  {
    num: "7",
    pal: PALETTE.data,
    title: "Data & Databases",
    desc: "Managed DBs, migrations, backup, message queues, warehousing, and caching",
    items: [
      "Managed DBs — RDS, CloudSQL, Aurora (provider-managed ops)",
      "DB Migrations — Flyway, Liquibase (versioned, reviewed)",
      "Backup & Restore Strategy — tested restores, not just backups",
      "Message Queues — Kafka, SQS, NATS (async, durable, ordered)",
      "Data Lake & Warehousing — BigQuery, Databricks, S3 + Glue",
      "Cache Layer — Redis, Memcached (TTLs, eviction policies)",
      "DB Provisioning Time & Backup Coverage %",
    ],
    tools: ["PostgreSQL", "Redis", "Kafka", "RDS", "BigQuery", "Flyway"],
    metrics: ["DB provisioning time", "Backup coverage %", "RTO", "RPO"],
  },
  {
    num: "8",
    pal: PALETTE.prod,
    title: "Platform Products & APIs",
    desc: "API gateway, auth platform, internal SDKs, notification services, AI/ML infra",
    items: [
      "API Gateway — Kong, Apigee (rate limiting, auth, routing)",
      "Auth Platform — Auth0, Keycloak (SSO, OIDC, RBAC)",
      "Notification Service — email, push, SMS (Twilio, SendGrid)",
      "Internal SDKs & Libraries — versioned, published, documented",
      "Search Platform — Elasticsearch, OpenSearch",
      "AI / ML Platform — model serving infra, GPU scheduling",
      "API Uptime & Internal Product Adoption tracking",
    ],
    tools: ["Kong", "Auth0", "Keycloak", "Elasticsearch", "Twilio"],
    metrics: ["API uptime %", "SDK adoption", "Auth error rate", "API P99 latency"],
  },
];

const STRATEGY = [
  { label: "Treat Platform as a Product", desc: "Internal teams are customers. Deliver with a roadmap, NPS loop, and committed SLAs." },
  { label: "Enable Team Autonomy", desc: "Reduce cross-team dependencies. Let stream-aligned teams ship without platform bottlenecks." },
  { label: "Reduce Cognitive Load", desc: "Golden paths over options. Paved roads with guardrails, not walls around engineers." },
  { label: "Shift Left on Security", desc: "Security at dev time, not after. Policy as code, not security tickets." },
  { label: "Standardise & Automate", desc: "If done twice, automate it. Standards over conventions-by-accident." },
  { label: "Measure Everything (DORA)", desc: "DORA metrics as north star. Evidence-based platform decisions, not gut feel." },
  { label: "Inner Source", desc: "Treat internal tooling like open source. PRs, docs, changelogs, semantic versioning." },
];

const OVERVIEW = [
  ...DOMAINS.map(d => ({ num: d.num, color: d.pal.badge, title: d.title })),
  { num: "9", color: PALETTE.strat.badge, title: "Platform Vision & Strategy" },
];

export default function Platform() {
  return (
    <div style={{ background: PALETTE.bg, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Platform Engineering Canvas — raphaelmoraes.dev</title>
      </Head>

      <NavBar />

      <div style={{ padding: "60px 18px 60px" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#818cf8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>DEVELOPED BY RAPHAEL MORAES</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#f1f5f9", margin: 0 }}>Platform Engineering Canvas</h1>
          <p style={{ fontSize: 11, color: "#64748b", marginTop: 4, maxWidth: 600, margin: "6px auto 0" }}>A structured reference for everything a platform team owns — DevEx, CI/CD, infrastructure, security, observability, governance, data, products & strategy · v1.0</p>
        </div>

        {/* Overview */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px", marginBottom: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Nine Domains — Complete platform team scope</div>
          <div className={styles.grid3} style={{ gap: 10 }}>
            {OVERVIEW.map((d) => (
              <div key={d.num} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${d.color}22`, border: `1.5px solid ${d.color}88`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: d.color, flexShrink: 0 }}>{d.num}</div>
                <span style={{ fontWeight: 700, fontSize: 11.5, color: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>{d.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 1 — DevEx, CI/CD, Infra, Security */}
        <Divider label="Engineering Domains" />
        <div className={styles.grid4} style={{ gap: 8, marginBottom: 8, alignItems: "stretch" }}>
          {DOMAINS.slice(0, 4).map((d) => <DomainCard key={d.num} {...d} />)}
        </div>

        {/* Row 2 — Observability, Governance, Data, Products */}
        <div className={styles.grid4} style={{ gap: 8, marginBottom: 18, alignItems: "stretch" }}>
          {DOMAINS.slice(4, 8).map((d) => <DomainCard key={d.num} {...d} />)}
        </div>

        {/* Strategy — full width */}
        <Divider label="Platform Vision & Strategy" />
        <div style={{ background: `${PALETTE.strat.fill}18`, border: `1.5px solid ${PALETTE.strat.fill}55`, borderRadius: 10, padding: "14px 20px", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Num n="9" color={PALETTE.strat.badge} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>Platform Vision & Strategy</div>
              <div style={{ fontSize: 10.5, color: "#94a3b8", fontFamily: "Inter, system-ui, sans-serif", marginTop: 2 }}>Foundational principles that run across every domain — the &ldquo;why&rdquo; behind every platform decision</div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {STRATEGY.map((p, i) => (
              <div key={i} style={{ flex: "1 1 200px", background: `${PALETTE.strat.fill}22`, border: `1px solid ${PALETTE.strat.fill}44`, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: PALETTE.strat.badge, marginBottom: 4, fontFamily: "Inter, system-ui, sans-serif" }}>{p.label}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.5, fontFamily: "Inter, system-ui, sans-serif" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 10, color: "#334155" }}>
          raphaelmoraes.dev · Platform Engineering Canvas v1.0 · 2026
        </div>

      </div>
    </div>
  );
}
