import { Bell, Globe, MoonStar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const COMING_SOON = [
  {
    icon: MoonStar,
    title: "Apariencia",
    hint: "El interruptor ya funciona con next-themes.",
  },
  {
    icon: Globe,
    title: "Moneda e idioma",
    hint: "TODO: guarda preferencia por usuario (ej. MXN/USD).",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    hint: "TODO: alertas de gasto y recordatorios de ahorro.",
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Cuenta / Configuración</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Configuración
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Preferencias de la aplicación. Solo diseño por ahora.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferencias</CardTitle>
          <CardDescription>
            Todo es visual. Conecta cada opción a tu back cuando practiques.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {COMING_SOON.map((item, i) => (
            <div key={item.title}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <item.icon className="size-4 text-muted-foreground" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.hint}</p>
                  </div>
                </div>
                {i === 0 ? (
                  <ThemeToggle compact />
                ) : (
                  <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                    Pronto
                  </span>
                )}
              </div>
              {i < COMING_SOON.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
