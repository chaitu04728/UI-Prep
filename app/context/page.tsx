"use client";
// ✅ Context + useContext
// Demonstrates: createContext, Provider, useContext, and a custom hook wrapper.
// Theme toggle + user auth context — two real-world patterns in one page.

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import CodeBlock from "@/components/CodeBlock";

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────

type Theme = "dark" | "light" | "monokai";

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

// Step 1: Create the context with a default (used when no Provider is above)
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

// Step 3: Custom hook — wraps useContext for cleaner import + error guard
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────

type User = { name: string; role: string } | null;

type AuthContextType = {
  user: User;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

function useAuth() {
  return useContext(AuthContext);
}

// ─── PROVIDERS ────────────────────────────────────────────────────────────────

// Step 2: Provider component — wraps children and supplies the value
function Providers({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [user, setUser] = useState<User>(null);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const login = useCallback(
    (name: string) => setUser({ name, role: "developer" }),
    [],
  );
  const logout = useCallback(() => setUser(null), []);

  return (
    // Nest providers — any child can consume either context
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

// ─── CONSUMER COMPONENTS (deeply nested — no prop drilling!) ──────────────────

const THEME_STYLES: Record<
  Theme,
  { bg: string; border: string; accent: string; label: string }
> = {
  dark: { bg: "#0a0a0f", border: "#1e1e2e", accent: "#89b4fa", label: "Dark" },
  light: {
    bg: "#eff1f5",
    border: "#ccd0da",
    accent: "#1e66f5",
    label: "Light",
  },
  monokai: {
    bg: "#272822",
    border: "#75715e",
    accent: "#a6e22e",
    label: "Monokai",
  },
};

// This component is nested deep — it reads from context without any props!
function ThemeSwitcher() {
  const { theme, setTheme } = useTheme(); // ← Step 4: consume with custom hook
  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {(Object.keys(THEME_STYLES) as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          style={{
            borderColor: theme === t ? THEME_STYLES[t].accent : undefined,
            color: theme === t ? THEME_STYLES[t].accent : undefined,
          }}
        >
          {theme === t ? "✓ " : ""}
          {THEME_STYLES[t].label}
        </button>
      ))}
    </div>
  );
}

function ThemePreview() {
  const { theme } = useTheme();
  const s = THEME_STYLES[theme];
  return (
    <div
      style={{
        background: s.bg,
        border: `2px solid ${s.border}`,
        borderRadius: "8px",
        padding: "1.2rem",
        marginTop: "1rem",
        transition: "all 0.3s",
      }}
    >
      <div style={{ color: s.accent, fontWeight: 700, marginBottom: "0.5rem" }}>
        Theme: {s.label}
      </div>
      <div
        style={{
          color: s.border === "#ccd0da" ? "#4c4f69" : "#6c7086",
          fontSize: "0.82rem",
        }}
      >
        Every component reading this context re-rendered automatically. No prop
        drilling. No lifting state up.
      </div>
    </div>
  );
}

function UserPanel() {
  const { user, login, logout } = useAuth();
  const [inputName, setInputName] = useState("");

  return (
    <div className="demo">
      <div className="demo-label">👤 Auth Context</div>
      {user ? (
        <div>
          <div className="output" style={{ marginBottom: "0.5rem" }}>
            Logged in as: {user.name} ({user.role})
          </div>
          <button
            onClick={logout}
            style={{ borderColor: "var(--red)", color: "var(--red)" }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Your name..."
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              borderRadius: "4px",
              padding: "0.4rem 0.7rem",
              fontFamily: "JetBrains Mono",
              fontSize: "0.82rem",
            }}
          />
          <button
            onClick={() => {
              if (inputName) {
                login(inputName);
                setInputName("");
              }
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function ContextPage() {
  return (
    // Providers wrap everything — children can consume either context
    <Providers>
      <div className="container">
        <div className="page-header">
          <div className="meta">
            <span className="badge badge-cyan">createContext</span>
            <span className="badge badge-cyan">useContext</span>
            <span className="badge badge-cyan">Custom Hook</span>
          </div>
          <h1>Context + useContext</h1>
          <p>
            Global state without prop drilling. Providers sit at the top; any
            descendant reads the value with <code>useContext</code>.
          </p>
        </div>

        <div className="card">
          <h2>Theme Context — Live Demo</h2>
          <p>
            Change theme here. Both components below consume the same context —
            no props passed!
          </p>
          <div style={{ marginTop: "1rem" }}>
            <ThemeSwitcher />
            <ThemePreview />
          </div>
        </div>

        <UserPanel />

        <div className="tip-box">
          <strong>🎤 Interview Answer</strong>
          "Context solves prop drilling — passing props through many layers to
          reach a deeply nested component. I use it for truly global state:
          auth, theme, locale, toast notifications. For heavy state + actions, I
          pair Context with useReducer (a lightweight Redux alternative)."
        </div>

        <div className="card">
          <h3>The Full Pattern (4 steps)</h3>
          <CodeBlock
            language="typescript"
            code={`// Step 1: Create context (with TypeScript type + default)
const ThemeCtx = createContext<ThemeContextType>(defaultValue);

// Step 2: Provide it high in the tree
<ThemeCtx.Provider value={{ theme, setTheme }}><App /></ThemeCtx.Provider>

// Step 3: Custom hook for cleaner DX + error guard
function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("Missing Provider");
  return ctx;
}

// Step 4: Consume anywhere in the tree
const { theme, setTheme } = useTheme();`}
          />
        </div>

        <div className="card">
          <h3>Context + useReducer (mini-Redux)</h3>
          <CodeBlock
            language="typescript"
            code={`// Combine for complex state management
const [state, dispatch] = useReducer(reducer, init);

<AppContext.Provider value={{ state, dispatch }}>
  <App />
</AppContext.Provider>

// In any child:
const { state, dispatch } = useAppContext();
dispatch({ type: "INCREMENT" });`}
          />
        </div>

        <div
          style={{
            padding: "1rem 0",
            color: "var(--muted)",
            fontSize: "0.8rem",
          }}
        >
          ✅ <strong>Pros:</strong> No prop drilling, built-in, great for
          low-frequency updates{" · "}❌ <strong>Cons:</strong> All consumers
          re-render on value change — split contexts or use Zustand/Jotai for
          high-frequency updates
        </div>
      </div>
    </Providers>
  );
}
