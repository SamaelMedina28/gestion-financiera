import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea tu cuenta con tus datos o con Google",
};

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Crear cuenta</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Regístrate con tu nombre, correo y contraseña, o con Google.
        </p>
        <RegisterForm />
      </div>
    </main>
  );
}
