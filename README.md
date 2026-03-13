<div align="center">
  <h1>⚡ Next.js Concepts Explorer</h1>
  
  <p><strong>A comprehensive, interview-ready guide and sandbox for exploring Next.js rendering strategies and React hooks.</strong></p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </div>
</div>

---

## 📖 About The Project

This repository serves as a **live playground and reference guide** for modern React and Next.js features. Whether you're preparing for frontend interviews, learning the Next.js App Router, or just need a quick cheat sheet on how rendering strategies work in Next.js 14+, this project has you covered.

### 🎯 Key Features
- **Live Demos**: Interactive examples of all major React hooks and Next.js rendering strategies (`SSG`, `SSR`, `ISR`, `CSR`).
- **Interview Cheatsheets**: Quick, bite-sized answers to common frontend interview questions.
- **Clean Structure**: Built on the Next.js 14 App Router to show the latest best practices.

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.17.0 or higher is recommended for Next.js 14+).

### Installation

1. Clone the repository and navigate into it:
```bash
git clone https://github.com/yourusername/nextjs-concepts.git
cd nextjs-concepts
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the concepts.

---

## 📚 What's Covered

### Rendering Strategies

| Route | Strategy | Key API | When to Use |
|-------|----------|---------|-------------|
| `/ssg` | **Static Site Generation** | Default (no `use client`) | Blogs, documentation, marketing pages |
| `/ssr` | **Server-Side Rendering** | `export const dynamic = "force-dynamic"` | Auth-gated content, personalized dashboards |
| `/isr` | **Incremental Static Regeneration**| `export const revalidate = 30` | E-commerce listings, news, pricing pages |
| `/csr` | **Client-Side Rendering** | `"use client"` + `useEffect` | Real-time chat, heavy interactive apps |

### React Hooks

| Hook | Demo | Use Case |
|------|------|----------|
| `useState` | Counter | Managing local component state |
| `useEffect` | Data fetching | Handling side effects and subscriptions |
| `useMemo` | Sorted numbers | Caching expensive computations |
| `useCallback` | Render counter | Maintaining stable function references for props |
| `useRef` | DOM focus + render count | Accessing the DOM directly, holding mutable values without re-renders |
| `useReducer` | Shopping cart | Managing complex state machines |
| `useContext` | Theme + auth | Sharing global state, avoiding prop drilling |

---

## 🎤 Quick Interview Cheatsheet

### Q: What is the difference between SSG, SSR, ISR, and CSR?
- **SSG**: Generated at **build time**. Fastest. Easily cached on a CDN. Best when staleness is acceptable.
- **SSR**: Generated on **every request**. Always fresh. Best for authenticated or personalized data.
- **ISR**: Generated at build time, but periodically **regenerated in the background**. Best of both SSG and SSR (bounded staleness).
- **CSR**: Rendered directly in the **browser**. Best for highly interactive apps, but has poorer initial SEO for fetched data.

### Q: `useMemo` vs `useCallback`?
- **`useMemo`**: Memoizes a **VALUE** (the result of an expensive computation).
- **`useCallback`**: Memoizes a **FUNCTION** (useful for referential equality when passing callbacks to child components).

### Q: `useRef` vs `useState`?
- **`useRef`**: Mutating `.current` **does not** trigger a re-render. Great for DOM refs, timers, or storing previous state.
- **`useState`**: Mutating state **DOES** trigger a re-render. Used for values displayed in the UI.

### Q: `useContext` vs Redux/Zustand?
- **Context**: Built into React. Best for low-frequency updates, simple global state, and avoiding deep prop drilling.
- **Redux/Zustand**: External libraries. Better for high-frequency updates, complex state selectors, and better debugging (DevTools).

---

## 🏗️ Project Structure

```text
nextjs-concepts/
├── app/
│   ├── page.tsx          # Home / Navigation overview
│   ├── ssg/page.tsx      # Static Site Generation demo
│   ├── ssr/page.tsx      # Server-Side Rendering demo
│   ├── isr/page.tsx      # Incremental Static Regeneration demo
│   ├── csr/page.tsx      # Client-Side Rendering + useState + useEffect
│   ├── hooks/page.tsx    # useMemo + useCallback + useRef + useReducer
│   ├── context/page.tsx  # createContext + useContext + custom hooks
│   └── globals.css       # Global styles (Dark terminal theme)
├── components/
│   └── NavClient.tsx     # Active-link aware navigation sidebar
├── lib/                  # Utility functions and shared logic
└── public/               # Static assets
```

---

## 🔑 Key Concepts by File

### Server Components
- **`app/ssg/page.tsx`**: No `"use client"` directive, meaning it's a **Server Component** and defaults to SSG in the App Router.
- **`app/ssr/page.tsx`**: Uses `export const dynamic = "force-dynamic"` to opt out of caching. Demonstrates server-only APIs like accessing `cookies()` and `headers()`.
- **`app/isr/page.tsx`**: Uses `export const revalidate = 30` to set a 30-second ISR window (Stale-While-Revalidate pattern).

### Client Components
- **`app/csr/page.tsx`**: Uses `"use client"` and demonstrates the classic `useEffect(fn, [])` pattern for Client-Side Rendering.
- **`app/hooks/page.tsx`**: Deep dive into React hooks. Shows `useMemo` dependency comparisons, `useCallback` preventing unnecessary re-renders, and complex state management with `useReducer`.
- **`app/context/page.tsx`**: Demonstrates the Provider → Context → Custom Hook → Consumer pattern using heavily nested contexts (Theme & Auth).

---

## 🤝 Contributing

Contributions are welcome! If you have a neat Next.js pattern or a common tricky interview question to add, feel free to open a PR.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
