"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const RegisterSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(60),
  email: z.string().email("Correo no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(72),
});

export type RegisterState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function registerUser(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Revisa los datos", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.toLowerCase().trim();
  const password = parsed.data.password;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    // Si ya existe pero es cuenta solo de Google (sin password), le permitimos poner contraseña
    if (!existing.password) {
      const hash = await bcrypt.hash(password, 10);
      await db.user.update({
        where: { email },
        data: { password: hash, name: existing.name ?? name },
      });
      return { ok: true };
    }
    return { ok: false, error: "Ese correo ya está registrado. Inicia sesión." };
  }

  const hash = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { name, email, password: hash },
  });

  return { ok: true };
}

export type LoginState = { ok: boolean; error?: string };

export async function loginWithCredentials(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/",
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { ok: false, error: "Correo o contraseña incorrectos." };
      }
      return { ok: false, error: "No se pudo iniciar sesión. Inténtalo de nuevo." };
    }
    throw error;
  }
}
