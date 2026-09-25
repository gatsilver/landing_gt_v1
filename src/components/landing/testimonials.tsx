"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./reveal";

const TESTIMONIALS = [
  {
    avatar: "/images/avatar-mariana.png",
    quote:
      "Gabino nos ayudó a ver el negocio desde otra perspectiva. Hoy tenemos más orden, un mejor equipo y resultados concretos.",
    name: "Mariana Torres",
    role: "Dueña de negocio | Sector Alimentos",
  },
  {
    avatar: "/images/avatar-luis.png",
    quote:
      "Su enfoque es muy práctico y atinado. Nos ayudó a priorizar y a implementar cambios que ya se reflejan en nuestros resultados.",
    name: "Luis Fernández",
    role: "Director General | Sector Servicios",
  },
  {
    avatar: "/images/avatar-carla.png",
    quote:
      "Los talleres con Gabino fueron un punto de inflexión para nuestro equipo. Más claridad, mejor comunicación y mucha más acción.",
    name: "Carla Méndez",
    role: "Gerente de Personas | Sector Retail",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    const gap = 20; // gap-5
    const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
    const atEnd =
      el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    const atStart = el.scrollLeft <= 8;
    // Carrusel con loop: al llegar al final vuelve al inicio y viceversa
    if (dir === 1 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir === -1 && atStart) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <section id="resultados" className="scroll-mt-16 bg-cream py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.22em] text-navy-800/45">
              RESULTADOS REALES
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight text-navy-800 sm:text-3xl lg:text-[30px]">
              Lo que dicen quienes ya trabajaron conmigo
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 pb-1 text-[13px] font-semibold text-navy-800 transition-colors hover:text-teal-deep"
            >
              Ver más testimonios
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative mt-9">
            {/* Flecha izquierda */}
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Testimonio anterior"
              className="absolute -left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-navy-800/25 bg-white text-navy-800 shadow-md transition duration-200 hover:bg-navy-800 hover:text-white lg:-left-5"
            >
              <ChevronLeft className="size-4.5" aria-hidden />
            </button>

            {/* Carrusel */}
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TESTIMONIALS.map((t) => (
                <article
                  key={t.name}
                  className="w-[85%] flex-none snap-start rounded-xl border border-line bg-white p-5 shadow-[0_1px_3px_rgba(14,42,61,0.05)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                >
                  <div className="flex gap-4">
                    <Image
                      src={t.avatar}
                      alt={`Retrato de ${t.name}`}
                      width={48}
                      height={48}
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[12.5px] leading-relaxed text-navy-800/75">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <p className="mt-3 text-[13px] font-bold text-navy-800">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-navy-800/55">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Flecha derecha */}
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Testimonio siguiente"
              className="absolute -right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-navy-800/25 bg-white text-navy-800 shadow-md transition duration-200 hover:bg-navy-800 hover:text-white lg:-right-5"
            >
              <ChevronRight className="size-4.5" aria-hidden />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
