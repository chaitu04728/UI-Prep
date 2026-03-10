"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search concepts...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "2rem",
        width: "100%",
      }}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.8rem 2.5rem 0.8rem 1rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          color: "var(--text)",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.85rem",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />
      {query && (
        <button
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "0.8rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
            fontSize: "1.2rem",
            padding: "0.2rem",
            lineHeight: 1,
          }}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
