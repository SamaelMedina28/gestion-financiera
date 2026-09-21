"use client";

import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileDropdownProps {
  // TODO: pasa el usuario real de la sesión (nombre, email, imagen).
  // Por ahora es solo diseño con datos de ejemplo.
  userName?: string;
  userEmail?: string;
}

export function ProfileDropdown({
  userName = "Tu Nombre",
  userEmail = "tu@correo.com",
}: ProfileDropdownProps) {
  const initial = userName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menú de perfil"
            className="rounded-full"
          >
            {/* TODO: reemplaza por <Avatar> real con la imagen de sesión */}
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {initial}
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="block truncate text-sm font-medium">{userName}</span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {userEmail}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User />
            Mi perfil
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/settings" />}>
            <Settings />
            Configuración
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* TODO: conecta el cierre de sesión real (signOut / server action). */}
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
