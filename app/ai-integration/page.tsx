import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "AI Integration with Vercel AI SDK | Next.js Explorer",
  description:
    "Complete guide to integrating AI into Next.js apps using Vercel AI SDK with OpenAI, streaming responses, and RAG patterns.",
};

export default function AIIntegrationPage() {
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
            background: "linear-gradient(135deg, #10a37f 0%, #1a7f64 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🤖 AI Integration with Vercel AI SDK
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
          Build AI-powered applications with streaming responses, function
          calling, and RAG patterns using the{" "}
          <span style={{ color: "var(--green)", fontWeight: 600 }}>
            Vercel AI SDK
          </span>
          .
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Step 1: Installation & Setup */}
        <article
          id="installation"
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
              Step 1
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Installation & Setup
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
            Install the Vercel AI SDK and your preferred AI provider (OpenAI,
            Anthropic, Google, etc.). Set up environment variables and configure
            your Next.js app.
          </p>

          <CodeBlock
            language="bash"
            code={`# Install AI SDK and OpenAI provider
npm install ai @ai-sdk/openai

# Or with other providers
npm install ai @ai-sdk/anthropic
npm install ai @ai-sdk/google

# Install React hooks for UI
npm install ai`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Environment Variables (.env.local):</strong>
            </p>
            <CodeBlock
              language="bash"
              code={`# OpenAI API Key
OPENAI_API_KEY=sk-...

# Anthropic API Key (optional)
ANTHROPIC_API_KEY=sk-ant-...

# Google AI API Key (optional)
GOOGLE_GENERATIVE_AI_API_KEY=...`}
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
              The Vercel AI SDK is provider-agnostic. You can easily switch
              between OpenAI, Anthropic, Google, and other providers without
              changing your application code.
            </p>
          </div>
        </article>

        {/* Step 2: Basic Chat Completion */}
        <article
          id="basic-chat"
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
              Basic Chat Completion (Server-Side)
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
            Create a server-side function to generate text completions. This
            runs entirely on the server and returns the full response.
          </p>

          <CodeBlock
            language="typescript"
            code={`// app/actions/ai.ts
"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateCompletion(prompt: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    });

    return { success: true, text };
  } catch (error) {
    console.error("AI Error:", error);
    return { success: false, error: "Failed to generate completion" };
  }
}

// Using with system messages
export async function generateWithSystem(userMessage: string) {
  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    system: "You are a helpful coding assistant. Provide concise, accurate answers.",
    prompt: userMessage,
  });

  return text;
}`}
          />

          <div
            style={{
              marginTop: "1rem",
              padding: "1.5rem",
              background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
              border: "2px solid var(--border)",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "var(--text)",
              }}
            >
              📚 Understanding AI Parameters (Beginner's Guide)
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <strong style={{ color: "var(--green)", fontSize: "0.95rem" }}>
                  🌡️ temperature (0.0 to 2.0)
                </strong>
                <p style={{ margin: "0.5rem 0 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
                  Controls randomness/creativity. <strong>Lower = more focused & deterministic</strong> (0.0-0.3 for code, factual answers). 
                  <strong> Higher = more creative & varied</strong> (0.7-1.0 for stories, brainstorming). 
                  Default is usually 0.7. Use 0.0 for math or code generation.
                </p>
              </div>

              <div>
                <strong style={{ color: "var(--blue)", fontSize: "0.95rem" }}>
                  🎯 maxTokens (1 to model max)
                </strong>
                <p style={{ margin: "0.5rem 0 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
                  Maximum length of response. <strong>1 token ≈ 0.75 words</strong> (or ~4 characters). 
                  500 tokens ≈ 375 words (short paragraph). 2000 tokens ≈ 1500 words (full article). 
                  <strong>Higher = longer responses but more expensive.</strong> Set limits to control costs.
                </p>
              </div>

              <div>
                <strong style={{ color: "var(--purple)", fontSize: "0.95rem" }}>
                  💬 prompt vs system
                </strong>
                <p style={{ margin: "0.5rem 0 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
                  <strong>prompt:</strong> The user's question/input. <strong>system:</strong> Instructions that set AI's behavior/personality (e.g., "You are a helpful coding assistant"). 
                  System messages guide the AI's overall behavior across all responses.
                </p>
              </div>

              <div>
                <strong style={{ color: "var(--orange)", fontSize: "0.95rem" }}>
                  🤖 model selection
                </strong>
                <p style={{ margin: "0.5rem 0 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
                  <strong>gpt-4-turbo:</strong> Most capable, slower, expensive. <strong>gpt-3.5-turbo:</strong> Faster, cheaper, good for simple tasks. 
                  <strong>gpt-4:</strong> Best reasoning. Choose based on complexity vs cost tradeoff.
                </p>
              </div>

              <div style={{ 
                marginTop: "0.5rem", 
                padding: "0.75rem", 
                background: "var(--surface-elevated)",
                borderRadius: "6px",
                fontSize: "0.85rem",
                color: "var(--muted)"
              }}>
                <strong>💰 Cost Example:</strong> GPT-4-Turbo costs ~$0.01 per 1K input tokens, ~$0.03 per 1K output tokens. 
                A 500-token response costs ~$0.015. Use gpt-3.5-turbo (~$0.001) for simple tasks to save 90%+.
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Client Component Usage:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`"use client";

import { useState } from "react";
import { generateCompletion } from "@/app/actions/ai";

export default function SimpleChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await generateCompletion(prompt);
    
    if (result.success) {
      setResponse(result.text);
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
      />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Submit"}
      </button>
      {response && <div>{response}</div>}
    </form>
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
              Use server actions for simple completions. This keeps your API
              keys secure and runs on the server. For real-time streaming, use
              Route Handlers (next step).
            </p>
          </div>
        </article>

        {/* Step 3: Streaming Responses */}
        <article
          id="streaming"
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
              Step 3
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Streaming Responses (ChatGPT-like)
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
            Stream AI responses in real-time for a better user experience. The
            useChat hook handles all the complexity.
          </p>

          <CodeBlock
            language="typescript"
            code={`// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge"; // Optional: Use Edge Runtime for lower latency

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system: "You are a helpful assistant.",
    messages,
    temperature: 0.7,
    maxTokens: 1000,
  });

  return result.toAIStreamResponse();
}`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Client Component with useChat Hook:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      {/* Messages */}
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              padding: "1rem",
              marginBottom: "0.5rem",
              background:
                message.role === "user" ? "var(--blue)" : "var(--surface)",
              borderRadius: "8px",
            }}
          >
            <strong>{message.role === "user" ? "You" : "AI"}:</strong>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{ flex: 1, padding: "0.75rem", borderRadius: "6px" }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "..." : "Send"}
        </button>
      </form>
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
              useChat automatically handles message state, optimistic updates,
              streaming, and error handling. It's the easiest way to build
              ChatGPT-like interfaces.
            </p>
          </div>
        </article>

        {/* Step 4: Function Calling / Tools */}
        <article
          id="tools"
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
              Step 4
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Function Calling / Tools
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
            Give AI the ability to call your functions and access external data.
            Perfect for weather apps, calculators, database queries, and more.
          </p>

          <CodeBlock
            language="typescript"
            code={`// app/api/chat-with-tools/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
    tools: {
      // Weather tool
      getWeather: tool({
        description: "Get the current weather for a location",
        parameters: z.object({
          city: z.string().describe("The city name"),
          country: z.string().describe("The country code (e.g., US, UK)"),
        }),
        execute: async ({ city, country }) => {
          // Call weather API
          const response = await fetch(
            \`https://api.openweathermap.org/data/2.5/weather?q=\${city},\${country}&appid=YOUR_KEY\`
          );
          const data = await response.json();
          return {
            temperature: data.main.temp,
            description: data.weather[0].description,
          };
        },
      }),

      // Calculator tool
      calculate: tool({
        description: "Perform mathematical calculations",
        parameters: z.object({
          expression: z.string().describe("Math expression (e.g., '2 + 2')"),
        }),
        execute: async ({ expression }) => {
          try {
            // Use a safe math evaluator
            const result = eval(expression);
            return { result };
          } catch (error) {
            return { error: "Invalid expression" };
          }
        },
      }),

      // Database query tool
      searchDatabase: tool({
        description: "Search the product database",
        parameters: z.object({
          query: z.string().describe("Search query"),
          limit: z.number().optional().describe("Max results"),
        }),
        execute: async ({ query, limit = 5 }) => {
          // Query your database
          const products = await db.products.findMany({
            where: { name: { contains: query } },
            take: limit,
          });
          return { products };
        },
      }),
    },
  });

  return result.toAIStreamResponse();
}`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Client Usage (same as before):</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`"use client";

import { useChat } from "ai/react";

export default function ChatWithTools() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat-with-tools",
  });

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
          
          {/* Show tool calls */}
          {m.toolInvocations?.map((tool, i) => (
            <div key={i} style={{ background: "var(--surface-elevated)" }}>
              <code>{tool.toolName}</code> called with {JSON.stringify(tool.args)}
              <br />
              Result: {JSON.stringify(tool.result)}
            </div>
          ))}
        </div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
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
              Tools let AI interact with your backend. The AI decides WHEN to
              call tools based on user input. Use Zod schemas for type-safe
              parameters.
            </p>
          </div>
        </article>

        {/* Step 5: RAG Pattern */}
        <article
          id="rag"
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
              Step 5
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              RAG Pattern (Retrieval-Augmented Generation)
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
            Give AI access to your custom knowledge base. Retrieve relevant
            documents and inject them into the prompt for accurate, contextual
            responses.
          </p>

          <CodeBlock
            language="typescript"
            code={`// lib/vectorStore.ts
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

// Generate embeddings for a text
export async function generateEmbedding(text: string) {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: text,
  });
  return embedding;
}

// Store document with embedding
export async function storeDocument(text: string, metadata: any) {
  const embedding = await generateEmbedding(text);
  
  // Store in your vector database (Pinecone, Supabase, Qdrant, etc.)
  await vectorDB.upsert({
    id: metadata.id,
    values: embedding,
    metadata: { text, ...metadata },
  });
}

// Search for relevant documents
export async function searchDocuments(query: string, limit = 3) {
  const queryEmbedding = await generateEmbedding(query);
  
  // Query vector database
  const results = await vectorDB.query({
    vector: queryEmbedding,
    topK: limit,
    includeMetadata: true,
  });
  
  return results.matches.map((match) => match.metadata.text);
}`}
          />

          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>RAG Chat Route:</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`// app/api/chat-rag/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { searchDocuments } from "@/lib/vectorStore";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  // 1. Retrieve relevant documents
  const relevantDocs = await searchDocuments(lastMessage, 3);

  // 2. Inject context into the system prompt
  const context = relevantDocs.join("\\n\\n");

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system: \`You are a helpful assistant. Use the following context to answer questions.
    
Context:
\${context}

If the answer is not in the context, say "I don't have information about that."\`,
    messages,
  });

  return result.toAIStreamResponse();
}

// Example: Batch indexing documents
export async function indexDocuments() {
  const documents = [
    { id: "1", text: "Next.js is a React framework for production..." },
    { id: "2", text: "TypeScript adds static typing to JavaScript..." },
    { id: "3", text: "The Vercel AI SDK makes it easy to build AI apps..." },
  ];

  for (const doc of documents) {
    await storeDocument(doc.text, { id: doc.id });
  }
}`}
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
              RAG lets AI answer questions about YOUR data (docs, products,
              support tickets). First, embed and store your documents. Then
              retrieve relevant ones at query time and inject into the prompt.
            </p>
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
              Best Practices
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Production Tips & Best Practices
            </h2>
          </div>

          <div style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>
                <strong>Rate Limiting:</strong> Implement rate limits per user
                to prevent abuse. Use Redis or middleware.
              </li>
              <li>
                <strong>Error Handling:</strong> Always wrap AI calls in
                try-catch. Show user-friendly error messages.
              </li>
              <li>
                <strong>Caching:</strong> Cache common queries to save costs.
                Use Redis or Next.js cache.
              </li>
              <li>
                <strong>Streaming:</strong> Always use streaming for better UX.
                Users see responses immediately.
              </li>
              <li>
                <strong>Model Selection:</strong> Use cheaper models (gpt-3.5)
                for simple tasks. Use gpt-4 for complex reasoning.
              </li>
              <li>
                <strong>Token Limits:</strong> Set maxTokens to control costs.
                Track usage with OpenAI dashboard.
              </li>
              <li>
                <strong>Security:</strong> Never expose API keys to the client.
                Always use server-side routes.
              </li>
              <li>
                <strong>Monitoring:</strong> Log all AI requests for debugging
                and analytics. Track costs per user.
              </li>
              <li>
                <strong>Prompt Engineering:</strong> Spend time crafting good
                system prompts. Test with various inputs.
              </li>
              <li>
                <strong>Fallbacks:</strong> Have fallback responses when AI
                fails. Don't let users see raw errors.
              </li>
            </ul>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              <strong>Example: Rate Limiting Middleware</strong>
            </p>
            <CodeBlock
              language="typescript"
              code={`// lib/rateLimiter.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
});

// Use in API route
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }

  // Continue with AI request...
}`}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
