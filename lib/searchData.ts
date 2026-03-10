// Global search data - aggregates all searchable content across the site

export type SearchResult = {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string[];
};

export const searchableContent: SearchResult[] = [
  // Rendering Strategies
  {
    title: "Static Site Generation (SSG)",
    description: "Pre-render pages at build time for blazing fast delivery",
    href: "/ssg",
    category: "Rendering",
    keywords: ["ssg", "static", "build time", "getStaticProps", "generateStaticParams"],
  },
  {
    title: "Server-Side Rendering (SSR)",
    description: "Render pages on every request with fresh data",
    href: "/ssr",
    category: "Rendering",
    keywords: ["ssr", "server", "request", "getServerSideProps", "dynamic", "cookies", "headers"],
  },
  {
    title: "Incremental Static Regeneration (ISR)",
    description: "Static pages with background revalidation",
    href: "/isr",
    category: "Rendering",
    keywords: ["isr", "revalidate", "stale-while-revalidate", "cache"],
  },
  {
    title: "Client-Side Rendering (CSR)",
    description: "Fetch data in the browser after JS loads",
    href: "/csr",
    category: "Rendering",
    keywords: ["csr", "client", "useEffect", "useState", "browser", "fetch"],
  },

  // React Hooks
  {
    title: "useState Hook",
    description: "Manage component state with useState",
    href: "/hooks#useState",
    category: "React Hooks",
    keywords: ["useState", "state", "hook", "react"],
  },
  {
    title: "useEffect Hook",
    description: "Handle side effects and lifecycle in functional components",
    href: "/hooks#useEffect",
    category: "React Hooks",
    keywords: ["useEffect", "side effects", "lifecycle", "mount", "unmount", "cleanup"],
  },
  {
    title: "useContext Hook",
    description: "Access context values without prop drilling",
    href: "/hooks#useContext",
    category: "React Hooks",
    keywords: ["useContext", "context", "provider", "consumer"],
  },
  {
    title: "useReducer Hook",
    description: "Manage complex state with reducer pattern",
    href: "/hooks#useReducer",
    category: "React Hooks",
    keywords: ["useReducer", "reducer", "dispatch", "action"],
  },
  {
    title: "useMemo Hook",
    description: "Memoize expensive calculations",
    href: "/hooks#useMemo",
    category: "React Hooks",
    keywords: ["useMemo", "memoization", "performance", "optimization"],
  },
  {
    title: "useCallback Hook",
    description: "Memoize function references",
    href: "/hooks#useCallback",
    category: "React Hooks",
    keywords: ["useCallback", "memoization", "function", "performance"],
  },
  {
    title: "useRef Hook",
    description: "Access DOM elements and persist values",
    href: "/hooks#useRef",
    category: "React Hooks",
    keywords: ["useRef", "ref", "dom", "persist", "mutable"],
  },

  // Context API
  {
    title: "Context API",
    description: "Share state across components without prop drilling",
    href: "/context",
    category: "React State",
    keywords: ["context", "provider", "consumer", "prop drilling", "global state"],
  },

  // Array Methods
  {
    title: "Array.map()",
    description: "Transform array elements",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["map", "array", "transform", "iterate"],
  },
  {
    title: "Array.filter()",
    description: "Filter array elements based on condition",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["filter", "array", "condition", "select"],
  },
  {
    title: "Array.reduce()",
    description: "Reduce array to single value",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["reduce", "array", "accumulator", "aggregate"],
  },
  {
    title: "Array.forEach()",
    description: "Execute function for each array element",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["forEach", "array", "loop", "iterate"],
  },
  {
    title: "Array.find()",
    description: "Find first element matching condition",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["find", "array", "search", "first"],
  },
  {
    title: "Array.some() & Array.every()",
    description: "Test array elements against condition",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["some", "every", "array", "test", "condition"],
  },
  {
    title: "Array.sort()",
    description: "Sort array elements",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["sort", "array", "order", "compare"],
  },
  {
    title: "Array.slice() & Array.splice()",
    description: "Extract or modify array portions",
    href: "/inbuilt-methods#array",
    category: "Array Methods",
    keywords: ["slice", "splice", "array", "extract", "modify"],
  },

  // String Methods
  {
    title: "String.split()",
    description: "Split string into array",
    href: "/inbuilt-methods#string",
    category: "String Methods",
    keywords: ["split", "string", "array", "divide"],
  },
  {
    title: "String.substring() & String.slice()",
    description: "Extract part of string",
    href: "/inbuilt-methods#string",
    category: "String Methods",
    keywords: ["substring", "slice", "string", "extract"],
  },
  {
    title: "String.replace()",
    description: "Replace string content",
    href: "/inbuilt-methods#string",
    category: "String Methods",
    keywords: ["replace", "string", "substitute"],
  },
  {
    title: "String.trim()",
    description: "Remove whitespace from string ends",
    href: "/inbuilt-methods#string",
    category: "String Methods",
    keywords: ["trim", "string", "whitespace"],
  },
  {
    title: "String.toLowerCase() & String.toUpperCase()",
    description: "Convert string case",
    href: "/inbuilt-methods#string",
    category: "String Methods",
    keywords: ["toLowerCase", "toUpperCase", "string", "case"],
  },

  // Object Methods
  {
    title: "Object.keys()",
    description: "Get object property keys",
    href: "/inbuilt-methods#object",
    category: "Object Methods",
    keywords: ["keys", "object", "properties"],
  },
  {
    title: "Object.values()",
    description: "Get object property values",
    href: "/inbuilt-methods#object",
    category: "Object Methods",
    keywords: ["values", "object", "properties"],
  },
  {
    title: "Object.entries()",
    description: "Get object key-value pairs",
    href: "/inbuilt-methods#object",
    category: "Object Methods",
    keywords: ["entries", "object", "key-value", "pairs"],
  },
  {
    title: "Object.assign()",
    description: "Copy properties to target object",
    href: "/inbuilt-methods#object",
    category: "Object Methods",
    keywords: ["assign", "object", "copy", "merge"],
  },
  {
    title: "Object.freeze() & Object.seal()",
    description: "Make object immutable",
    href: "/inbuilt-methods#object",
    category: "Object Methods",
    keywords: ["freeze", "seal", "object", "immutable"],
  },

  // Promise Methods
  {
    title: "Promise.all()",
    description: "Wait for all promises to resolve",
    href: "/inbuilt-methods#promise",
    category: "Promise Methods",
    keywords: ["promise", "all", "async", "parallel"],
  },
  {
    title: "Promise.race()",
    description: "Wait for first promise to settle",
    href: "/inbuilt-methods#promise",
    category: "Promise Methods",
    keywords: ["promise", "race", "async", "first"],
  },
  {
    title: "Promise.allSettled()",
    description: "Wait for all promises to settle",
    href: "/inbuilt-methods#promise",
    category: "Promise Methods",
    keywords: ["promise", "allSettled", "async", "settle"],
  },

  // API Patterns
  {
    title: "Fetch API",
    description: "Native browser API for making HTTP requests",
    href: "/api#fetch",
    category: "API Patterns",
    keywords: ["fetch", "api", "http", "request", "ajax", "rest"],
  },
  {
    title: "Axios",
    description: "Popular HTTP client library with interceptors",
    href: "/api#axios",
    category: "API Patterns",
    keywords: ["axios", "api", "http", "request", "interceptor"],
  },
  {
    title: "GraphQL",
    description: "Query language for APIs",
    href: "/api#graphql",
    category: "API Patterns",
    keywords: ["graphql", "api", "query", "mutation", "apollo"],
  },
  {
    title: "WebSocket & Real-time",
    description: "Bi-directional real-time communication",
    href: "/api#websocket",
    category: "API Patterns",
    keywords: ["websocket", "realtime", "sse", "server-sent events", "live"],
  },
  {
    title: "React with Fetch",
    description: "Data fetching patterns in React components",
    href: "/api#react-fetch",
    category: "API Patterns",
    keywords: ["react", "fetch", "api", "useEffect", "loading"],
  },
  {
    title: "Custom Hooks for API",
    description: "Reusable API fetching hooks",
    href: "/api#custom-hooks",
    category: "API Patterns",
    keywords: ["custom hooks", "api", "react", "reusable"],
  },

  // JavaScript Core Concepts
  {
    title: "Closures",
    description: "Functions that remember their lexical scope",
    href: "/js#closures",
    category: "JavaScript Core",
    keywords: ["closure", "scope", "lexical", "function"],
  },
  {
    title: "Event Loop",
    description: "How JavaScript handles async operations",
    href: "/js#event-loop",
    category: "JavaScript Core",
    keywords: ["event loop", "async", "callback", "microtask", "macrotask"],
  },
  {
    title: "Promises",
    description: "Handle asynchronous operations",
    href: "/js#promises",
    category: "JavaScript Core",
    keywords: ["promise", "async", "then", "catch", "resolve", "reject"],
  },
  {
    title: "async/await",
    description: "Modern syntax for async code",
    href: "/js#async-await",
    category: "JavaScript Core",
    keywords: ["async", "await", "promise", "asynchronous"],
  },
  {
    title: "Prototype & Inheritance",
    description: "JavaScript's prototypal inheritance",
    href: "/js#prototype",
    category: "JavaScript Core",
    keywords: ["prototype", "inheritance", "proto", "constructor"],
  },
  {
    title: "this keyword",
    description: "Context binding in JavaScript",
    href: "/js#this",
    category: "JavaScript Core",
    keywords: ["this", "bind", "call", "apply", "context"],
  },
  {
    title: "Hoisting",
    description: "Variable and function declaration behavior",
    href: "/js#hoisting",
    category: "JavaScript Core",
    keywords: ["hoisting", "var", "let", "const", "tdz"],
  },

  // Next.js Features
  {
    title: "App Router",
    description: "Next.js 13+ file-based routing system",
    href: "/nextjs#app-router",
    category: "Next.js",
    keywords: ["app router", "nextjs", "routing", "file-based"],
  },
  {
    title: "Server Components",
    description: "React components that render on the server",
    href: "/nextjs#server-components",
    category: "Next.js",
    keywords: ["server components", "rsc", "nextjs", "streaming"],
  },
  {
    title: "Middleware",
    description: "Run code before request completes",
    href: "/nextjs#middleware",
    category: "Next.js",
    keywords: ["middleware", "nextjs", "routing", "authentication"],
  },
  {
    title: "Image Optimization",
    description: "Automatic image optimization with next/image",
    href: "/nextjs#image",
    category: "Next.js",
    keywords: ["image", "optimization", "nextjs", "lazy loading"],
  },

  // Playground
  {
    title: "Code Playground",
    description: "Interactive code editor for JavaScript, TypeScript, and React",
    href: "/playground",
    category: "Tools",
    keywords: ["playground", "code", "editor", "javascript", "typescript", "react", "repl"],
  },

  // Git Commands
  {
    title: "git init",
    description: "Initialize a new Git repository",
    href: "/git#init",
    category: "Git",
    keywords: ["git", "init", "initialize", "repository", "setup"],
  },
  {
    title: "git clone",
    description: "Clone a remote repository to your local machine",
    href: "/git#clone",
    category: "Git",
    keywords: ["git", "clone", "copy", "repository", "download"],
  },
  {
    title: "git config",
    description: "Configure Git settings globally or locally",
    href: "/git#config",
    category: "Git",
    keywords: ["git", "config", "settings", "user", "email", "configuration"],
  },
  {
    title: "git status",
    description: "Show working tree status and staged changes",
    href: "/git#status",
    category: "Git",
    keywords: ["git", "status", "changes", "staged", "modified"],
  },
  {
    title: "git add",
    description: "Stage changes for the next commit",
    href: "/git#add",
    category: "Git",
    keywords: ["git", "add", "stage", "staging", "index"],
  },
  {
    title: "git commit",
    description: "Record staged changes to the repository",
    href: "/git#commit",
    category: "Git",
    keywords: ["git", "commit", "save", "snapshot", "message"],
  },
  {
    title: "git diff",
    description: "Show changes between commits, branches, or working tree",
    href: "/git#diff",
    category: "Git",
    keywords: ["git", "diff", "changes", "differences", "compare"],
  },
  {
    title: "git branch",
    description: "List, create, or delete branches",
    href: "/git#branch",
    category: "Git",
    keywords: ["git", "branch", "branches", "create", "delete", "list"],
  },
  {
    title: "git checkout",
    description: "Switch branches or restore files",
    href: "/git#checkout",
    category: "Git",
    keywords: ["git", "checkout", "switch", "branch", "restore"],
  },
  {
    title: "git switch",
    description: "Modern command to switch branches (Git 2.23+)",
    href: "/git#switch",
    category: "Git",
    keywords: ["git", "switch", "branch", "change", "modern"],
  },
  {
    title: "git merge",
    description: "Merge changes from another branch",
    href: "/git#merge",
    category: "Git",
    keywords: ["git", "merge", "integrate", "combine", "branches"],
  },
  {
    title: "git rebase",
    description: "Reapply commits on top of another base",
    href: "/git#rebase",
    category: "Git",
    keywords: ["git", "rebase", "linear", "history", "rewrite"],
  },
  {
    title: "git cherry-pick",
    description: "Apply specific commit from one branch to another",
    href: "/git#cherry-pick",
    category: "Git",
    keywords: ["git", "cherry-pick", "commit", "apply", "selective"],
  },
  {
    title: "git remote",
    description: "Manage remote repository connections",
    href: "/git#remote",
    category: "Git",
    keywords: ["git", "remote", "origin", "upstream", "connection"],
  },
  {
    title: "git fetch",
    description: "Download objects and refs from remote repository",
    href: "/git#fetch",
    category: "Git",
    keywords: ["git", "fetch", "download", "remote", "sync"],
  },
  {
    title: "git pull",
    description: "Fetch from remote and integrate into current branch",
    href: "/git#pull",
    category: "Git",
    keywords: ["git", "pull", "fetch", "merge", "update"],
  },
  {
    title: "git push",
    description: "Upload local commits to remote repository",
    href: "/git#push",
    category: "Git",
    keywords: ["git", "push", "upload", "remote", "publish"],
  },
  {
    title: "git log",
    description: "Show commit history and logs",
    href: "/git#log",
    category: "Git",
    keywords: ["git", "log", "history", "commits", "timeline"],
  },
  {
    title: "git show",
    description: "Show details of Git objects and commits",
    href: "/git#show",
    category: "Git",
    keywords: ["git", "show", "details", "commit", "inspect"],
  },
  {
    title: "git blame",
    description: "Show who modified each line of a file",
    href: "/git#blame",
    category: "Git",
    keywords: ["git", "blame", "author", "history", "line"],
  },
  {
    title: "git reflog",
    description: "Show reference log to recover lost commits",
    href: "/git#reflog",
    category: "Git",
    keywords: ["git", "reflog", "recover", "lost", "commits", "history"],
  },
  {
    title: "git restore",
    description: "Restore files to specific state (Git 2.23+)",
    href: "/git#restore",
    category: "Git",
    keywords: ["git", "restore", "undo", "discard", "file"],
  },
  {
    title: "git reset",
    description: "Reset current HEAD to specified state",
    href: "/git#reset",
    category: "Git",
    keywords: ["git", "reset", "undo", "soft", "hard", "mixed"],
  },
  {
    title: "git revert",
    description: "Create new commit that undoes previous commit",
    href: "/git#revert",
    category: "Git",
    keywords: ["git", "revert", "undo", "rollback", "safe"],
  },
  {
    title: "git clean",
    description: "Remove untracked files from working tree",
    href: "/git#clean",
    category: "Git",
    keywords: ["git", "clean", "remove", "untracked", "files"],
  },
  {
    title: "git stash",
    description: "Temporarily save uncommitted changes",
    href: "/git#stash",
    category: "Git",
    keywords: ["git", "stash", "save", "temporary", "wip"],
  },
  {
    title: "git tag",
    description: "Create, list, and verify tags for releases",
    href: "/git#tag",
    category: "Git",
    keywords: ["git", "tag", "release", "version", "annotated"],
  },
  {
    title: "git bisect",
    description: "Binary search to find bug-introducing commit",
    href: "/git#bisect",
    category: "Git",
    keywords: ["git", "bisect", "bug", "find", "binary search", "debug"],
  },
  {
    title: "git submodule",
    description: "Manage external repositories within your repository",
    href: "/git#submodule",
    category: "Git",
    keywords: ["git", "submodule", "dependencies", "external", "nested"],
  },
  {
    title: "git worktree",
    description: "Manage multiple working trees for same repository",
    href: "/git#worktree",
    category: "Git",
    keywords: ["git", "worktree", "multiple", "branches", "parallel"],
  },
  {
    title: "git grep",
    description: "Search for patterns in tracked files",
    href: "/git#grep",
    category: "Git",
    keywords: ["git", "grep", "search", "find", "pattern"],
  },
  {
    title: "git format-patch",
    description: "Generate patch files from commits for email-based workflows",
    href: "/git#format-patch",
    category: "Git",
    keywords: ["git", "format-patch", "patch", "email", "diff", "export"],
  },
  {
    title: "git apply",
    description: "Apply a patch file to working tree without committing",
    href: "/git#apply",
    category: "Git",
    keywords: ["git", "apply", "patch", "diff", "import"],
  },
  {
    title: "git am",
    description: "Apply patches from mailbox with commits and authorship",
    href: "/git#am",
    category: "Git",
    keywords: ["git", "am", "apply", "mailbox", "patch", "email"],
  },
  {
    title: ".gitignore Operations",
    description: "Manage ignored files and debug .gitignore rules",
    href: "/git#gitignore",
    category: "Git",
    keywords: ["gitignore", "ignore", "check-ignore", "untrack", "cached"],
  },
  {
    title: "Git Aliases",
    description: "Create shortcuts for frequently used Git commands",
    href: "/git#aliases",
    category: "Git",
    keywords: ["git", "alias", "shortcuts", "config", "custom", "commands"],
  },
  {
    title: "Interactive Rebase",
    description: "Advanced rebase operations: squash, fixup, reword, edit, drop commits",
    href: "/git#interactive-rebase",
    category: "Git",
    keywords: ["git", "rebase", "interactive", "squash", "fixup", "reword", "autosquash"],
  },
  {
    title: "Git Workflows",
    description: "Git Flow, Trunk-Based Development, Feature Branch, Forking workflows",
    href: "/git#workflows",
    category: "Git",
    keywords: ["git", "workflow", "gitflow", "trunk", "feature branch", "forking", "strategy"],
  },
  {
    title: "Merge Strategies",
    description: "Fast-forward, no-ff, squash merge strategies explained",
    href: "/git#merge-strategies",
    category: "Git",
    keywords: ["git", "merge", "strategy", "fast-forward", "no-ff", "squash", "rebase"],
  },
];

export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  
  return searchableContent.filter((item) => {
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
    );
  });
}
