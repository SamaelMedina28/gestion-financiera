"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/actions/oauth";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7.2.1c2.2-2 3.8-5 3.8-8.9z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.2 0-5.9-2.1-6.8-5.1l-3.9 3-.1.1C3.2 21.3 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3l-.1-.1-3.8-3-.1.1C.4 8.3 0 10.1 0 12s.4 3.7 1.2 5.3l4-3z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.7l4 3c.9-3 3.6-5 6.8-5z"
      />
    </svg>
  );
}

export function GoogleButton({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit" variant="outline" size="lg" className="w-full">
        <GoogleIcon />
        {mode === "signin" ? "Continuar con Google" : "Crear cuenta con Google"}
      </Button>
    </form>
  );
}
