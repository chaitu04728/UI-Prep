"use client";
// ✅ HOOKS DEEP DIVE — All React Hooks with Interactive Demos

import { 
  useState, useEffect, useContext, useRef, useMemo, useCallback, 
  useReducer, useLayoutEffect, useId, useDeferredValue, useTransition,
  useImperativeHandle, forwardRef, createContext, type ForwardedRef
} from "react";
import type { Metadata } from "next";

// ─── Context for useContext demo ───────────────────────────────────────────────
const ThemeContext = createContext<{ theme: string; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

// ─── useReducer: Shopping Cart ─────────────────────────────────────────────────
type CartItem = { id: number; name: string; price: number; qty: number };
type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD":
      const exists = state.find((i) => i.id === action.item.id);
      if (exists) return state.map((i) => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, action.item];
    case "REMOVE": return state.filter((i) => i.id !== action.id);
    case "CLEAR": return [];
    default: return state;
  }
}

const PRODUCTS = [
  { id: 1, name: "React Book", price: 29 },
  { id: 2, name: "TS Course", price: 49 },
];

// ─── useImperativeHandle: Custom Input Component ───────────────────────────────
interface FancyInputHandle {
  focus: () => void;
  shake: () => void;
}

const FancyInput = forwardRef<FancyInputHandle, { placeholder?: string }>(
  ({ placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isShaking, setIsShaking] = useState(false);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      shake: () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      },
    }));

    return (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className={isShaking ? "shake" : ""}
        style={{
          padding: "0.5rem",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          background: "var(--surface)",
          color: "var(--text)",
          animation: isShaking ? "shake 0.5s" : "none",
        }}
      />
    );
  }
);
FancyInput.displayName = "FancyInput";

// ─── Custom Hook: useDebounce ──────────────────────────────────────────────────
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function HooksPage() {
  // useState demos
  const [count, setCount] = useState(0);
  const [lazyCount, setLazyCount] = useState(() => {
    console.log("🔥 Lazy initializer runs ONCE");
    return 100;
  });

  // useEffect demos
  const [seconds, setSeconds] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Effect with cleanup
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []); // Empty deps = runs once on mount

  useEffect(() => {
    // Effect with window listener cleanup
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useContext demo
  const [theme, setTheme] = useState("dark");
  const themeValue = {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };

  // useMemo demo
  const [nums, setNums] = useState([5, 2, 8, 1, 9]);
  const [unrelated, setUnrelated] = useState(0);
  const sortedNums = useMemo(() => {
    console.log("🔄 useMemo: sorting...");
    return [...nums].sort((a, b) => a - b);
  }, [nums]);

  // useCallback demo
  const [cbCount, setCbCount] = useState(0);
  const stableHandler = useCallback(() => {
    setCbCount((c) => c + 1);
  }, []);

  // useRef demo
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);
  renderCount.current++;

  // useReducer demo
  const [cart, dispatch] = useReducer(cartReducer, []);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // useLayoutEffect demo
  const [layoutHeight, setLayoutHeight] = useState(0);
  const layoutRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    // Fires synchronously BEFORE browser paint
    if (layoutRef.current) {
      setLayoutHeight(layoutRef.current.offsetHeight);
    }
  }, []);

  // useId demo
  const id1 = useId();
  const id2 = useId();

  // useDeferredValue demo
  const [deferredInput, setDeferredInput] = useState("");
  const deferredValue = useDeferredValue(deferredInput);
  const items = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(deferredValue.toLowerCase())
  );

  // useTransition demo
  const [isPending, startTransition] = useTransition();
  const [transitionInput, setTransitionInput] = useState("");
  const [transitionList, setTransitionList] = useState<string[]>([]);

  const handleTransitionChange = (value: string) => {
    setTransitionInput(value);
    startTransition(() => {
      // Mark this update as non-urgent
      const newList = Array.from({ length: 10000 }, (_, i) => `${value} ${i}`);
      setTransitionList(newList);
    });
  };

  // useImperativeHandle demo
  const fancyInputRef = useRef<FancyInputHandle>(null);

  // Custom hook demo
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span className="badge badge-cyan">useState</span>
          <span className="badge badge-cyan">useEffect</span>
          <span className="badge badge-cyan">useContext</span>
          <span className="badge badge-purple">useMemo</span>
          <span className="badge badge-purple">useCallback</span>
          <span className="badge badge-purple">useRef</span>
          <span className="badge badge-orange">useReducer</span>
          <span className="badge badge-blue">useLayoutEffect</span>
          <span className="badge badge-blue">useId</span>
          <span className="badge badge-green">useDeferredValue</span>
          <span className="badge badge-green">useTransition</span>
          <span className="badge badge-yellow">useImperativeHandle</span>
          <span className="badge badge-purple">Custom Hooks</span>
        </div>
        <h1>React Hooks Deep Dive</h1>
        <p>All 13 React hooks + custom hook patterns — with live interactive demos.</p>
        <div className="tip-box" style={{ marginTop: "1rem" }}>
          <strong>📌 Render Count:</strong> This component has rendered{" "}
          <strong style={{ color: "var(--yellow)" }}>{renderCount.current}</strong> times
        </div>
      </div>

      {/* ── useState ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">useState</span>
          <h2>useState — Functional Updates & Lazy Initialization</h2>
        </div>
        <p>The foundation hook. Supports functional updates and lazy initialization.</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div className="demo-label">🔢 Count: {count}</div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button onClick={() => setCount(count + 1)}>Direct: {count} + 1</button>
            <button onClick={() => setCount((c) => c + 1)}>Functional: c =&gt; c + 1 ✅</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.5rem" }}>
            Functional updates are safer in async scenarios (closures capture stale state).
          </p>
        </div>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div className="demo-label">💡 Lazy Init Count: {lazyCount}</div>
          <button onClick={() => setLazyCount((c) => c + 1)}>Increment</button>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.5rem" }}>
            Check console: the expensive initializer only ran once on mount, not on every render.
          </p>
        </div>

        <div className="code-block">
          <span className="comment">// ❌ Avoid: direct state in updater (stale closure risk)</span>{"\n"}
          <span className="fn">setCount</span>(count + 1);{"\n"}
          {"\n"}
          <span className="comment">// ✅ Prefer: functional update (always uses fresh state)</span>{"\n"}
          <span className="fn">setCount</span>(c =&gt; c + 1);{"\n"}
          {"\n"}
          <span className="comment">// 🚀 Lazy init: runs expensive logic ONCE</span>{"\n"}
          <span className="keyword">const</span> [state, setState] = <span className="fn">useState</span>({"\n"}
          {"  "}() =&gt; <span className="fn">expensiveComputation</span>(){"\n"}
          );
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "Functional updates are critical when the next state depends
          on the previous state, especially in async callbacks or event handlers. Lazy initialization
          is useful for reading from localStorage or performing expensive initial calculations."
        </div>
      </div>

      {/* ── useEffect ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">useEffect</span>
          <h2>useEffect — Side Effects & Cleanup</h2>
        </div>
        <p>Runs after render. Handles subscriptions, timers, network requests. Always cleanup!</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div className="demo-label">⏱️ Timer: {seconds}s (cleanup on unmount)</div>
          <div className="demo-label" style={{ marginTop: "0.5rem" }}>
            📏 Window Width: {windowWidth}px (listener cleanup)
          </div>
        </div>

        <div className="code-block">
          <span className="comment">// Runs AFTER every render (no deps)</span>{"\n"}
          <span className="fn">useEffect</span>(() =&gt; {"{"} <span className="comment">/* side effect */</span> {"}"});{"\n"}
          {"\n"}
          <span className="comment">// Runs ONCE on mount (empty deps)</span>{"\n"}
          <span className="fn">useEffect</span>(() =&gt; {"{"}{"\n"}
          {"  "}<span className="keyword">const</span> timer = <span className="fn">setInterval</span>(...);{"\n"}
          {"  "}<span className="keyword">return</span> () =&gt; <span className="fn">clearInterval</span>(timer); <span className="comment">// cleanup</span>{"\n"}
          {"}"}, []);{"\n"}
          {"\n"}
          <span className="comment">// Runs when [id] changes</span>{"\n"}
          <span className="fn">useEffect</span>(() =&gt; {"{"} <span className="fn">fetchUser</span>(id); {"}"}, [id]);
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "The deps array tells React when to re-run the effect.
          Empty deps = run once on mount. Missing deps = runs every render (usually a bug).
          Cleanup functions prevent memory leaks from subscriptions or timers."
        </div>
      </div>

      {/* ── useContext ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">useContext</span>
          <h2>useContext — Consume Context Without Prop Drilling</h2>
        </div>
        <p>Access context value from nearest provider. Re-renders when context changes.</p>

        <ThemeContext.Provider value={themeValue}>
          <div className="demo" style={{ marginTop: "1rem" }}>
            <div className="demo-label">🎨 Current Theme: {theme}</div>
            <ThemeConsumer />
          </div>
        </ThemeContext.Provider>

        <div className="code-block">
          <span className="comment">// 1. Create context</span>{"\n"}
          <span className="keyword">const</span> ThemeContext = <span className="fn">createContext</span>({"{}"});{"\n"}
          {"\n"}
          <span className="comment">// 2. Provide value</span>{"\n"}
          &lt;ThemeContext.Provider value={'{'}{"\{theme, setTheme\}"}{'}'}&gt;{"\n"}
          {"  "}&lt;ChildComponent /&gt;{"\n"}
          &lt;/ThemeContext.Provider&gt;{"\n"}
          {"\n"}
          <span className="comment">// 3. Consume in child (no props!)</span>{"\n"}
          <span className="keyword">const</span> {"{ theme, setTheme }"} = <span className="fn">useContext</span>(ThemeContext);
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useContext solves prop drilling. But be careful: every
          consumer re-renders when context changes. For performance, split contexts or use useMemo
          to stabilize the provider value."
        </div>
      </div>

      {/* ── useMemo ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-purple">useMemo</span>
          <h2>useMemo — Memoize Expensive Computations</h2>
        </div>
        <p>Only re-runs when dependencies change. Skips re-computation on unrelated renders.</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div className="demo-label">⚙️ Sorted: [{sortedNums.join(", ")}]</div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem", flexWrap: "wrap" }}>
            <button onClick={() => setNums((n) => [...n, Math.floor(Math.random() * 9) + 1])}>
              Add Number (re-sorts ✅)
            </button>
            <button onClick={() => setUnrelated((n) => n + 1)}>
              Unrelated #{unrelated} (skips ⚡)
            </button>
          </div>
        </div>

        <div className="code-block">
          <span className="comment">// ❌ Bad: sorts on EVERY render</span>{"\n"}
          <span className="keyword">const</span> sorted = [...nums].<span className="fn">sort</span>();{"\n"}
          {"\n"}
          <span className="comment">// ✅ Good: only sorts when [nums] changes</span>{"\n"}
          <span className="keyword">const</span> sorted = <span className="fn">useMemo</span>({"\n"}
          {"  "}() =&gt; [...nums].<span className="fn">sort</span>((a, b) =&gt; a - b),{"\n"}
          {"  "}[nums]{"\n"}
          );
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useMemo caches a computed value. Use for expensive
          calculations like filtering large arrays. Don't over-memoize — the memo itself has overhead."
        </div>
      </div>

      {/* ── useCallback ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-purple">useCallback</span>
          <h2>useCallback — Stable Function References</h2>
        </div>
        <p>Prevents child re-renders when passing callbacks as props (use with React.memo).</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div className="demo-label">🔢 Callback clicked: {cbCount} times</div>
          <button onClick={stableHandler}>Stable Callback ✅</button>
        </div>

        <div className="code-block">
          <span className="comment">// ❌ Without: new function → child re-renders</span>{"\n"}
          <span className="keyword">const</span> handleClick = () =&gt; <span className="fn">doSomething</span>();{"\n"}
          {"\n"}
          <span className="comment">// ✅ With: same ref → child skips re-render</span>{"\n"}
          <span className="keyword">const</span> handleClick = <span className="fn">useCallback</span>({"\n"}
          {"  "}() =&gt; <span className="fn">doSomething</span>(id),{"\n"}
          {"  "}[id]{"\n"}
          );
        </div>
      </div>

      {/* ── useRef ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-purple">useRef</span>
          <h2>useRef — DOM Access + Persistent Values</h2>
        </div>
        <p>Mutable ref that persists across renders WITHOUT triggering re-render when changed.</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Focus me with button below"
            style={{
              padding: "0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              background: "var(--surface)",
              color: "var(--text)",
              width: "100%",
            }}
          />
          <button onClick={() => inputRef.current?.focus()} style={{ marginTop: "0.5rem" }}>
            Focus Input
          </button>
        </div>

        <div className="code-block">
          <span className="comment">// DOM ref</span>{"\n"}
          <span className="keyword">const</span> inputRef = <span className="fn">useRef</span>(null);{"\n"}
          &lt;input ref={'{'}{"\inputRef"}{'}'} /&gt;{"\n"}
          inputRef.current.<span className="fn">focus</span>();{"\n"}
          {"\n"}
          <span className="comment">// Persistent value (doesn't cause re-render)</span>{"\n"}
          <span className="keyword">const</span> renderCount = <span className="fn">useRef</span>(0);{"\n"}
          renderCount.current++;
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useRef has two uses: (1) accessing DOM nodes, and
          (2) storing mutable values that persist across renders without causing re-renders.
          Unlike state, changing ref.current doesn't trigger a render."
        </div>
      </div>

      {/* ── useReducer ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-orange">useReducer</span>
          <h2>useReducer — Complex State Logic</h2>
        </div>
        <p>Alternative to useState for complex state with multiple sub-values or transitions.</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div className="demo-label">🛒 Shopping Cart</div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => dispatch({ type: "ADD", item: { ...p, qty: 1 } })}
              >
                + {p.name} (${p.price})
              </button>
            ))}
          </div>
          {cart.length === 0 ? (
            <div className="output" style={{ color: "var(--muted)" }}>Cart is empty</div>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.4rem 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span>{item.name} × {item.qty}</span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: "var(--green)" }}>${item.price * item.qty}</span>
                    <button onClick={() => dispatch({ type: "REMOVE", id: item.id })}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "0.8rem", fontWeight: 700 }}>
                Total: <span style={{ color: "var(--yellow)" }}>${cartTotal}</span>
              </div>
              <button onClick={() => dispatch({ type: "CLEAR" })} style={{ marginTop: "0.5rem" }}>
                Clear Cart
              </button>
            </div>
          )}
        </div>

        <div className="code-block">
          <span className="keyword">function</span> <span className="fn">reducer</span>(state, action) {"{"}{"\n"}
          {"  "}<span className="keyword">switch</span> (action.type) {"{"}{"\n"}
          {"    "}<span className="keyword">case</span> <span className="string">"ADD"</span>: <span className="keyword">return</span> [...state, action.item];{"\n"}
          {"    "}<span className="keyword">case</span> <span className="string">"REMOVE"</span>: <span className="keyword">return</span> state.<span className="fn">filter</span>(i =&gt; i.id !== action.id);{"\n"}
          {"    "}<span className="keyword">default</span>: <span className="keyword">return</span> state;{"\n"}
          {"  }"}{"\n"}
          {"}"}{"\n"}
          <span className="keyword">const</span> [state, dispatch] = <span className="fn">useReducer</span>(reducer, initialState);
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useReducer is better than useState when: (1) state has
          multiple sub-values, (2) next state depends on previous, or (3) update logic is complex.
          It's Redux in miniature."
        </div>
      </div>

      {/* ── useLayoutEffect ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-blue">useLayoutEffect</span>
          <h2>useLayoutEffect vs useEffect</h2>
        </div>
        <p>Fires synchronously BEFORE browser paint. Use for DOM measurements to avoid flicker.</p>

        <div
          ref={layoutRef}
          className="demo"
          style={{ marginTop: "1rem", padding: "1rem", background: "var(--surface)" }}
        >
          <div className="demo-label">📐 Measured Height: {layoutHeight}px</div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            This height was measured in useLayoutEffect before the browser painted.
            With useEffect, you'd see a flicker as the height updates.
          </p>
        </div>

        <div className="code-block">
          <span className="comment">// useEffect: async, after paint (typical)</span>{"\n"}
          <span className="fn">useEffect</span>(() =&gt; {"{"} <span className="comment">/* DOM is painted */</span> {"}"});{"\n"}
          {"\n"}
          <span className="comment">// useLayoutEffect: sync, BEFORE paint</span>{"\n"}
          <span className="fn">useLayoutEffect</span>(() =&gt; {"{"}{"\n"}
          {"  "}<span className="keyword">const</span> height = ref.current.<span className="property">offsetHeight</span>;{"\n"}
          {"  "}<span className="fn">setHeight</span>(height); <span className="comment">// no flicker</span>{"\n"}
          {"}"});
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "99% of the time use useEffect. Use useLayoutEffect only
          when you need to measure DOM nodes or mutate the DOM before paint to avoid visual flicker."
        </div>
      </div>

      {/* ── useId ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-blue">useId</span>
          <h2>useId — SSR-Safe Unique IDs</h2>
        </div>
        <p>Generates unique IDs that match between server and client (hydration-safe).</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div>
            <label htmlFor={id1}>Field 1 (id: {id1})</label>
            <input
              id={id1}
              type="text"
              style={{
                marginLeft: "0.5rem",
                padding: "0.3rem",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <label htmlFor={id2}>Field 2 (id: {id2})</label>
            <input
              id={id2}
              type="text"
              style={{
                marginLeft: "0.5rem",
                padding: "0.3rem",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            />
          </div>
        </div>

        <div className="code-block">
          <span className="comment">// ❌ Bad in SSR: Math.random() causes hydration mismatch</span>{"\n"}
          <span className="keyword">const</span> id = <span className="string">"field-"</span> + Math.<span className="fn">random</span>();{"\n"}
          {"\n"}
          <span className="comment">// ✅ Good: SSR-safe unique ID</span>{"\n"}
          <span className="keyword">const</span> id = <span className="fn">useId</span>();{"\n"}
          &lt;label htmlFor={'{'}{"\id"}{'}'}&gt;Name&lt;/label&gt;{"\n"}
          &lt;input id={'{'}{"\id"}{'}'} /&gt;
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useId solves the hydration mismatch problem when
          generating unique IDs for accessibility attributes. The server and client generate
          the same ID, preventing React warnings."
        </div>
      </div>

      {/* ── useDeferredValue ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-green">useDeferredValue</span>
          <h2>useDeferredValue — Defer Non-Urgent Updates</h2>
        </div>
        <p>Lets urgent updates (typing) render first, defers expensive updates (filtering 5000 items).</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="Type to filter 5000 items..."
            value={deferredInput}
            onChange={(e) => setDeferredInput(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
          <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
            Showing {filteredItems.length} of 5000 items
            {deferredInput !== deferredValue && " (updating...)"}
          </div>
          <div
            style={{
              marginTop: "0.5rem",
              maxHeight: "150px",
              overflowY: "auto",
              fontSize: "0.75rem",
              opacity: deferredInput !== deferredValue ? 0.5 : 1,
            }}
          >
            {filteredItems.slice(0, 50).map((item, i) => (
              <div key={i} style={{ padding: "0.2rem 0" }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="code-block">
          <span className="keyword">const</span> [input, setInput] = <span className="fn">useState</span>("");{"\n"}
          <span className="keyword">const</span> deferred = <span className="fn">useDeferredValue</span>(input);{"\n"}
          {"\n"}
          <span className="comment">// Input updates immediately (stays responsive)</span>{"\n"}
          <span className="comment">// Expensive filter uses deferred value (updates later)</span>{"\n"}
          <span className="keyword">const</span> filtered = items.<span className="fn">filter</span>(i =&gt; i.<span className="fn">includes</span>(deferred));
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useDeferredValue keeps the UI responsive by deferring
          expensive computations. The input stays snappy while the heavy filter catches up.
          It's automatic concurrent rendering."
        </div>
      </div>

      {/* ── useTransition ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-green">useTransition</span>
          <h2>useTransition — Mark State Updates as Non-Urgent</h2>
        </div>
        <p>Wraps state updates in startTransition to keep UI responsive during expensive updates.</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="Type anything..."
            value={transitionInput}
            onChange={(e) => handleTransitionChange(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
          <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
            {isPending ? "⏳ Updating 10,000 items..." : `✅ Rendered ${transitionList.length} items`}
          </div>
        </div>

        <div className="code-block">
          <span className="keyword">const</span> [isPending, startTransition] = <span className="fn">useTransition</span>();{"\n"}
          {"\n"}
          <span className="keyword">const</span> <span className="fn">handleChange</span> = (value) =&gt; {"{"}{"\n"}
          {"  "}<span className="fn">setInput</span>(value); <span className="comment">// urgent (input stays responsive)</span>{"\n"}
          {"  "}<span className="fn">startTransition</span>(() =&gt; {"{"}{"\n"}
          {"    "}<span className="fn">setList</span>(expensiveUpdate(value)); <span className="comment">// non-urgent</span>{"\n"}
          {"  }"});{"\n"}
          {"}"};
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useTransition lets you mark certain state updates as
          non-urgent. React keeps the UI responsive by prioritizing urgent updates (typing) over
          non-urgent ones (rendering 10k items). isPending tells you when the transition is active."
        </div>
      </div>

      {/* ── useImperativeHandle ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-yellow">useImperativeHandle</span>
          <h2>useImperativeHandle — Customize Ref Exposure</h2>
        </div>
        <p>Customize the instance value that gets exposed to parent when using forwardRef.</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <FancyInput ref={fancyInputRef} placeholder="Fancy input component" />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <button onClick={() => fancyInputRef.current?.focus()}>Focus</button>
            <button onClick={() => fancyInputRef.current?.shake()}>Shake</button>
          </div>
        </div>

        <div className="code-block">
          <span className="keyword">const</span> FancyInput = <span className="fn">forwardRef</span>((props, ref) =&gt; {'{'}{"\n"}
          {"  "}<span className="keyword">const</span> inputRef = <span className="fn">useRef</span>();{"\n"}
          {"  "}<span className="fn">useImperativeHandle</span>(ref, () =&gt; ({'{'}{"\n"}
          {"    "}<span className="fn">focus</span>: () =&gt; inputRef.current.<span className="fn">focus</span>(),{"\n"}
          {"    "}<span className="fn">shake</span>: () =&gt; <span className="comment">/* custom animation */</span>{"\n"}
          {"  "}{'}'}));{"\n"}
          {"  "}<span className="keyword">return</span> &lt;input ref={'{'}{"\inputRef"}{'}'} /&gt;;{"\n"}
          {'}'});
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "useImperativeHandle customizes the ref value exposed to
          parents. Instead of exposing the raw DOM node, you expose a custom API (focus, shake).
          Rarely needed, but useful for reusable components."
        </div>
      </div>

      {/* ── Custom Hooks ── */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-purple">Custom Hooks</span>
          <h2>Custom Hooks — Reusable Logic Patterns</h2>
        </div>
        <p>Extract and reuse stateful logic. Must start with "use" to follow Rules of Hooks.</p>

        <div className="demo" style={{ marginTop: "1rem" }}>
          <div className="demo-label">🔍 Debounced Search</div>
          <input
            type="text"
            placeholder="Type fast..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
          <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
            <div style={{ color: "var(--muted)" }}>
              Immediate: <strong>{searchTerm || "(empty)"}</strong>
            </div>
            <div style={{ color: "var(--green)" }}>
              Debounced (500ms): <strong>{debouncedSearch || "(empty)"}</strong>
            </div>
          </div>
        </div>

        <div className="code-block">
          <span className="comment">// Custom hook: useDebounce</span>{"\n"}
          <span className="keyword">function</span> <span className="fn">useDebounce</span>(value, delay) {"{"}{"\n"}
          {"  "}<span className="keyword">const</span> [debounced, setDebounced] = <span className="fn">useState</span>(value);{"\n"}
          {"  "}<span className="fn">useEffect</span>(() =&gt; {"{"}{"\n"}
          {"    "}<span className="keyword">const</span> timer = <span className="fn">setTimeout</span>(() =&gt; <span className="fn">setDebounced</span>(value), delay);{"\n"}
          {"    "}<span className="keyword">return</span> () =&gt; <span className="fn">clearTimeout</span>(timer);{"\n"}
          {"  }"}, [value, delay]);{"\n"}
          {"  "}<span className="keyword">return</span> debounced;{"\n"}
          {"}"}{"\n"}
          {"\n"}
          <span className="comment">// Usage</span>{"\n"}
          <span className="keyword">const</span> [search, setSearch] = <span className="fn">useState</span>("");{"\n"}
          <span className="keyword">const</span> debouncedSearch = <span className="fn">useDebounce</span>(search, 500);
        </div>

        <div className="tip-box">
          <strong>🎤 Interview:</strong> "Custom hooks let you extract component logic into
          reusable functions. Common patterns: useLocalStorage, useFetch, useDebounce, useMediaQuery.
          They must start with 'use' and can call other hooks."
        </div>
      </div>
    </div>
  );
}

// ─── Theme Consumer (for useContext demo) ──────────────────────────────────────
function ThemeConsumer() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <div
        style={{
          padding: "1rem",
          borderRadius: "4px",
          background: theme === "dark" ? "#1a1a1a" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
          border: "1px solid var(--border)",
        }}
      >
        Theme: {theme}
      </div>
      <button onClick={toggle}>Toggle Theme</button>
    </div>
  );
}
