import Link from "next/link";
import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";
import { cn } from "@/lib/utils";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <main className="w-full max-w-xl rounded-2xl border border-border bg-white p-8 text-center shadow-sm dark:bg-black">
        <h1 className="text-3xl font-semibold tracking-tight">Finanzas</h1>
        <p className="mt-2 text-muted-foreground">
          Autenticación con NextAuth: correo + contraseña y Google.
        </p>

        {session?.user ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              {session.user.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "avatar"}
                  className="size-10 rounded-full"
                />
              )}
              <div className="text-left">
                <p className="font-medium">{session.user.name ?? "Usuario"}</p>
                <p className="text-sm text-muted-foreground">{session.user.email}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <SignOutButton />
            </div>
          </div>
        ) : (
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/login" className={cn(buttonVariants())}>
              Iniciar sesión
            </Link>
            <Link href="/register" className={cn(buttonVariants({ variant: "outline" }))}>
              Crear cuenta
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
