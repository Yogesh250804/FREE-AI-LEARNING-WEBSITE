"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import { LoginForm } from "@/components/auth/login-form";
import { UserDashboard } from "@/components/auth/user-dashboard";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Loader2 } from "lucide-react";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (mode === "signup") {
      setIsLogin(false);
    } else if (mode === "login") {
      setIsLogin(true);
    }
  }, [mode]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      {user ? (
        <UserDashboard />
      ) : (
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden shadow-sm">
              <img src="/aig-logo.png" alt="AIG Logo" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">AIR G INTERNATIONAL</h1>
            <p className="text-muted-foreground">Your gateway to knowledge</p>
          </div>
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      )}
    </main>
  );
}

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense fallback={
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      }>
        <AuthContent />
      </Suspense>
      <Footer />
    </div>
  );
}
