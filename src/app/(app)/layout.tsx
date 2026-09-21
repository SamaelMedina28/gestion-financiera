import { AppHeader } from "@/components/layout/app-header";
import { MobileTabbar } from "@/components/layout/mobile-tabbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // TODO: protege estas rutas cuando conectes el back.
  // Sugerencia: `const session = await auth(); if (!session) redirect("/login");`
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <AppHeader />
      {/* pb-24 en móvil para que el tabbar inferior no tape el contenido */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-24 sm:px-6 md:pb-10">
        {children}
      </main>
      <MobileTabbar />
    </div>
  );
}
