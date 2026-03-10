import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "JWT Authentication End-to-End | Next.js Explorer",
  description:
    "Complete JWT authentication flow: login, token storage, refresh tokens, protected routes, and middleware.",
};

export default function JWTAuthPage() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🔐 JWT Authentication End-to-End
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
          Complete guide to implementing{" "}
          <span style={{ color: "var(--orange)", fontWeight: 600 }}>
            JWT authentication
          </span>{" "}
          with login, token refresh, protected routes, and middleware.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Overview */}
        <article
          id="overview"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
            JWT Authentication Flow Overview
          </h2>
          
          <div style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            <ol style={{ paddingLeft: "1.5rem" }}>
              <li><strong>User Login:</strong> User submits credentials (email/password)</li>
              <li><strong>Server Validation:</strong> Server verifies credentials against database</li>
              <li><strong>Token Generation:</strong> Server creates access token (short-lived, 15min) and refresh token (long-lived, 7 days)</li>
              <li><strong>Token Storage:</strong> Access token in memory/state, refresh token in httpOnly cookie</li>
              <li><strong>API Requests:</strong> Client sends access token in Authorization header</li>
              <li><strong>Token Verification:</strong> Server validates token on every protected route</li>
              <li><strong>Token Refresh:</strong> When access token expires, use refresh token to get new one</li>
              <li><strong>Logout:</strong> Clear tokens and invalidate refresh token on server</li>
            </ol>
          </div>
        </article>

        {/* Step 1: Backend Setup */}
        <article
          id="backend-setup"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="badge-blue"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Step 1
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Backend Setup - Token Generation
            </h2>
          </div>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Install JWT library and create utilities to generate, verify, and decode tokens.
          </p>

          <CodeBlock
            language="bash"
            code={`# Install dependencies
npm install jsonwebtoken
npm install -D @types/jsonwebtoken

# Install bcrypt for password hashing
npm install bcryptjs
npm install -D @types/bcryptjs`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Environment Variables (.env.local):</strong>
            </p>
            <CodeBlock
              language="bash"
              code={`# JWT Secrets (generate with: openssl rand -base64 32)
JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars

# Token expiration
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d`}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <CodeBlock
              language="typescript"
              code={`// lib/jwt.ts
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface TokenPayload {
  userId: string;
  email: string;
  role?: string;
}

// Generate access token (short-lived, 15 minutes)
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m",
  });
}

// Generate refresh token (long-lived, 7 days)
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d",
  });
}

// Verify access token
export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
}

// Decode token without verification (for debugging)
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
}`}
            />
          </div>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--surface-elevated)",
              borderLeft: "3px solid var(--blue)",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "var(--text)",
                margin: 0,
              }}
            >
              <strong style={{ color: "var(--blue)" }}>💡 Key Point:</strong>{" "}
              Use different secrets for access and refresh tokens. Access tokens are short-lived (15min) for security. Refresh tokens are long-lived (7 days) for convenience.
            </p>
          </div>
        </article>

        {/* Step 2: Login Route */}
        <article
          id="login-route"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="badge-green"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Step 2
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Login API Route
            </h2>
          </div>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Create login endpoint that validates credentials, generates tokens, and sets httpOnly cookie for refresh token.
          </p>

          <CodeBlock
            language="typescript"
            code={`// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

// Mock user lookup - replace with your database
async function findUserByEmail(email: string) {
  // Example: await prisma.user.findUnique({ where: { email } })
  return {
    id: "user-123",
    email: "user@example.com",
    passwordHash: "$2a$10$...", // bcrypt hashed password
    role: "user",
  };
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // 1. Find user in database
    const user = await findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 2. Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. Generate tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // 4. Store refresh token in database (for revocation)
    // await prisma.refreshToken.create({
    //   data: { token: refreshToken, userId: user.id, expiresAt: ... }
    // });

    // 5. Set refresh token as httpOnly cookie
    const response = NextResponse.json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,     // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}`}
          />

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--surface-elevated)",
              borderLeft: "3px solid var(--green)",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "var(--text)",
                margin: 0,
              }}
            >
              <strong style={{ color: "var(--green)" }}>💡 Key Point:</strong>{" "}
              Never return the same message for "user not found" vs "wrong password" - prevents user enumeration attacks. Always hash passwords with bcrypt before comparing.
            </p>
          </div>
        </article>

        {/* Step 3: Token Refresh Route */}
        <article
          id="refresh-route"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="badge-purple"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Step 3
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Token Refresh Route
            </h2>
          </div>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            When access token expires, use refresh token to get a new one without re-login.
          </p>

          <CodeBlock
            language="typescript"
            code={`// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    // 1. Get refresh token from cookie
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 }
      );
    }

    // 2. Verify refresh token
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    // 3. Check if refresh token is still valid in database
    // const storedToken = await prisma.refreshToken.findUnique({
    //   where: { token: refreshToken },
    // });
    //
    // if (!storedToken || storedToken.expiresAt < new Date()) {
    //   return NextResponse.json(
    //     { error: "Refresh token revoked or expired" },
    //     { status: 401 }
    //   );
    // }

    // 4. Generate new access token
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    // 5. Return new access token
    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}`}
          />

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--surface-elevated)",
              borderLeft: "3px solid var(--purple)",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "var(--text)",
                margin: 0,
              }}
            >
              <strong style={{ color: "var(--purple)" }}>💡 Key Point:</strong>{" "}
              Store refresh tokens in the database so you can revoke them when needed (logout, security breach, etc.). Refresh tokens should be single-use in high-security apps.
            </p>
          </div>
        </article>

        {/* Step 4: Protected Route Middleware */}
        <article
          id="middleware"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="badge-orange"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Step 4
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Protected Routes & Middleware
            </h2>
          </div>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Protect API routes by verifying JWT tokens. Create middleware to authenticate requests.
          </p>

          <CodeBlock
            language="typescript"
            code={`// middleware.ts (root of project)
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  // Get token from Authorization header
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized - No token provided" },
      { status: 401 }
    );
  }

  try {
    // Verify token
    const payload = verifyAccessToken(token);

    // Attach user info to headers (accessible in route handlers)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-role", payload.role || "user");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid token" },
      { status: 401 }
    );
  }
}

// Apply middleware only to protected routes
export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/dashboard/:path*",
    "/api/admin/:path*",
    // Don't protect auth routes
    "/((?!api/auth).*)",
  ],
};`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Alternative: Per-Route Protection</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`// lib/auth-middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./jwt";

export function withAuth(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const payload = verifyAccessToken(token);
      return handler(req, payload.userId);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  };
}

// Usage in route
// app/api/profile/route.ts
import { withAuth } from "@/lib/auth-middleware";

export const GET = withAuth(async (req, userId) => {
  const user = await getUserById(userId);
  return NextResponse.json({ user });
});`}
            />
          </div>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--surface-elevated)",
              borderLeft: "3px solid var(--orange)",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "var(--text)",
                margin: 0,
              }}
            >
              <strong style={{ color: "var(--orange)" }}>💡 Key Point:</strong>{" "}
              Use Next.js middleware for global protection. Use per-route wrappers for fine-grained control. Always validate tokens on the server, never trust client-side logic.
            </p>
          </div>
        </article>

        {/* Step 5: Client-Side Implementation */}
        <article
          id="client-side"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="badge-blue"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Step 5
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Client-Side Auth Context
            </h2>
          </div>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Create an Auth context to manage authentication state, login, logout, and auto-refresh tokens.
          </p>

          <CodeBlock
            language="typescript"
            code={`// contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Login function
  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/auth/login", { email, password });
    
    const { accessToken, user } = response.data;
    
    setAccessToken(accessToken);
    setUser(user);
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  // Refresh token automatically
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("/api/auth/refresh");
      const { accessToken } = response.data;
      
      setAccessToken(accessToken);
      
      // Decode token to get user info
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      setUser({
        id: payload.userId,
        email: payload.email,
        role: payload.role,
      });
    } catch (error) {
      console.error("Token refresh failed:", error);
      setAccessToken(null);
      setUser(null);
    }
  };

  // Try to refresh token on mount
  useEffect(() => {
    refreshAccessToken().finally(() => setIsLoading(false));
  }, []);

  // Auto-refresh token before expiry (every 10 minutes)
  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Login Component:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
}`}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Protected Page Component:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}`}
            />
          </div>
        </article>

        {/* Step 6: Axios Integration */}
        <article
          id="axios-integration"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="badge-green"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Step 6
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Axios Integration with Auto-Refresh
            </h2>
          </div>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Configure axios to automatically add auth tokens and refresh them when they expire.
          </p>

          <CodeBlock
            language="typescript"
            code={`// lib/axiosAuth.ts
import axios from "axios";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

const axiosAuth = axios.create({
  baseURL: "/api",
});

// Request interceptor - add token
axiosAuth.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = \`Bearer \${accessToken}\`;
  }
  return config;
});

// Response interceptor - handle 401 and refresh
axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token
        const response = await axios.post("/api/auth/refresh");
        const { accessToken: newToken } = response.data;

        // Update token
        setAccessToken(newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuth;`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Update Auth Context to use axiosAuth:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`// In AuthContext.tsx
import axiosAuth, { setAccessToken } from "@/lib/axiosAuth";

// In login function:
const { accessToken, user } = response.data;
setAccessToken(accessToken);  // Update axios instance
setAccessToken(accessToken);  // Also set in state
setUser(user);

// Now all API calls use authenticated axios:
const users = await axiosAuth.get("/users");  // Token auto-added!`}
            />
          </div>
        </article>

        {/* Best Practices */}
        <article
          id="best-practices"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            scrollMarginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="badge-purple"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Best Practices
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Security Best Practices
            </h2>
          </div>

          <div style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li><strong>Short-lived access tokens:</strong> 15 minutes max. Forces frequent validation.</li>
              <li><strong>Store refresh tokens in httpOnly cookies:</strong> Prevents XSS attacks.</li>
              <li><strong>Use HTTPS in production:</strong> Protect tokens in transit.</li>
              <li><strong>Implement CSRF protection:</strong> Use sameSite: "strict" on cookies.</li>
              <li><strong>Store refresh tokens in database:</strong> Enable revocation on logout/compromise.</li>
              <li><strong>Hash passwords with bcrypt:</strong> Never store plain text passwords.</li>
              <li><strong>Rate limit login attempts:</strong> Prevent brute force attacks.</li>
              <li><strong>Use environment variables:</strong> Never hardcode secrets.</li>
              <li><strong>Implement logout on all devices:</strong> Invalidate all refresh tokens.</li>
              <li><strong>Add token rotation:</strong> Issue new refresh token on each refresh (advanced).</li>
              <li><strong>Monitor suspicious activity:</strong> Log auth failures, unusual patterns.</li>
              <li><strong>Never expose sensitive data in JWTs:</strong> Tokens can be decoded by anyone.</li>
            </ul>
          </div>
        </article>
      </div>
    </main>
  );
}
