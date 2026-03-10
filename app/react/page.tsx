import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Concepts | Next.js Explorer",
  description: "Complete React reference: JSX, Virtual DOM, Fiber, Reconciliation, Patterns, Performance, and React 18+ features.",
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
  // ─── CORE ──────────────────────────────────────────────────────────────────
  {
    id: "jsx",
    category: "Core",
    badgeClass: "badge-purple",
    title: "JSX & How It Compiles",
    desc: "JSX is syntactic sugar for React.createElement calls. Babel/TypeScript transform JSX into function calls. Each element becomes an object with type, props, and children.",
    code: `// JSX (what you write)
const element = <h1 className="greeting">Hello, world!</h1>;

// Compiles to (classic runtime)
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

// React 17+ automatic runtime (no React import needed)
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('h1', { 
  className: 'greeting', 
  children: 'Hello, world!' 
});

// Components compile the same way
<MyComponent foo="bar" />
// → React.createElement(MyComponent, { foo: 'bar' })`,
    note: "JSX is NOT HTML — it's JavaScript. Attributes use camelCase (onClick, className). Expressions go in {} braces. The automatic runtime (React 17+) eliminates the need for 'import React' in every file.",
  },
  {
    id: "virtual-dom",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Virtual DOM & Reconciliation",
    desc: "React keeps a virtual representation of the UI in memory. When state changes, React creates a new virtual tree, compares it with the previous one (diffing), and updates only what changed in the real DOM.",
    code: `// 1. Initial render — full virtual tree created
<div>
  <h1>Title</h1>
  <p>Count: 0</p>
</div>

// 2. State update: count goes 0 → 1
// React creates NEW virtual tree:
<div>
  <h1>Title</h1>
  <p>Count: 1</p>  {/* ← only this changed */}
</div>

// 3. Reconciliation (diffing algorithm)
// React compares old vs new virtual trees
// Detects: only the text node "0" → "1" changed

// 4. Commit phase
// Real DOM: only update that single text node
// No need to re-create the entire <div> or <h1>

// Why? DOM manipulation is SLOW.
// JS object manipulation (virtual DOM) is FAST.`,
    note: "Virtual DOM isn't faster than direct DOM manipulation in all cases — but it provides a declarative API and batches updates efficiently. React 18's concurrent rendering builds on this foundation.",
  },
  {
    id: "diffing",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Diffing Algorithm",
    desc: "React's diffing is O(n) instead of O(n³) by making 2 assumptions: (1) elements of different types produce different trees, (2) keys identify which items changed/moved in lists.",
    code: `// Assumption 1: Different types = full rebuild
<div>           <span>
  <Counter />     <Counter />  {/* Unmount + remount! */}
</div>           </span>

// Assumption 2: Keys optimize list diffing
// ❌ Without keys — re-renders all items after insertion
{items.map((item, i) => <Item key={i} data={item} />)}

// ✅ With stable keys — only inserts new item
{items.map((item) => <Item key={item.id} data={item} />)}

// Key rules:
// 1. Unique among siblings (not globally)
// 2. Stable (don't use Math.random() or index if order changes)
// 3. Predictable (same item = same key across renders)

// Example: inserting at the start with index keys
// Before: [A(0), B(1), C(2)]
// After:  [Z(0), A(1), B(2), C(3)]
// React thinks A changed → full re-render of all items!

// With stable keys:
// Before: [A(id:1), B(id:2), C(id:3)]
// After:  [Z(id:4), A(id:1), B(id:2), C(id:3)]
// React knows: Z is new, rest just moved → efficient!`,
    note: "Index as key is OK if list is static and never reordered. For dynamic lists (add/remove/sort), use stable IDs. Missing keys = React warns + uses index anyway (worst case).",
  },
  {
    id: "fiber",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Fiber Architecture",
    desc: "Fiber is React's reconciliation engine rewrite (React 16+). It breaks rendering into units of work that can be paused, resumed, or aborted — enabling concurrent rendering, Suspense, and time-slicing.",
    code: `// Before Fiber (React 15 and earlier):
// - Rendering was synchronous and blocking
// - Once started, couldn't be interrupted
// - Long renders = frozen UI (no user input)

// With Fiber (React 16+):
// - Work split into small units (fibers)
// - Browser can interrupt to handle high-priority tasks
// - Rendering happens in phases:

// PHASE 1: Render (can be paused/restarted)
// - Build work-in-progress tree
// - Calculate what changed
// - Can be interrupted for urgent work

// PHASE 2: Commit (synchronous, can't pause)
// - Apply changes to real DOM
// - Call useLayoutEffect, componentDidMount, etc.
// - Must complete in one go

// Fiber enables:
// - Concurrent rendering (React 18)
// - Suspense for data fetching
// - useTransition (non-urgent updates)
// - Time-slicing (break work into chunks)

// Example: Large list render
function HugeList() {
  const [items] = useState(Array(10000).fill(0));
  
  // Pre-Fiber: 10k items render blocks for ~100ms
  // With Fiber: Can pause to respond to user clicks
  
  return items.map((_, i) => <Item key={i} />);
}`,
    note: "Fiber is the foundation for React 18's concurrent features. Each component instance has a corresponding fiber node that tracks state, props, and side effects. Understanding Fiber helps explain why useEffect runs after paint.",
  },
  {
    id: "lifecycle",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Component Lifecycle",
    desc: "Class components have explicit lifecycle methods. Function components use hooks (useEffect, useLayoutEffect) to replicate the same behavior. Modern apps prefer hooks.",
    code: `// ─── CLASS COMPONENT LIFECYCLE ───────────────────────────────

class MyComponent extends React.Component {
  // MOUNTING
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    // After component inserted into DOM
    // Equiv: useEffect(() => { ... }, [])
  }
  
  // UPDATING
  componentDidUpdate(prevProps, prevState) {
    // After re-render (props or state changed)
    // Equiv: useEffect(() => { ... }, [dep])
  }
  
  // UNMOUNTING
  componentWillUnmount() {
    // Before component removed from DOM
    // Equiv: useEffect(() => { return () => {...} }, [])
  }
  
  render() {
    return <div>{this.state.count}</div>;
  }
}

// ─── FUNCTIONAL EQUIVALENT ───────────────────────────────────

function MyComponent() {
  const [count, setCount] = useState(0);
  
  // componentDidMount
  useEffect(() => {
    console.log('mounted');
  }, []);
  
  // componentDidUpdate (when count changes)
  useEffect(() => {
    console.log('count changed:', count);
  }, [count]);
  
  // componentWillUnmount
  useEffect(() => {
    return () => console.log('unmounting');
  }, []);
  
  return <div>{count}</div>;
}

// Modern patterns:
// - No componentWillMount (use useMemo or direct init)
// - No componentWillReceiveProps (use useEffect with deps)
// - No shouldComponentUpdate (use React.memo)
// - No getDerivedStateFromProps (compute during render)`,
    note: "useEffect runs AFTER paint (async), useLayoutEffect runs BEFORE paint (sync, blocks render). For 99% of cases, use useEffect. Use useLayoutEffect only for DOM measurements that affect render.",
  },
  {
    id: "controlled-uncontrolled",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Controlled vs Uncontrolled Components",
    desc: "Controlled components have React state as the single source of truth. Uncontrolled components store state in the DOM itself. Controlled is preferred for validation, dynamic behavior, and React's declarative model.",
    code: `// ─── UNCONTROLLED ─────────────────────────────────────────────
// State lives in DOM, accessed via ref

function UncontrolledForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current?.value); // read from DOM
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="initial" />
      <button>Submit</button>
    </form>
  );
}

// ─── CONTROLLED ───────────────────────────────────────────────
// React state is source of truth

function ControlledForm() {
  const [value, setValue] = useState("initial");
  
  const handleSubmit = () => {
    console.log(value); // state is already in sync
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
      <button>Submit</button>
    </form>
  );
}

// When to use uncontrolled:
// - File inputs (<input type="file" />)
// - Integrating 3rd-party libs (tinymce, etc.)
// - Simple forms where validation isn't needed
// - Performance-critical scenarios (no re-render on keystroke)

// When to use controlled:
// - Dynamic validation (show errors live)
// - Conditional formatting (phone numbers, credit cards)
// - Disabling submit until valid
// - Multi-step forms
// - Most React apps (declarative = predictable)`,
    note: "Mixing controlled + uncontrolled on the same input causes warnings. Switching from undefined/null to a string (or vice versa) switches modes mid-lifecycle — React will warn.",
  },
  {
    id: "synthetic-events",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Synthetic Events",
    desc: "React wraps native browser events in a SyntheticEvent to normalize cross-browser differences. Event pooling was removed in React 17. Events bubble through React's tree, not native DOM.",
    code: `// React's event handler props use camelCase
<button onClick={handleClick}>Click</button>

// Synthetic event = cross-browser wrapper
function handleClick(e: React.MouseEvent) {
  e.preventDefault();     // works everywhere
  e.stopPropagation();    // React's tree, not native
  
  e.currentTarget;        // element with the handler
  e.target;               // element that triggered event
  e.nativeEvent;          // underlying browser event
}

// React 16 and earlier: event pooling
// - SyntheticEvent object reused for performance
// - Properties nullified after handler
// - e.persist() to keep it around (removed in React 17)

// React 17+: no pooling
// - Events are normal objects
// - Can use async/await without e.persist()

async function handleAsync(e: React.MouseEvent) {
  e.preventDefault();  // safe even after await
  const data = await fetchData();
  console.log(e.target); // still works! (React 17+)
}

// Event delegation:
// React attaches ONE listener at the root
// Not one per element → better performance
// React 17: root = container where you called createRoot
// React 16: root = document`,
    note: "React events bubble differently than native events. stopPropagation stops React's synthetic bubbling, not native. To stop native, use e.nativeEvent.stopImmediatePropagation().",
  },
  {
    id: "keys",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Keys & Why They Matter",
    desc: "Keys help React identify which items changed, were added, or removed. They must be stable, unique among siblings, and predictable. Poor key choice = bad performance + bugs.",
    code: `// ❌ BAD: Index as key with dynamic lists
{items.map((item, index) => (
  <Todo key={index} text={item.text} />
))}
// Problem: Insert at start → all indices shift → full re-render

// ❌ BAD: Random keys
{items.map(item => (
  <Todo key={Math.random()} text={item.text} />
))}
// Problem: New key every render → unmount + remount all items

// ❌ BAD: Missing key
{items.map(item => <Todo text={item.text} />)}
// React warns + uses index → same problem as first example

// ✅ GOOD: Stable unique ID
{items.map(item => (
  <Todo key={item.id} text={item.text} />
))}
// Best: ID from database or generated once on creation

// ✅ GOOD: Composite key (if no ID available)
{items.map(item => (
  <Todo key={\`\${item.text}-\${item.createdAt}\`} />
))}

// Keys in fragments:
<React.Fragment key={item.id}>
  <dt>{item.term}</dt>
  <dd>{item.definition}</dd>
</React.Fragment>

// Short syntax can't use key:
<>  {/* No key prop available */}
  <li>Item</li>
</>`,
    note: "Keys only need to be unique among siblings, not globally. Changing a key forces React to unmount the old component and mount a new one — useful for resetting state (e.g., <Form key={userId} />).",
  },
  {
    id: "refs",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Refs & forwardRef",
    desc: "Refs provide direct access to DOM nodes or class component instances. Function components can't receive refs directly — use forwardRef to pass them through.",
    code: `// Basic ref usage
function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return <input ref={inputRef} />;
}

// forwardRef: pass ref through custom component
const FancyInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref} className="fancy" {...props} />;
});

function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>
    </>
  );
}

// useImperativeHandle: customize exposed ref value
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { if (inputRef.current) inputRef.current.value = ''; }
  }));
  
  return <input ref={inputRef} />;
});

// Now parent only sees { focus, clear }, not full DOM node

// When to use refs:
// - Focus management
// - Measuring DOM nodes (scroll position, dimensions)
// - Integrating 3rd-party libs (video player, map)
// - Triggering animations
// - NOT for: things React can manage declaratively`,
    note: "Refs don't trigger re-renders when mutated. Callback refs (ref={node => ...}) run on mount + unmount. Use refs sparingly — React's declarative model should handle most cases.",
  },
  {
    id: "portals",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Portals",
    desc: "Portals render children into a DOM node outside the parent component's hierarchy. Useful for modals, tooltips, and overlays. Events still bubble through the React tree, not DOM tree.",
    code: `import { createPortal } from 'react-dom';

// Render modal at document.body, not in parent div
function Modal({ children }: { children: React.ReactNode }) {
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">{children}</div>
    </div>,
    document.body  // target container
  );
}

function App() {
  const [open, setOpen] = useState(false);
  
  return (
    <div onClick={() => console.log('Parent clicked')}>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      
      {open && (
        <Modal>
          {/* This renders at document.body in DOM */}
          {/* But events bubble to <div> parent in React! */}
          <button onClick={() => setOpen(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
}

// DOM structure:
// <body>
//   <div id="root">
//     <div>  ← App's div
//       <button>Open Modal</button>
//     </div>
//   </div>
//   <div class="modal-backdrop">  ← Portal (sibling of root)
//     ...
//   </div>
// </body>

// But React's event tree still treats Modal as child of App
// Click inside Modal → bubbles to App's onClick handler`,
    note: "Portals preserve React's context, event bubbling, and state — only the DOM rendering location changes. Great for breaking out of overflow: hidden or z-index stacking contexts.",
  },
  {
    id: "error-boundaries",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Error Boundaries",
    desc: "Error boundaries catch JavaScript errors in child components, log them, and display a fallback UI. Must be class components (no hook equivalent yet). Only catch errors in rendering, lifecycle, and constructors.",
    code: `// Error Boundary (must be class component)
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught error:', error, errorInfo);
    // Send to error reporting service (Sentry, etc.)
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Header />
      <ErrorBoundary fallback={<p>Sidebar error</p>}>
        <Sidebar />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Content error</p>}>
        <Content />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}

// What error boundaries DON'T catch:
// - Event handlers (use try/catch)
// - Async code (setTimeout, promises)
// - Server-side rendering errors
// - Errors in the error boundary itself

// Event handler pattern:
function MyComponent() {
  const [error, setError] = useState<Error | null>(null);
  
  if (error) throw error; // boundary catches
  
  const handleClick = () => {
    try {
      riskyOperation();
    } catch (e) {
      setError(e); // throw on next render
    }
  };
  
  return <button onClick={handleClick}>Click</button>;
}`,
    note: "React 19 will likely add a hook-based error boundary API. For now, wrap class-based boundaries in thin wrappers. Strategically place multiple boundaries for granular fallbacks.",
  },
  {
    id: "suspense",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Suspense & Lazy Loading",
    desc: "Suspense lets components 'wait' for something before rendering, showing a fallback in the meantime. React.lazy enables code-splitting for components. React 18 adds Suspense for data fetching.",
    code: `// Code splitting with React.lazy
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
// HeavyChart.js only loaded when Dashboard renders

// Multiple lazy components
<Suspense fallback={<Loading />}>
  <LazyComponent1 />
  <LazyComponent2 />
</Suspense>
// Shows fallback until BOTH are loaded

// Nested Suspense
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<Spinner />}>
    <SlowContent />
  </Suspense>
  <Footer />
</Suspense>
// Header + Footer show immediately
// SlowContent shows spinner, not entire page skeleton

// React 18: Suspense for data fetching (with frameworks)
function ProfilePage({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // throws promise
  
  return <Profile user={user} />;
}

<Suspense fallback={<Skeleton />}>
  <ProfilePage userId="123" />
</Suspense>

// Suspense reveals when:
// - All lazy imports loaded
// - All thrown promises resolved
// - No errors thrown

// Error + Suspense combo:
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>`,
    note: "Suspense doesn't fetch for you — it orchestrates loading states. Use with React.lazy, frameworks (Next.js, Remix), or libraries (Relay, React Query with suspense mode). React 18's 'use' hook makes data fetching Suspense-compatible.",
  },
  {
    id: "concurrent",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Concurrent Mode Basics",
    desc: "Concurrent React (React 18+) can work on multiple versions of the UI at once and interrupt rendering to handle higher-priority updates. Enabled by using createRoot instead of render.",
    code: `// React 17 and earlier (legacy root)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
// Rendering is synchronous and blocking

// React 18+ (concurrent root)
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
// Rendering can be interrupted and resumed

// Concurrent features:
// 1. useTransition — mark updates as non-urgent
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    setQuery(e.target.value); // urgent (input stays responsive)
    
    startTransition(() => {
      // non-urgent (can be interrupted)
      setResults(expensiveFilter(data, e.target.value));
    });
  };
  
  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results data={results} />
    </>
  );
}

// 2. useDeferredValue — defer expensive computations
function FilteredList({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(
    () => expensiveFilter(data, deferredQuery),
    [deferredQuery]
  );
  
  return <List items={results} />;
}
// Input updates immediately, filter lags behind (non-blocking)

// 3. Automatic batching (React 18)
// Before: only batched in event handlers
setTimeout(() => {
  setCount(1);  // re-render 1
  setFlag(true); // re-render 2
}, 1000);

// React 18: batched everywhere (including async)
setTimeout(() => {
  setCount(1);
  setFlag(true);  // one re-render
}, 1000);

// Opt-out with flushSync (rare):
import { flushSync } from 'react-dom';
flushSync(() => setCount(1));  // render immediately
setFlag(true);                  // separate render`,
    note: "Concurrent rendering is opt-in via createRoot, but most features require explicit use (useTransition, Suspense). It doesn't make your app faster automatically — it makes urgent updates stay responsive during slow renders.",
  },
  {
    id: "strict-mode",
    category: "Core",
    badgeClass: "badge-purple",
    title: "Strict Mode Behavior",
    desc: "StrictMode is a development-only tool that highlights potential problems. In React 18, it double-invokes render and effects to surface bugs with improper cleanup.",
    code: `// Enable Strict Mode
import { StrictMode } from 'react';

<StrictMode>
  <App />
</StrictMode>

// What Strict Mode does (dev only):
// 1. Warns about unsafe lifecycle methods
//    - componentWillMount, componentWillReceiveProps, componentWillUpdate

// 2. Warns about legacy string ref API
//    - <input ref="myInput" />  ← old, don't use

// 3. Warns about deprecated findDOMNode usage

// 4. Double-invokes functions to detect side effects:
function MyComponent() {
  console.log('render');  // logs TWICE in strict mode
  
  useEffect(() => {
    console.log('effect');    // runs twice
    return () => {
      console.log('cleanup');  // runs twice
    };
  }, []);
  
  // React 18: also double-invokes:
  // - useState initializer
  // - useMemo / useCallback functions
  // - useReducer
  
  return <div>Hello</div>;
}

// Why double-invoke?
// React 18 can unmount and remount components (for Offscreen API)
// Double-invocation surfaces bugs where:
// - Effects have missing cleanup
// - Code assumes mount only happens once
// - External state isn't properly synchronized

// Example bug that Strict Mode catches:
useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  // ❌ Missing cleanup — interval leaks on remount
}, []);

// Fix:
useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id);  // ✅ cleanup
}, []);`,
    note: "Strict Mode double-invocation is intentional and helps find bugs. If you see duplicated logs in dev, that's normal. Production builds don't double-invoke. Write idempotent effects (safe to run multiple times).",
  },

  // ─── PERFORMANCE ───────────────────────────────────────────────────────────
  {
    id: "memo",
    category: "Performance",
    badgeClass: "badge-cyan",
    title: "React.memo",
    desc: "React.memo is a HOC that skips re-rendering if props haven't changed (shallow comparison). Use it for expensive components that render often with the same props.",
    code: `// Without memo — re-renders every time parent renders
function ExpensiveChild({ data }: { data: string[] }) {
  console.log('rendering expensive child');
  return <div>{/* expensive computation */}</div>;
}

// With memo — only re-renders if props change
const ExpensiveChild = React.memo(({ data }: { data: string[] }) => {
  console.log('rendering expensive child');
  return <div>{/* expensive computation */}</div>;
});

// Parent with unrelated state
function Parent() {
  const [count, setCount] = useState(0);
  const data = ['a', 'b', 'c']; // new array every render!
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {/* ❌ Still re-renders — data is new array each time */}
      <ExpensiveChild data={data} />
    </>
  );
}

// Fix: stable reference
function Parent() {
  const [count, setCount] = useState(0);
  const data = useMemo(() => ['a', 'b', 'c'], []); // stable ref
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {/* ✅ Skips re-render when count changes */}
      <ExpensiveChild data={data} />
    </>
  );
}

// Custom comparison function
const MyComponent = React.memo(
  (props: Props) => <div>{props.user.name}</div>,
  (prevProps, nextProps) => {
    // Return true = skip render (props are equal)
    // Return false = re-render
    return prevProps.user.id === nextProps.user.id;
  }
);

// When to use React.memo:
// ✅ Component renders often with same props
// ✅ Render is expensive (heavy computation/large tree)
// ✅ Pure component (same props = same output)
// ❌ Props change frequently
// ❌ Component is already fast
// ❌ Premature optimization`,
    note: "memo does shallow comparison by default (=== for each prop). Objects, arrays, and functions need stable references (useMemo, useCallback). Don't wrap everything in memo — measure first.",
  },
  {
    id: "re-renders",
    category: "Performance",
    badgeClass: "badge-cyan",
    title: "When Re-renders Happen",
    desc: "Components re-render when (1) state changes, (2) parent re-renders, (3) context value changes. Props changes don't directly cause re-renders — parent re-rendering does.",
    code: `// Trigger 1: State change
function Counter() {
  const [count, setCount] = useState(0);
  // setCount triggers re-render
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Trigger 2: Parent re-renders
function Parent() {
  const [toggle, setToggle] = useState(false);
  
  return (
    <>
      <button onClick={() => setToggle(t => !t)}>Toggle</button>
      {/* Child re-renders even though it has no props! */}
      <Child />
    </>
  );
}

function Child() {
  console.log('Child rendered');
  return <div>Static child</div>;
}
// Why? React's default: parent renders → all children render

// Prevent with React.memo:
const Child = React.memo(() => {
  console.log('Child rendered');
  return <div>Static child</div>;
});
// Now Child only renders once (no props → never changes)

// Trigger 3: Context change
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  // Any consumer re-renders when setTheme is called
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// What does NOT trigger re-render:
// - Props change when parent doesn't re-render (impossible)
// - Ref.current change (useRef)
// - Changing a variable outside component

// Optimization: Extract expensive children
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {/* ❌ ExpensiveTree re-renders every count change */}
      <ExpensiveTree />
    </>
  );
}

// ✅ Move state down, or lift content up:
function Parent({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <Parent>
      <StatefulButton />
      <ExpensiveTree />  {/* doesn't re-render! */}
    </Parent>
  );
}`,
    note: "React's default is to re-render all children when parent renders. This is usually fine — renders are fast and React only commits DOM changes. Optimize when profiling shows actual slowness.",
  },
  {
    id: "context-perf",
    category: "Performance",
    badgeClass: "badge-cyan",
    title: "Avoiding Unnecessary Context Re-renders",
    desc: "Every consumer of a context re-renders when the context value changes. Split contexts, memoize values, or use selectors to prevent re-renders.",
    code: `// ❌ Problem: Everything re-renders on any state change
const AppContext = createContext<AppState | null>(null);

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({});
  
  // New object every render → all consumers re-render
  const value = { user, setUser, theme, setTheme, settings, setSettings };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ✅ Fix 1: Memoize the value
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(
    () => ({ user, setUser, theme, setTheme }),
    [user, theme]  // only new object when these change
  );
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ✅ Fix 2: Split contexts by concern
const UserContext = createContext(null);
const ThemeContext = createContext('light');

function Providers({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return (
    <UserContext.Provider value={useMemo(() => ({ user, setUser }), [user])}>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Now changing user doesn't re-render theme consumers

// ✅ Fix 3: Separate state and dispatch
const StateContext = createContext(null);
const DispatchContext = createContext(null);

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

// Components only consuming dispatch never re-render on state changes

// ✅ Fix 4: Context selectors (via useSyncExternalStore in React 18)
// Third-party libs (Zustand, Jotai) implement this pattern`,
    note: "Context isn't bad for performance — but use it wisely. For truly global state (theme, auth), context is perfect. For frequently-changing state, consider state management libraries with built-in selectors.",
  },
  {
    id: "code-splitting",
    category: "Performance",
    badgeClass: "badge-cyan",
    title: "Code Splitting with React.lazy",
    desc: "React.lazy loads components on-demand, reducing initial bundle size. Use with Suspense to show loading states. Route-based splitting is the most common pattern.",
    code: `// Basic lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}

// Route-based splitting (most impactful)
const Home = React.lazy(() => import('./routes/Home'));
const Dashboard = React.lazy(() => import('./routes/Dashboard'));
const Settings = React.lazy(() => import('./routes/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Conditional loading
function App() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowChart(true)}>Load Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <LazyChart />
        </Suspense>
      )}
    </>
  );
}

// Preloading (warm up before user action)
const HeavyModal = React.lazy(() => import('./HeavyModal'));
const preload = () => {
  const componentPromise = import('./HeavyModal');
  // Bundler starts loading on mouseEnter, ready on click
};

<button 
  onMouseEnter={preload} 
  onClick={() => setShowModal(true)}
>
  Open Modal
</button>

// Named exports (lazy doesn't support directly)
// ❌ Can't do: React.lazy(() => import('./utils').then(m => m.helper))

// ✅ Workaround: re-export as default
// utils/helper.tsx
export { default } from './helperImpl';

// Then:
const Helper = React.lazy(() => import('./utils/helper'));`,
    note: "Lazy loading adds a network request — don't split everything. Focus on: large routes, modals/dialogs, admin panels, heavy charts/editors. Use Next.js dynamic imports for more control (ssr: false option).",
  },
  {
    id: "virtualization",
    category: "Performance",
    badgeClass: "badge-cyan",
    title: "Windowing / Virtualization",
    desc: "Virtualization (react-window, react-virtualized) only renders visible items in long lists, dramatically improving performance. Essential for 1000+ item lists.",
    code: `// ❌ Without virtualization — all items render
function LargeList({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>{item}</div>  // 10,000 DOM nodes!
      ))}
    </div>
  );
}

// ✅ With react-window — only visible items render
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }: { items: string[] }) {
  return (
    <FixedSizeList
      height={600}           // viewport height
      itemCount={items.length}
      itemSize={35}          // each item height
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>  // only ~20 DOM nodes!
          {items[index]}
        </div>
      )}
    </FixedSizeList>
  );
}

// Variable size items
import { VariableSizeList } from 'react-window';

<VariableSizeList
  height={600}
  itemCount={items.length}
  itemSize={(index) => index % 2 === 0 ? 50 : 100}
  width="100%"
>
  {Row}
</VariableSizeList>

// Grid (2D virtualization)
import { FixedSizeGrid } from 'react-window';

<FixedSizeGrid
  columnCount={100}
  columnWidth={100}
  height={600}
  rowCount={100}
  rowHeight={35}
  width={800}
>
  {({ columnIndex, rowIndex, style }) => (
    <div style={style}>
      Cell {rowIndex},{columnIndex}
    </div>
  )}
</FixedSizeGrid>

// Infinite scroll + virtualization
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

const loadMoreItems = () => fetchNextPage();
const isItemLoaded = (index) => index < items.length;

<InfiniteLoader
  isItemLoaded={isItemLoaded}
  itemCount={totalCount}
  loadMoreItems={loadMoreItems}
>
  {({ onItemsRendered, ref }) => (
    <FixedSizeList
      ref={ref}
      onItemsRendered={onItemsRendered}
      {...listProps}
    >
      {Row}
    </FixedSizeList>
  )}
</InfiniteLoader>`,
    note: "Virtualization adds complexity (fixed heights, scrolling edge cases). Only use for 500+ items. For smaller lists, a simple key optimization and React.memo are usually enough.",
  },

  // ─── PATTERNS ──────────────────────────────────────────────────────────────
  {
    id: "compound",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "Compound Components",
    desc: "Compound components share implicit state between parent and children using Context. Flexible API similar to HTML (<select> + <option>).",
    code: `// Example: Custom Select component
const SelectContext = createContext<{
  value: string;
  onChange: (v: string) => void;
} | null>(null);

function Select({ 
  children, 
  value, 
  onChange 
}: { 
  children: React.ReactNode; 
  value: string; 
  onChange: (v: string) => void; 
}) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  );
}

function Option({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(SelectContext);
  if (!context) throw new Error('Option must be inside Select');
  
  const isSelected = context.value === value;
  
  return (
    <div
      className={\`option \${isSelected ? 'selected' : ''}\`}
      onClick={() => context.onChange(value)}
    >
      {children}
    </div>
  );
}

Select.Option = Option;  // namespace for cleaner imports

// Usage — clean, declarative API
function App() {
  const [value, setValue] = useState('react');
  
  return (
    <Select value={value} onChange={setValue}>
      <Select.Option value="react">React</Select.Option>
      <Select.Option value="vue">Vue</Select.Option>
      <Select.Option value="svelte">Svelte</Select.Option>
    </Select>
  );
}

// Real-world example: Tabs
function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }: { index: number; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  return (
    <button 
      className={activeTab === index ? 'active' : ''}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: React.ReactNode }) {
  const { activeTab } = useContext(TabContext);
  return <>{React.Children.toArray(children)[activeTab]}</>;
}

// Usage
<Tabs>
  <TabList>
    <Tab index={0}>Profile</Tab>
    <Tab index={1}>Settings</Tab>
  </TabList>
  <TabPanels>
    <div>Profile content</div>
    <div>Settings content</div>
  </TabPanels>
</Tabs>`,
    note: "Compound components trade explicitness for flexibility. Great for UI component libraries (Radix, Reach UI use this). Downside: ordering matters, extra Context overhead.",
  },
  {
    id: "render-props",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "Render Props",
    desc: "Render prop pattern passes a function as a prop, allowing the parent to control what gets rendered. Enables code reuse without HOCs. Less common now (hooks replaced many use cases).",
    code: `// Classic example: Mouse tracker
function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return <>{render(position)}</>;
}

// Usage — consumer decides what to render
<MouseTracker render={({ x, y }) => (
  <div>Mouse at ({x}, {y})</div>
)} />

<MouseTracker render={({ x, y }) => (
  <Circle x={x} y={y} />
)} />

// Alternative syntax: children as function
function MouseTracker({ children }: { children: (pos: { x: number; y: number }) => React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // ... same logic
  return <>{children(position)}</>;
}

// Usage
<MouseTracker>
  {({ x, y }) => <div>Mouse at ({x}, {y})</div>}
</MouseTracker>

// Modern equivalent: custom hook (preferred)
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return position;
}

// Usage — much cleaner!
function MyComponent() {
  const { x, y } = useMousePosition();
  return <div>Mouse at ({x}, {y})</div>;
}

// When render props still make sense:
// - React Router's Route component
<Route path="/user/:id" render={({ match }) => (
  <User id={match.params.id} />
)} />

// - Downshift (accessible select component)
<Downshift>
  {({ isOpen, getMenuProps, getItemProps }) => (
    <div>
      {isOpen && <Menu {...getMenuProps()}>...</Menu>}
    </div>
  )}
</Downshift>`,
    note: "Render props were the primary code-reuse pattern before hooks. Now, custom hooks handle 90% of cases more elegantly. Render props still useful for components needing fine-grained control over rendering.",
  },
  {
    id: "hoc",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "Higher-Order Components (HOC)",
    desc: "HOC is a function that takes a component and returns a new component with additional props or behavior. Common in pre-hooks era (Redux connect, withRouter). Hooks are now preferred.",
    code: `// Basic HOC: add loading state
function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent(
    props: P & { isLoading: boolean }
  ) {
    const { isLoading, ...restProps } = props;
    
    if (isLoading) return <Spinner />;
    return <Component {...(restProps as P)} />;
  };
}

// Usage
function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>;
}

const UserProfileWithLoading = withLoading(UserProfile);

<UserProfileWithLoading user={user} isLoading={loading} />

// HOC with configuration
function withLogger(prefix: string) {
  return function <P extends object>(
    Component: React.ComponentType<P>
  ) {
    return function LoggedComponent(props: P) {
      useEffect(() => {
        console.log(\`[\${prefix}] Props:\`, props);
      });
      return <Component {...props} />;
    };
  };
}

const MyComponentWithLogger = withLogger('MyApp')(MyComponent);

// Classic example: Redux connect (pre-hooks)
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = { updateUser };

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

// React Router withRouter (pre-hooks)
const MyComponentWithRouter = withRouter(MyComponent);
// Now use: useNavigate, useParams, useLocation hooks instead

// HOC composition
const enhance = compose(
  withLoading,
  withLogger('App'),
  connect(mapStateToProps)
);

const EnhancedComponent = enhance(MyComponent);

// Modern equivalent: custom hooks
function useUserData() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);
  
  return { user, loading };
}

// Usage — much cleaner!
function UserProfile() {
  const { user, loading } = useUserData();
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}`,
    note: "HOCs were essential pre-hooks for cross-cutting concerns. Now, custom hooks handle most use cases better (no wrapper hell, better TypeScript, simpler). Still see HOCs in legacy codebases and some libraries.",
  },
  {
    id: "container-presentational",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "Container / Presentational Pattern",
    desc: "Separate data-fetching logic (containers) from UI rendering (presentational). Containers are smart, presentational are dumb. Less strict since hooks — now components can be both.",
    code: `// ─── PRESENTATIONAL (dumb, pure, no side effects) ───
interface UserCardProps {
  name: string;
  email: string;
  onEdit: () => void;
}

function UserCard({ name, email, onEdit }: UserCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}
// No useState, no useEffect, no fetch
// Just props in, UI out — easy to test!

// ─── CONTAINER (smart, handles data + logic) ───────────
function UserCardContainer({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);
  
  const handleEdit = () => {
    // navigate to edit page, open modal, etc.
  };
  
  if (loading) return <Spinner />;
  if (!user) return <Error />;
  
  return (
    <UserCard 
      name={user.name} 
      email={user.email} 
      onEdit={handleEdit} 
    />
  );
}
// All the messy logic here, presentational stays clean

// Modern approach: hooks blur the line
function UserCard({ userId }: { userId: string }) {
  const { user, loading } = useUser(userId);  // custom hook
  const navigate = useNavigate();
  
  if (loading) return <Spinner />;
  if (!user) return <Error />;
  
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => navigate(\`/edit/\${userId}\`)}>
        Edit
      </button>
    </div>
  );
}
// Still follows spirit: extract reusable logic (useUser hook)
// But component handles both data + UI — simpler!

// When to separate:
// ✅ Component is reused with different data sources
// ✅ Testing presentational component in isolation
// ✅ Designer/dev split (presentational = pure UI)
// ❌ One-off components (combined is simpler)
// ❌ Over-engineering small apps`,
    note: "Container/Presentational was dogma in early React. Hooks made it less necessary — components can do both cleanly. Extract custom hooks for reusable logic, not always separate components.",
  },
];

const categories = ["Core", "Performance", "Patterns"];

const categoryMeta: Record<string, { badge: string; icon: string }> = {
  "Core": { badge: "badge-purple", icon: "⚛️" },
  "Performance": { badge: "badge-cyan", icon: "⚡" },
  "Patterns": { badge: "badge-orange", icon: "🏗️" },
};

export default function ReactPage() {
  const grouped = categories.map((cat) => ({
    name: cat,
    items: concepts.filter((c) => c.category === cat),
  }));

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-purple">React</span>
          <span className="badge badge-cyan">{concepts.length} Concepts</span>
          <span className="badge badge-blue">Server Component</span>
        </div>
        <h1>React Concepts</h1>
        <p>
          Comprehensive React reference: JSX compilation, Virtual DOM, Fiber
          architecture, performance optimization, and design patterns.
        </p>
      </div>

      <div className="tip-box">
        <strong>📌 Interview Pro Tip</strong>
        Be ready to explain: (1) How JSX compiles and the Virtual DOM, (2) Fiber
        and reconciliation, (3) When to use React.memo / useMemo / useCallback,
        (4) React 18 concurrent features. Know at least one design pattern deeply.
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
