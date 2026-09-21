import { Wallet } from "lucide-react";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export default function ExpensesPage() {
  return (
    <SectionPlaceholder
      icon={Wallet}
      eyebrow="Gastos"
      title="Mis gastos"
      description="Registra y categoriza tus gastos del día a día."
      todo="Modelo Expense en Prisma + formulario de registro + lista/filtros por fecha y categoría. Rutas sugeridas: /expenses/new y /expenses/[id]/edit."
    />
  );
}
