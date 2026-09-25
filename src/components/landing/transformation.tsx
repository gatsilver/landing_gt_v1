import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Crosshair,
  Leaf,
  Play,
  Users,
} from "lucide-react";
import { Reveal } from "./reveal";

const OUTCOME_FEATURES = [
  {
    icon: BarChart3,
    title: "Más orden",
    desc: "Estructura para que todo funcione mejor.",
  },
  {
    icon: Users,
    title: "Mejor gestión",
    desc: "Decisiones más claras y efectivas.",
  },
  {
    icon: Crosshair,
    title: "Equipos alineados",
    desc: "Personas motivadas que multiplican resultados.",
  },
  {
    icon: Leaf,
    title: "Crecimiento sostenible",
    desc: "Un negocio sólido hoy y mañana.",
  },
];

export function Transformation() {
  return (
    <section
      id="sobre-mi"
      className="relative scroll-mt-16 overflow-hidden bg-navy-900 text-white"
    >
      {/* Fondo de montaña */}
      <Image
        src="/images/mountain.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[72%_center]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/75 to-navy-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/10 to-navy-900/55" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <Reveal className="max-w-lg">
          <p className="text-[11px] font-bold tracking-[0.22em] text-white/55">
            DE ESFUERZO A RESULTADOS REALES
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight lg:text-[38px]">
            Pasar del día a día al crecimiento con propósito
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 lg:text-[15px]">
            Te ayudo a convertir el esfuerzo de hoy en un negocio más ordenado,
            claro y rentable, con una visión de largo plazo. Menos
            improvisación, más estrategia y más resultados.
          </p>
          <a
            href="#metodo"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/35 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/60 hover:bg-white/10"
          >
            <span className="flex size-6 items-center justify-center rounded-full border border-white/40 bg-white/15">
              <Play className="ml-0.5 size-2.5 fill-white text-white" />
            </span>
            Conoce mi historia
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Reveal>

        {/* Resultados alineados abajo a la derecha */}
        <div className="flex flex-col justify-end">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {OUTCOME_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <f.icon
                  className="size-7 text-white"
                  strokeWidth={1.4}
                  aria-hidden
                />
                <h3 className="mt-2.5 text-[13px] font-semibold">
                  {f.title}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                  {f.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
