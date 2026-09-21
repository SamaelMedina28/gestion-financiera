"use client";

import { TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WishlistDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  // TODO: agrega productId y onConfirm cuando implementes el back.
  // productId: string;
  // onConfirm: (id: string) => void | Promise<void>;
}

export function WishlistDeleteDialog({
  open,
  onOpenChange,
  productName,
}: WishlistDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <TriangleAlert />
          </AlertDialogMedia>
          <AlertDialogTitle>Eliminar de la wishlist</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Seguro que quieres eliminar{" "}
            <span className="font-medium text-foreground">“{productName}”</span>?
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {/* TODO: conecta la eliminación real aquí.
              Sugerencia: server action deleteProduct(productId) + toast + revalidatePath("/wishlist"). */}
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              // TODO: eliminar producto
              onOpenChange(false);
            }}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
