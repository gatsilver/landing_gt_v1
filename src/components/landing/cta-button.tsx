"use client";

import { ArrowRight } from "lucide-react";
import { useAgenda } from "./agenda";

type CtaButtonProps = {
  /** Servicio o tema de interés para precargar el formulario. */
  interest?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "px-5 py-2 text-[12.5px]",
  md: "px-7 py-3 text-sm",
  lg: "px-8 py-3.5 text-[15px]",
};

/**
 * Botón dorado de "Agenda una llamada" — idéntico en header, hero y CTA.
 * Abre el diálogo con calendario y formulario de contacto.
 */
export function CtaButton({
  interest,
  size = "md",
  className,
}: CtaButtonProps) {
  const { open } = useAgenda();

  return (
    <button
      type="button"
      onClick={() => open(interest)}
      className={`group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 font-semibold text-navy-900 shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-px hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${sizeClasses[size]} ${className ?? ""}`}
    >
      Agenda una llamada
      <ArrowRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={2.2}
      />
    </button>
  );
}
