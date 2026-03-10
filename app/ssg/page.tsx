// ✅ SSG — Static Site Generation
// No 'use client' → Server Component
// No fetch config needed (default = static in App Router)
// This entire page is rendered ONCE at `next build` and cached forever.

import CodeBlock from "@/components/CodeBlock";

// Simulated static data (in real app: fetch from CMS, markdown files, etc.)
const posts = [
  {
    id: 1,
    title: "Understanding React Server Components",
    date: "2024-01-15",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Next.js App Router Deep Dive",
    date: "2024-01-22",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "TypeScript Patterns for Scale",
    date: "2024-02-03",
    readTime: "6 min",
  },
];

// In Pages Router you'd use:
//   export async function getStaticProps() { ... }
//
// In App Router (v13+), any async Server Component with a static
// fetch (or no fetch at all) is SSG by default.

export default async function SSGPage() {
  // 🔑 KEY: This runs at BUILD time, not request time.
  // Simulate a "build-time" timestamp
  const buildTime = new Date().toISOString();

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-green">SSG</span>
          <span className="badge badge-green">Server Component</span>
          <span className="badge badge-green">Zero JS Sent</span>
        </div>
        <h1>Static Site Generation</h1>
        <p>
          This page was rendered at <strong>build time</strong>. Refresh as many
          times as you want — the timestamp never changes until you run{" "}
          <code>next build</code> again.
        </p>
      </div>

      {/* Live proof: timestamp frozen at build */}
      <div className="demo">
        <div className="demo-label">🔒 Frozen at Build Time</div>
        <div className="output">Built at: {buildTime}</div>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            marginTop: "0.5rem",
          }}
        >
          ↑ This timestamp never changes on refresh. That's SSG.
        </p>
      </div>

      <div className="tip-box">
        <strong>🎤 Interview Answer</strong>
        "SSG pre-renders pages at build time. The HTML is static and served from
        a CDN, making it the fastest possible delivery. I'd use it for blogs,
        documentation, and marketing pages where content doesn't change per-user
        or per-request."
      </div>

      {/* Blog posts list */}
      <div className="card">
        <h2>Blog Posts (Static Data)</h2>
        <p>
          Fetched at build time — could be from a CMS, MDX files, or database.
        </p>
        <div style={{ marginTop: "1rem" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: "0.8rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "0.88rem", marginBottom: "0.2rem" }}>
                  {post.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                  {post.date}
                </div>
              </div>
              <span className="badge badge-green">{post.readTime}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code explanation */}
      <div className="card">
        <h3>App Router Pattern</h3>
        <CodeBlock
          language="typescript"
          code={`// app/blog/page.tsx — SSG (default behavior)

// Optional: explicit revalidation = false means pure static
export const revalidate = false;

export default async function BlogPage() {
  // fetch() with no options → cached at build time
  const posts = await fetch("https://api.example.com/posts");
  const data = await posts.json();

  return <PostList posts={data} />;
}`}
        />
        <CodeBlock
          language="typescript"
          code={`// For dynamic SSG routes: generateStaticParams()
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}  // replaces getStaticPaths from Pages Router`}
        />
      </div>

      <div className="card">
        <h3>Pages Router Equivalent</h3>
        <CodeBlock
          language="typescript"
          code={`export async function getStaticProps() {
  const data = await fetchPosts();
  return { props: { data } };
}

// For dynamic routes:
export async function getStaticPaths() {
  return { paths: [...], fallback: false };
}`}
        />
      </div>

      <div
        style={{ padding: "1rem 0", color: "var(--muted)", fontSize: "0.8rem" }}
      >
        ✅ <strong>Pros:</strong> Blazing fast, CDN-friendly, no server needed
        {" · "}❌ <strong>Cons:</strong> Stale until next build, not for
        user-specific data
      </div>
    </div>
  );
}
