# Finanzas · Identidad de marca y sistema de diseño

> Documento de referencia para IAs y desarrolladores.
> Si vas a generar código para este proyecto, sigue estas reglas.
> Última actualización: 2026-09-21.

---

## 1. Identidad de marca

| Elemento   | Valor                                                        |
| ---------- | ------------------------------------------------------------ |
| Nombre     | **Finanzas**                                                 |
| Tagline    | "Tus metas, gastos y ahorros en un solo lugar"               |
| Descripción| "Organiza tu wishlist, controla tus gastos y haz crecer tu ahorro." |
| Logo       | Icono `Wallet` de lucide dentro de un rounded-xl `bg-primary` |
| Idioma UI  | Español (`lang="es"`, textos en es-MX, moneda `MXN` por defecto) |

Fuente de verdad del branding en código: `src/config/app.ts`
(`APP_IDENTITY`, `APP_SECTIONS`). No hardcodees el nombre ni las
secciones en las vistas: impórtalos de ahí.

### Secciones del sistema

| Sección  | Ruta        | Icono (lucide) | Descripción                              |
| -------- | ----------- | -------------- | ---------------------------------------- |
| Wishlist | `/wishlist` | `Heart`        | Deseos de compra ordenados por prioridad |
| Gastos   | `/expenses` | `Wallet`       | Registro de gastos (placeholder)         |
| Ahorro   | `/savings`  | `PiggyBank`    | Metas de ahorro (placeholder)            |
| Perfil   | `/profile`  | `User`         | Perfil + acceso a `/settings`            |

Máximo 5 tabs en móvil. Hoy hay 4 (3 secciones + Perfil).

---

## 2. Fundación visual (NO cambiar sin permiso)

- **Tema shadcn:** estilo `base-nova`, color base `neutral`, CSS variables
  (ver `components.json`). Seguir el **color predeterminado de shadcn**.
- **Tokens de color:** OKLCH en `src/app/globals.css` (`:root` + `.dark`).
  Primario azul (`oklch(0.52 0.105 223.128)`), destructivo rojo estándar.
  No inventes paletas: usa `bg-primary`, `bg-muted`, `bg-card`,
  `text-muted-foreground`, `border-border`, etc.
- **Radio:** `--radius: 0.875rem`. Cards `rounded-xl` / `rounded-2xl`.
- **Dark mode:** clase `.dark` vía `next-themes`
  (`ThemeProvider` en `src/app/layout.tsx` + `suppressHydrationWarning`
  en `<html>`). El toggle con opciones Claro / Oscuro / Sistema ya existe:
  `src/components/layout/theme-toggle.tsx`. No crees otro.
- **Tipografías:** `Inter` (sans/UI) + `Geist` / `Geist_Mono` (código).
- **Iconos:** solo `lucide-react`. Nada de emojis en la UI.

---

## 3. Stack de componentes UI

- `src/components/ui/*` son shadcn **base-nova sobre Base UI**
  (`@base-ui/react`), NO Radix. La API difiere de la shadcn clásica.
- Disponibles: `button`, `card`, `dialog`, `alert-dialog`,
  `dropdown-menu`, `input`, `label`, `textarea`, `select`, `badge`,
  `sheet`, `separator`. Si falta uno, agregarlo con:
  `pnpm dlx shadcn@latest add <componente>`.

### Reglas Base UI (causaron bugs reales, respetar siempre)

1. **Nunca `<Button render={<Link/>}>`.**
   Base UI `Button` tiene `nativeButton` y espera un `<button>` nativo;
   renderizar un `<a>` rompe semántica y lanza warning en consola.
   Para enlaces con apariencia de botón usa:
   ```tsx
   import Link from "next/link";
   import { buttonVariants } from "@/components/ui/button";
   import { cn } from "@/lib/utils";

   <Link href="/ruta" className={cn(buttonVariants({ variant: "outline" }))}>
     Texto
   </Link>
   ```
   `<Button>` se usa SOLO para acciones reales (`submit`, `onClick`).

2. **`DropdownMenuLabel` siempre dentro de `DropdownMenuGroup`.**
   Fuera de un grupo lanza `MenuGroupContext is missing` y rompe la página.
   ```tsx
   <DropdownMenuContent>
     <DropdownMenuGroup>
       <DropdownMenuLabel>…</DropdownMenuLabel>
     </DropdownMenuGroup>
     <DropdownMenuSeparator />
     <DropdownMenuGroup>
       <DropdownMenuItem>…</DropdownMenuItem>
     </DropdownMenuGroup>
   </DropdownMenuContent>
   ```

3. **`DropdownMenuTrigger` con `render`:**
   ```tsx
   <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
   ```
   El elemento de `render` debe ser un botón nativo.

4. **`Select` (Base UI):** `Select value/onValueChange/defaultValue`,
   con `SelectTrigger > SelectValue`, `SelectContent > SelectItem`.
   Para formularios HTML usa la prop `name` en el Root.

---

## 4. Layout y navegación responsive

Shell de la app: `src/app/(app)/layout.tsx`
(`AppHeader` + `<main>` + `MobileTabbar`).

- **Desktop (md+):** header sticky con logo, nav horizontal de
  `APP_SECTIONS` (activo = `bg-primary/10 text-primary`, detectado con
  `usePathname`), `ThemeToggle` y `ProfileDropdown` a la derecha.
- **Móvil:** header compacto (logo + theme + perfil, sin tagline ni nav)
  + **bottom tabbar fija** (`mobile-tabbar.tsx`, 4 tabs con punto
  indicador de activo + safe-area para iPhone).
- El `<main>` lleva `pb-24 md:pb-10` para que el tabbar no tape contenido.
- Contenedor estándar: `mx-auto w-full max-w-6xl px-4 sm:px-6`
  (formularios: `max-w-2xl`).
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- Acciones primarias en móvil: FAB `fixed right-4 bottom-24 sm:hidden`
  o botones `sticky bottom-20`.

Componentes en `src/components/layout/`:
`app-header`, `mobile-tabbar`, `profile-dropdown`
(Mi perfil / Configuración / Cerrar sesión + TODOs de sesión real),
`theme-toggle`, `theme-provider`, `section-placeholder`
(estado vacío estándar para módulos sin construir).

---

## 5. Arquitectura de código (modular, obligatoria)

```
src/
├── app/
│   ├── layout.tsx            # Root: Theme + AuthSession + metadata/es
│   ├── page.tsx              # Landing de marca (NO es la app)
│   ├── (app)/                # App con shell: layout + tabbar
│   │   ├── wishlist/page.tsx          # Index
│   │   ├── wishlist/new/page.tsx      # Crear
│   │   ├── wishlist/[id]/edit/page.tsx# Editar
│   │   ├── expenses|savings|profile|settings/page.tsx
│   │   └── layout.tsx
│   └── (auth)/login|register/ # Auth standalone (sin shell)
├── config/app.ts             # Identidad + secciones (fuente de verdad)
├── components/
│   ├── ui/                   # shadcn (no editar a mano)
│   └── layout/               # Header, tabbar, dropdowns, placeholders
├── features/<modulo>/
│   ├── types.ts              # Tipos espejo de Prisma + helpers (formatPrice…)
│   ├── mock-data.ts          # Mocks SOLO para diseñar (eliminar al conectar back)
│   └── components/           # card, grid, form, delete-dialog, empty-state…
├── lib/actions/              # Server actions (auth, oauth)
├── lib/db.ts                 # PrismaClient (adapter Pg, singleton)
└── types/next-auth.d.ts      # session.user.id
```

### Reglas de módulos (`features/`)

- Cada módulo vive en `src/features/<modulo>/` con `types.ts`,
  `mock-data.ts` y `components/`. Las páginas de `app/` solo componen.
- Formularios crear/editar: **un solo componente** con prop
  `mode: "create" | "edit"` + `defaultValues?` (ver `wishlist-form.tsx`).
  Campos = espejo del modelo Prisma (`name`, `description?`, `price`,
  `priority?`, `link?`). Inputs no controlados (`defaultValue`),
  `onSubmit` con `preventDefault` + TODO.
- Eliminación: `AlertDialog` dedicado por módulo
  (ver `wishlist-delete-dialog.tsx`): título + nombre del item +
  "Cancelar / Eliminar (destructive)" + TODO del server action.
- Index: header con conteo + total, botón desktop (`hidden sm:inline-flex`),
  FAB móvil, grid responsive, empty-state dedicado.
- **Cero lógica de negocio en UI:** nada de fetch, mutations ni auth real
  en componentes de diseño. Todo pendiente va con `// TODO:` explicando
  qué crear (ej. `server action deleteProduct(productId) + revalidatePath`).

---

## 6. Patrones de página

Encabezado estándar de página de módulo:

```tsx
<div>
  <p className="text-sm text-muted-foreground">Sección / Subsección</p>
  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Título</h1>
  <p className="mt-1 text-sm text-muted-foreground">Subtítulo.</p>
</div>
```

- Detalle/edición en card `max-w-2xl` con `CardHeader` (título + descripción
  que referencia el modelo Prisma) y botón Volver (`ghost sm`).
- Precios: `formatPrice()` de `features/<modulo>/types.ts`
  (`Intl.NumberFormat es-MX, MXN, 0 decimales`).
- Prioridad: `HIGH/MEDIUM/LOW` → badges Alta/Media/Baja
  (destructive / primary / muted) + estado "Sin prioridad".
  Ver `priority-badge.tsx`.

---

## 7. Checklist para crear un módulo nuevo

1. Agregar sección a `APP_SECTIONS` en `src/config/app.ts`.
2. Crear `src/features/<modulo>/{types.ts,mock-data.ts,components/}`.
3. Crear rutas `(app)/<modulo>/page.tsx`, `new/page.tsx`, `[id]/edit/page.tsx`.
4. Reutilizar `SectionPlaceholder` solo si el módulo queda pendiente.
5. Verificar: `pnpm build` + revisar consola del navegador (cero warnings
   de Base UI) en móvil (375px) y desktop.
6. Dejar `TODO:` en cada punto donde el back deba conectarse.

## 8. Comandos

```bash
pnpm dev      # desarrollo (http://localhost:3000)
pnpm build    # verificación obligatoria antes de entregar
pnpm dlx shadcn@latest add <componente>  # nuevo componente UI
pnpm prisma migrate dev --name <nombre>  # cambios de schema
```
