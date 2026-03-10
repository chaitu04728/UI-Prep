// ✅ ISR — Incremental Static Regeneration
// No 'use client' → Server Component
// KEY: export const revalidate = N  (N = seconds between re-validations)
// Renders ONCE statically, then re-validates in the background every N seconds.

import CodeBlock from "@/components/CodeBlock";

// 🔑 This single line enables ISR. After 30 seconds, next request triggers rebuild.
export const revalidate = 30;
// Could also be on a per-fetch basis:
//   fetch('url', { next: { revalidate: 30 } })

// Simulated "live" data (in real app: fetched from DB/API)
async function getStats() {
  // Pretend this is an expensive DB query. With ISR:
  // - First visitor: fresh fetch, page cached
  // - Next 30s: served from cache (instant)
  // - After 30s: first visitor triggers background re-fetch
  // - While re-fetching: still serve old page
  // - After re-fetch: new page cached
  return {
    totalOrders: Math.floor(Math.random() * 10000) + 50000,
    activeUsers: Math.floor(Math.random() * 500) + 1200,
    revenue: (Math.random() * 50000 + 100000).toFixed(2),
    lastUpdated: new Date().toISOString(),
  };
}

export default async function ISRPage() {
  const stats = await getStats();

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-yellow">ISR</span>
          <span className="badge badge-yellow">revalidate: 30s</span>
          <span className="badge badge-yellow">Server Component</span>
        </div>
        <h1>Incremental Static Regeneration</h1>
        <p>
          This page is statically generated but{" "}
          <strong>re-validates every 30 seconds</strong>. The data below was
          frozen at cache time — but the cache expires and silently regenerates
          in the background.
        </p>
      </div>

      <div className="demo">
        <div className="demo-label">📊 "Live" Dashboard Stats (ISR cached)</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginTop: "0.5rem",
          }}
        >
          {[
            {
              label: "Total Orders",
              value: stats.totalOrders.toLocaleString(),
              color: "var(--green)",
            },
            {
              label: "Active Users",
              value: stats.activeUsers.toLocaleString(),
              color: "var(--blue)",
            },
            {
              label: "Revenue ($)",
              value: `$${Number(stats.revenue).toLocaleString()}`,
              color: "var(--yellow)",
            },
            {
              label: "Cache Snapshot",
              value: stats.lastUpdated.slice(11, 19) + " UTC",
              color: "var(--muted)",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "0.8rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  color: s.color,
                  fontWeight: 700,
                  marginTop: "0.3rem",
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            marginTop: "0.8rem",
          }}
        >
          ↑ Values change on re-validation (every 30s), not on every request.
          First request after 30s triggers background regeneration — users never
          wait.
        </p>
      </div>

      <div className="tip-box">
        <strong>🎤 Interview Answer</strong>
        "ISR is the best of both SSG and SSR. Pages start as static HTML for
        fast delivery, but after a configurable time window, Next.js regenerates
        the page in the background. Users always get a fast cached response; the
        staleness is bounded. Perfect for e-commerce product pages, pricing, or
        leaderboards."
      </div>

      <div className="card">
        <h3>ISR Timeline (Stale-While-Revalidate)</h3>
        <CodeBlock
          language="typescript"
          code={`// revalidate = 30 (seconds)

// T=0s    → Page built, cache filled
// T=10s   → Request → CACHE HIT (instant)
// T=31s   → Request → CACHE HIT (still served!)
//           + background regeneration triggered
// T=32s   → Request → NEW cache filled
// T=33s   → Request → CACHE HIT (new data)`}
        />
      </div>

      <div className="card">
        <h3>App Router — Two Ways to Set ISR</h3>
        <CodeBlock
          language="typescript"
          code={`// Option 1: Page-level revalidation
export const revalidate = 30;  // seconds

// Option 2: Per-fetch revalidation
const data = await fetch("https://api.example.com/stats", {
  next: { revalidate: 30 }  // per-request ISR
});

// Option 3: On-demand revalidation (e.g. on CMS publish)
import { revalidatePath, revalidateTag } from "next/cache";
revalidatePath("/products");  // in a Server Action or Route Handler`}
        />
      </div>

      <div className="card">
        <h3>Pages Router Equivalent</h3>
        <CodeBlock
          language="typescript"
          code={`export async function getStaticProps() {
  const data = await fetchStats();
  return {
    props: { data },
    revalidate: 30,  // ← the ISR magic in Pages Router
  };
}`}
        />
      </div>

      <div
        style={{ padding: "1rem 0", color: "var(--muted)", fontSize: "0.8rem" }}
      >
        ✅ <strong>Pros:</strong> Fast like SSG, stays fresh like SSR, no
        user-visible delay on regen{" · "}❌ <strong>Cons:</strong> One request
        after expiry gets stale data (acceptable trade-off)
      </div>
    </div>
  );
}
