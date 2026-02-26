"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, signInWithMagicLink, type AuthState } from "../actions";
import { SubmitButton } from "@/components/auth/submit-button";
import { AuthMessage } from "@/components/auth/auth-message";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const initialState: AuthState = {};

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackError = searchParams.get("error");

  const [loginState, loginAction] = useActionState(login, initialState);
  const [magicState, magicAction] = useActionState(
    signInWithMagicLink,
    initialState,
  );

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {callbackError && (
          <AuthMessage message={callbackError} type="error" />
        )}

        {/* Email + Password Form */}
        <form action={loginAction} className="space-y-4">
          <AuthMessage message={loginState.error} type="error" />
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            {loginState.fieldErrors?.email && (
              <p className="text-destructive text-sm">
                {loginState.fieldErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
            {loginState.fieldErrors?.password && (
              <p className="text-destructive text-sm">
                {loginState.fieldErrors.password}
              </p>
            )}
          </div>
          <SubmitButton>Sign in</SubmitButton>
        </form>

        <div className="relative">
          <Separator />
          <span className="bg-card text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
            or
          </span>
        </div>

        {/* Magic Link Form */}
        <form action={magicAction} className="space-y-4">
          <AuthMessage message={magicState.error} type="error" />
          <div className="space-y-2">
            <Label htmlFor="magic-email">Email</Label>
            <Input
              id="magic-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            {magicState.fieldErrors?.email && (
              <p className="text-destructive text-sm">
                {magicState.fieldErrors.email}
              </p>
            )}
          </div>
          <SubmitButton variant="outline">Send magic link</SubmitButton>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
