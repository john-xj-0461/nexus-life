import type { AuthError } from "@supabase/supabase-js";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Invalid email or password. Please try again.",
  email_not_confirmed: "Please verify your email address before signing in.",
  user_not_found: "No account found with that email address.",
  user_already_exists: "An account with that email already exists.",
  over_request_rate_limit: "Too many requests. Please wait a moment and try again.",
  email_address_invalid: "Please enter a valid email address.",
  weak_password: "Password is too weak. Please use at least 6 characters.",
  same_password: "New password must be different from your current password.",
  otp_expired: "The link has expired. Please request a new one.",
  invalid_otp: "The link is invalid or has already been used.",
};

const MESSAGE_PATTERNS: [RegExp, string][] = [
  [/password.*(?:short|weak|length)/i, "Password must be at least 6 characters."],
  [/rate.*limit/i, "Too many requests. Please wait a moment and try again."],
  [/already.*registered/i, "An account with that email already exists."],
  [/invalid.*email/i, "Please enter a valid email address."],
];

export function getAuthErrorMessage(error: AuthError): string {
  // Check error code first
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }

  // Fall back to message pattern matching
  for (const [pattern, message] of MESSAGE_PATTERNS) {
    if (pattern.test(error.message)) {
      return message;
    }
  }

  // Final fallback
  return error.message || "An unexpected error occurred. Please try again.";
}
