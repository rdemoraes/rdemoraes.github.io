import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/navbar.module.css";

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

const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
  display: "block",
  fontSize: 15,
  fontFamily: "Inter, system-ui, sans-serif",
  fontWeight: active ? 600 : 400,
  color: active ? COLORS.linkActive : COLORS.linkDefault,
  textDecoration: "none",
  padding: "10px 0",
  borderBottom: `1px solid ${COLORS.border}`,
});

export default function NavBar() {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: COLORS.bg,
        borderBottom: isOpen ? "none" : `1px solid ${COLORS.border}`,
      }}
    >
      {/* Top bar */}
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
        <Link href="/" onClick={close} style={{ textDecoration: "none" }}>
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

        {/* Desktop links */}
        <div className={styles.desktopLinks}>
          {NAV_LINKS.map(({ label, href, external }) => {
            const active = !external && pathname === href;
            return external ? (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={linkStyle(active)}>
                {label}
              </a>
            ) : (
              <Link key={label} href={href} style={linkStyle(active)}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ label, href, external }) => {
            const active = !external && pathname === href;
            return external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={mobileLinkStyle(active)}
                onClick={close}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                style={mobileLinkStyle(active)}
                onClick={close}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
