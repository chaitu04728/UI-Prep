"use client";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";

type Language = "javascript" | "typescript" | "jsx";

const defaultCode = {
  javascript: {
    "/index.js": `// JavaScript Playground
console.log("Hello from JavaScript!");

// Try some JavaScript code here
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet("World"));

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter example
const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evens);

// Reduce example
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);
`,
  },
  typescript: {
    "/index.ts": `// TypeScript Playground
console.log("Hello from TypeScript!");

// Try some TypeScript code here
const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};

console.log(greet("World"));

// Typed array operations
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled: number[] = numbers.map((n: number) => n * 2);
console.log("Doubled:", doubled);

// Interface example
interface User {
  name: string;
  age: number;
  email?: string;
}

const user: User = {
  name: "Alice",
  age: 30
};

console.log("User:", user);
`,
  },
  jsx: {
    "/App.js": `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React JSX Playground</h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>
          Decrement
        </button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>
      
      <hr style={{ margin: '30px 0' }} />
      
      <div>
        <h2>Array Rendering</h2>
        {[1, 2, 3, 4, 5].map(num => (
          <div key={num} style={{ 
            padding: '10px', 
            margin: '5px 0',
            background: '#f0f0f0',
            borderRadius: '5px'
          }}>
            Item {num}
          </div>
        ))}
      </div>
    </div>
  );
}
`,
  },
};

export default function PlaygroundPage() {
  const [language, setLanguage] = useState<Language>("javascript");
  const [key, setKey] = useState(0);
  const [files, setFiles] = useState(defaultCode);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setKey((prev) => prev + 1); // Force re-render with new files
  };

  const getTemplate = () => {
    if (language === "jsx") return "react";
    if (language === "typescript") return "vanilla-ts";
    return "vanilla";
  };

  const getActiveFile = () => {
    if (language === "jsx") return "/App.js";
    if (language === "typescript") return "/index.ts";
    return "/index.js";
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              padding: "10px 15px",
              lineHeight: 1,
            }}
          >
            🎮
          </div>
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                margin: 0,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Code Playground
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#6c7086",
                margin: "5px 0 0 0",
              }}
            >
              Experiment with JavaScript, TypeScript, and React JSX in
              real-time! 🚀
            </p>
          </div>
        </div>

        {/* Language Selection Pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => handleLanguageChange("javascript")}
            style={{
              padding: "12px 24px",
              background:
                language === "javascript"
                  ? "linear-gradient(135deg, #f7df1e 0%, #f0db4f 100%)"
                  : "#1e1e2e",
              color: language === "javascript" ? "#000" : "#cdd6f4",
              border:
                language === "javascript"
                  ? "2px solid #f7df1e"
                  : "2px solid #1e1e2e",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px" }}>📜</span>
            JavaScript
          </button>
          <button
            onClick={() => handleLanguageChange("typescript")}
            style={{
              padding: "12px 24px",
              background:
                language === "typescript"
                  ? "linear-gradient(135deg, #3178c6 0%, #2868b8 100%)"
                  : "#1e1e2e",
              color: language === "typescript" ? "#fff" : "#cdd6f4",
              border:
                language === "typescript"
                  ? "2px solid #3178c6"
                  : "2px solid #1e1e2e",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px" }}>💎</span>
            TypeScript
          </button>
          <button
            onClick={() => handleLanguageChange("jsx")}
            style={{
              padding: "12px 24px",
              background:
                language === "jsx"
                  ? "linear-gradient(135deg, #61dafb 0%, #00d8ff 100%)"
                  : "#1e1e2e",
              color: language === "jsx" ? "#000" : "#cdd6f4",
              border:
                language === "jsx" ? "2px solid #61dafb" : "2px solid #1e1e2e",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px" }}>⚛️</span>
            React JSX
          </button>
        </div>
      </div>

      {/* Sandpack Editor */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Sandpack
          key={key}
          template={getTemplate()}
          files={files[language]}
          theme="dark"
          options={{
            showNavigator: false,
            showTabs: false,
            showLineNumbers: true,
            showInlineErrors: true,
            wrapContent: true,
            editorHeight: 600,
            activeFile: getActiveFile(),
            externalResources: [],
            showConsole: true,
            showConsoleButton: true,
            autorun: false,
            autoReload: false,
            layout: language === "jsx" ? "preview" : "console",
          }}
          customSetup={{
            dependencies: {},
          }}
        />
      </div>

      {/* Info Section */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#1e1e2e",
          borderRadius: "12px",
          border: "1px solid #313244",
        }}
      >
        <h3 style={{ color: "#cdd6f4", marginTop: 0 }}>💡 Tips:</h3>
        <ul style={{ color: "#bac2de", lineHeight: "1.8" }}>
          <li>
            � <strong>Line Numbers:</strong> Enabled by default for easy
            reference and debugging
          </li>
          <li>
            📟 <strong>Console Output:</strong> For JS/TS, see console.log
            output in the right panel after running
          </li>
          <li>
            ▶️ <strong>Manual Execution:</strong> Click the "Run" button to
            execute your code
          </li>
          <li>
            🗑️ <strong>No Persistence:</strong> All changes are temporary and
            reset when you leave the page
          </li>
        </ul>
      </div>
    </div>
  );
}
