"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const messages: Record<string, { title: string; description: string }> = {
  signup: {
    title: "Check your email",
    description:
      "We've sent you a confirmation link. Please check your email and click the link to verify your account.",
  },
  "magic-link": {
    title: "Check your email",
    description:
      "We've sent you a magic link. Please check your email and click the link to sign in.",
  },
  recovery: {
    title: "Check your email",
    description:
      "We've sent you a password reset link. Please check your email and click the link to reset your password.",
  },
};

const fallback = {
  title: "Check your email",
  description: "We've sent you an email. Please check your inbox.",
};

function VerifyContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";
  const email = searchParams.get("email");
  const { title, description } = messages[type] ?? fallback;

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="bg-muted mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <Mail className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-sm">{description}</p>
        {email && (
          <p className="text-sm font-medium">{decodeURIComponent(email)}</p>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href="/auth/login"
          className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
