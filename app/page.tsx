"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { searchContent } from "@/lib/searchData";

const features = [
  {
    title: "🎨 Rendering Strategies",
    desc: "Master SSG, SSR, ISR, and CSR with live demos",
    href: "/ssg",
    items: [
      "Static Site Generation",
      "Server-Side Rendering",
      "Incremental Static Regen",
      "Client-Side Rendering",
    ],
  },
  {
    title: "⚛️ React Deep Dive",
    desc: "Core concepts, hooks, patterns, and state management",
    href: "/react",
    items: [
      "Components & JSX",
      "All Hooks",
      "Advanced Patterns",
      "Context & State",
    ],
  },
  {
    title: "▲ Next.js Features",
    desc: "App Router, data fetching, optimization, and more",
    href: "/nextjs",
    items: [
      "App Router",
      "Server Components",
      "Middleware",
      "Image Optimization",
    ],
  },
  {
    title: "💻 JavaScript Core",
    desc: "From closures to async patterns - 97+ concepts",
    href: "/js",
    items: [
      "Closures & Scope",
      "Event Loop",
      "Promises & Async",
      "ES6+ Features",
    ],
  },
  {
    title: "🔷 TypeScript Concepts",
    desc: "Complete TypeScript guide - types, generics, utilities",
    href: "/ts",
    items: [
      "Basic & Advanced Types",
      "Generics & Constraints",
      "Utility Types",
      "React + TypeScript",
    ],
  },
  {
    title: "🎮 Code Playground",
    desc: "Live code editor for JS, TS, and React JSX",
    href: "/playground",
    items: [
      "JavaScript REPL",
      "TypeScript Support",
      "React Live Preview",
      "Console Output",
    ],
  },
  {
    title: "♿ Accessibility (A11y)",
    desc: "Complete guide to web accessibility and inclusive design",
    href: "/accessibility",
    items: [
      "WCAG & ARIA",
      "Screen Readers",
      "Keyboard Navigation",
      "Testing & Tools",
    ],
  },
  {
    title: "📚 Inbuilt Methods",
    desc: "Complete reference with examples for all JS methods",
    href: "/inbuilt-methods",
    items: [
      "Array Methods",
      "String Methods",
      "Object Methods",
      "Promise & Date APIs",
    ],
  },
  {
    title: "🌐 API Patterns",
    desc: "All ways to make API calls in JS and React",
    href: "/api",
    items: ["Fetch API", "Axios", "GraphQL", "WebSocket & Real-time"],
  },
  {
    title: "🔧 Git Commands",
    desc: "Complete Git reference with 60+ commands and workflows",
    href: "/git",
    items: [
      "Basic Workflow",
      "Branching & Merging",
      "Remote Collaboration",
      "Advanced Operations",
    ],
  },
  {
    title: "🚀 Advanced Patterns",
    desc: "Production-ready AI integration, API patterns, and JWT auth",
    href: "/ai-integration",
    items: [
      "AI SDK & Streaming",
      "Axios Interceptors",
      "JWT Authentication",
      "Service Layer Patterns",
    ],
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMemo(() => {
    return searchContent(searchTerm);
  }, [searchTerm]);

  const showSearchResults = searchTerm.trim().length > 0;

  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.desc.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Web Dev Explorer
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#666",
            maxWidth: "800px",
            margin: "0 auto 30px",
          }}
        >
          A comprehensive, interview-ready reference covering 150+ concepts
          across React, Next.js, JavaScript, TypeScript, and Advanced Patterns —
          with live demos, interactive playground, and complete API guides.
        </p>

        <input
          type="text"
          placeholder="Search everything... (try: filter, fetch, useState, axios, promises)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "15px 20px",
            fontSize: "16px",
            border: "2px solid #eaeaea",
            borderRadius: "50px",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#eaeaea")}
        />
      </div>

      {/* Search Results */}
      {showSearchResults && (
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
            Search Results ({searchResults.length})
          </h2>
          {searchResults.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#666",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔍</div>
              <p style={{ fontSize: "18px" }}>
                No results found for "{searchTerm}"
              </p>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Try searching for: array methods, fetch, hooks, promises, etc.
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {searchResults.map((result, idx) => (
                <Link
                  key={idx}
                  href={result.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    background: "#fff",
                    border: "2px solid #eaeaea",
                    borderRadius: "10px",
                    padding: "20px 25px",
                    transition: "all 0.2s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(102, 126, 234, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#eaeaea";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        background: "#667eea15",
                        color: "#667eea",
                        borderRadius: "4px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {result.category}
                    </span>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#333",
                        margin: 0,
                      }}
                    >
                      {result.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    {result.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Feature Cards (shown when not searching) */}
      {!showSearchResults && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
            marginBottom: "50px",
          }}
        >
          {filteredFeatures.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              style={{
                textDecoration: "none",
                color: "inherit",
                background:
                  "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
                border: "2px solid #eaeaea",
                borderRadius: "15px",
                padding: "30px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(102, 126, 234, 0.2)";
                e.currentTarget.style.borderColor = "#667eea";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#eaeaea";
              }}
            >
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {feature.title}
              </h2>
              <p
                style={{
                  color: "#666",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {feature.desc}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {feature.items.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: "8px 0",
                      color: "#667eea",
                      fontSize: "14px",
                    }}
                  >
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      )}

      {/* What's Inside Section */}
      {!showSearchResults && (
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "60px 40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontSize: "36px",
              marginBottom: "20px",
              color: "#fff",
              fontWeight: "800",
              position: "relative",
            }}
          >
            📊 What's Inside
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "16px",
              marginBottom: "40px",
              position: "relative",
            }}
          >
            Your comprehensive toolkit for mastering modern web development
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
              marginTop: "30px",
              position: "relative",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                padding: "30px 20px",
                borderRadius: "15px",
                border: "2px solid rgba(255,255,255,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "10px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                150+
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                Concepts Covered
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                padding: "30px 20px",
                borderRadius: "15px",
                border: "2px solid rgba(255,255,255,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "10px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                10
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                Major Categories
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                padding: "30px 20px",
                borderRadius: "15px",
                border: "2px solid rgba(255,255,255,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "10px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                350+
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                Code Examples
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                padding: "30px 20px",
                borderRadius: "15px",
                border: "2px solid rgba(255,255,255,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "10px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                1
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "14px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                Live Playground
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
