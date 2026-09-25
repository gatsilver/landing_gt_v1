import Image from "next/image";
import { ArrowRight, BarChart3, Settings, Users } from "lucide-react";
import { Reveal } from "./reveal";

const SERVICE_CARDS = [
  {
    icon: Users,
    image: "/images/service-consultoria.png",
    alt: "Consultor presentando a un equipo directivo en una oficina",
    title: "Consultoría para dueños y gerentes",
    desc: "Estrategia, estructura y acompañamiento para tomar mejores decisiones y hacer crecer tu negocio.",
  },
  {
    icon: Settings,
    image: "/images/service-procesos.png",
    alt: "Manos trabajando sobre documentos y notas adhesivas en un escritorio",
    title: "Transformación de equipos y procesos",
    desc: "Diseñamos e implementamos procesos que simplifican, alinean y hacen más eficiente tu operación.",
  },
  {
    icon: BarChart3,
    image: "/images/service-talleres.png",
    alt: "Facilitador dirigiendo un taller empresarial frente a una audiencia",
    title: "Talleres y acompañamiento empresarial",
    desc: "Sesiones prácticas para fortalecer habilidades, alinear equipos y ejecutar con enfoque.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-16 bg-cream py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.22em] text-navy-800/45">
              SERVICIOS
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight text-navy-800 lg:text-[34px]">
              Servicios pensados para negocios{" "}
              <span className="text-teal-deep">
                que quieren dar el siguiente paso.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <a
              href="#servicios"
              className="group inline-flex items-center gap-2 pb-1 text-[13px] font-semibold text-navy-800 transition-colors hover:text-teal-deep"
            >
              Ver todos los servicios
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_3px_rgba(14,42,61,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Imagen con insignia superpuesta */}
                <div className="relative h-44">
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute -bottom-5 left-5 z-10 flex size-11 items-center justify-center rounded-lg bg-teal-deep text-white shadow-lg">
                    <card.icon className="size-5" strokeWidth={1.8} aria-hidden />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 pt-9">
                  <h3 className="text-[16.5px] font-bold leading-snug text-navy-800">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-navy-800/65">
                    {card.desc}
                  </p>
                  <a
                    href="#contacto"
                    className="group/link mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-navy-800 transition-colors hover:text-teal-deep"
                  >
                    Quiero saber más
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
