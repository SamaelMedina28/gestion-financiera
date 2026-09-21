import Link from "next/link";
import { Settings, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Cuenta</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Mi perfil
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tu información y accesos rápidos.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {/* TODO: reemplaza por Avatar real + datos de sesión (auth()) */}
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              T
            </span>
            <div>
              <CardTitle className="text-base">Tu Nombre</CardTitle>
              <CardDescription>tu@correo.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          {/* TODO: formulario real de edición de perfil (nombre) */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Apariencia</p>
              <p className="text-xs text-muted-foreground">
                Cambia entre tema claro y oscuro.
              </p>
            </div>
            <ThemeToggle />
          </div>
          <Separator />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/settings"
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
            >
              <Settings />
              Ir a configuración
            </Link>
            <Button variant="ghost" className="flex-1" disabled>
              <User />
              Editar perfil (pronto)
            </Button>
          </div>
          {/* TODO: editar perfil + cambiar contraseña + eliminar cuenta */}
        </CardContent>
      </Card>
    </div>
  );
}
