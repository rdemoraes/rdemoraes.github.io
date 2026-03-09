const PALETTE = {
  bg:    "#1e1b4b",
  col1:  { fill: "#4f46e5", badge: "#818cf8" },
  col2:  { fill: "#0891b2", badge: "#22d3ee" },
  col3:  { fill: "#7c3aed", badge: "#a78bfa" },
  col5a: { fill: "#0369a1", badge: "#38bdf8" },
  col5b: { fill: "#be185d", badge: "#f472b6" },
  gw:    { fill: "#b45309", badge: "#fcd34d" },
  std:   { fill: "#d97706", badge: "#fbbf24" },
  obs:   { fill: "#0f766e", badge: "#2dd4bf" },
};

const LAYERS = [
  { num: "1", color: "#818cf8", title: "Client Layer", desc: "How you interact with AI — the tools, IDE, and configuration that shape every session. This is where Rules and Skills are defined and where Claude Code runs." },
  { num: "2", color: "#fbbf24", title: "Standards & Frameworks Layer", desc: "How you build everything — MCP servers, agents, security controls, and input/output contracts. Defines the engineering standards that govern every artifact you produce." },
  { num: "3", color: "#fcd34d", title: "AI Gateway Layer", desc: "The runtime control plane — routes LLM calls, proxies MCP servers, publishes agents as endpoints, and enforces budget and rate controls. Powered by LiteLLM." },
  { num: "4", color: "#2dd4bf", title: "Observability Layer", desc: "Full visibility across every layer — traces, logs, metrics, and LLM evaluation. Built on OpenTelemetry and Arize Phoenix. Nothing runs as a black box." },
];

const TOOLS = [
  { category: "AI Model", name: "Claude Code", url: "https://claude.ai/code" },
  { category: "AI Model", name: "Claude Desktop", url: "https://claude.ai/download" },
  { category: "IDE", name: "VSCode", url: "https://code.visualstudio.com" },
  { category: "Configuration", name: "CLAUDE.md Reference", url: "https://docs.anthropic.com/en/docs/claude-code/memory" },
  { category: "MCP Framework", name: "FastMCP", url: "https://github.com/jlowin/fastmcp" },
  { category: "Package Mgmt", name: "Poetry", url: "https://python-poetry.org" },
  { category: "Testing", name: "Pytest", url: "https://docs.pytest.org" },
  { category: "Linting", name: "Megalinter", url: "https://megalinter.io" },
  { category: "Security Scan", name: "Trivy", url: "https://trivy.dev" },
  { category: "Security", name: "OWASP MCP Top 10", url: "https://owasp.org/www-project-mcp-top-10" },
  { category: "Secrets", name: "1Password Connect", url: "https://developer.1password.com/docs/connect" },
  { category: "Orchestration", name: "LangGraph", url: "https://github.com/langchain-ai/langgraph" },
  { category: "Agent Framework", name: "CrewAI", url: "https://crewai.com" },
  { category: "Database", name: "PostgreSQL + pgvector", url: "https://github.com/pgvector/pgvector" },
  { category: "Containers", name: "Chainguard Images", url: "https://chainguard.dev" },
  { category: "Containers", name: "Docker Hardened Images", url: "https://hub.docker.com/search?q=&type=image&image_filter=official" },
  { category: "AI Gateway", name: "LiteLLM", url: "https://litellm.ai" },
  { category: "Observability", name: "Arize Phoenix", url: "https://phoenix.arize.com" },
  { category: "Observability", name: "OpenTelemetry", url: "https://opentelemetry.io" },
  { category: "Agent — Investigator", name: "HolmesGPT", url: "https://holmesgpt.dev" },
  { category: "Agent — Coder", name: "Claude Code CLI", url: "https://docs.anthropic.com/en/docs/claude-code" },
  { category: "Agent — Reviewer", name: "PR-Agent (Qodo)", url: "https://github.com/qodo-ai/pr-agent" },
  { category: "Agent — Security", name: "Metis (Arm)", url: "https://github.com/arm/metis" },
  { category: "Agent — CI Coder", name: "GitLab Duo", url: "https://about.gitlab.com/gitlab-duo" },
  { category: "Agent — CI Coder", name: "GitHub Copilot", url: "https://github.com/features/copilot" },
  { category: "MCP — Orchestration", name: "Prefect", url: "https://prefect.io" },
  { category: "MCP — Data", name: "Databricks", url: "https://databricks.com" },
  { category: "MCP — GitOps", name: "ArgoCD MCP", url: "https://argo-cd.readthedocs.io" },
  { category: "MCP — Infra", name: "Kubernetes EKS/GKE", url: "https://kubernetes.io" },
];

const DEP_STYLES = {
  Rules:       { bg: "#dc262618", border: "#dc262666", color: "#fca5a5", label: "Depends on: Claude Rules" },
  Skills:      { bg: "#16a34a18", border: "#16a34a66", color: "#86efac", label: "Depends on: Claude Skills" },
  Local:       { bg: "#71717a18", border: "#71717a66", color: "#d4d4d8", label: "Depends on: Local Setup" },
  LocalRemote: { bg: "#92400e18", border: "#92400e66", color: "#fcd34d", label: "Depends on: Local & Remote Infrastructure" },
};

const DepBadge = ({ type }) => {
  const s = DEP_STYLES[type];
  return <span style={{ display:"inline-flex", alignItems:"center", background:s.bg, border:`1px solid ${s.border}`, borderRadius:4, fontSize:8.5, padding:"2px 7px", color:s.color, fontWeight:700, letterSpacing:0.3, whiteSpace:"nowrap" }}>{s.label}</span>;
};

const PSBadge = () => (
  <span style={{ display:"inline-flex", alignItems:"center", background:"linear-gradient(90deg, #7c3aed44, #4f46e544)", border:"1px solid #818cf8aa", borderRadius:4, fontSize:8.5, padding:"1px 6px", whiteSpace:"nowrap", color:"#c4b5fd", fontWeight:800, letterSpacing:0.5, textTransform:"uppercase", flexShrink:0 }}>★ Personal Standard</span>
);

const Tag = ({ label, color }) => (
  <span style={{ display:"inline-block", background:`${color}22`, color, border:`1px solid ${color}55`, borderRadius:4, fontSize:9.5, padding:"1px 6px", margin:"2px 2px 0 0", fontFamily:"monospace", fontWeight:700, whiteSpace:"nowrap" }}>{label}</span>
);

const Num = ({ n, color }) => (
  <div style={{ width:30, height:30, borderRadius:"50%", border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color, flexShrink:0, background:`${color}18`, fontFamily:"Inter, system-ui, sans-serif" }}>{n}</div>
);

const Cell = ({ num, title, sub, items=[], tags=[], pal, style={}, isStandard=false, deps=[] }) => (
  <div style={{ background:isStandard?`${pal.fill}28`:`${pal.fill}18`, border:isStandard?`2px solid ${pal.fill}99`:`1.5px solid ${pal.fill}55`, borderRadius:10, padding:"12px 14px", display:"flex", flexDirection:"column", gap:7, boxShadow:isStandard?`0 0 12px ${pal.fill}33`:"none", ...style }}>
    <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
      <Num n={num} color={pal.badge} />
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
          <span style={{ fontWeight:800, fontSize:12.5, color:"#f1f5f9", fontFamily:"Inter, system-ui, sans-serif" }}>{title}</span>
          {isStandard && <PSBadge />}
        </div>
        {sub && <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"Inter, system-ui, sans-serif", marginTop:1 }}>{sub}</div>}
      </div>
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
      {items.map((it,i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:5, fontSize:11, color:"#cbd5e1", fontFamily:"Inter, system-ui, sans-serif" }}>
          <span style={{ color:pal.badge, marginTop:1, flexShrink:0 }}>›</span><span>{it}</span>
        </div>
      ))}
    </div>
    {tags.length>0 && <div style={{ display:"flex", flexWrap:"wrap" }}>{tags.map((t,i)=><Tag key={i} label={t} color={pal.badge}/>)}</div>}
    {deps.length>0 && <div style={{ marginTop:"auto", paddingTop:4, display:"flex", flexWrap:"wrap", gap:4 }}>{deps.map((d,i)=><DepBadge key={i} type={d}/>)}</div>}
  </div>
);

const BandCell = ({ title, sub, items=[], tags=[], pal, isStandard=false, deps=[] }) => (
  <div style={{ background:isStandard?`${pal.fill}30`:`${pal.fill}25`, border:isStandard?`2px solid ${pal.fill}88`:`1px solid ${pal.fill}44`, borderRadius:8, padding:"10px 12px", display:"flex", flexDirection:"column", gap:6, boxShadow:isStandard?`0 0 10px ${pal.fill}33`:"none" }}>
    <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
      <span style={{ fontWeight:700, fontSize:11.5, color:pal.badge, fontFamily:"Inter, system-ui, sans-serif" }}>{title}</span>
      {isStandard && <PSBadge />}
    </div>
    {sub && <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"Inter, system-ui, sans-serif" }}>{sub}</div>}
    <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
      {items.map((it,i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:4, fontSize:10.5, color:"#cbd5e1", fontFamily:"Inter, system-ui, sans-serif" }}>
          <span style={{ color:pal.badge, flexShrink:0, marginTop:1 }}>›</span><span>{it}</span>
        </div>
      ))}
    </div>
    {tags.length>0 && <div style={{ display:"flex", flexWrap:"wrap", marginTop:2 }}>{tags.map((t,i)=><Tag key={i} label={t} color={pal.badge}/>)}</div>}
    {deps.length>0 && <div style={{ marginTop:"auto", paddingTop:4, display:"flex", flexWrap:"wrap", gap:4 }}>{deps.map((d,i)=><DepBadge key={i} type={d}/>)}</div>}
  </div>
);

const Divider = ({ label }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, margin:"6px 0" }}>
    <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }}/>
    <div style={{ fontSize:9.5, color:"#475569", fontWeight:700, letterSpacing:2, textTransform:"uppercase", whiteSpace:"nowrap" }}>{label}</div>
    <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }}/>
  </div>
);

export default function Canvas() {
  return (
    <div style={{ background:PALETTE.bg, minHeight:"100vh", padding:"22px 18px", fontFamily:"Inter, system-ui, sans-serif" }}>

      {/* Title */}
      <div style={{ textAlign:"center", marginBottom:18 }}>
        <div style={{ fontSize:10, fontWeight:700, color:"#818cf8", letterSpacing:3, textTransform:"uppercase", marginBottom:4 }}>DEVELOPED BY RAPHAELMORAES.DEV</div>
        <h1 style={{ fontSize:22, fontWeight:900, color:"#f1f5f9", margin:0 }}>GenAI Technology Stack Setup Canvas</h1>
        <p style={{ fontSize:11, color:"#64748b", marginTop:4 }}>Opinionated, layered AI-native engineering stack for Vibe Coders · v1.0</p>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:8, flexWrap:"wrap", justifyContent:"center" }}>
          {[
            { key:"ps", bg:"#7c3aed22", border:"#818cf855", color:"#c4b5fd", label:"★ Personal Standard", desc:"Raphael's opinionated default" },
            { key:"rules", ...DEP_STYLES.Rules, desc:"governs AI behavior" },
            { key:"skills", ...DEP_STYLES.Skills, desc:"enables AI capabilities" },
            { key:"local", ...DEP_STYLES.Local, desc:"runs on your machine" },
            { key:"lr", ...DEP_STYLES.LocalRemote, desc:"local + calls remote APIs" },
          ].map(({ key, bg, border, color, label, desc }) => (
            <div key={key} style={{ display:"inline-flex", alignItems:"center", gap:5, background:bg, border:`1px solid ${border}`, borderRadius:6, padding:"3px 10px" }}>
              <span style={{ fontSize:10, color, fontWeight:700 }}>{label}</span>
              <span style={{ fontSize:10, color:"#64748b" }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PILLARS OVERVIEW */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"16px 20px", marginBottom:18 }}>
        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Architecture Overview — Four Layers</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10 }}>
          {LAYERS.map((l) => (
            <div key={l.num} style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:`${l.color}22`, border:`1.5px solid ${l.color}88`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:l.color, flexShrink:0 }}>{l.num}</div>
                <span style={{ fontWeight:700, fontSize:12, color:"#f1f5f9", fontFamily:"Inter, system-ui, sans-serif" }}>{l.title}</span>
              </div>
              <p style={{ fontSize:10.5, color:"#94a3b8", margin:0, lineHeight:1.6, fontFamily:"Inter, system-ui, sans-serif" }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 1 — Client Layer */}
      <Divider label="Client Layer" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:8 }}>
        <Cell num="1" title="AI Model Tool" sub="Core AI interfaces" pal={PALETTE.col1} isStandard deps={["Local","LocalRemote"]}
          items={["Claude Desktop — GUI, MCP manager","Claude Code CLI — agentic terminal","Model selection strategy","API key & token budget management"]}
          tags={["claude-sonnet-4-6","claude-opus-4-6","Claude Code"]}
        />
        <Cell num="2" title="IDE Setup" sub="VSCode AI-native config" pal={PALETTE.col2} isStandard deps={["Local"]}
          items={["Claude Code for VSCode ext.","Claude Code Assistant ext.","settings.json AI config","Devcontainer + Docker","Keybindings & format on save"]}
          tags={["VSCode","devcontainer","Pylance","Ruff"]}
        />
        <Cell num="3" title="Configuration Layer" sub="AI behavior, context & workflows" pal={PALETTE.col3} deps={["Rules","Local"]}
          items={["Global Rules — coding standards, safety, output format","Skills — slash commands, task recipes, domain capabilities","Prompts & Context — CLAUDE.md, templates, memory injection","Workflows — agentic chains, CI/CD prompt pipelines, auto-review","Hooks — PreToolUse, PostToolUse, Notification callbacks"]}
          tags={["CLAUDE.md","/review","/fix","/test","PreToolUse","PostToolUse"]}
        />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8, alignItems:"stretch" }}>
        <div style={{ background:`${PALETTE.col5a.fill}18`, border:`1.5px solid ${PALETTE.col5a.fill}55`, borderRadius:10, padding:"12px 14px", display:"flex", flexDirection:"column", gap:8, height:"100%" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <Num n="4" color={PALETTE.col5a.badge} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:12.5, color:"#f1f5f9", fontFamily:"Inter, system-ui, sans-serif" }}>MCP Servers</div>
              <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"Inter, system-ui, sans-serif", marginTop:1 }}>Data sources & tools · registered via settings.json → AI Gateway</div>
            </div>
            <Tag label="settings.json" color={PALETTE.col5a.badge} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, flex:1 }}>
            <BandCell pal={PALETTE.col5a} deps={["Local"]} title="Local MCP Servers" sub="Docker Compose · localhost SSE"
              items={["Filesystem — local codebase access","Docker — container management","Devcontainer tooling","Custom internal scripts & tools"]}
              tags={["localhost","Docker Compose","SSE"]}
            />
            <BandCell pal={PALETTE.col5a} deps={["LocalRemote"]} title="Remote MCP Servers" sub="Deployed to shared infra · EKS/GKE"
              items={["Prefect — flows, scheduling, Hasura","GitLab CI — pipelines, job logs","Kubernetes EKS/GKE — pods, image pulls","ArgoCD — GitOps deployments & sync status","Slack · Jira · Notion · Sentry","Databricks — data engineering, ML jobs"]}
              tags={["EKS","GKE","Prefect","GitLab","ArgoCD","Slack","Databricks"]}
            />
          </div>
        </div>
        <div style={{ background:`${PALETTE.col5b.fill}18`, border:`1.5px solid ${PALETTE.col5b.fill}55`, borderRadius:10, padding:"12px 14px", display:"flex", flexDirection:"column", gap:8, height:"100%" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <Num n="5" color={PALETTE.col5b.badge} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                <span style={{ fontWeight:800, fontSize:12.5, color:"#f1f5f9", fontFamily:"Inter, system-ui, sans-serif" }}>Agents</span>
                <PSBadge />
              </div>
              <div style={{ fontSize:10, color:"#94a3b8", fontFamily:"Inter, system-ui, sans-serif", marginTop:1 }}>Agentic use cases — specialist tools per role</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, flex:1 }}>
            <BandCell pal={PALETTE.col5b} deps={["Skills","Local"]} title="Local Agents" sub="On-demand or auto-triggered via Claude Code Hooks"
              items={["Coder & Investigator — Claude Code — feature, refactor, TDD, CLI troubleshooting","Reviewer — PR-Agent — PostToolUse Hook on git push","Security — Metis (Arm) — PreToolUse Hook, deep security review","All route through LiteLLM AI Gateway"]}
              tags={["Claude Code","PR-Agent","Metis","PostToolUse","PreToolUse"]}
            />
            <BandCell pal={PALETTE.col5b} deps={["Skills","LocalRemote"]} title="Remote Agents" sub="CI/CD or shared infra · triggered automatically"
              items={["Investigator — HolmesGPT (CNCF) — RCA, K8s debug","Coder — GitLab Duo (GitLab CI) + GitHub Copilot (GitHub)","Deploy & Monitor — GitLab Duo Workflow + HolmesGPT"]}
              tags={["HolmesGPT","GitLab Duo","GitHub Copilot","CNCF"]}
            />
          </div>
        </div>
      </div>

      {/* ROW 2 — Standards & Frameworks Layer */}
      <Divider label="Standards & Frameworks Layer" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", gap:8, marginBottom:8 }}>
        <Cell num="6" title="MCP Dev Standard" sub="How to build MCPs" pal={PALETTE.std} isStandard deps={["Rules","Local"]}
          items={["FastMCP as MCP framework","Poetry for dependency management","Pytest — unit & integration tests","SSE transport — persistent Docker service"]}
          tags={["FastMCP","Poetry","Pytest","SSE"]}
        />
        <Cell num="7" title="Agent Orchestration" sub="Multi-agent standard" pal={PALETTE.std} isStandard deps={["Skills","Local"]}
          items={["LangGraph — personal standard for orchestration","Stateful agent graphs & flows","Task delegation & handoff patterns","Human-in-the-loop support"]}
          tags={["LangGraph","stateful","graphs","HITL"]}
        />
        <Cell num="8" title="Agent Frameworks" sub="Additional patterns" pal={PALETTE.std} deps={["Skills","Local"]}
          items={["CrewAI — role-based multi-agent teams","Custom lightweight agents","Tool-use patterns","Crew pipelines for complex workflows"]}
          tags={["CrewAI","Python","tool-use","pipelines"]}
        />
        <Cell num="9" title="Language & Runtime" sub="Tech stack baseline" pal={PALETTE.std} isStandard deps={["Local"]}
          items={["Python 3.11+ as primary language","Node.js for JS-based MCPs","PostgreSQL as standard database","Docker + Docker Compose — local orchestration","Hardened images: Chainguard, Docker Hardened Images"]}
          tags={["Python 3.11+","Node.js","PostgreSQL","Docker","Chainguard"]}
        />
        <Cell num="10" title="Security & Quality" sub="Non-negotiable standards" pal={PALETTE.std} isStandard deps={["Rules","Local"]}
          items={["Trivy — container image SAST scanning","Megalinter — lint all languages","OWASP MCP Top 10 compliance","Pre-commit hooks + CI security gates","1Password Connect — runtime secret resolution","Permissions — allow/deny: Read, Write, Bash, Git"]}
          tags={["Trivy","Megalinter","OWASP MCP Top 10","1Password","SAST"]}
        />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
        <Cell num="11" title="Inputs & Knowledge Base" sub="What agents and MCPs must consume — define before building" pal={PALETTE.std} deps={["Rules","LocalRemote"]}
          items={["Codebase & repository context — primary source of truth","Architecture Decision Records (ADRs) — design rationale","API specs & OpenAPI schemas — tool argument contracts","Runbooks & incident history — operational knowledge","Slack threads & ticket history — conversational context","CLAUDE.md — project-scoped AI rules & memory injection","Local RAG — pgvector (standard) on local Postgres, indexes codebase & personal knowledge","Remote RAG — pgvector on shared Postgres EKS/GKE, indexes ADRs, runbooks, incident history","Environment configs — .env, secrets resolved at runtime"]}
          tags={["ADRs","OpenAPI","CLAUDE.md","Local RAG","Remote RAG","pgvector","runbooks",".env"]}
        />
        <Cell num="12" title="Outputs & Deliverables" sub="What agents and MCPs must produce — define contracts upfront" pal={PALETTE.std} deps={["Rules","LocalRemote"]}
          items={["Production-ready code — reviewed, tested, PR-ready","Automated test suites — unit, integration, BDD scenarios","Root cause analysis reports — structured RCA docs","Auto-generated documentation — ADRs, READMEs, changelogs","CI/CD pipeline execution — triggered, validated, reported","Security scan reports — Trivy, Megalinter, OWASP findings","Observability artifacts — traces, structured logs, metrics","Agent quality scores — Phoenix eval results per run"]}
          tags={["PRs","test suites","RCA","docs","CI/CD","scan reports","traces","eval scores"]}
        />
      </div>

      {/* ROW 3 — AI Gateway Layer */}
      <Divider label="AI Gateway Layer" />
      <div style={{ background:`${PALETTE.gw.fill}16`, border:`2px solid ${PALETTE.gw.fill}66`, borderRadius:12, padding:"14px 16px", marginBottom:8, boxShadow:`0 0 16px ${PALETTE.gw.fill}22` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <Num n="13" color={PALETTE.gw.badge} />
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <span style={{ fontWeight:800, fontSize:14, color:"#f1f5f9", fontFamily:"Inter, system-ui, sans-serif" }}>AI Gateway</span>
              <PSBadge />
            </div>
            <div style={{ fontSize:10.5, color:"#94a3b8", fontFamily:"Inter, system-ui, sans-serif", marginTop:2 }}>Single control plane for LLM providers, MCP servers, and Agent publishing · powered by LiteLLM · model-agnostic · budget-aware · fully observable</div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:4, justifyContent:"flex-end", maxWidth:320 }}>
            {["LiteLLM","OpenAI-compat API","Docker","1Password Connect"].map(t=><Tag key={t} label={t} color={PALETTE.gw.badge}/>)}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", gap:8 }}>
          <BandCell pal={PALETTE.gw} isStandard deps={["LocalRemote"]} title="Model Routing" sub="Provider abstraction · powered by LiteLLM"
            items={["LiteLLM — OpenAI-compatible API for all clients","Route to Claude, GPT-4, Gemini, Ollama","Fallback strategies — reroute on failure","Model aliasing — swap without code change"]}
            tags={["LiteLLM","claude-3-5","gpt-4o","gemini","ollama","fallback"]}
          />
          <BandCell pal={PALETTE.gw} isStandard deps={["LocalRemote"]} title="MCP Proxy" sub="Centralized MCP registry · powered by LiteLLM"
            items={["LiteLLM — single registration point for all MCP servers","Decouples clients from MCP endpoints","Tool discovery across all connected servers","SSE transport managed centrally"]}
            tags={["LiteLLM","MCP registry","SSE","tool discovery"]}
          />
          <BandCell pal={PALETTE.gw} isStandard deps={["Skills","LocalRemote"]} title="Agent Publishing" sub="Serving agents as endpoints"
            items={["Expose LangGraph agents as API endpoints","Versioned agent deployment","Agent routing by task type","Reusable agent-as-a-service pattern"]}
            tags={["agent endpoints","versioning","LangGraph","API"]}
          />
          <BandCell pal={PALETTE.gw} isStandard deps={["Rules","Local"]} title="Budget & Rate Control" sub="Cost & access governance"
            items={["Per-model token spend limits","Per-user / per-team budget caps","Rate limiting per client","Spend alerts & hard cutoffs"]}
            tags={["token budget","rate limit","spend alerts"]}
          />
          <BandCell pal={PALETTE.gw} deps={["LocalRemote"]} title="Gateway Observability" sub="First telemetry choke point"
            items={["All LLM calls logged before Phoenix","Token usage per call — OTel gap closed","Latency & error tracking per provider","API key management via 1Password Connect"]}
            tags={["token usage","latency","API keys","OTel"]}
          />
        </div>
      </div>

      {/* ROW 4 — Observability Layer */}
      <Divider label="Observability Layer" />
      <div style={{ background:`${PALETTE.obs.fill}14`, border:`2px solid ${PALETTE.obs.fill}55`, borderRadius:12, padding:"14px 16px", marginBottom:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <Num n="14" color={PALETTE.obs.badge} />
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <span style={{ fontWeight:800, fontSize:14, color:"#f1f5f9", fontFamily:"Inter, system-ui, sans-serif" }}>Observability</span>
              <PSBadge />
            </div>
            <div style={{ fontSize:10.5, color:"#94a3b8", fontFamily:"Inter, system-ui, sans-serif", marginTop:2 }}>Cross-cutting layer — every tool call, HTTP span, and agent decision is visible · Arize Phoenix + OpenTelemetry</div>
          </div>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:320 }}>
            {["Arize Phoenix","OpenTelemetry","OTLP","LiteLLM logs","opt-in"].map(t=><Tag key={t} label={t} color={PALETTE.obs.badge}/>)}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
          <BandCell pal={PALETTE.obs} isStandard deps={["Local"]} title="Traces" sub="Distributed request tracing"
            items={["FastMCP built-in OTel — every tool call auto-traced","HTTPXClientInstrumentor — HTTP calls as child spans","Tool name, args, duration, success/failure","Arize Phoenix OTLP backend (port 6006)"]}
            tags={["FastMCP OTel","HTTPXClientInstrumentor","Phoenix"]}
          />
          <BandCell pal={PALETTE.obs} isStandard deps={["Local"]} title="Logs" sub="Structured event records"
            items={["JSON structured logging — time, level, logger, msg","Per-service context via OTEL_SERVICE_NAME","Docker Compose log aggregation","Opt-in — no-op if endpoint not configured"]}
            tags={["JSON logs","Docker Compose","stdout"]}
          />
          <BandCell pal={PALETTE.obs} isStandard deps={["LocalRemote"]} title="Metrics" sub="Performance & health signals"
            items={["Tool call latency per MCP server","Token usage per call via LiteLLM gateway","Downstream API error rates (4xx/5xx)","HTTP response time from APIs"]}
            tags={["latency","token usage","error rates","OTel SDK"]}
          />
          <BandCell pal={PALETTE.obs} isStandard deps={["Rules","LocalRemote"]} title="LLM Evaluation" sub="AI-native 4th pillar"
            items={["Arize Phoenix LLM-as-judge — semantic BDD","Agent response quality scoring (≥ 0.8)","No secret exposure checks (deterministic)","Foundation for agent quality gates"]}
            tags={["LLM-as-judge","BDD","Phoenix Evals","semantic"]}
          />
        </div>
      </div>

      {/* TOOLS REFERENCE */}
      <Divider label="Personal Standard Tools Reference" />
      <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"16px 20px", marginBottom:18 }}>
        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>All tools marked ★ Personal Standard — click to open documentation</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:8 }}>
          {TOOLS.map((t, i) => (
            <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"8px 12px", display:"flex", flexDirection:"column", gap:3, cursor:"pointer", transition:"all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.04)"}
              >
                <div style={{ fontSize:9, color:"#475569", fontFamily:"Inter, system-ui, sans-serif", textTransform:"uppercase", letterSpacing:0.5 }}>{t.category}</div>
                <div style={{ fontSize:11.5, color:"#c4b5fd", fontWeight:700, fontFamily:"Inter, system-ui, sans-serif" }}>{t.name}</div>
                <div style={{ fontSize:9.5, color:"#475569", fontFamily:"monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.url.replace("https://","")}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign:"center", marginTop:8, fontSize:10, color:"#334155" }}>
        raphaelmoraes.dev · GenAI Engineering Standard v1.0 · 2026
      </div>
    </div>
  );
}