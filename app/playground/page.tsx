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
    "/utils/helpers.js": `// Utility functions
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
`,
    "/utils/math.js": `// Math utilities
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => b !== 0 ? a / b : 0;
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
    "/types/index.ts": `// Type definitions
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export type Status = "pending" | "active" | "completed";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
`,
    "/utils/validators.ts": `// Validation utilities
export const isEmail = (email: string): boolean => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};

export const isValidAge = (age: number): boolean => {
  return age >= 0 && age <= 150;
};
`,
  },
  jsx: {
    "/App.js": `import React, { useState } from 'react';
import { Counter } from './components/Counter';
import { Greeting } from './components/Greeting';
import { TodoList } from './components/TodoList';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React JSX Playground</h1>
      
      <Counter />
      
      <hr style={{ margin: '30px 0' }} />
      
      <Greeting />
      
      <hr style={{ margin: '30px 0' }} />
      
      <TodoList />
      
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
    "/components/Counter.js": `import React, { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
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
  );
}
`,
    "/components/Greeting.js": `import React, { useState } from 'react';

export function Greeting() {
  const [name, setName] = useState('');

  return (
    <div>
      <h2>Greeting Component</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      {name && <p>Hello, {name}! 👋</p>}
    </div>
  );
}
`,
    "/components/TodoList.js": `import React, { useState } from 'react';

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Add a todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          style={{ padding: '8px', width: '200px', marginRight: '10px' }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '5px' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              marginLeft: '10px',
              textDecoration: todo.done ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px', fontSize: '12px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
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
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [viewMode, setViewMode] = useState<"preview" | "console">("console");

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setViewMode(lang === "jsx" ? "preview" : "console");
    setKey((prev) => prev + 1); // Force re-render with new files
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;

    const extension =
      language === "jsx" ? ".js" : language === "typescript" ? ".ts" : ".js";
    const fileName = newFileName.startsWith("/")
      ? newFileName
      : `/${newFileName}`;
    const fullFileName = fileName.endsWith(extension)
      ? fileName
      : `${fileName}${extension}`;

    const newFiles = { ...files };
    if (language === "jsx") {
      newFiles.jsx = {
        ...newFiles.jsx,
        [fullFileName]: `// New file\nimport React from 'react';\n\nexport default function Component() {\n  return <div>New Component</div>;\n}\n`,
      };
    } else if (language === "typescript") {
      newFiles.typescript = {
        ...newFiles.typescript,
        [fullFileName]: `// New TypeScript file\nconsole.log("New file created!");\n\n`,
      };
    } else {
      newFiles.javascript = {
        ...newFiles.javascript,
        [fullFileName]: `// New JavaScript file\nconsole.log("New file created!");\n\n`,
      };
    }

    setFiles(newFiles);
    setKey((prev) => prev + 1);
    setNewFileName("");
    setShowNewFileModal(false);
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

          {/* New File Button */}
          <button
            onClick={() => setShowNewFileModal(true)}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #a6e3a1 0%, #94e2d5 100%)",
              color: "#000",
              border: "2px solid #a6e3a1",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: "auto",
            }}
          >
            <span style={{ fontSize: "20px" }}>➕</span>
            New File
          </button>
        </div>

        {/* Features Badge */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "#1e1e2e",
              color: "#89b4fa",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              border: "1px solid #313244",
            }}
          >
            📁 Multiple Files
          </span>
          <span
            style={{
              background: "#1e1e2e",
              color: "#a6e3a1",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              border: "1px solid #313244",
            }}
          >
            🔢 Line Numbers
          </span>
          <span
            style={{
              background: "#1e1e2e",
              color: "#f9e2af",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              border: "1px solid #313244",
            }}
          >
            🎨 Syntax Highlighting
          </span>
          <span
            style={{
              background: "#1e1e2e",
              color: "#f5c2e7",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              border: "1px solid #313244",
            }}
          >
            ▶️ Manual Run
          </span>
          <span
            style={{
              background: "#1e1e2e",
              color: "#94e2d5",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              border: "1px solid #313244",
            }}
          >
            ➕ Create Files
          </span>
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
            showNavigator: true,
            showTabs: true,
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
          }}
          customSetup={{
            dependencies: {},
          }}
        />
      </div>

      {/* New File Modal */}
      {showNewFileModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowNewFileModal(false)}
        >
          <div
            style={{
              background: "#1e1e2e",
              padding: "30px",
              borderRadius: "12px",
              border: "2px solid #313244",
              maxWidth: "500px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#cdd6f4", marginTop: 0 }}>
              ➕ Create New File
            </h2>
            <p style={{ color: "#6c7086", marginBottom: "20px" }}>
              Enter the file name (extension will be added automatically)
            </p>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCreateFile()}
              placeholder={
                language === "jsx"
                  ? "e.g., components/Button"
                  : language === "typescript"
                  ? "e.g., utils/helpers"
                  : "e.g., utils/helpers"
              }
              style={{
                width: "100%",
                padding: "12px",
                background: "#111118",
                border: "2px solid #313244",
                borderRadius: "8px",
                color: "#cdd6f4",
                fontSize: "15px",
                marginBottom: "20px",
              }}
              autoFocus
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  setShowNewFileModal(false);
                  setNewFileName("");
                }}
                style={{
                  padding: "10px 20px",
                  background: "#313244",
                  color: "#cdd6f4",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                disabled={!newFileName.trim()}
                style={{
                  padding: "10px 20px",
                  background: newFileName.trim()
                    ? "linear-gradient(135deg, #a6e3a1 0%, #94e2d5 100%)"
                    : "#313244",
                  color: "#000",
                  border: "none",
                  borderRadius: "8px",
                  cursor: newFileName.trim() ? "pointer" : "not-allowed",
                  fontWeight: "600",
                  opacity: newFileName.trim() ? 1 : 0.5,
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

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
            📂 <strong>File Explorer:</strong> Navigate between multiple files
            using the file tree on the left
          </li>
          <li>
            ➕ <strong>Create Files:</strong> Click "New File" button to add new
            files to your project
          </li>
          <li>
            🔢 <strong>Line Numbers:</strong> Enabled by default for easy
            reference and debugging
          </li>
          <li>
            📟 <strong>Console Output:</strong> For JS/TS, see console.log
            output in the right panel after running
          </li>
          <li>
            ▶️ <strong>Manual Execution:</strong> Click the "Run Code" button to
            execute your code - no auto-run
          </li>
          <li>
            📁 <strong>Organized Structure:</strong> Files are organized in
            folders (utils, components, types)
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
