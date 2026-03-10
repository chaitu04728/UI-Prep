"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
}: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: "8px",
        fontSize: "0.85rem",
        padding: "1.2rem",
        margin: "0.5rem 0",
        background: "#1e1e1e",
      }}
      showLineNumbers={false}
    >
      {code.trim()}
    </SyntaxHighlighter>
  );
}
