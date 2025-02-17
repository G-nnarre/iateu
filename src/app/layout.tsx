// RootLayout.tsx - Server Component (without "use client")
import "reflect-metadata";
import { Suspense } from "react";
import { Metadata } from "next";
import AuthCheck from "./components/authCheck";

export const metadata: Metadata = {
  title: "I Ate U",
  description: "My dashboard to track how much I hate you",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthCheck />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
