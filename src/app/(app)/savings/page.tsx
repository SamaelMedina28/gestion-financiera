import { PiggyBank } from "lucide-react";
import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export default function SavingsPage() {
  return (
    <SectionPlaceholder
      icon={PiggyBank}
      eyebrow="Ahorro"
      title="Mi ahorro"
      description="Metas de ahorro y progreso mensual."
      todo="Modelo SavingGoal en Prisma + cards de metas con barra de progreso + formulario de aportes. Componente sugerido: savings-goal-card con Progress de shadcn."
    />
  );
}
