import Link from "next/link";
import { ArrowRight, Wallet } from "lucide-react";
import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_IDENTITY, APP_SECTIONS } from "@/config/app";
import { cn } from "@/lib/utils";

// Landing / identidad de la app.
// TODO: si prefieres que "/" sea la app directa, cambia esto por redirect("/wishlist").
export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-4 py-14 sm:px-6">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Wallet className="size-7" />
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            {APP_IDENTITY.name}
          </h1>
          <p className="mt-3 text-balance text-muted-foreground sm:text-lg">
            {APP_IDENTITY.tagline}. {APP_IDENTITY.description}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              href="/wishlist"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Entrar a la app
              <ArrowRight />
            </Link>
            {session?.user ? (
              <span className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">
                Hola, {session.user.name ?? session.user.email}
              </span>
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto"
                )}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>

        {/* Secciones */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {APP_SECTIONS.map((section) => (
            <Link key={section.id} href={section.href} className="h-full">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <section.icon className="size-5" />
                  </span>
                  <CardTitle className="mt-3">{section.label}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* TODO: agrega aquí testimonios / features cuando definas el marketing */}
      </main>
    </div>
  );
}
