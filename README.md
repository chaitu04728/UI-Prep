# ⚡ Next.js Concepts Explorer

> **Interview-ready demos** for every rendering strategy and core React hook.

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 📚 What's Covered

### Rendering Strategies

| Route | Strategy | Key API | When to Use |
|-------|----------|---------|-------------|
| `/ssg` | Static Site Generation | `revalidate = false` | Blogs, docs, marketing |
| `/ssr` | Server-Side Rendering | `dynamic = "force-dynamic"` | Auth-gated, personalized |
| `/isr` | Incremental Static Regen | `revalidate = 30` | E-commerce, news, prices |
| `/csr` | Client-Side Rendering | `useEffect + fetch` | Real-time, dashboards |

### React Hooks

| Hook | Demo | Use Case |
|------|------|----------|
| `useState` | Counter | Local component state |
| `useEffect` | Data fetching | Side effects, subscriptions |
| `useMemo` | Sorted numbers | Expensive computations |
| `useCallback` | Render counter | Stable function refs |
| `useRef` | DOM focus + render count | DOM access, mutable values |
| `useReducer` | Shopping cart | Complex state machine |
| `useContext` | Theme + auth | Global state, avoid prop drilling |

## 🎤 Quick Interview Cheatsheet

```
Q: SSG vs SSR vs ISR vs CSR?

SSG  → build time → fastest, CDN, staleness acceptable
SSR  → every request → always fresh, auth/personalized data
ISR  → build + background regen → best of SSG+SSR, bounded staleness  
CSR  → browser → real-time, interactive, no SEO for fetched data

Q: useMemo vs useCallback?

useMemo     → memoize a VALUE   (result of computation)
useCallback → memoize a FUNCTION (referential equality for props)

Q: useRef vs useState?

useRef   → change doesn't trigger re-render (DOM refs, timers, prev values)
useState → change DOES trigger re-render (display values)

Q: useContext vs Redux/Zustand?

Context    → low-frequency updates, small apps, avoids prop drilling
Redux/Zustand → high-frequency updates, complex selectors, devtools
```

## 🏗️ Project Structure

```
app/
  page.tsx          ← Home / Navigation overview
  ssg/page.tsx      ← Static Site Generation demo
  ssr/page.tsx      ← Server-Side Rendering demo
  isr/page.tsx      ← Incremental Static Regeneration demo
  csr/page.tsx      ← Client-Side Rendering + useState + useEffect
  hooks/page.tsx    ← useMemo + useCallback + useRef + useReducer
  context/page.tsx  ← createContext + useContext + custom hooks
  globals.css       ← Dark terminal theme (JetBrains Mono + Syne)
components/
  NavClient.tsx     ← Active-link aware navigation
```

## 🔑 Key Concepts by File

### `app/ssg/page.tsx`
- No `"use client"` → Server Component
- Default behavior in App Router = SSG
- `generateStaticParams` replaces `getStaticPaths`

### `app/ssr/page.tsx`
- `export const dynamic = "force-dynamic"` opts out of caching
- Access `cookies()` and `headers()` — server-only APIs
- Per-request timestamp proves SSR behavior

### `app/isr/page.tsx`
- `export const revalidate = 30` sets 30-second ISR window
- Stale-While-Revalidate: serve cached, regenerate in background
- `revalidatePath()` for on-demand invalidation

### `app/csr/page.tsx`
- `"use client"` + `useEffect(fn, [])` = CSR fetch pattern
- Loading state demonstrates the client-side fetch lifecycle
- `useState` with functional updates for safe async state

### `app/hooks/page.tsx`
- `useMemo` with dependency comparison live demo
- `useCallback` with render count badge proving re-renders
- `useRef` for both DOM access and mutable values
- `useReducer` with full shopping cart (add, remove, clear)

### `app/context/page.tsx`
- Full Provider → Context → Custom Hook → Consumer pattern
- Two contexts nested: ThemeContext + AuthContext
- Demonstrates no-prop-drilling across component tree
