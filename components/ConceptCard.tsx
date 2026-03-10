"use client";
import Link from "next/link";

interface ConceptCardProps {
  href: string;
  label: string;
  title: string;
  desc: string;
  badge: string;
  when: string;
  hook: string;
}

export default function ConceptCard({
  href,
  label,
  title,
  desc,
  badge,
  when,
  hook,
}: ConceptCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        className="card"
        style={{ cursor: "pointer", transition: "border-color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1e3a5f")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--border)")
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            marginBottom: "0.6rem",
          }}
        >
          <span className={`badge ${badge}`}>{label}</span>
          <h2 style={{ fontSize: "1rem", fontFamily: "Syne, sans-serif" }}>
            {title}
          </h2>
        </div>
        <p>{desc}</p>
        <div
          style={{
            marginTop: "0.8rem",
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.75rem",
          }}
        >
          <span style={{ color: "var(--muted)" }}>🎯 {when}</span>
          <span style={{ color: "var(--muted)" }}>
            🔑 <code style={{ color: "var(--purple)" }}>{hook}</code>
          </span>
        </div>
      </div>
    </Link>
  );
}
