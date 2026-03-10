import type { Metadata } from "next";
import "./globals.css";
import NavClient from "@/components/NavClient";

export const metadata: Metadata = {
  title: "Web Dev Explorer",
  description:
    "React, Next.js & JavaScript - 97+ concepts with live demos, playground, and API guides",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavClient />
        {children}
        <footer
          style={{
            marginTop: "60px",
            padding: "30px 20px",
            background: "#111118",
            borderTop: "1px solid #1e1e2e",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#6c7086",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Developed and Maintained by{" "}
            <span
              style={{
                color: "#cdd6f4",
                fontWeight: "600",
                background: "linear-gradient(135deg, #89b4fa 0%, #b4befe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chaitanya Kumar B
            </span>
          </p>
          <p
            style={{
              color: "#585b70",
              fontSize: "12px",
              margin: "10px 0 0 0",
            }}
          >
            © {new Date().getFullYear()} All rights reserved
          </p>
        </footer>
      </body>
    </html>
  );
}
