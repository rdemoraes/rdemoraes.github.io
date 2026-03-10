import Link from "next/link";
import { useRouter } from "next/router";

const BRAND = "raphaelmoraes.dev";

const NAV_LINKS = [
  { label: "GenAI Canvas", href: "/canvas", external: false },
  { label: "GitHub", href: "https://github.com/rdemoraes", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/raphaelmoraes", external: true },
] as const;

const COLORS = {
  bg:          "#0f172a",
  border:      "#1e3a5f",
  brand:       "#818cf8",
  linkDefault: "#94a3b8",
  linkActive:  "#f1f5f9",
};

const linkStyle = (active: boolean): React.CSSProperties => ({
  display: "block",
  fontSize: 13,
  fontFamily: "Inter, system-ui, sans-serif",
  fontWeight: active ? 600 : 400,
  color: active ? COLORS.linkActive : COLORS.linkDefault,
  textDecoration: "none",
  whiteSpace: "nowrap",
});

export default function NavBar() {
  const { pathname } = useRouter();

  return (
    <div
      style={{
        borderBottom: `1px solid ${COLORS.border}`,
        background: COLORS.bg,
      }}
    >
      <nav
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: 15,
              fontFamily: "Inter, system-ui, sans-serif",
              color: COLORS.brand,
            }}
          >
            {BRAND}
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {NAV_LINKS.map(({ label, href, external }) => {
            const active = !external && pathname === href;
            return external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={linkStyle(active)}
              >
                {label}
              </a>
            ) : (
              <Link key={label} href={href} style={linkStyle(active)}>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
