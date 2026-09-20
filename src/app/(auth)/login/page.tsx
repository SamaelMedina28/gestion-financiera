import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión con tu correo o con Google",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/");

  const { registered } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenido de nuevo</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Inicia sesión con tu correo o con Google.
        </p>
        {registered && (
          <p className="mb-4 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
            Cuenta creada. Ahora inicia sesión.
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
