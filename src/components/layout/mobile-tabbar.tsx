"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { APP_SECTIONS } from "@/config/app";
import { cn } from "@/lib/utils";

export function MobileTabbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 md:hidden"
    >
      {/* TODO: si agregas más secciones, mantén máximo 5 tabs para que quepan en móvil. */}
      <ul className="grid grid-cols-4">
        {APP_SECTIONS.map((section) => {
          const Icon = section.icon;
          const active = isActive(section.href);
          return (
            <li key={section.id}>
              <Link
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                {section.shortLabel}
                <span
                  className={cn(
                    "h-1 w-1 rounded-full",
                    active ? "bg-primary" : "bg-transparent"
                  )}
                />
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/profile"
            aria-current={isActive("/profile") ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              isActive("/profile") || isActive("/settings")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User
              className="size-5"
              strokeWidth={isActive("/profile") ? 2.5 : 2}
            />
            Perfil
            <span
              className={cn(
                "h-1 w-1 rounded-full",
                isActive("/profile") || isActive("/settings")
                  ? "bg-primary"
                  : "bg-transparent"
              )}
            />
          </Link>
        </li>
      </ul>
      {/* Respeta el safe-area de iPhone con notch */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
