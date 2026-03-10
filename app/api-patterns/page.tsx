import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Advanced API Patterns | Next.js Explorer",
  description:
    "Master axios interceptors, API instances, custom hooks, HOCs, and data operations for production-ready apps.",
};

export default function APIPatternsPage() {
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
            background: "linear-gradient(135deg, #0070f3 0%, #0051b3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🔧 Advanced API Patterns
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
          Build production-ready APIs with{" "}
          <span style={{ color: "var(--blue)", fontWeight: 600 }}>
            axios interceptors
          </span>
          , custom hooks, HOCs, and bulletproof data operations.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Axios Instance Setup */}
        <article
          id="axios-instance"
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
              Setup
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Axios Instance Configuration
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
            Create a configured axios instance with base URL, timeouts, and
            default headers. This ensures consistency across all API calls.
          </p>

          <CodeBlock
            language="bash"
            code={`# Install axios
npm install axios`}
          />

          <div style={{ marginTop: "1rem" }}>
            <CodeBlock
              language="typescript"
              code={`// lib/axios.ts
import axios from "axios";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;`}
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
              Use environment variables for API URLs. This makes it easy to
              switch between development, staging, and production environments.
            </p>
          </div>
        </article>

        {/* Axios Interceptors */}
        <article
          id="interceptors"
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
              Interceptors
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Request & Response Interceptors
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
            Interceptors let you transform requests/responses globally. Add auth
            tokens, log requests, handle errors, refresh tokens automatically.
          </p>

          <CodeBlock
            language="typescript"
            code={`// lib/axios.ts (continued)
import axios from "axios";
import { getToken, refreshToken, logout } from "./auth";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

// ─────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR - Runs before every request
// ─────────────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // 1. Add auth token to every request
    const token = getToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }

    // 2. Add request ID for tracking
    config.headers["X-Request-ID"] = crypto.randomUUID();

    // 3. Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(\`[\${config.method?.toUpperCase()}] \${config.url}\`, config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────
// RESPONSE INTERCEPTOR - Runs after every response
// ─────────────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    // Success - just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 1. Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const newToken = await refreshToken();
        
        // Update the failed request with new token
        originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - log user out
        logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 2. Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access denied");
      // Show toast notification
    }

    // 3. Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.data);
      // Show error notification
    }

    // 4. Handle Network Error (no internet)
    if (!error.response) {
      console.error("Network error - check your connection");
    }

    return Promise.reject(error);
  }
);

export default apiClient;`}
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
              Request interceptors run BEFORE sending. Response interceptors run
              AFTER receiving. Use them for cross-cutting concerns like auth,
              logging, and error handling.
            </p>
          </div>
        </article>

        {/* API Service Layer */}
        <article
          id="service-layer"
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
              Services
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              API Service Layer (Read & Write)
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
            Create a service layer to organize all API calls. This keeps your
            components clean and makes testing easier.
          </p>

          <CodeBlock
            language="typescript"
            code={`// services/userService.ts
import apiClient from "@/lib/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

// ─────────────────────────────────────────────────────────────
// READ OPERATIONS
// ─────────────────────────────────────────────────────────────

export const userService = {
  // Get all users
  getAll: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get<User[]>("/users", { params });
    return response.data;
  },

  // Get single user by ID
  getById: async (id: string) => {
    const response = await apiClient.get<User>(\`/users/\${id}\`);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get<User>("/users/me");
    return response.data;
  },

  // Search users
  search: async (query: string) => {
    const response = await apiClient.get<User[]>("/users/search", {
      params: { q: query },
    });
    return response.data;
  },

  // ─────────────────────────────────────────────────────────────
  // WRITE OPERATIONS
  // ─────────────────────────────────────────────────────────────

  // Create new user
  create: async (data: CreateUserData) => {
    const response = await apiClient.post<User>("/users", data);
    return response.data;
  },

  // Update user
  update: async (id: string, data: UpdateUserData) => {
    const response = await apiClient.patch<User>(\`/users/\${id}\`, data);
    return response.data;
  },

  // Delete user
  delete: async (id: string) => {
    await apiClient.delete(\`/users/\${id}\`);
  },

  // Upload user avatar
  uploadAvatar: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await apiClient.post<{ url: string }>(
      \`/users/\${id}/avatar\`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Batch operations
  bulkDelete: async (ids: string[]) => {
    await apiClient.post("/users/bulk-delete", { ids });
  },

  bulkUpdate: async (updates: Array<{ id: string; data: UpdateUserData }>) => {
    const response = await apiClient.post<User[]>("/users/bulk-update", {
      updates,
    });
    return response.data;
  },
};`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Usage in Components:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`"use client";

import { useState, useEffect } from "react";
import { userService, User } from "@/services/userService";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAll({ page: 1, limit: 10 });
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userService.delete(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}`}
            />
          </div>

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
              Service layer separates business logic from UI. It's easier to
              test, reuse, and maintain. All API calls go through services.
            </p>
          </div>
        </article>

        {/* Custom Hooks for Data Fetching */}
        <article
          id="custom-hooks"
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
              Hooks
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Custom Hooks for Data Fetching
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
            Encapsulate data fetching logic in custom hooks. Handle loading,
            error states, and refetching automatically.
          </p>

          <CodeBlock
            language="typescript"
            code={`// hooks/useApi.ts
import { useState, useEffect } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>;
}

// Generic hook for any API call
export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await apiFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as Error,
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { ...state, refetch: fetchData };
}

// Specific hooks for different resources
export function useUsers() {
  return useApi(() => userService.getAll());
}

export function useUser(id: string) {
  return useApi(() => userService.getById(id), [id]);
}

export function useUserSearch(query: string) {
  return useApi(() => userService.search(query), [query]);
}`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Usage with Custom Hooks:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`"use client";

import { useUsers } from "@/hooks/useApi";

export default function UsersPage() {
  const { data: users, loading, error, refetch } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      
      {users?.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
    </div>
  );
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
              Custom hooks eliminate boilerplate. Components don't need to
              manage loading/error states manually. Consider using SWR or React
              Query for production.
            </p>
          </div>
        </article>

        {/* HOC for API Protection */}
        <article
          id="hoc"
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
              HOC Pattern
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Higher-Order Component for API Protection
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
            Use HOCs to wrap components that need data fetching, authentication,
            or authorization. Keeps your components clean and reusable.
          </p>

          <CodeBlock
            language="typescript"
            code={`// hoc/withAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = getToken();
      
      if (!token) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Usage
function DashboardPage() {
  return <div>Protected Dashboard</div>;
}

export default withAuth(DashboardPage);`}
          />

          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>HOC for Data Fetching:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`// hoc/withData.tsx
import { useState, useEffect } from "react";

interface WithDataProps<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function withData<T, P extends object>(
  Component: React.ComponentType<P & WithDataProps<T>>,
  fetcher: () => Promise<T>
) {
  return function DataComponent(props: P) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetcher();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <Component
        {...props}
        data={data}
        loading={loading}
        error={error}
        refetch={fetchData}
      />
    );
  };
}

// Usage
interface UserListProps {
  data: User[] | null;
  loading: boolean;
  error: Error | null;
}

function UserList({ data, loading, error }: UserListProps) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default withData(UserList, userService.getAll);`}
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
              HOCs are great for cross-cutting concerns like auth, logging, or
              data fetching. In modern React, consider using hooks instead for
              better TypeScript support.
            </p>
          </div>
        </article>

        {/* Error Handling */}
        <article
          id="error-handling"
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
              className="badge-red"
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: "#dc2626",
                color: "white",
              }}
            >
              Error Handling
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Centralized Error Handling
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
            Create a centralized error handler to process API errors consistently
            across your app. Show user-friendly messages and log errors.
          </p>

          <CodeBlock
            language="typescript"
            code={`// lib/errorHandler.ts
import toast from "react-hot-toast";

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
}

export function handleApiError(error: any): ApiError {
  // Axios error with response
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(data.message || "Invalid request");
        break;
      case 401:
        toast.error("Unauthorized - please login");
        break;
      case 403:
        toast.error("Access denied");
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 409:
        toast.error(data.message || "Conflict");
        break;
      case 422:
        toast.error("Validation error");
        break;
      case 429:
        toast.error("Too many requests - please slow down");
        break;
      case 500:
        toast.error("Server error - please try again later");
        break;
      default:
        toast.error(data.message || "Something went wrong");
    }

    return {
      message: data.message || "Request failed",
      code: data.code,
      statusCode: status,
      details: data.details,
    };
  }

  // Network error
  if (error.request) {
    toast.error("Network error - check your connection");
    return {
      message: "Network error",
      code: "NETWORK_ERROR",
    };
  }

  // Other errors
  toast.error(error.message || "An error occurred");
  return {
    message: error.message || "Unknown error",
  };
}

// Use in services
export const safeApiCall = async <T,>(
  apiFunction: () => Promise<T>
): Promise<T | null> => {
  try {
    return await apiFunction();
  } catch (error) {
    handleApiError(error);
    return null;
  }
};`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Usage:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`import { safeApiCall } from "@/lib/errorHandler";

async function loadUsers() {
  const users = await safeApiCall(() => userService.getAll());
  
  if (users) {
    setUsers(users);
  }
  // Error already handled and toast shown
}`}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
