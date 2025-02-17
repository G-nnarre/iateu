"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useAuthStore } from "@/presentation/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheck() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return null;
}