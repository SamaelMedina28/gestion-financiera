"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";
import { APP_IDENTITY, APP_SECTIONS } from "@/config/app";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";

export function AppHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        {/* Identidad */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wallet className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight">
              {APP_IDENTITY.name}
            </span>
            {/* Tagline solo en desktop para no saturar el móvil */}
            <span className="hidden text-xs text-muted-foreground lg:block">
              {APP_IDENTITY.tagline}
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Secciones" className="ml-6 hidden items-center gap-1 md:flex">
          {APP_SECTIONS.map((section) => {
            const Icon = section.icon;
            const active = isActive(section.href);
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {section.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          {/* TODO: pasa el usuario real de sesión al dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
