// ✅ SSR — Server-Side Rendering
// No 'use client' → Server Component
// KEY: fetch with { cache: 'no-store' } = opt out of caching = SSR behavior
// This page re-renders on EVERY request.

import { cookies, headers } from "next/headers";
import CodeBlock from "@/components/CodeBlock";

// 🔑 This tells Next.js: never cache this page. Re-run on every request.
export const dynamic = "force-dynamic";
// Equivalent to: fetch('...', { cache: 'no-store' }) inside the component

export default async function SSRPage() {
  // Runs on every request — fresh timestamp every time
  const requestTime = new Date().toISOString();

  // Access request-time data (only possible in SSR, not SSG)
  const cookieStore = cookies();
  const headerStore = headers();
  const userAgent = headerStore.get("user-agent") ?? "unknown";

  // Simulate an authenticated user (in real app: decode JWT from cookie)
  const sessionToken = cookieStore.get("session")?.value ?? null;
  const userGreeting = sessionToken ? "Welcome back! 👋" : "Hello, guest!";

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-blue">SSR</span>
          <span className="badge badge-blue">Per-Request</span>
          <span className="badge badge-blue">Server Component</span>
        </div>
        <h1>Server-Side Rendering</h1>
        <p>
          This page renders fresh on <strong>every single request</strong>.
          Refresh the page — the timestamp updates each time. The server has
          access to cookies, headers, and can fetch personalized data.
        </p>
      </div>

      {/* Live proof: timestamp updates every refresh */}
      <div className="demo">
        <div className="demo-label">🔄 Updates Every Request</div>
        <div className="output">Rendered at: {requestTime}</div>
        <div className="output" style={{ marginTop: "0.3rem" }}>
          Session: {userGreeting}
        </div>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            marginTop: "0.5rem",
          }}
        >
          ↑ Refresh the page — this timestamp changes every time. That's SSR.
        </p>
      </div>

      <div className="demo" style={{ borderColor: "rgba(137,180,250,0.3)" }}>
        <div className="demo-label">🌐 Request Headers (Server Only)</div>
        <div
          className="output"
          style={{ wordBreak: "break-all", fontSize: "0.75rem" }}
        >
          User-Agent: {userAgent.slice(0, 80)}...
        </div>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            marginTop: "0.5rem",
          }}
        >
          ↑ This data only exists server-side. You can't access raw headers in a
          Client Component.
        </p>
      </div>

      <div className="tip-box">
        <strong>🎤 Interview Answer</strong>
        "SSR renders the page on the server for every request. Unlike SSG, the
        HTML is generated fresh each time, so it's always up-to-date. I'd use it
        for pages with personalized content, auth-gated data, or anything that
        needs request-time context like cookies or headers."
      </div>

      <div className="card">
        <h3>App Router Pattern</h3>
        <CodeBlock
          language="typescript"
          code={`// Force SSR by opting out of caching
export const dynamic = "force-dynamic";
// OR use: fetch('url', { cache: 'no-store' })

import { cookies, headers } from "next/headers";

export default async function SSRPage() {
  // Access request-scoped data
  const cookieStore = cookies();
  const token = cookieStore.get("session");

  // Fetch user-specific data
  const user = await getUserById(token?.value);

  return <Dashboard user={user} />;
}`}
        />
      </div>

      <div className="card">
        <h3>Pages Router Equivalent</h3>
        <CodeBlock
          language="typescript"
          code={`export async function getServerSideProps(context) {
  const { req, res, params } = context;
  const token = req.cookies.session;
  const user = await getUser(token);
  return { props: { user } };
}`}
        />
      </div>

      <div className="card">
        <h3>SSR vs SSG — The Key Difference</h3>
        <CodeBlock
          language="typescript"
          code={`// SSG: runs ONCE at build time
const data = await fetch("https://api.example.com/data");
// cache: 'force-cache' (default) ↑

// SSR: runs on EVERY request
const data = await fetch("https://api.example.com/data",
  { cache: "no-store" }  // ← this one line changes everything
);`}
        />
      </div>

      <div
        style={{ padding: "1rem 0", color: "var(--muted)", fontSize: "0.8rem" }}
      >
        ✅ <strong>Pros:</strong> Always fresh, access to cookies/headers, great
        for auth-gated pages{" · "}❌ <strong>Cons:</strong> Slower than SSG
        (server work every request), can't be CDN-cached
      </div>
    </div>
  );
}
