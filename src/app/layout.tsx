/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthStore } from "@/presentation/store/useAuthStore";
import type { Metadata } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "I Ate U",
  description: "My dashboard to track how much I hate you",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const router = useRouter();
  const { isAuthenticated, checkAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <html>
      <body>
          {children}
      </body>
    </html>
  );
}
