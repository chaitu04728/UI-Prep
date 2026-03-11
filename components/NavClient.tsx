"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const renderLinks = [
  { href: "/ssg", label: "SSG — Static Site Generation" },
  { href: "/ssr", label: "SSR — Server-Side Rendering" },
  { href: "/isr", label: "ISR — Incremental Static Regen" },
  { href: "/csr", label: "CSR — Client-Side Rendering" },
];

const reactLinks = [
  {
    label: "Core Concepts",
    items: [
      { href: "/react#components", label: "Components & Props" },
      { href: "/react#jsx", label: "JSX" },
      { href: "/react#state-props", label: "State vs Props" },
      { href: "/react#lifecycle", label: "Lifecycle Methods" },
      { href: "/react#virtual-dom", label: "Virtual DOM & Reconciliation" },
      { href: "/react#composition", label: "Composition vs Inheritance" },
    ],
  },
  {
    label: "Hooks",
    items: [
      { href: "/hooks#useState", label: "useState" },
      { href: "/hooks#useEffect", label: "useEffect" },
      { href: "/hooks#useContext", label: "useContext" },
      { href: "/hooks#useReducer", label: "useReducer" },
      { href: "/hooks#useCallback", label: "useCallback" },
      { href: "/hooks#useMemo", label: "useMemo" },
      { href: "/hooks#useRef", label: "useRef" },
      { href: "/hooks#useImperativeHandle", label: "useImperativeHandle" },
      { href: "/hooks#useLayoutEffect", label: "useLayoutEffect" },
      { href: "/hooks#custom-hooks", label: "Custom Hooks" },
    ],
  },
  {
    label: "Advanced Patterns",
    items: [
      { href: "/react#hoc", label: "Higher-Order Components" },
      { href: "/react#render-props", label: "Render Props" },
      { href: "/react#compound-components", label: "Compound Components" },
      {
        href: "/react#controlled-uncontrolled",
        label: "Controlled vs Uncontrolled",
      },
      { href: "/react#error-boundaries", label: "Error Boundaries" },
      { href: "/react#portals", label: "Portals" },
      { href: "/react#lazy-suspense", label: "React.lazy & Suspense" },
      { href: "/react#fragments", label: "Fragments" },
    ],
  },
  {
    label: "State Management",
    items: [
      { href: "/context", label: "Context API" },
      { href: "/state#redux", label: "Redux" },
      { href: "/state#zustand", label: "Zustand" },
      { href: "/state#recoil", label: "Recoil" },
      { href: "/state#jotai", label: "Jotai" },
      { href: "/state#mobx", label: "MobX" },
    ],
  },
  {
    label: "Performance",
    items: [
      { href: "/react#memo", label: "React.memo" },
      { href: "/react#profiler", label: "React Profiler" },
      { href: "/react#code-splitting", label: "Code Splitting" },
      { href: "/react#optimization", label: "Optimization Techniques" },
    ],
  },
];

const nextjsLinks = [
  {
    label: "Routing & Navigation",
    items: [
      { href: "/nextjs#app-router", label: "App Router (v13+)" },
      { href: "/nextjs#pages-router", label: "Pages Router" },
      { href: "/nextjs#dynamic-routes", label: "Dynamic Routes" },
      { href: "/nextjs#route-groups", label: "Route Groups" },
      { href: "/nextjs#parallel-routes", label: "Parallel Routes" },
      { href: "/nextjs#intercepting-routes", label: "Intercepting Routes" },
      { href: "/nextjs#middleware", label: "Middleware" },
      { href: "/nextjs#navigation", label: "Link & useRouter" },
    ],
  },
  {
    label: "Data Fetching",
    items: [
      { href: "/nextjs#server-components", label: "Server Components" },
      { href: "/nextjs#client-components", label: "Client Components" },
      { href: "/nextjs#fetch-cache", label: "fetch() & Caching" },
      { href: "/nextjs#revalidate", label: "Revalidation" },
      { href: "/nextjs#streaming", label: "Streaming & Suspense" },
      { href: "/nextjs#loading-error", label: "loading.js & error.js" },
    ],
  },
  {
    label: "API & Backend",
    items: [
      { href: "/nextjs#route-handlers", label: "Route Handlers" },
      { href: "/nextjs#server-actions", label: "Server Actions" },
      { href: "/nextjs#api-routes", label: "API Routes (Pages)" },
      { href: "/nextjs#middleware-api", label: "Middleware API" },
    ],
  },
  {
    label: "Optimization",
    items: [
      { href: "/nextjs#image", label: "Image Optimization" },
      { href: "/nextjs#font", label: "Font Optimization" },
      { href: "/nextjs#script", label: "Script Optimization" },
      { href: "/nextjs#metadata", label: "Metadata & SEO" },
      { href: "/nextjs#analytics", label: "Analytics" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { href: "/nextjs#config", label: "next.config.js" },
      { href: "/nextjs#env", label: "Environment Variables" },
      { href: "/nextjs#typescript", label: "TypeScript" },
      { href: "/nextjs#eslint", label: "ESLint" },
    ],
  },
];

const tsLinks = [
  {
    label: "Basics",
    items: [
      { href: "/ts#basic-types", label: "Basic Types" },
      { href: "/ts#interfaces", label: "Interfaces" },
      { href: "/ts#type-aliases", label: "Type Aliases" },
      { href: "/ts#enums", label: "Enums" },
      { href: "/ts#literal-types", label: "Literal Types" },
      { href: "/ts#type-assertions", label: "Type Assertions" },
      { href: "/ts#classes", label: "Classes & Access Modifiers" },
      { href: "/ts#modules-namespaces", label: "Modules & Namespaces" },
    ],
  },
  {
    label: "Advanced Types",
    items: [
      { href: "/ts#generics", label: "Generics" },
      { href: "/ts#union-intersection", label: "Union & Intersection" },
      { href: "/ts#type-guards", label: "Type Guards" },
      { href: "/ts#utility-types", label: "Utility Types" },
      { href: "/ts#never-unknown", label: "never & unknown" },
      { href: "/ts#mapped-types", label: "Mapped Types" },
      { href: "/ts#conditional-types", label: "Conditional Types" },
      { href: "/ts#decorators", label: "Decorators" },
    ],
  },
  {
    label: "Configuration & Integration",
    items: [
      { href: "/ts#tsconfig", label: "tsconfig.json" },
      { href: "/ts#declaration-files", label: "Declaration Files (.d.ts)" },
      { href: "/ts#react-with-ts", label: "React with TypeScript" },
      { href: "/ts#best-practices", label: "Best Practices" },
    ],
  },
];

const jsGroups = [
  {
    label: "Core JS",
    items: [
      {
        href: "/js#execution-context",
        label: "Execution Context & Call Stack",
      },
      { href: "/js#scope", label: "Scope" },
      { href: "/js#closures", label: "Closures" },
      { href: "/js#hoisting", label: "Hoisting & TDZ" },
      { href: "/js#event-loop", label: "Event Loop & Microtask Queue" },
      { href: "/js#prototype", label: "Prototype & Inheritance" },
      { href: "/js#this", label: "this / call / apply / bind" },
      { href: "/js#currying", label: "Currying & Partial Application" },
      { href: "/js#hof", label: "Higher-Order Functions" },
      { href: "/js#pure-functions", label: "Pure Functions & Side Effects" },
      { href: "/js#memoization", label: "Memoization" },
      { href: "/js#debounce-throttle", label: "Debounce & Throttle" },
      { href: "/js#generators", label: "Generators & Iterators" },
      { href: "/js#symbols", label: "Symbols" },
      { href: "/js#weakmap-weakset", label: "WeakMap & WeakSet" },
      { href: "/js#garbage-collection", label: "Garbage Collection" },
    ],
  },
  {
    label: "Async JS",
    items: [
      { href: "/js#callbacks", label: "Callbacks & Callback Hell" },
      { href: "/js#promises", label: "Promises" },
      { href: "/js#async-await", label: "async / await" },
      { href: "/js#async-error-handling", label: "Async Error Handling" },
      { href: "/js#event-emitters", label: "Event Emitters" },
      { href: "/js#fetch-api", label: "Fetch API" },
    ],
  },
  {
    label: "ES6–ES2024",
    items: [
      { href: "/js#destructuring", label: "Destructuring" },
      { href: "/js#spread-rest", label: "Spread & Rest" },
      { href: "/js#optional-chaining", label: "Optional Chaining & ??" },
      { href: "/js#tagged-templates", label: "Tagged Template Literals" },
      { href: "/js#proxy-reflect", label: "Proxy & Reflect" },
      { href: "/js#modules", label: "Modules (ESM vs CJS)" },
      { href: "/js#classes", label: "Classes" },
    ],
  },
  {
    label: "Types & Patterns",
    items: [
      { href: "/js#type-coercion", label: "Type Coercion & == vs ===" },
      { href: "/js#immutability", label: "Immutability Patterns" },
      { href: "/js#deep-shallow-copy", label: "Deep vs Shallow Copy" },
      { href: "/js#design-patterns", label: "Design Patterns" },
      { href: "/js#fp-concepts", label: "Functional Programming" },
    ],
  },
  {
    label: "Browser & DOM",
    items: [
      { href: "/js#dom", label: "DOM Manipulation" },
      { href: "/js#event-propagation", label: "Event Bubbling & Delegation" },
      { href: "/js#shadow-dom", label: "Shadow DOM" },
      { href: "/js#raf", label: "requestAnimationFrame" },
      { href: "/js#observers", label: "Intersection & MutationObserver" },
      { href: "/js#web-workers", label: "Web Workers" },
      { href: "/js#service-workers", label: "Service Workers" },
      { href: "/js#storage", label: "Storage APIs" },
      { href: "/js#cors", label: "CORS & Preflight" },
      { href: "/js#rendering-pipeline", label: "Rendering Pipeline" },
    ],
  },
  {
    label: "Performance",
    items: [
      { href: "/js#code-splitting", label: "Code Splitting & Lazy Loading" },
      { href: "/js#bundle-optimization", label: "Bundle Optimization" },
      { href: "/js#memory-leaks", label: "Memory Leaks" },
      { href: "/js#critical-rendering-path", label: "Critical Rendering Path" },
    ],
  },
  {
    label: "TypeScript",
    items: [
      { href: "/js#ts-generics", label: "Generics" },
      {
        href: "/js#ts-union-intersection",
        label: "Union & Intersection Types",
      },
      { href: "/js#ts-utility-types", label: "Utility Types" },
      { href: "/js#ts-type-guards", label: "Type Guards & Narrowing" },
      { href: "/js#ts-mapped-types", label: "Mapped Types" },
      { href: "/js#ts-conditional-types", label: "Conditional Types & infer" },
      { href: "/js#ts-declaration-merging", label: "Declaration Merging" },
    ],
  },
  {
    label: "Testing",
    items: [
      { href: "/js#testing-types", label: "Unit / Integration / E2E" },
      { href: "/js#mocking", label: "Mocking & Spying" },
      { href: "/js#async-testing", label: "Testing Async Code" },
      { href: "/js#coverage", label: "Code Coverage" },
    ],
  },
  {
    label: "Tooling & Runtime",
    items: [
      { href: "/js#babel", label: "Babel & AST" },
      { href: "/js#bundlers", label: "Webpack & Vite" },
      { href: "/js#node-event-loop", label: "Node.js Event Loop" },
      { href: "/js#package-managers", label: "npm / pnpm / yarn" },
      { href: "/js#semver", label: "Semantic Versioning" },
    ],
  },
];

const inbuiltMethodsGroups = [
  {
    label: "Array Methods",
    items: [{ href: "/inbuilt-methods#array", label: "Array Methods" }],
  },
  {
    label: "String Methods",
    items: [{ href: "/inbuilt-methods#string", label: "String Methods" }],
  },
  {
    label: "Object Methods",
    items: [{ href: "/inbuilt-methods#object", label: "Object Methods" }],
  },
  {
    label: "Other Built-ins",
    items: [
      { href: "/inbuilt-methods#number", label: "Number Methods" },
      { href: "/inbuilt-methods#math", label: "Math Methods" },
      { href: "/inbuilt-methods#promise", label: "Promise Methods" },
      { href: "/inbuilt-methods#json", label: "JSON Methods" },
      { href: "/inbuilt-methods#date", label: "Date Methods" },
      { href: "/inbuilt-methods#map-set", label: "Map & Set" },
      { href: "/inbuilt-methods#console", label: "Console Methods" },
    ],
  },
];

const apiGroups = [
  {
    label: "JavaScript APIs",
    items: [
      { href: "/api#fetch", label: "Fetch API" },
      { href: "/api#axios", label: "Axios" },
      { href: "/api#graphql", label: "GraphQL" },
      { href: "/api#websocket", label: "WebSocket & Real-time" },
    ],
  },
  {
    label: "React Patterns",
    items: [
      { href: "/api#react-fetch", label: "React with Fetch" },
      { href: "/api#custom-hooks", label: "Custom Hooks" },
      { href: "/api#react-query", label: "React Query" },
      { href: "/api#swr", label: "SWR" },
    ],
  },
];

const gitGroups = [
  {
    label: "Setup & Config",
    items: [
      { href: "/git#init", label: "git init" },
      { href: "/git#clone", label: "git clone" },
      { href: "/git#config", label: "git config" },
      { href: "/git#aliases", label: "Git Aliases" },
    ],
  },
  {
    label: "Basic Commands",
    items: [
      { href: "/git#status", label: "git status" },
      { href: "/git#add", label: "git add" },
      { href: "/git#commit", label: "git commit" },
      { href: "/git#diff", label: "git diff" },
      { href: "/git#rm", label: "git rm" },
      { href: "/git#mv", label: "git mv" },
    ],
  },
  {
    label: "Branching & Merging",
    items: [
      { href: "/git#branch", label: "git branch" },
      { href: "/git#checkout", label: "git checkout" },
      { href: "/git#switch", label: "git switch" },
      { href: "/git#merge", label: "git merge" },
      { href: "/git#rebase", label: "git rebase" },
      { href: "/git#cherry-pick", label: "git cherry-pick" },
      { href: "/git#interactive-rebase", label: "Interactive Rebase" },
    ],
  },
  {
    label: "Remote & Collaboration",
    items: [
      { href: "/git#remote", label: "git remote" },
      { href: "/git#fetch", label: "git fetch" },
      { href: "/git#pull", label: "git pull" },
      { href: "/git#push", label: "git push" },
    ],
  },
  {
    label: "History & Inspection",
    items: [
      { href: "/git#log", label: "git log" },
      { href: "/git#show", label: "git show" },
      { href: "/git#blame", label: "git blame" },
      { href: "/git#reflog", label: "git reflog" },
    ],
  },
  {
    label: "Undo & Reset",
    items: [
      { href: "/git#restore", label: "git restore" },
      { href: "/git#reset", label: "git reset" },
      { href: "/git#revert", label: "git revert" },
      { href: "/git#clean", label: "git clean" },
    ],
  },
  {
    label: "Stashing & Tagging",
    items: [
      { href: "/git#stash", label: "git stash" },
      { href: "/git#tag", label: "git tag" },
    ],
  },
  {
    label: "Patching",
    items: [
      { href: "/git#format-patch", label: "git format-patch" },
      { href: "/git#apply", label: "git apply" },
      { href: "/git#am", label: "git am" },
    ],
  },
  {
    label: ".gitignore & Cleanup",
    items: [{ href: "/git#gitignore", label: ".gitignore Operations" }],
  },
  {
    label: "Workflows & Strategies",
    items: [
      { href: "/git#workflows", label: "Git Workflows" },
      { href: "/git#merge-strategies", label: "Merge Strategies" },
    ],
  },
  {
    label: "Advanced",
    items: [
      { href: "/git#bisect", label: "git bisect" },
      { href: "/git#submodule", label: "git submodule" },
      { href: "/git#worktree", label: "git worktree" },
      { href: "/git#grep", label: "git grep" },
      { href: "/git#filter-branch", label: "git filter-branch" },
      { href: "/git#archive", label: "git archive" },
    ],
  },
];

const advancedLinks = [
  {
    label: "AI & Modern Patterns",
    items: [
      { href: "/ai-integration", label: "AI Integration (Vercel AI SDK)" },
      { href: "/api-patterns", label: "API Patterns (Axios/HOC)" },
      { href: "/jwt-auth", label: "JWT Authentication" },
    ],
  },
];

export default function NavClient() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-dropdown")) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const isRenderActive = ["/ssg", "/ssr", "/isr", "/csr"].includes(pathname);
  const isReactActive = ["/hooks", "/context", "/react", "/state"].includes(
    pathname,
  );
  const isNextActive = pathname.startsWith("/nextjs");
  const isJsActive = pathname.startsWith("/js");
  const isTsActive = pathname.startsWith("/ts");
  const isLangActive = isJsActive || isTsActive;
  const isFrameworkActive = isReactActive || isNextActive;
  const isInbuiltMethodsActive = pathname.startsWith("/inbuilt-methods");
  const isApiActive = pathname.startsWith("/api");
  const isPlaygroundActive = pathname.startsWith("/playground");
  const isAccessibilityActive = pathname.startsWith("/accessibility");
  const isGitActive = pathname.startsWith("/git");
  const isAdvancedActive = [
    "/ai-integration",
    "/api-patterns",
    "/jwt-auth",
  ].includes(pathname);

  return (
    <nav>
      <Link
        href="/"
        className="logo"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        ⚡ Web Dev Hub
      </Link>

      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`links ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>

        {/* Render Dropdown */}
        <div
          className={`nav-dropdown ${
            activeDropdown === "render" ? "active" : ""
          }`}
        >
          <button
            className={`dropdown-trigger${isRenderActive ? " active" : ""}`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "render" ? null : "render")
            }
          >
            Render ▾
          </button>
          <div className="dropdown-menu">
            <div className="dropdown-group-label">Rendering Strategies</div>
            {renderLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Languages Dropdown (JavaScript + TypeScript) */}
        <div
          className={`nav-dropdown ${
            activeDropdown === "lang" ? "active" : ""
          }`}
        >
          <button
            className={`dropdown-trigger${isLangActive ? " active" : ""}`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "lang" ? null : "lang")
            }
          >
            Languages ▾
          </button>
          <div className="dropdown-menu dropdown-menu-wide">
            <div className="dropdown-columns">
              <div className="dropdown-column">
                <div className="dropdown-section-title">JavaScript</div>
                {jsGroups.map((group) => (
                  <div key={group.label}>
                    <div className="dropdown-group-label">{group.label}</div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="dropdown-column">
                <div className="dropdown-section-title">TypeScript</div>
                {tsLinks.map((group) => (
                  <div key={group.label}>
                    <div className="dropdown-group-label">{group.label}</div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Frameworks Dropdown (React + Next.js) */}
        <div
          className={`nav-dropdown ${
            activeDropdown === "framework" ? "active" : ""
          }`}
        >
          <button
            className={`dropdown-trigger${isFrameworkActive ? " active" : ""}`}
            onClick={() =>
              setActiveDropdown(
                activeDropdown === "framework" ? null : "framework",
              )
            }
          >
            Frameworks ▾
          </button>
          <div className="dropdown-menu dropdown-menu-wide">
            <div className="dropdown-columns">
              <div className="dropdown-column">
                <div className="dropdown-section-title">React</div>
                {reactLinks.map((group) => (
                  <div key={group.label}>
                    <div className="dropdown-group-label">{group.label}</div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="dropdown-column">
                <div className="dropdown-section-title">Next.js</div>
                {nextjsLinks.map((group) => (
                  <div key={group.label}>
                    <div className="dropdown-group-label">{group.label}</div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Playground */}
        <Link
          href="/playground"
          className={isPlaygroundActive ? "active" : ""}
          onClick={() => setMobileMenuOpen(false)}
        >
          🎮 Playground
        </Link>

        {/* Accessibility */}
        <Link
          href="/accessibility"
          className={isAccessibilityActive ? "active" : ""}
          onClick={() => setMobileMenuOpen(false)}
        >
          ♿ Accessibility
        </Link>

        {/* Inbuilt Methods Dropdown */}
        <div
          className={`nav-dropdown ${
            activeDropdown === "methods" ? "active" : ""
          }`}
        >
          <button
            className={`dropdown-trigger${
              isInbuiltMethodsActive ? " active" : ""
            }`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "methods" ? null : "methods")
            }
          >
            Inbuilt Methods ▾
          </button>
          <div className="dropdown-menu">
            {inbuiltMethodsGroups.map((group) => (
              <div key={group.label}>
                <div className="dropdown-group-label">{group.label}</div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* API Dropdown */}
        <div
          className={`nav-dropdown ${activeDropdown === "api" ? "active" : ""}`}
        >
          <button
            className={`dropdown-trigger${isApiActive ? " active" : ""}`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "api" ? null : "api")
            }
          >
            API ▾
          </button>
          <div className="dropdown-menu">
            {apiGroups.map((group) => (
              <div key={group.label}>
                <div className="dropdown-group-label">{group.label}</div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Git Dropdown */}
        <div
          className={`nav-dropdown ${activeDropdown === "git" ? "active" : ""}`}
        >
          <button
            className={`dropdown-trigger${isGitActive ? " active" : ""}`}
            onClick={() =>
              setActiveDropdown(activeDropdown === "git" ? null : "git")
            }
          >
            Git ▾
          </button>
          <div className="dropdown-menu">
            {gitGroups.map((group) => (
              <div key={group.label}>
                <div className="dropdown-group-label">{group.label}</div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Dropdown */}
        <div
          className={`nav-dropdown ${
            activeDropdown === "advanced" ? "active" : ""
          }`}
        >
          <button
            className={`dropdown-trigger${isAdvancedActive ? " active" : ""}`}
            onClick={() =>
              setActiveDropdown(
                activeDropdown === "advanced" ? null : "advanced",
              )
            }
          >
            Advanced ▾
          </button>
          <div className="dropdown-menu">
            {advancedLinks.map((group) => (
              <div key={group.label}>
                <div className="dropdown-group-label">{group.label}</div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
