import Image from "next/image";
import { ArrowRight, Store, Users } from "lucide-react";
import { Reveal } from "./reveal";

const AUDIENCES = [
  {
    icon: Store,
    image: "/images/mipymes.png",
    alt: "Fachada de un negocio local moderno al atardecer",
    kicker: "Mi enfoque principal:",
    title: "MIPYMES",
    desc: "Acompaño a micro, pequeñas y medianas empresas a crecer, profesionalizar y crecer. Soluciones prácticas y realistas.",
  },
  {
    icon: Users,
    image: "/images/b2b.png",
    alt: "Edificio corporativo de cristal visto desde abajo",
    kicker: "También trabajo con",
    title: "líderes y equipos B2B",
    desc: "Desarrollo talleres, estrategia, alineación y acompañamiento para equipos corporativos que buscan mayor claridad y ejecución.",
  },
];

export function Audiences() {
  return (
    <section className="bg-cream pb-14 lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-2 px-4 md:grid-cols-2 lg:px-8">
        {AUDIENCES.map((item, i) => (
          <Reveal key={item.title} delay={i * 120} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-[0_1px_3px_rgba(14,42,61,0.05)] transition duration-300 hover:shadow-lg sm:flex-row">
              <div className="relative min-h-44 sm:w-[38%] sm:min-h-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-deep text-white">
                    <item.icon className="size-5" strokeWidth={1.8} aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-800/80">
                      {item.kicker}
                    </p>
                    <h3 className="text-lg font-bold leading-tight text-navy-800 lg:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-navy-800/65">
                  {item.desc}
                </p>
                <a
                  href="#contacto"
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-navy-800/35 px-4 py-1.5 text-xs font-semibold text-navy-800 transition duration-300 hover:bg-navy-800 hover:text-white"
                >
                  Conoce más
                  <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
