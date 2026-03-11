import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Jest Testing Guide | Next.js Explorer",
  description:
    "Jest fundamentals: test structure, matchers, mocks, async tests, API mocking, and coverage.",
};

export default function JestPage() {
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
            background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Jest Testing Guide
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
          Learn how to structure tests, write powerful assertions, and mock
          dependencies with confidence.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
              Overview
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              What is Jest?
            </h2>
          </div>

          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Jest is a JavaScript test runner that bundles assertions, mocking,
            and coverage in one tool. It is fast, runs in Node, and ships with a
            great developer experience out of the box.
          </p>

          <CodeBlock
            language="bash"
            code={`# Install Jest
npm install -D jest

# Run tests
npx jest`}
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
              <strong style={{ color: "var(--green)" }}>Key Point:</strong>{" "}
              Jest treats files with <code>*.test.ts</code>, <code>*.spec.ts</code>,
              and <code>__tests__</code> folders as test suites by default.
            </p>
          </div>
        </article>

        <article
          id="test-structure"
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
              Structure
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Test Structure (AAA)
            </h2>
          </div>

          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Follow Arrange-Act-Assert for clear and maintainable tests. Keep
            setup, action, and expectation separated to make failures obvious.
          </p>

          <CodeBlock
            language="typescript"
            code={`// sum.test.ts
import { sum } from "./sum";

describe("sum", () => {
  it("adds two numbers", () => {
    // Arrange
    const a = 2;
    const b = 3;

    // Act
    const result = sum(a, b);

    // Assert
    expect(result).toBe(5);
  });
});`}
          />
        </article>

        <article
          id="matchers"
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
              Assertions
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Common Matchers
            </h2>
          </div>

          <CodeBlock
            language="typescript"
            code={`expect(2 + 2).toBe(4);
expect(["a", "b"]).toContain("a");
expect({ name: "Ada" }).toEqual({ name: "Ada" });
expect("hello").toMatch(/ell/);
expect(() => JSON.parse("bad")).toThrow();
expect(Promise.resolve("ok")).resolves.toBe("ok");`}
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
            <p style={{ fontSize: "0.9rem", margin: 0, color: "var(--text)" }}>
              <strong style={{ color: "var(--purple)" }}>Key Point:</strong>{" "}
              Use <code>toEqual</code> for deep equality, and <code>toBe</code>
              for reference or primitive equality.
            </p>
          </div>
        </article>

        <article
          id="mocking"
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
              Mocking
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Mock Functions & Spies
            </h2>
          </div>

          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Mock functions track calls and return values. Spies wrap real
            functions so you can assert usage without replacing behavior.
          </p>

          <CodeBlock
            language="typescript"
            code={`const fetchUser = jest.fn().mockResolvedValue({ id: 1, name: "Ada" });

await fetchUser();
expect(fetchUser).toHaveBeenCalledTimes(1);
expect(fetchUser).toHaveBeenCalledWith();

const logger = { info: (msg: string) => msg };
const spy = jest.spyOn(logger, "info");
logger.info("hello");
expect(spy).toHaveBeenCalledWith("hello");
spy.mockRestore();`}
          />
        </article>

        <article
          id="module-mocking"
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
              Modules
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Module Mocking Patterns
            </h2>
          </div>

          <CodeBlock
            language="typescript"
            code={`// userService.ts
export async function getUser() {
  const res = await fetch("/api/user");
  return res.json();
}

// userService.test.ts
jest.mock("./userService", () => ({
  getUser: jest.fn(),
}));

import { getUser } from "./userService";

(getUser as jest.Mock).mockResolvedValue({ id: 1, name: "Ada" });
expect(await getUser()).toEqual({ id: 1, name: "Ada" });`}
          />

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--surface-elevated)",
              borderLeft: "3px solid var(--blue)",
              borderRadius: "6px",
            }}
          >
            <p style={{ fontSize: "0.9rem", margin: 0, color: "var(--text)" }}>
              <strong style={{ color: "var(--blue)" }}>Key Point:</strong>{" "}
              Use <code>jest.requireActual</code> to keep real exports and mock
              only specific functions when needed.
            </p>
          </div>
        </article>

        <article
          id="api-mocking"
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
              API Mocking
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Mock APIs with MSW
            </h2>
          </div>

          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Mock Service Worker (MSW) intercepts network requests so you can
            test real fetch logic without hitting live services. It works for
            unit tests and integration tests alike.
          </p>

          <CodeBlock
            language="typescript"
            code={`// test/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
  rest.get("/api/user", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1, name: "Ada" }));
  }),
];

// test/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// test/setup.ts
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`}
          />
        </article>

        <article
          id="async-testing"
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
              Async
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Testing Async Code
            </h2>
          </div>

          <CodeBlock
            language="typescript"
            code={`it("resolves with data", async () => {
  const result = await fetchData();
  expect(result).toEqual({ ok: true });
});

it("rejects with error", async () => {
  await expect(fetchData()).rejects.toThrow("Network error");
});`}
          />
        </article>

        <article
          id="timers"
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
              Timers
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Fake Timers
            </h2>
          </div>

          <CodeBlock
            language="typescript"
            code={`jest.useFakeTimers();

const callback = jest.fn();
setTimeout(callback, 1000);

jest.advanceTimersByTime(1000);
expect(callback).toHaveBeenCalled();

jest.useRealTimers();`}
          />
        </article>

        <article
          id="setup-teardown"
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
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Setup & Teardown
            </h2>
          </div>

          <CodeBlock
            language="typescript"
            code={`beforeAll(() => {
  // Runs once before all tests
});

beforeEach(() => {
  // Runs before each test
});

afterEach(() => {
  // Cleanup after each test
});

afterAll(() => {
  // Runs once after all tests
});`}
          />

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--surface-elevated)",
              borderLeft: "3px solid var(--blue)",
              borderRadius: "6px",
            }}
          >
            <p style={{ fontSize: "0.9rem", margin: 0, color: "var(--text)" }}>
              <strong style={{ color: "var(--blue)" }}>Key Point:</strong>{" "}
              Use a global setup file (like <code>jest.setup.ts</code>) for
              shared configuration and test utilities.
            </p>
          </div>
        </article>

        <article
          id="snapshots"
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
              Snapshots
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Snapshot Testing
            </h2>
          </div>

          <CodeBlock
            language="typescript"
            code={`import { render } from "@testing-library/react";
import Button from "./Button";

it("matches snapshot", () => {
  const { container } = render(<Button label="Save" />);
  expect(container.firstChild).toMatchSnapshot();
});`}
          />
        </article>

        <article
          id="coverage"
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
              Coverage
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Code Coverage
            </h2>
          </div>

          <CodeBlock
            language="bash"
            code={`# Generate a coverage report
npx jest --coverage

# Enforce minimum thresholds in package.json
"jest": {
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}`}
          />
        </article>
      </div>
    </main>
  );
}
