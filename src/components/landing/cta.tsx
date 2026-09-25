import Image from "next/image";
import { CalendarCheck2, Crosshair, ShieldCheck } from "lucide-react";
import { CtaButton } from "./cta-button";
import { Reveal } from "./reveal";

const CTA_POINTS = [
  { icon: ShieldCheck, label: "100% confidencial" },
  { icon: CalendarCheck2, label: "Sin compromiso" },
  { icon: Crosshair, label: "Enfocado en tus objetivos" },
];

export function CtaSection() {
  return (
    <section
      id="contacto"
      className="relative scroll-mt-16 overflow-hidden bg-navy-800 text-white"
    >
      {/* Planta decorativa a la izquierda */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-40 opacity-0 [mask-image:linear-gradient(to_right,black_25%,transparent)] sm:w-56 sm:opacity-60 lg:w-64"
      >
        <Image
          src="/images/cta-plant.png"
          alt=""
          fill
          sizes="256px"
          className="object-cover object-left"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:py-16 lg:pl-44">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold leading-tight lg:text-[34px]">
            Tu negocio no necesita más caos.
            <br />
            Necesita dirección.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 lg:text-[15px]">
            Agenda una llamada y conversemos sobre cómo llevar tu negocio al
            siguiente nivel.
          </p>
          <CtaButton size="lg" className="mt-6" />
        </Reveal>

        <Reveal delay={140}>
          <ul className="space-y-4 lg:border-l lg:border-white/15 lg:pl-10">
            {CTA_POINTS.map((point) => (
              <li key={point.label} className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold-400/70 text-gold-300">
                  <point.icon className="size-4" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="text-[13px] text-white/90">{point.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
