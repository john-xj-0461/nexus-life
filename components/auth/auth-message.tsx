import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AuthMessageProps = {
  message?: string;
  type?: "error" | "success";
};

export function AuthMessage({ message, type = "error" }: AuthMessageProps) {
  if (!message) return null;

  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      {type === "error" ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <CheckCircle2 className="h-4 w-4" />
      )}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
