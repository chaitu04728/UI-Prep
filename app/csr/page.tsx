"use client";
// ✅ CSR — Client-Side Rendering
// 'use client' directive → this is a Client Component
// Data is fetched IN THE BROWSER after the component mounts.
// The server sends an empty shell; JS fetches and fills data on the client.

import { useState, useEffect } from "react";
import CodeBlock from "@/components/CodeBlock";

// Simulated API call (mimics fetch with delay)
function simulateFetch(endpoint: string): Promise<unknown> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const data: Record<string, unknown> = {
        "/api/user": { name: "Arjun Sharma", role: "Senior Dev", karma: 2847 },
        "/api/feed": [
          { id: 1, msg: "Deployed to production 🚀", time: "2m ago" },
          { id: 2, msg: "PR merged: feat/auth-v2", time: "15m ago" },
          { id: 3, msg: "Build passing ✅", time: "1h ago" },
        ],
      };
      resolve(data[endpoint]);
    }, 800),
  );
}

export default function CSRPage() {
  // useState — tracks data, loading, error states
  const [user, setUser] = useState<{
    name: string;
    role: string;
    karma: number;
  } | null>(null);
  const [feed, setFeed] = useState<{ id: number; msg: string; time: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // useEffect — runs after mount (CSR data fetching pattern)
  // 🔑 Empty dependency array [] = run once on mount (componentDidMount equivalent)
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [userData, feedData] = await Promise.all([
        simulateFetch("/api/user"),
        simulateFetch("/api/feed"),
      ]);
      setUser(userData as typeof user);
      setFeed(feedData as typeof feed);
      setLoading(false);
    }
    loadData();
  }, []); // ← empty array = run once on mount

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-red">CSR</span>
          <span className="badge badge-red">Client Component</span>
          <span className="badge badge-purple">useState</span>
          <span className="badge badge-purple">useEffect</span>
        </div>
        <h1>Client-Side Rendering</h1>
        <p>
          This page's data is fetched <strong>entirely in the browser</strong>{" "}
          after JS loads. Watch the loading state — that's CSR in action. No
          server-side data fetching.
        </p>
      </div>

      {/* Loading state demonstration */}
      <div className="demo">
        <div className="demo-label">
          ⚡ CSR Data Fetch (watch on first load!)
        </div>
        {loading ? (
          <div className="output" style={{ color: "var(--yellow)" }}>
            ⏳ Fetching from client... (server sent empty shell)
          </div>
        ) : (
          <div>
            <div className="output">
              👤 {user?.name} — {user?.role} · Karma: {user?.karma}
            </div>
            <div style={{ marginTop: "0.8rem" }}>
              {feed.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    padding: "0.4rem 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span>{item.msg}</span>
                  <span style={{ color: "var(--muted)" }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            marginTop: "0.5rem",
          }}
        >
          ↑ Server sent &lt;div&gt;Loading...&lt;/div&gt;. JS ran, fetched data,
          then React hydrated the UI.
        </p>
      </div>

      {/* useState counter demo */}
      <div className="card">
        <h3>useState — Simple Counter</h3>
        <p>State that lives in the component, triggers re-render on change.</p>
        <div className="demo" style={{ marginTop: "1rem" }}>
          <div
            className="output"
            style={{ fontSize: "2rem", marginBottom: "0.8rem" }}
          >
            Count: {count}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => setCount((c) => c - 1)}>− Decrement</button>
            <button onClick={() => setCount((c) => c + 1)}>+ Increment</button>
            <button onClick={() => setCount(0)}>↺ Reset</button>
          </div>
        </div>
        <CodeBlock
          language="typescript"
          code={`const [count, setCount] = useState(0);

// useState returns [currentValue, setter]
// Calling setter → triggers re-render
// Functional update (safe for async): setCount(c => c + 1)`}
        />
      </div>

      <div className="tip-box">
        <strong>🎤 Interview Answer</strong>
        "CSR fetches data client-side, after the JS bundle loads and runs. The
        server sends a minimal HTML shell. I use it for user-specific,
        real-time, or highly-interactive features — dashboards, live feeds,
        chat. The trade-off is no SEO for that data and a brief loading flash."
      </div>

      <div className="card">
        <h3>useEffect — The Full Story</h3>
        <CodeBlock
          language="typescript"
          code={`// 1. No dependency array → runs after EVERY render
useEffect(() => { console.log('every render') });

// 2. Empty array → runs ONCE on mount (CSR fetch pattern)
useEffect(() => { fetchData() }, []);

// 3. With deps → runs when deps change (componentDidUpdate)
useEffect(() => { fetchUser(id) }, [id]);

// 4. Cleanup → returned fn runs before next effect / unmount
useEffect(() => {
  const sub = subscribe(userId);
  return () => sub.unsubscribe();  // cleanup!
}, [userId]);`}
        />
      </div>

      <div
        style={{ padding: "1rem 0", color: "var(--muted)", fontSize: "0.8rem" }}
      >
        ✅ <strong>Pros:</strong> Highly interactive, real-time, user-specific,
        no page reload{" · "}❌ <strong>Cons:</strong> Poor SEO for fetched
        data, JS required, initial loading state
      </div>
    </div>
  );
}
