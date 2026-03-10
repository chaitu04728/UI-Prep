import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Concepts | Next.js Explorer",
  description: "Complete Next.js reference: App Router, Server Components, data fetching, optimization, deployment, and more.",
};

interface Concept {
  id: string;
  category: string;
  badgeClass: string;
  title: string;
  desc: string;
  code: string;
  note: string;
}

const concepts: Concept[] = [
  // ─── APP ROUTER ────────────────────────────────────────────────────────────
  {
    id: "server-client",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "Server Components vs Client Components",
    desc: "Server Components render on the server and don't ship JavaScript to the client. Client Components ('use client') hydrate in the browser and enable interactivity. Default is Server Component in App Router.",
    code: `// ─── SERVER COMPONENT (default) ───────────────────────────
// No 'use client' directive = Server Component
// ✅ Can: async/await, direct database access, use server-only code
// ❌ Cannot: useState, useEffect, event handlers, browser APIs

async function BlogPost({ id }: { id: string }) {
  // Direct database query — runs on server only
  const post = await db.post.findUnique({ where: { id } });
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
// Zero JavaScript sent to client (unless child is client component)

// ─── CLIENT COMPONENT ──────────────────────────────────────
'use client';  // ← marks boundary

import { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);
  
  // ✅ Can: hooks, event handlers, browser APIs
  // ❌ Cannot: direct DB access, server-only imports
  
  return (
    <button onClick={() => setLikes(l => l + 1)}>
      👍 {likes}
    </button>
  );
}

// ─── COMPOSITION (Server → Client → Server) ────────────────
// Server Component
async function Page() {
  const data = await fetchData();
  
  return (
    <div>
      {/* Server Component */}
      <Header />
      
      {/* Client Component */}
      <InteractiveWidget>
        {/* ✅ This child is Server Component! */}
        {/* Passed as children prop (slot pattern) */}
        <DataDisplay data={data} />
      </InteractiveWidget>
    </div>
  );
}

// Client Component boundary
'use client';
function InteractiveWidget({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>Toggle</button>
      {expanded && children}  {/* Server Component rendered */}
    </div>
  );
}`,
    note: "Server Components can import Client Components, but not vice versa. To pass Server Components to Client Components, use the children prop (composition). 'use client' should be at the leaf — don't mark entire trees client-side.",
  },
  {
    id: "use-client-rules",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "'use client' Boundary Rules",
    desc: "Once a module has 'use client', that entire module and all its imports become client-side. The boundary propagates down the import tree. Be strategic about where you place it.",
    code: `// ❌ BAD: 'use client' at top of tree
'use client';

import { HeavyLibrary } from 'heavy-lib';
import { useState } from 'react';

function Page() {
  // Entire tree is now client-side
  // HeavyLibrary JavaScript ships to browser
  return <Layout><Content /></Layout>;
}

// ✅ GOOD: 'use client' at the leaf
// page.tsx (Server Component)
async function Page() {
  const data = await fetchData();  // server-only
  
  return (
    <Layout>
      <Content data={data}>
        <InteractiveButton />  {/* Only this is client */}
      </Content>
    </Layout>
  );
}

// InteractiveButton.tsx
'use client';
function InteractiveButton() {
  const [clicked, setClicked] = useState(false);
  return <button onClick={() => setClicked(true)}>Click</button>;
}

// ─── SHARED CODE PATTERN ───────────────────────────────────
// utils.ts (no directive = can be used by both)
export function formatDate(date: Date) {
  return date.toISOString();
}

// Server Component
import { formatDate } from './utils';
async function ServerComp() {
  return <div>{formatDate(new Date())}</div>;
}

// Client Component
'use client';
import { formatDate } from './utils';
function ClientComp() {
  return <div>{formatDate(new Date())}</div>;
}

// ─── SERVER-ONLY CODE ───────────────────────────────────────
// Install: npm install server-only
import 'server-only';  // throws if imported in client component

export async function getSecretKey() {
  return process.env.SECRET_API_KEY;  // safe — never in client
}

// ─── CLIENT-ONLY CODE ───────────────────────────────────────
// Install: npm install client-only
import 'client-only';

export function useWindowSize() {
  // window only exists in browser
  const [size, setSize] = useState(window.innerWidth);
  // ...
  return size;
}`,
    note: "Think of 'use client' as a boundary, not a file type. Minimize client components to reduce bundle size. Extract interactive parts into separate files with 'use client'. Never import server-only code in a client component.",
  },
  {
    id: "when-not-client",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "When NOT to Use 'use client'",
    desc: "Default to Server Components. Only use 'use client' when you need: hooks (useState, useEffect), event handlers, browser APIs, or client-only libraries. Data fetching should stay server-side.",
    code: `// ❌ Unnecessary 'use client' — no interactivity
'use client';

function BlogPost({ title, content }: { title: string; content: string }) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  );
}
// This doesn't need 'use client' — it's static!

// ✅ Keep it server-side
function BlogPost({ title, content }: { title: string; content: string }) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  );
}

// ❌ Client component fetching data
'use client';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(setUser);
  }, [userId]);
  
  if (!user) return <Loading />;
  return <div>{user.name}</div>;
}
// Waterfall, no SEO, loading spinner on every page

// ✅ Server component with async data fetching
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  
  return <div>{user.name}</div>;
}
// Rendered on server, SEO-friendly, faster initial load

// ✅ When 'use client' IS needed:
'use client';

function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');
  //     ^^^^^^^^ hook → requires 'use client'
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      //       ^^^^^^^^ event handler → requires 'use client'
    />
  );
}

// ✅ Or browser APIs:
'use client';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
    //     ^^^^^^^^^^^^ browser API → requires 'use client'
  });
  
  return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
    Toggle
  </button>;
}`,
    note: "80% of components can be Server Components. Fetching data client-side (useEffect + fetch) creates waterfalls and loses SEO benefits. Prefer server-side data fetching with async/await in Server Components.",
  },
  {
    id: "layouts",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "Layouts & Nested Layouts",
    desc: "Layouts wrap pages and persist across navigation. Nested layouts enable shared UI at different route segments. Root layout is required and wraps the entire app.",
    code: `// ─── ROOT LAYOUT (required) ────────────────────────────────
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
// Wraps ALL pages — Nav + Footer persist across routes

// ─── NESTED LAYOUT ─────────────────────────────────────────
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
// Only applies to /dashboard/* routes

// Route structure:
// /            → RootLayout > HomePage
// /about       → RootLayout > AboutPage
// /dashboard   → RootLayout > DashboardLayout > DashboardPage
// /dashboard/settings → RootLayout > DashboardLayout > SettingsPage

// ─── SHARED DATA FETCHING ──────────────────────────────────
// app/blog/layout.tsx
async function BlogLayout({ children }: { children: React.ReactNode }) {
  const categories = await db.category.findMany();
  
  return (
    <div>
      <BlogSidebar categories={categories} />
      {children}
    </div>
  );
}
// Categories fetched once, shared across /blog/* pages

// ─── LAYOUT DOESN'T RE-RENDER ON NAVIGATION ────────────────
// app/dashboard/layout.tsx (mounted once)
'use client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  
  // State persists across /dashboard/* navigation
  // Sidebar collapse state maintained
  
  return (
    <div>
      <Sidebar collapsed={collapsed} onToggle={setCollapsed} />
      {children}
    </div>
  );
}

// ─── TEMPLATE (re-renders on navigation) ───────────────────
// app/dashboard/template.tsx
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  // Re-mounts on every route change
  // Use for animations, analytics, etc.
  
  return <div className="fade-in">{children}</div>;
}`,
    note: "Layouts wrap pages (children), don't re-render on nav, and can fetch shared data. Templates are similar but re-render on nav. Layouts can be Server or Client Components. Use layouts for persistent UI, templates for per-page animations.",
  },
  {
    id: "special-files",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "loading.tsx, error.tsx, not-found.tsx",
    desc: "Special files in App Router provide automatic UI states. loading.tsx wraps pages in Suspense, error.tsx creates error boundaries, not-found.tsx handles 404s.",
    code: `// ─── LOADING.TSX ───────────────────────────────────────────
// app/dashboard/loading.tsx
export default function Loading() {
  return <Spinner />;
}

// Equivalent to:
<Suspense fallback={<Spinner />}>
  <DashboardPage />
</Suspense>

// Nested loading states:
// /app/loading.tsx → global loading (rarely triggers)
// /app/dashboard/loading.tsx → dashboard loading
// /app/dashboard/settings/loading.tsx → settings loading

// ─── ERROR.TSX ─────────────────────────────────────────────
// app/dashboard/error.tsx
'use client';  // Error boundaries must be client components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Catches errors in:
// - Server Components (async errors)
// - Client Components (render errors)
// - Nested pages/layouts

// ─── GLOBAL ERROR ──────────────────────────────────────────
// app/global-error.tsx (catches errors in root layout)
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went catastrophically wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}

// ─── NOT-FOUND.TSX ─────────────────────────────────────────
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <a href="/">Go home</a>
    </div>
  );
}

// Trigger programmatically:
import { notFound } from 'next/navigation';

async function UserPage({ params }: { params: { id: string } }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  
  if (!user) {
    notFound();  // renders nearest not-found.tsx
  }
  
  return <div>{user.name}</div>;
}

// Nested not-found:
// /app/not-found.tsx → global 404
// /app/blog/not-found.tsx → blog-specific 404`,
    note: "These special files create automatic UI boundaries. loading.tsx is optional (defaults to instant navigation). error.tsx should be client component. not-found.tsx can be server or client. Nest them for granular control.",
  },
  {
    id: "route-groups",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "Route Groups (group)",
    desc: "Route groups organize routes without affecting URL structure. Use parentheses: (group). Great for applying different layouts or organizing code.",
    code: `// Folder structure:
app/
  (marketing)/
    layout.tsx       → Marketing layout (header, footer)
    page.tsx         → /           (Homepage)
    about/
      page.tsx       → /about      (About page)
    pricing/
      page.tsx       → /pricing    (Pricing page)
  
  (app)/
    layout.tsx       → App layout (sidebar, user menu)
    dashboard/
      page.tsx       → /dashboard
    settings/
      page.tsx       → /settings
  
  (auth)/
    layout.tsx       → Auth layout (centered, no nav)
    login/
      page.tsx       → /login
    register/
      page.tsx       → /register

// Routes created:
// /             → (marketing) layout
// /about        → (marketing) layout
// /pricing      → (marketing) layout
// /dashboard    → (app) layout
// /settings     → (app) layout
// /login        → (auth) layout
// /register     → (auth) layout

// (marketing)/layout.tsx
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </>
  );
}

// (app)/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppSidebar />
      <main>{children}</main>
    </div>
  );
}

// ─── MULTIPLE ROOT LAYOUTS ─────────────────────────────────
// Each route group can have its own root layout

// (marketing)/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="marketing">{children}</body>
    </html>
  );
}

// (app)/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app">{children}</body>
    </html>
  );
}

// ─── ORGANIZING WITHOUT LAYOUTS ────────────────────────────
app/
  (users)/
    profile/page.tsx     → /profile
    settings/page.tsx    → /settings
  (posts)/
    create/page.tsx      → /create
    [id]/page.tsx        → /[id]

// Groups have no layout.tsx — just for organization`,
    note: "Route groups don't appear in URLs. Use them to: (1) Apply different layouts to route segments, (2) Organize files, (3) Create multiple root layouts. Must use top-level — can't nest route groups.",
  },
  {
    id: "parallel-routes",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "Parallel Routes @slot",
    desc: "Parallel routes render multiple pages in the same layout simultaneously. Use @folder syntax to define slots. Great for dashboards, modals, or split views.",
    code: `// Folder structure:
app/
  dashboard/
    layout.tsx
    page.tsx
    @analytics/
      page.tsx
    @team/
      page.tsx

// dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>      {/* dashboard/page.tsx */}
      <div>{analytics}</div>      {/* @analytics/page.tsx */}
      <div>{team}</div>           {/* @team/page.tsx */}
    </div>
  );
}

// All three pages render simultaneously
// URL: /dashboard (no change)

// ─── CONDITIONAL RENDERING ─────────────────────────────────
export default function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      {children}
      {modal}  {/* Conditionally show modal */}
    </>
  );
}

// ─── DEFAULT.TSX (fallback when slot doesn't match) ───────
app/
  @modal/
    page.tsx        → Shows on /
    photo/
      [id]/
        page.tsx    → Shows on /photo/123
    default.tsx     → Fallback for other routes

// @modal/default.tsx
export default function Default() {
  return null;  // No modal on non-modal routes
}

// ─── USE CASE: MODAL WITH ROUTE ────────────────────────────
app/
  layout.tsx
  page.tsx           → /
  @modal/
    default.tsx      → null (no modal by default)
    (.)photo/
      [id]/
        page.tsx     → Modal at /photo/123
  photo/
    [id]/
      page.tsx       → Full page if directly navigated

// layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}  {/* Shows as overlay when route matches */}
      </body>
    </html>
  );
}`,
    note: "Parallel routes enable soft navigation (no page reload) for complex UIs. Each slot can have its own loading/error states. Use default.tsx to handle unmatched routes in slots. Great for dashboards with multiple data sources.",
  },
  {
    id: "intercepting-routes",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "Intercepting Routes (..)",
    desc: "Intercepting routes let you load a route from another part of the app. Common for modals that show when navigating but display full page on refresh. Use (.) (..) (..)(..) (...) to specify interception level.",
    code: `// Use case: Instagram-style photo modal

// Folder structure:
app/
  page.tsx                  → / (feed)
  photo/
    [id]/
      page.tsx              → /photo/123 (full page)
  @modal/
    (.)photo/
      [id]/
        page.tsx            → /photo/123 (modal, soft nav)

// Interception levels:
// (.)  = same level
// (..) = one level up
// (..)(..) = two levels up
// (...) = root (app directory)

// Feed page with links
// app/page.tsx
export default function Feed() {
  return (
    <div>
      {photos.map(photo => (
        <Link href={\`/photo/\${photo.id}\`}>
          <img src={photo.thumbnail} />
        </Link>
      ))}
    </div>
  );
}

// Modal (intercepts when clicking from feed)
// app/@modal/(.)photo/[id]/page.tsx
export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  return (
    <div className="modal-backdrop" onClick={() => router.back()}>
      <div className="modal">
        <PhotoDetails id={params.id} />
      </div>
    </div>
  );
}

// Full page (shows on direct navigation or refresh)
// app/photo/[id]/page.tsx
export default function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header />
      <PhotoDetails id={params.id} />
      <Comments photoId={params.id} />
    </div>
  );
}

// Layout with modal slot
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}

// ─── EXAMPLE: NESTED INTERCEPTION ──────────────────────────
app/
  dashboard/
    page.tsx                     → /dashboard
    settings/
      page.tsx                   → /dashboard/settings
      (.)profile/
        page.tsx                 → Intercepts /dashboard/profile
    profile/
      page.tsx                   → /dashboard/profile (full page)

// Soft nav within dashboard shows modal
// Direct nav or refresh shows full page`,
    note: "Intercepting routes + parallel routes = powerful modal pattern. The modal appears on soft navigation (Link) but full page shows on hard navigation (direct URL, refresh). Perfect for galleries, auth flows, or previews.",
  },
  {
    id: "server-actions",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "Server Actions",
    desc: "Server Actions are async functions that run on the server. Define with 'use server' at function or file level. Call them from Client or Server Components. Great for forms, mutations, and avoiding API routes.",
    code: `// ─── SERVER ACTION (inline) ────────────────────────────────
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  await db.post.create({
    data: { title, content },
  });
  
  revalidatePath('/blog');  // Clear cache
  redirect('/blog');        // Navigate
}

// ─── USE IN SERVER COMPONENT ───────────────────────────────
import { createPost } from './actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
// Progressive enhancement: works without JS!

// ─── USE IN CLIENT COMPONENT ───────────────────────────────
'use client';

import { createPost } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();  // Form state hook
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  );
}

export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <SubmitButton />
    </form>
  );
}

// ─── WITH VALIDATION (useFormState) ────────────────────────
'use client';

import { useFormState } from 'react-dom';

// Action with state
async function createPostWithValidation(
  prevState: { message: string } | null,
  formData: FormData
) {
  'use server';
  
  const title = formData.get('title') as string;
  
  if (title.length < 5) {
    return { message: 'Title must be at least 5 characters' };
  }
  
  await db.post.create({ data: { title } });
  revalidatePath('/blog');
  
  return { message: 'Post created!' };
}

export default function FormWithValidation() {
  const [state, formAction] = useFormState(createPostWithValidation, null);
  
  return (
    <form action={formAction}>
      <input name="title" required />
      {state?.message && <p>{state.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

// ─── NON-FORM USAGE ────────────────────────────────────────
'use client';

import { deletePost } from './actions';

function DeleteButton({ id }: { id: string }) {
  return (
    <button onClick={() => deletePost(id)}>
      Delete
    </button>
  );
}

// actions.ts
'use server';

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });
  revalidatePath('/blog');
}`,
    note: "Server Actions eliminate many API routes. They work with or without JavaScript (progressive enhancement). Use with useFormState for validation, useFormStatus for pending states. Careful with security — validate all inputs!",
  },

  // ─── DATA FETCHING ─────────────────────────────────────────────────────────
  {
    id: "fetch-caching",
    category: "Data Fetching",
    badgeClass: "badge-green",
    title: "fetch() with Cache Options",
    desc: "Next.js extends fetch() with caching options. 'force-cache' (default) = cached indefinitely, 'no-store' = fetch every request, revalidate = ISR.",
    code: `// ─── FORCE-CACHE (default) ─────────────────────────────────
// Cached indefinitely (SSG behavior)
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache',  // default, can omit
  });
  
  return <div>{data.title}</div>;
}
// Fetched at build time, served from cache

// ─── NO-STORE (dynamic) ────────────────────────────────────
// Fetch on every request (SSR behavior)
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store',  // always fresh
  });
  
  return <div>{data.title}</div>;
}
// Equivalent to getServerSideProps

// ─── REVALIDATE (ISR) ──────────────────────────────────────
// Cache for N seconds, then revalidate in background
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 },  // 60 seconds
  });
  
  return <div>{data.title}</div>;
}
// First 60s → cached. After 60s → stale, revalidate on next request

// ─── CACHE TAGS (on-demand revalidation) ───────────────────
async function Page() {
  const data = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] },
  });
  
  return <PostList posts={data} />;
}

// In Server Action or Route Handler:
import { revalidateTag } from 'next/cache';

export async function createPost() {
  'use server';
  await db.post.create({ data: {...} });
  revalidateTag('posts');  // Invalidate all fetches tagged 'posts'
}

// ─── PAGE-LEVEL REVALIDATE ─────────────────────────────────
// app/blog/page.tsx
export const revalidate = 3600;  // 1 hour

async function BlogPage() {
  // All fetches on this page default to 1-hour revalidation
  const posts = await fetch('https://api.example.com/posts');
  return <PostList posts={posts} />;
}

// ─── DYNAMIC RENDERING ─────────────────────────────────────
// Force dynamic rendering for entire page
export const dynamic = 'force-dynamic';

async function Page() {
  const data = await fetch('https://api.example.com/data');
  // Treated as no-store even without cache option
  return <div>{data.title}</div>;
}`,
    note: "Next.js deduplicates identical fetch requests in the same render pass. Cache config persists across builds. Use tags for surgical cache invalidation. no-store disables cache completely.",
  },
  {
    id: "waterfalls",
    category: "Data Fetching",
    badgeClass: "badge-green",
    title: "Parallel vs Sequential Fetching",
    desc: "Sequential fetching creates waterfalls (slow). Parallel fetching with Promise.all is faster. Server Components enable parallel data fetching by default.",
    code: `// ❌ BAD: Sequential waterfall
async function Page() {
  const user = await fetchUser();        // 200ms
  const posts = await fetchPosts(user.id); // waits 200ms, then 300ms
  const comments = await fetchComments();  // waits 200ms + 300ms, then 150ms
  
  // Total: 200 + 300 + 150 = 650ms
  
  return <div>...</div>;
}

// ✅ GOOD: Parallel fetching
async function Page() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),        // 200ms
    fetchPosts(),       // 300ms  } all start at once
    fetchComments(),    // 150ms
  ]);
  
  // Total: Math.max(200, 300, 150) = 300ms
  
  return <div>...</div>;
}

// ✅ GOOD: Parallel component fetching
async function UserProfile() {
  const user = await fetchUser();
  return <div>{user.name}</div>;
}

async function PostsList() {
  const posts = await fetchPosts();
  return <div>{posts.map(...)}</div>;
}

async function Page() {
  // Both components fetch in parallel automatically
  return (
    <div>
      <UserProfile />
      <PostsList />
    </div>
  );
}
// Next.js renders Server Components in parallel

// ─── DEPENDENT DATA (necessary sequential) ─────────────────
async function Page() {
  const user = await fetchUser();
  
  // Must wait for user before fetching their posts
  const posts = await fetchUserPosts(user.id);
  
  return <div>...</div>;
}

// Better: Let child component handle it
async function Page() {
  const user = await fetchUser();
  
  return (
    <div>
      <UserInfo user={user} />
      {/* Starts fetching as soon as user available */}
      <UserPosts userId={user.id} />
    </div>
  );
}

async function UserPosts({ userId }: { userId: string }) {
  const posts = await fetchUserPosts(userId);
  return <div>{posts.map(...)}</div>;
}

// ─── STREAMING WITH SUSPENSE ───────────────────────────────
async function Page() {
  const fastData = await fetchFastData();  // 100ms
  
  return (
    <div>
      <FastContent data={fastData} />
      
      {/* Stream slow content separately */}
      <Suspense fallback={<Spinner />}>
        <SlowContent />  {/* 5 seconds, doesn't block fast content */}
      </Suspense>
    </div>
  );
}

async function SlowContent() {
  const slowData = await fetchSlowData();  // 5 seconds
  return <div>{slowData}</div>;
}`,
    note: "Server Components fetch in parallel by default unless inside Suspense boundaries. Use Promise.all when data is independent. Use Suspense to stream slow content. Monitor Network tab to catch waterfalls.",
  },
  {
    id: "route-handlers",
    category: "Data Fetching",
    badgeClass: "badge-green",
    title: "Route Handlers (route.ts)",
    desc: "Route Handlers replace API Routes in App Router. Create route.ts or route.js in any folder under app/ to define endpoints. Support GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS.",
    code: `// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/posts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  const posts = await db.post.findMany({
    where: query ? { title: { contains: query } } : {},
  });
  
  return NextResponse.json(posts);
}

// POST /api/posts
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const post = await db.post.create({
    data: { title: body.title, content: body.content },
  });
  
  return NextResponse.json(post, { status: 201 });
}

// ─── DYNAMIC ROUTES ────────────────────────────────────────
// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({ where: { id: params.id } });
  
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.post.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}

// ─── HEADERS, COOKIES, STREAMING ───────────────────────────
import { cookies } from 'next/headers';

export async function GET() {
  // Read cookies
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  // Set headers
  return NextResponse.json(
    { data: 'Hello' },
    {
      headers: {
        'X-Custom-Header': 'value',
        'Set-Cookie': 'name=value; Path=/; HttpOnly',
      },
    }
  );
}

// Streaming response
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue('chunk 1');
      await delay(1000);
      controller.enqueue('chunk 2');
      controller.close();
    },
  });
  
  return new Response(stream);
}

// ─── CORS (enable for external clients) ───────────────────
export async function GET() {
  return NextResponse.json({ data: 'Hello' }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },
  });
}

// ─── PAGES ROUTER API ROUTES (legacy) ──────────────────────
// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = await db.post.findMany();
    res.status(200).json(posts);
  } else {
    res.status(405).end();  // Method not allowed
  }
}`,
    note: "Route Handlers are Server Components that return a Response. Use for API endpoints, webhooks, proxying external APIs. Server Actions often eliminate the need for mutation endpoints. Route Handlers support streaming and middleware.",
  },

  // ─── PAGES ROUTER DATA FETCHING (Legacy but Interview-Important) ───────
  {
    id: "get-static-props",
    category: "Pages Router",
    badgeClass: "badge-purple",
    title: "getStaticProps - Static Site Generation (SSG)",
    desc: "Pages Router method for SSG. Runs at build time to fetch data and generate static HTML. Perfect for content that doesn't change often (blog posts, marketing pages). Data is baked into HTML at build time.",
    code: `// pages/blog/[slug].tsx
import { GetStaticProps } from 'next';

interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
}

interface Props {
  post: Post;
}

// ✅ RUNS AT BUILD TIME (during npm run build)
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { params } = context;
  
  // Fetch data from any source
  const post = await fetch(\`https://api.example.com/posts/\${params?.slug}\`)
    .then(res => res.json());
  
  // Or database query
  // const post = await db.post.findUnique({ where: { slug: params?.slug } });
  
  // Return props to component
  return {
    props: {
      post,
    },
    // Optional: Incremental Static Regeneration (ISR)
    // revalidate: 60,  // Re-generate page every 60 seconds
  };
};

// Component receives props
export default function BlogPost({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// ─── WITH ISR (Incremental Static Regeneration) ────────────
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetchData(params?.id);
  
  return {
    props: { data },
    revalidate: 10,  // ⏱️ Regenerate at most every 10 seconds
  };
};
// First 10s → serve cached. After 10s → stale, rebuild on next request

// ─── NOT FOUND & REDIRECT ──────────────────────────────────
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await db.post.findUnique({ where: { slug: params?.slug } });
  
  // Show 404 page
  if (!post) {
    return { notFound: true };
  }
  
  // Redirect (e.g., unpublished post)
  if (!post.published) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }
  
  return { props: { post } };
};

// ─── PREVIEW MODE (for CMS draft content) ──────────────────
export const getStaticProps: GetStaticProps = async ({ preview = false, previewData }) => {
  // If preview mode, fetch draft content
  const data = preview
    ? await fetchDraftContent(previewData)
    : await fetchPublishedContent();
  
  return { props: { data, preview } };
};`,
    note: "getStaticProps runs ONLY at build time (never in browser or on server during requests). Generated HTML is reused for every request. Use for content that can be pre-rendered. Add 'revalidate' for ISR to periodically rebuild pages. App Router equivalent: fetch with cache: 'force-cache'.",
  },
  {
    id: "get-server-side-props",
    category: "Pages Router",
    badgeClass: "badge-purple",
    title: "getServerSideProps - Server-Side Rendering (SSR)",
    desc: "Pages Router method for SSR. Runs on EVERY request on the server. Use when data must be fresh for each user (user dashboards, personalized content, real-time data). Slower than SSG but always up-to-date.",
    code: `// pages/dashboard.tsx
import { GetServerSideProps } from 'next';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  user: User;
  posts: Post[];
}

// ✅ RUNS ON EVERY REQUEST (server-side only)
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { req, res, params, query } = context;
  
  // Access cookies from request
  const token = req.cookies.token;
  
  // Fetch user based on auth token
  const user = await fetch('https://api.example.com/me', {
    headers: { Authorization: \`Bearer \${token}\` },
  }).then(res => res.json());
  
  // Fetch personalized content
  const posts = await db.post.findMany({
    where: { authorId: user.id },
  });
  
  return {
    props: {
      user,
      posts,
    },
  };
};

export default function Dashboard({ user, posts }: Props) {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}

// ─── AUTHENTICATION & REDIRECTS ────────────────────────────
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);
  
  // Redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/dashboard',
        permanent: false,
      },
    };
  }
  
  const userData = await fetchUserData(session.userId);
  
  return { props: { user: userData } };
};

// ─── SETTING HEADERS & COOKIES ─────────────────────────────
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set custom headers
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  
  // Set cookies
  res.setHeader('Set-Cookie', 'sessionId=abc123; Path=/; HttpOnly');
  
  const data = await fetchData();
  return { props: { data } };
};

// ─── USING QUERY PARAMETERS ────────────────────────────────
// URL: /search?q=nextjs&page=2
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = query.q as string;
  const page = parseInt(query.page as string) || 1;
  
  const results = await searchPosts(searchQuery, page);
  
  return { props: { results, query: searchQuery, page } };
};

// ─── NOT FOUND (404) ───────────────────────────────────────
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = await db.product.findUnique({ 
    where: { id: params?.id as string } 
  });
  
  if (!product) {
    return { notFound: true };  // Shows 404 page
  }
  
  return { props: { product } };
};

// ─── ERROR HANDLING ────────────────────────────────────────
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await fetchExternalAPI();
    return { props: { data } };
  } catch (error) {
    console.error('Failed to fetch:', error);
    
    // Pass error to component
    return {
      props: {
        error: 'Failed to load data',
        data: null,
      },
    };
  }
};`,
    note: "getServerSideProps ALWAYS runs on the server for EVERY request. Use when data must be request-specific (auth, user-specific content, search results). Slower than getStaticProps but always fresh. Cannot be used with Static Export. App Router equivalent: fetch with cache: 'no-store' or export const dynamic = 'force-dynamic'.",
  },
  {
    id: "get-static-paths",
    category: "Pages Router",
    badgeClass: "badge-purple",
    title: "getStaticPaths - Dynamic Route Generation",
    desc: "Required when using getStaticProps with dynamic routes. Defines which paths to pre-render at build time. Returns array of params objects. Use 'fallback' to control behavior for paths not in the list.",
    code: `// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';

// ✅ STEP 1: Define which paths to build
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all blog post slugs
  const posts = await db.post.findMany({
    select: { slug: true },
  });
  
  // Generate paths from database data
  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }));
  
  // Example output:
  // paths = [
  //   { params: { slug: 'intro-to-nextjs' } },
  //   { params: { slug: 'react-18-features' } },
  //   { params: { slug: 'typescript-tips' } },
  // ];
  
  return {
    paths,
    fallback: false,  // See fallback options below
  };
};

// ✅ STEP 2: Fetch data for each path
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { slug: params?.slug as string },
  });
  
  return { props: { post } };
};

export default function BlogPost({ post }: { post: Post }) {
  return <article>{/* render post */}</article>;
}

// ─── FALLBACK OPTIONS ──────────────────────────────────────

// 1️⃣ fallback: false
// - Only paths in 'paths' are pre-rendered
// - All other paths → 404
// - Use when: small number of pages, all known at build time
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: false,  // /posts/3 → 404
  };
};

// 2️⃣ fallback: true
// - Paths in 'paths' → pre-rendered at build
// - Other paths → Next.js generates on-demand on first request
// - Shows loading state while generating
export const getStaticPaths: GetStaticPaths = async () => {
  // Only pre-render top 10 popular posts
  const topPosts = await getTop10Posts();
  
  return {
    paths: topPosts.map(p => ({ params: { slug: p.slug } })),
    fallback: true,  // Other posts generated on first visit
  };
};

// Component must handle loading state
export default function Post({ post }: { post: Post }) {
  const router = useRouter();
  
  // Show loading while generating page
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <article>{post.title}</article>;
}

// 3️⃣ fallback: 'blocking'
// - Similar to 'true' but waits for page to generate
// - No loading state needed (user waits for full page)
// - Better for SEO (no loading flicker)
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],  // Generate all pages on-demand
    fallback: 'blocking',  // Wait for generation, then serve
  };
};

// No loading state needed
export default function Post({ post }: { post: Post }) {
  return <article>{post.title}</article>;
}

// ─── MULTI-SEGMENT DYNAMIC ROUTES ──────────────────────────
// pages/[category]/[slug].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await db.post.findMany({
    select: { category: true, slug: true },
  });
  
  const paths = posts.map(post => ({
    params: {
      category: post.category,
      slug: post.slug,
    },
  }));
  
  // Generates: /tech/nextjs-guide, /design/figma-tips, etc.
  return { paths, fallback: 'blocking' };
};

// ─── CATCH-ALL ROUTES ──────────────────────────────────────
// pages/docs/[...slug].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: ['intro'] } },
      { params: { slug: ['guide', 'installation'] } },
      { params: { slug: ['api', 'reference', 'fetch'] } },
    ],
    fallback: false,
  };
};
// Matches: /docs/intro, /docs/guide/installation, /docs/api/reference/fetch`,
    note: "getStaticPaths only runs at build time and only for dynamic routes using getStaticProps. 'paths' defines pre-rendered pages. 'fallback: false' = strict (404 for unlisted), 'fallback: true' = on-demand with loading state, 'fallback: blocking' = on-demand without loading state (waits for generation). Use 'blocking' for better SEO. App Router auto-generates with generateStaticParams.",
  },
  {
    id: "pages-isr-revalidate",
    category: "Pages Router",
    badgeClass: "badge-purple",
    title: "ISR (Incremental Static Regeneration) - Pages Router",
    desc: "Combine benefits of SSG and SSR. Pre-render at build, then regenerate in background after 'revalidate' seconds. Stale-while-revalidate pattern: serve cached page while rebuilding. Also supports on-demand revalidation.",
    code: `// pages/posts/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';

// ✅ ENABLE ISR: Add 'revalidate' to getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetch(\`https://api.example.com/posts/\${params?.id}\`)
    .then(res => res.json());
  
  return {
    props: { post },
    revalidate: 60,  // ⏱️ Regenerate at most every 60 seconds
  };
};

// How ISR works:
// 1. User visits page within 60s → Serve cached version (instant)
// 2. After 60s, next visitor:
//    a) Gets cached version (stale but instant)
//    b) Next.js rebuilds page in background
//    c) Subsequent visitors get new version
// 3. Repeat every 60s

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],  // No pages pre-rendered at build
    fallback: 'blocking',  // Generate on first visit, then cache + revalidate
  };
};

export default function Post({ post }: { post: Post }) {
  return <article>{post.title}</article>;
}

// ─── ON-DEMAND REVALIDATION (Next.js 12.2+) ────────────────
// Trigger regeneration without waiting for revalidate time

// pages/api/revalidate.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm request is valid
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  try {
    // Revalidate specific path
    await res.revalidate('/posts/1');
    
    // Success
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}

// Trigger from webhook (e.g., when CMS content updates):
// POST /api/revalidate?secret=YOUR_SECRET&path=/posts/123

// ─── MULTIPLE PATHS REVALIDATION ───────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const paths = ['/posts/1', '/posts/2', '/blog'];
  
  try {
    await Promise.all(paths.map(path => res.revalidate(path)));
    return res.json({ revalidated: true, paths });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}

// ─── ISR WITH DYNAMIC DATA ─────────────────────────────────
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [post, comments, relatedPosts] = await Promise.all([
    fetchPost(params?.id),
    fetchComments(params?.id),
    fetchRelatedPosts(params?.id),
  ]);
  
  return {
    props: { post, comments, relatedPosts },
    revalidate: 300,  // 5 minutes
  };
};

// ─── USE CASES ─────────────────────────────────────────────

// 1. Blog posts - revalidate: 3600 (1 hour)
// Content doesn't change often but needs updates

// 2. E-commerce products - revalidate: 60 (1 minute)
// Prices/stock change frequently but instant isn't critical

// 3. User profiles - revalidate: 10 (10 seconds)
// Balance freshness with performance

// 4. Marketing pages - revalidate: 86400 (24 hours)
// Rarely change, mostly static

// 5. Real-time data - DON'T use ISR
// Use getServerSideProps instead for truly real-time data`,
    note: "ISR = best of both worlds. Pages are static (fast) but can update without rebuilding entire site. 'revalidate' = seconds to cache page. After time expires, next request triggers background rebuild (stale-while-revalidate). Use on-demand revalidation (res.revalidate) to immediately update specific pages (e.g., when CMS webhook fires). App Router equivalent: fetch with next: { revalidate: 60 }.",
  },

  // ─── OPTIMIZATION ──────────────────────────────────────────────────────────
  {
    id: "next-image",
    category: "Optimization",
    badgeClass: "badge-cyan",
    title: "next/image Optimization",
    desc: "next/image automatically optimizes images: lazy loading, WebP/AVIF conversion, responsive sizes, blur placeholders. Required width/height or fill prop.",
    code: `// Basic usage
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority  // Load above fold immediately (no lazy load)
/>

// ─── FILL MODE (replaces width/height) ────────────────────
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/banner.jpg"
    alt="Banner"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>

// ─── RESPONSIVE SIZES ──────────────────────────────────────
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
// Tells browser which size to load based on viewport

// ─── EXTERNAL IMAGES ───────────────────────────────────────
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
  },
};

// Usage
<Image
  src="https://example.com/images/photo.jpg"
  alt="Remote image"
  width={800}
  height={600}
/>

// ─── BLUR PLACEHOLDER ──────────────────────────────────────
// Static import (auto-generates blur)
import heroImg from '@/public/hero.jpg';

<Image
  src={heroImg}
  alt="Hero"
  placeholder="blur"  // auto blur from import
/>

// Remote image with custom blur
<Image
  src="https://example.com/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ─── LAZY LOADING (default) ────────────────────────────────
<Image
  src="/image.jpg"
  alt="Below fold"
  width={800}
  height={600}
  loading="lazy"  // default (can omit)
/>

// Disable lazy loading for above-the-fold images
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // loads immediately, disables lazy load
/>

// ─── QUALITY & FORMATS ─────────────────────────────────────
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  quality={75}  // 1-100, default 75
/>

// next.config.js — configure formats
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],  // AVIF first, fallback WebP
  },
};`,
    note: "next/image is a drop-in replacement for <img>. Always use it — auto-optimization is huge for performance. Use priority for above-fold images. Use fill for backgrounds. Static imports get automatic blur placeholders.",
  },
  {
    id: "next-font",
    category: "Optimization",
    badgeClass: "badge-cyan",
    title: "next/font Optimization",
    desc: "next/font loads fonts at build time, self-hosts them, and eliminates layout shift. Supports Google Fonts and local fonts. Automatically inlines font CSS.",
    code: `// ─── GOOGLE FONTS ──────────────────────────────────────────
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // optional: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

// ─── VARIABLE FONTS ────────────────────────────────────────
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',  // CSS variable
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

// globals.css
body {
  font-family: var(--font-inter), sans-serif;
}

// ─── MULTIPLE FONTS ────────────────────────────────────────
import { Inter, Fira_Code } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

<html className={\`\${inter.variable} \${firaCode.variable}\`}>
  <body>{children}</body>
</html>

// globals.css
body { font-family: var(--font-inter); }
code { font-family: var(--font-mono); }

// ─── LOCAL FONTS ───────────────────────────────────────────
import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    {
      path: './fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-font',
});

// ─── PRELOAD (default true) ────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  preload: true,  // <link rel="preload"> added to <head>
});

// ─── ADJUSTING FALLBACK FONTS ──────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  adjustFontFallback: true,  // default, matches metrics to reduce CLS
});`,
    note: "next/font eliminates FOUT (flash of unstyled text) and layout shift. Fonts are self-hosted (no Google CDN request). Use variable for CSS custom properties. Fallback font metrics adjusted to match web font.",
  },
  {
    id: "middleware",
    category: "App Router",
    badgeClass: "badge-blue",
    title: "Middleware & Auth",
    desc: "Middleware runs before every request. Use for auth checks, redirects, rewrites, headers. Runs on the Edge (fast, globally distributed). Define in middleware.ts at project root.",
    code: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Add custom header
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
}

// Optional: specify which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

// ─── REWRITES & REDIRECTS ──────────────────────────────────
export function middleware(request: NextRequest) {
  // Rewrite (URL stays same, content from different route)
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.rewrite(new URL('/new-path', request.url));
  }
  
  // Redirect (URL changes)
  if (request.nextUrl.pathname === '/deprecated') {
    return NextResponse.redirect(new URL('/new', request.url), 301);
  }
  
  return NextResponse.next();
}

// ─── A/B TESTING ───────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const bucket = request.cookies.get('bucket')?.value || 
                 Math.random() < 0.5 ? 'a' : 'b';
  
  const response = NextResponse.rewrite(
    new URL(\`/experiment/\${bucket}\`, request.url)
  );
  
  response.cookies.set('bucket', bucket);
  return response;
}

// ─── GEO-LOCATION ──────────────────────────────────────────
export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  
  // Redirect based on country
  if (country === 'GB' && !request.nextUrl.pathname.startsWith('/uk')) {
    return NextResponse.redirect(new URL('/uk', request.url));
  }
  
  return NextResponse.next();
}

// ─── AUTH WITH NEXTAUTH ────────────────────────────────────
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === 'admin',
  },
});

export const config = { matcher: ['/admin/:path*'] };

// ─── LIMITATIONS ───────────────────────────────────────────
// - Runs on Edge runtime (not Node.js)
// - No Node.js APIs (fs, child_process, etc.)
// - Response body max 4MB
// - Execution time limit (varies by plan)`,
    note: "Middleware runs on every request before rendering. Use for auth, localization, A/B testing, bot detection. Runs on Edge = fast globally. Can't use Node.js APIs. For heavy logic, use Server Components or Route Handlers.",
  },
  {
    id: "build-process",
    category: "Build & Deploy",
    badgeClass: "badge-orange",
    title: "Build Process (npm run build) - What Happens?",
    desc: "Understanding the Next.js build process: compilation, static generation, optimization, and why you see console.logs during build. Learn how Next.js determines what to pre-render and what stays dynamic.",
    code: `// 🏗️ BUILD COMMAND: npm run build
// 
// Output you see:
// ✓ Compiled successfully
// ✓ Linting and checking validity of types
// ✓ Collecting page data
//   Generating static pages (13/22)  [===]
//   🔥 Lazy initializer runs ONCE        ← Your console.logs!
//   🔄 useMemo: sorting...               ← Your console.logs!
// ✓ Generating static pages (22/22)
// ✓ Collecting build traces
// ✓ Finalizing page optimization
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 🤔 WHY DO CONSOLE.LOGS APPEAR DURING BUILD?
// ─────────────────────────────────────────────────────────────

// Answer: Server Components execute at BUILD TIME for static pages
// Your component code literally runs during "npm run build"

// Example: app/hooks/page.tsx
export default function HooksPage() {
  // This code runs at BUILD TIME for static pages
  const [items] = useState(() => {
    console.log("🔥 Lazy initializer runs ONCE");  // ← Executes during build!
    return generateItems();
  });
  
  const sorted = useMemo(() => {
    console.log("🔄 useMemo: sorting...");  // ← Executes during build!
    return items.sort();
  }, [items]);
  
  return <div>{/* JSX */}</div>;
}

// During build, Next.js:
// 1. Executes your Server Component
// 2. Captures the rendered HTML
// 3. Saves to .next/server/app/hooks.html
// 4. At runtime → serves pre-rendered HTML (instant load!)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 📊 BUILD PHASES EXPLAINED
// ─────────────────────────────────────────────────────────────

// PHASE 1: Compilation
// "✓ Compiled successfully"
// - TypeScript → JavaScript
// - React components → optimized code
// - CSS processing & minification
// - Webpack/Turbopack bundling

// PHASE 2: Linting & Type Checking
// "✓ Linting and checking validity of types"
// - Runs ESLint on all files
// - TypeScript type checking (tsc --noEmit)
// - Catches errors before deployment

// PHASE 3: Collecting Page Data
// "✓ Collecting page data"
// - Discovers all routes (app/, pages/)
// - Determines rendering strategy for each page
// - Identifies static vs dynamic pages

// PHASE 4: Generating Static Pages
// "✓ Generating static pages (22/22)"
// - Executes Server Components for static pages
// - Runs getStaticProps/getStaticPaths (Pages Router)
// - Pre-renders HTML for each static route
// - ⚠️ YOUR CODE RUNS HERE (console.logs appear!)

// PHASE 5: Build Traces
// "✓ Collecting build traces"
// - Analyzes dependencies for each page
// - Creates minimal bundles (code splitting)
// - Tree shaking unused code

// PHASE 6: Optimization
// "✓ Finalizing page optimization"
// - Minifies JavaScript & CSS
// - Generates static assets
// - Creates .next/ output folder

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 🔍 HOW NEXT.JS DETERMINES STATIC VS DYNAMIC
// ─────────────────────────────────────────────────────────────

// ✅ STATIC (Pre-rendered at build):
// - No dynamic functions (cookies, headers, searchParams)
// - No 'use client' with useSearchParams/usePathname reading search params
// - fetch() with default cache: 'force-cache'
// - No export const dynamic = 'force-dynamic'

async function StaticPage() {
  // Static data fetch (cached)
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache',  // default
  });
  
  return <div>{data.title}</div>;
}
// ↑ Executed during build → HTML saved → instant runtime

// ❌ DYNAMIC (Rendered at request time):
// - Uses cookies(), headers(), searchParams
// - fetch() with cache: 'no-store'
// - export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers';

async function DynamicPage() {
  const token = cookies().get('token');  // ← Dynamic function!
  
  // Page is now DYNAMIC (rendered at request time)
  return <div>User: {token}</div>;
}
// ↑ NOT executed during build → runs on every request

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 📈 READING BUILD OUTPUT
// ─────────────────────────────────────────────────────────────

// After build completes, you see:

// Route (app)                              Size     First Load JS
// ┌ ○ /                                    5.02 kB        92.1 kB
// ├ ○ /about                               1.23 kB        88.3 kB
// ├ λ /api/posts                           0 B                0 B
// ├ ● /blog/[slug]                         2.45 kB        89.5 kB
// ├ ƒ /dashboard                           3.12 kB        90.2 kB
// └ ○ /posts                               4.56 kB        91.6 kB

// LEGEND:
// ○  Static    - Pre-rendered at build (instant)
// ●  SSG       - Static with getStaticProps/generateStaticParams
// λ  Server    - Route Handler (API endpoint)
// ƒ  Dynamic   - Rendered on every request (SSR)
// ℹ  ISR       - Static with revalidation

// First Load JS:
// - JavaScript downloaded on first page visit
// - Includes shared chunks (React, Next.js runtime)
// - Keep under 100 kB for best performance

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 📦 BUILD OUTPUT FILES (.next folder)
// ─────────────────────────────────────────────────────────────

// .next/
//   static/              → Static assets (hashed filenames)
//     chunks/            → JavaScript bundles
//     css/               → Stylesheets
//     media/             → Images, fonts
//   server/              → Server-side code
//     app/               → Pre-rendered HTML pages
//     chunks/            → Server Components
//   cache/               → Build cache (speeds up rebuilds)
//   standalone/          → Minimal Node.js server (if output: 'standalone')

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 🎯 KEY TAKEAWAYS
// ─────────────────────────────────────────────────────────────

// 1. Static pages execute during build
//    → Your component code runs
//    → console.logs appear
//    → HTML is saved for instant serving

// 2. "Generating static pages (13/22)"
//    → Next.js found 22 total pages
//    → 13 pages so far have been pre-rendered
//    → Progress updates as build continues

// 3. Build = Compile + Render + Optimize
//    → Not just bundling code
//    → Actually executing your components
//    → Creating production-ready HTML

// 4. Static = Fast, Dynamic = Fresh
//    → Static: Pre-rendered (build) → serve cached HTML
//    → Dynamic: Render on-demand (request) → always fresh

// 5. App Router default = Static
//    → Unless you use dynamic functions
//    → Or fetch with cache: 'no-store'
//    → Or export const dynamic = 'force-dynamic'`,
    note: "Build process pre-renders static pages by executing your Server Components. This is why console.logs appear during 'npm run build' — your code literally runs! Static pages = instant load. Dynamic pages = skipped during build, rendered at request time. Understanding this is critical for performance optimization.",
  },
  {
    id: "deployment",
    category: "Build & Deploy",
    badgeClass: "badge-orange",
    title: "Deployment & Config",
    desc: "next.config.js configures Next.js behavior: environment variables, rewrites, redirects, headers, custom webpack. Understand output modes (standalone, export) for different deployment targets.",
    code: `// ─── next.config.js ────────────────────────────────────────
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables
  env: {
    CUSTOM_VAR: 'value',
  },
  
  // Redirects (permanent)
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,  // 308
      },
      {
        source: '/docs',
        destination: '/documentation',
        permanent: false,  // 307
      },
    ];
  },
  
  // Rewrites (URL stays same)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',  // Proxy
      },
    ];
  },
  
  // Custom headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Output mode
  output: 'standalone',  // or 'export'
  
  // Webpack customization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
  // Experimental features
  experimental: {
    serverActions: true,
    ppr: true,  // Partial Prerendering
  },
};

module.exports = nextConfig;

// ─── ENVIRONMENT VARIABLES ─────────────────────────────────
// .env.local (gitignored)
DB_HOST=localhost
DB_PASSWORD=secret
NEXT_PUBLIC_API_URL=https://api.example.com

// Access in Server Components
const dbHost = process.env.DB_HOST;

// Access in Client Components
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//             ^^^^^^^^^^^^ NEXT_PUBLIC_ prefix required for client

// ─── OUTPUT MODES ──────────────────────────────────────────

// standalone: Optimized Docker deployment
// output: 'standalone'
// Outputs: .next/standalone (minimal Node.js server)
// Usage: node .next/standalone/server.js

// export: Static HTML export (no server)
// output: 'export'
// No dynamic routes, SSR, ISR, or Server Actions
// Usage: Upload .out/ to static hosting (S3, GitHub Pages)

// ─── VERCEL DEPLOYMENT ─────────────────────────────────────
// 1. Push to GitHub
// 2. Connect to Vercel
// 3. Auto-deploy on push

// vercel.json (optional config)
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]  // Washington DC (closest to your users)
}

// ─── SELF-HOSTING (Node.js) ────────────────────────────────
// 1. Set output: 'standalone' in next.config.js
// 2. Build: npm run build
// 3. Start: node .next/standalone/server.js

// Docker:
FROM node:18-alpine
WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
    note: "NEXT_PUBLIC_ prefix exposes env vars to the browser — never put secrets there. standalone output is best for Docker. export is static-only (no server features). Vercel deployment is zero-config.",
  },
];

const categories = ["App Router", "Data Fetching", "Optimization", "Deployment"];

const categoryMeta: Record<string, { badge: string; icon: string }> = {
  "App Router": { badge: "badge-blue", icon: "🧭" },
  "Data Fetching": { badge: "badge-green", icon: "📊" },
  "Optimization": { badge: "badge-cyan", icon: "⚡" },
  "Deployment": { badge: "badge-orange", icon: "🚀" },
};

export default function NextJSPage() {
  const grouped = categories.map((cat) => ({
    name: cat,
    items: concepts.filter((c) => c.category === cat),
  }));

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-blue">Next.js</span>
          <span className="badge badge-cyan">{concepts.length} Concepts</span>
          <span className="badge badge-green">Server Component</span>
        </div>
        <h1>Next.js Concepts</h1>
        <p>
          Complete Next.js App Router reference: Server Components, data
          fetching, optimization, deployment, and production best practices.
        </p>
      </div>

      <div className="tip-box">
        <strong>📌 Interview Pro Tip</strong>
        Master Server vs Client Components, explain cache options (force-cache vs
        no-store), know when to use Server Actions vs Route Handlers, and
        understand ISR/PPR. Explain how Next.js improves React performance.
      </div>

      {grouped.map((group) => {
        const meta = categoryMeta[group.name];
        return (
          <section key={group.name}>
            <div className="category-header">
              <span className={`badge ${meta.badge}`}>
                {meta.icon} {group.name}
              </span>
              <h2>{group.name}</h2>
              <span style={{ color: "var(--muted)", fontSize: "0.75rem" }}>
                {group.items.length} concepts
              </span>
            </div>

            {group.items.map((concept) => (
              <div
                key={concept.id}
                id={concept.id}
                className="card concept-section"
                style={{ marginBottom: "1.2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    marginBottom: "0.6rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span className={`badge ${concept.badgeClass}`}>
                    {concept.category}
                  </span>
                  <h2
                    style={{
                      fontSize: "1.05rem",
                      fontFamily: "Syne, sans-serif",
                      margin: 0,
                    }}
                  >
                    {concept.title}
                  </h2>
                </div>

                <p style={{ marginBottom: "0.75rem" }}>{concept.desc}</p>

                <pre className="code-block">{concept.code}</pre>

                <div className="tip-box" style={{ marginBottom: 0 }}>
                  <strong>💡 Interview Note</strong> {concept.note}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
