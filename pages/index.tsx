import Head from "next/head";
import Link from "next/link";
import NavBar from "../components/NavBar";

const PALETTE = {
  bg: "#0f172a",
  surface: "#1e293b",
  border: "#1e3a5f",
  indigo: "#818cf8",
  indigoDim: "#4f46e5",
  cyan: "#22d3ee",
  slate: "#94a3b8",
  text: "#f1f5f9",
  muted: "#64748b",
};

const certifications = [
  {
    title: "Certified Kubernetes Administrator",
    abbr: "CKA",
    issuer: "CNCF / Linux Foundation",
    color: "#326ce5",
  },
  {
    title: "AWS Developer Associate",
    abbr: "DVA",
    issuer: "Amazon Web Services",
    color: "#f59e0b",
  },
  {
    title: "AWS Solutions Architect Associate",
    abbr: "SAA",
    issuer: "Amazon Web Services",
    color: "#f59e0b",
  },
  {
    title: "Associate Cloud Engineer",
    abbr: "ACE",
    issuer: "Google Cloud",
    color: "#34a853",
  },
  {
    title: "GitLab Certified Associate",
    abbr: "GL",
    issuer: "GitLab",
    color: "#fc6d26",
  },
];

const CertCard = ({ title, abbr, issuer, color }: (typeof certifications)[0]) => (
  <div
    style={{
      background: PALETTE.surface,
      border: `1px solid ${PALETTE.border}`,
      borderRadius: 12,
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        background: `${color}18`,
        border: `1.5px solid ${color}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 800,
        color,
        fontFamily: "monospace",
        flexShrink: 0,
        letterSpacing: 0.5,
      }}
    >
      {abbr}
    </div>
    <div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: PALETTE.text,
          fontFamily: "Inter, system-ui, sans-serif",
          marginBottom: 3,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: PALETTE.muted,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {issuer}
      </div>
    </div>
  </div>
);

const education = [
  {
    school: "Faculdade de Tecnologia Rocketseat",
    degree: "Postgraduate Degree in Artificial Intelligence & Automation",
    period: "Feb 2026 – Mar 2027",
    color: "#818cf8",
  },
  {
    school: "Pontifícia Universidade Católica do Rio Grande do Sul",
    degree: "Postgraduate Degree in Full Stack Development, Computer Software Engineering",
    period: "Jan 2025 – Feb 2026",
    color: "#38bdf8",
  },
  {
    school: "Uninove – Universidade Nove de Julho",
    degree: "Technology Degree in Database, Information Technology",
    period: "Aug 2010 – Apr 2013",
    color: "#94a3b8",
  },
];

const EducationCard = ({ school, degree, period, color }: (typeof education)[0]) => (
  <div
    style={{
      background: PALETTE.surface,
      border: `1px solid ${PALETTE.border}`,
      borderRadius: 12,
      padding: "16px 20px",
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
    }}
  >
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        marginTop: 5,
      }}
    />
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: PALETTE.text,
          fontFamily: "Inter, system-ui, sans-serif",
          marginBottom: 3,
        }}
      >
        {school}
      </div>
      <div
        style={{
          fontSize: 13,
          color: PALETTE.slate,
          fontFamily: "Inter, system-ui, sans-serif",
          marginBottom: 4,
          lineHeight: 1.5,
        }}
      >
        {degree}
      </div>
      <div
        style={{
          fontSize: 12,
          color: PALETTE.muted,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {period}
      </div>
    </div>
  </div>
);

const posts = [
  {
    href: "https://www.linkedin.com/pulse/write-tool-trap-how-indirect-prompt-injection-turns-your-de-moraes-o22wf/",
    external: true,
    date: "Mar 9, 2026",
    tag: "Security",
    tagColor: "#f472b6",
    title: "The Write Tool Trap: How Indirect Prompt Injection Turns Your MCP Server Against You",
    description:
      "I found 14 write tools in my own MCP server with zero confirmation gate. Here's the full attack path and the three fixes — confirmed gates, content enveloping, and bounded list calls.",
  },
];

const Tag = ({ label, color }: { label: string; color: string }) => (
  <span
    style={{
      display: "inline-block",
      background: `${color}22`,
      color,
      border: `1px solid ${color}44`,
      borderRadius: 4,
      fontSize: 11,
      padding: "2px 8px",
      fontFamily: "monospace",
      fontWeight: 700,
    }}
  >
    {label}
  </span>
);

const PostCard = ({
  href,
  external,
  date,
  tag,
  tagColor,
  title,
  description,
}: (typeof posts)[0]) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noreferrer" : undefined}
    style={{
      display: "block",
      background: PALETTE.surface,
      border: `1px solid ${PALETTE.border}`,
      borderRadius: 12,
      padding: "20px 24px",
      textDecoration: "none",
      transition: "border-color 0.15s",
      cursor: "pointer",
    }}
    onMouseEnter={(e) =>
      ((e.currentTarget as HTMLElement).style.borderColor = PALETTE.indigoDim)
    }
    onMouseLeave={(e) =>
      ((e.currentTarget as HTMLElement).style.borderColor = PALETTE.border)
    }
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <Tag label={tag} color={tagColor} />
      <span
        style={{
          fontSize: 12,
          color: PALETTE.muted,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {date}
      </span>
    </div>
    <div
      style={{
        fontSize: 16,
        fontWeight: 700,
        color: PALETTE.text,
        fontFamily: "Inter, system-ui, sans-serif",
        marginBottom: 8,
        lineHeight: 1.4,
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: 13,
        color: PALETTE.slate,
        fontFamily: "Inter, system-ui, sans-serif",
        lineHeight: 1.6,
      }}
    >
      {description}
    </div>
  </a>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Raphael Moraes — Platform Engineering &amp; AI Systems</title>
        <meta
          name="description"
          content="Platform engineering, AI-native development, MCP servers, and production agentic systems."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          background: PALETTE.bg,
          minHeight: "100vh",
          fontFamily: "Inter, system-ui, sans-serif",
          color: PALETTE.text,
        }}
      >
        <NavBar />

        <main style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
          {/* Hero */}
          <div style={{ marginBottom: 64 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: PALETTE.indigo,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Agentic Platform Engineer · AI Systems
            </div>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: PALETTE.text,
                margin: "0 0 16px",
                lineHeight: 1.15,
              }}
            >
              Raphael Moraes
            </h1>
            <p
              style={{
                fontSize: 16,
                color: PALETTE.slate,
                lineHeight: 1.7,
                maxWidth: 560,
                margin: "0 0 28px",
              }}
            >
              I build Agentic Platform Engineering tooling - MCP servers, AI
              agents, agentic workflows, and the security and observability
              standards that make them production-grade.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                "Python",
                "FastMCP",
                "PyTest",
                "LangGraph",
                "LiteLLM",
                "Openroute",
                "n8n",
                "OpenTelemetry",
                "Arize Phoenix",
                "Postgres",
                "PgVector",
                "GitLab CI",
                "GitHub Actions",
                "Prefect",
                "Databricks",
                "Docker",
                "Docker Compose",
                "DevContainers",
                "Kubernetes",
                "AWS",
                "GCP",
                "Terraform",
                "Crossplane",
              ].map((t) => (
                <Tag key={t} label={t} color={PALETTE.cyan} />
              ))}
            </div>
          </div>

          {/* Writing */}
          <section style={{ marginBottom: 64 }}>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: PALETTE.muted,
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              Writing
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {posts.map((p) => (
                <PostCard key={p.href} {...p} />
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section style={{ marginBottom: 64 }}>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: PALETTE.muted,
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              Certifications
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {certifications.map((c) => (
                <CertCard key={c.abbr} {...c} />
              ))}
            </div>
          </section>

          {/* Education */}
          <section style={{ marginBottom: 64 }}>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: PALETTE.muted,
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              Education
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {education.map((e) => (
                <EducationCard key={e.school} {...e} />
              ))}
            </div>
          </section>

          {/* Canvas */}
          <section style={{ marginBottom: 64 }}>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: PALETTE.muted,
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              Tools
            </h2>
            <Link
              href="/canvas"
              style={{
                display: "block",
                background: `#4f46e518`,
                border: `1px solid #4f46e555`,
                borderRadius: 12,
                padding: "20px 24px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: PALETTE.text,
                  marginBottom: 6,
                }}
              >
                GenAI Local Setup Canvas
              </div>
              <div style={{ fontSize: 13, color: PALETTE.slate, lineHeight: 1.6 }}>
                A visual reference for building a high-standards AI-native engineering
                environment — client layer, MCP servers, LiteLLM gateway, observability
                stack, and security standards in one view.
              </div>
            </Link>
          </section>
        </main>

        <footer
          style={{
            borderTop: `1px solid ${PALETTE.border}`,
            padding: "24px",
            textAlign: "center",
            fontSize: 12,
            color: PALETTE.muted,
          }}
        >
          raphaelmoraes.dev · RFCA Solutions · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}
