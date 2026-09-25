import Image from "next/image";
import { BarChart3, Crosshair, Lightbulb, Play, Users } from "lucide-react";
import { CtaButton } from "./cta-button";
import { Reveal } from "./reveal";

const HERO_FEATURES = [
  { icon: Crosshair, lines: ["Enfoque", "práctico"], gold: false },
  { icon: BarChart3, lines: ["Resultados", "medibles"], gold: false },
  { icon: Users, lines: ["Acompañamiento", "cercano"], gold: false },
  { icon: Lightbulb, lines: ["Visión", "estratégica"], gold: true },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy-800">
      {/* Fotografía personal — protagonista del hero */}
      <div
        className="absolute inset-y-0 right-0 w-full sm:w-[66%] lg:w-[58%]"
        aria-hidden={false}
      >
        <Image
          src="/images/gabino-hero.png"
          alt="Gabino, consultor de empresas, en su oficina"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 58vw"
          className="object-cover object-[50%_22%] saturate-[0.98] contrast-[1.03]"
        />
        {/* Halo suave que acompaña al perfil y lo separa del fondo */}
        <div
          aria-hidden
          className="absolute left-[46%] top-[30%] size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-accent/25 mix-blend-screen blur-[90px]"
        />
        <div
          aria-hidden
          className="absolute bottom-[12%] right-[18%] size-[36%] rounded-full bg-gold-300/15 mix-blend-screen blur-[100px]"
        />
        {/* Fundidos ligeros: la foto mantiene su protagonismo */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-800/30 sm:via-navy-800/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-transparent to-navy-800/25" />
      </div>

      {/* Firma y pilares — superpuesta en sm+ */}
      <div className="pointer-events-none absolute right-5 top-12 z-10 hidden text-right sm:right-12 sm:top-16 sm:block">
        <p className="font-script text-5xl leading-none text-white drop-shadow-[0_2px_10px_rgba(6,26,41,0.55)] [-rotate-6] sm:text-[64px]">
          Gabino
        </p>
        <p className="mt-2 space-y-0.5 text-[9.5px] font-semibold leading-[1.7] tracking-[0.32em] text-teal-accent drop-shadow-[0_1px_6px_rgba(6,26,41,0.65)] sm:text-[10px]">
          <span className="block">ESTRATEGIA</span>
          <span className="block">PERSONAS</span>
          <span className="block">PROCESOS</span>
          <span className="block">RESULTADOS</span>
        </p>
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-16 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[52px]">
              Haz crecer tu negocio
              <br />
              con <span className="text-teal-accent">estrategia, orden</span>
              <br />
              <span className="text-teal-accent">y enfoque.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85">
              Acompaño a dueños, líderes y equipos a ordenar su negocio, tomar
              mejores decisiones y crecer de forma más clara y sostenible.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CtaButton size="md" />
              <a
                href="#metodo"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/35 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/60 hover:bg-white/10"
              >
                <span className="flex size-6 items-center justify-center rounded-full border border-white/40 bg-white/15">
                  <Play className="ml-0.5 size-2.5 fill-white text-white" />
                </span>
                Conoce mi método
              </a>
            </div>
          </Reveal>

          {/* Firma y pilares — en flujo solo en móvil */}
          <Reveal delay={300} className="pointer-events-none mt-10 flex justify-end sm:hidden">
            <div className="text-right">
              <p className="font-script text-5xl leading-none text-white drop-shadow-[0_2px_10px_rgba(6,26,41,0.55)] [-rotate-6]">
                Gabino
              </p>
              <p className="mt-2 space-y-0.5 text-[9.5px] font-semibold leading-[1.7] tracking-[0.32em] text-teal-accent drop-shadow-[0_1px_6px_rgba(6,26,41,0.65)]">
                <span className="block">ESTRATEGIA</span>
                <span className="block">PERSONAS</span>
                <span className="block">PROCESOS</span>
                <span className="block">RESULTADOS</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Franja de pilares */}
      <div className="relative z-10 border-t border-white/15">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/15 lg:px-8">
          {HERO_FEATURES.map((f) => (
            <div
              key={f.lines.join("-")}
              className="flex items-center gap-3 border-b border-white/15 px-4 py-4 md:border-b-0 md:px-6 md:py-5 lg:px-7"
            >
              <f.icon
                className={`size-6 shrink-0 ${f.gold ? "text-gold-300" : "text-white"}`}
                strokeWidth={1.4}
                aria-hidden
              />
              <p className="text-[13px] font-medium leading-snug text-white/90">
                <span className="block">{f.lines[0]}</span>
                <span className="block">{f.lines[1]}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
