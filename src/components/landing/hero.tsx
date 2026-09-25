import Image from "next/image";
import { BarChart3, Lightbulb, Play, Target, Users } from "lucide-react";
import { CtaButton } from "./cta-button";
import { Reveal } from "./reveal";

const HERO_FEATURES = [
  { icon: Target, lines: ["Enfoque", "práctico"], gold: false },
  { icon: BarChart3, lines: ["Resultados", "medibles"], gold: false },
  { icon: Users, lines: ["Acompañamiento", "cercano"], gold: false },
  { icon: Lightbulb, lines: ["Visión", "estratégica"], gold: true },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[560px] flex-col overflow-hidden bg-[#0e202a] lg:min-h-[calc(100svh-4rem)]"
    >
      {/* Fotografía personal — protagonista absoluto del hero.
          Imagen original SIN filtro de oscuridad: se integra con un fundido
          de máscara (disuelve el borde en el fondo) para máxima claridad.
          Recorte calibrado: la cabeza arranca al 15.2% de la imagen, así que
          en lg+ se recorta solo 22% del desbordamiento vertical por arriba —
          el rostro queda prominente y el cráneo NUNCA se corta ni en pestaña
          completa ni en ultrawide; en móvil el encaje es por altura (sin
          recorte vertical). */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[68%] lg:w-[62%]">
        {/* Móvil: encaje por altura (sin recorte vertical) + X=57% para que
            el rostro quede completo y centrado aunque la sección crezca;
            lg+: X=50% (encaje exacto por ancho) y Y=22% del recorte arriba. */}
        <Image
          src="/images/gabino-hero.png"
          alt="Gabino, consultor de empresas, en su oficina"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 68vw, 62vw"
          className="object-cover object-[57%_50%] saturate-[1.03] contrast-[1.02] lg:object-[50%_22%] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_38%)] [mask-image:linear-gradient(to_right,transparent_0%,black_38%)]"
        />
        {/* Asistencia de fusión a la izquierda (más presente en móvil) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#0e202a]/90 from-0% via-[#0e202a]/60 via-[20%] to-transparent to-[52%] sm:via-[#0e202a]/35 sm:via-[16%]"
        />
        {/* Transición suave hacia la franja inferior (velo superior mínimo
            para no oscurecer la foto) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0e202a]/75 via-transparent to-[#0e202a]/5"
        />
      </div>

      {/* Firma y pilares — superpuesta en sm+ */}
      <div className="pointer-events-none absolute right-5 top-12 z-10 hidden text-right sm:right-12 sm:top-14 sm:block">
        <p className="font-script text-5xl leading-none text-white drop-shadow-[0_2px_10px_rgba(6,26,41,0.55)] [-rotate-6] sm:text-[68px] lg:text-[80px]">
          Gabino
        </p>
        <p className="mt-2 space-y-0.5 text-[9.5px] font-semibold leading-[1.7] tracking-[0.32em] text-[#94d2ca] drop-shadow-[0_1px_6px_rgba(6,26,41,0.65)] sm:text-[10px]">
          <span className="block">ESTRATEGIA</span>
          <span className="block">PERSONAS</span>
          <span className="block">PROCESOS</span>
          <span className="block">TECNOLOGÍA</span>
          <span className="block">RESULTADOS</span>
        </p>
      </div>

      {/* Contenido — centrado verticalmente en el primer pantallazo (lg+) */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-14 pt-16 lg:px-8 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <h1 className="font-display text-[38px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[52px]">
              Haz crecer tu negocio
              <br />
              con <span className="text-[#a2e6e3]">estrategia, orden</span>
              <br />
              <span className="text-[#a2e6e3]">y enfoque.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.55] text-white/90 lg:max-w-none lg:text-[17px]">
              Acompaño a dueños, líderes y equipos a ordenar su negocio,
              <br className="hidden lg:block" /> tomar mejores decisiones y crecer de forma más clara
              <br className="hidden lg:block" /> y sostenible.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-7 flex flex-wrap items-center gap-4">
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
              <p className="mt-2 space-y-0.5 text-[9.5px] font-semibold leading-[1.7] tracking-[0.32em] text-[#94d2ca] drop-shadow-[0_1px_6px_rgba(6,26,41,0.65)]">
                <span className="block">ESTRATEGIA</span>
                <span className="block">PERSONAS</span>
                <span className="block">PROCESOS</span>
                <span className="block">TECNOLOGÍA</span>
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
                className={`size-7 shrink-0 ${f.gold ? "text-gold-300" : "text-white"}`}
                strokeWidth={1.4}
                aria-hidden
              />
              <p className="text-[13px] font-medium leading-snug text-white/90 lg:text-sm">
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
