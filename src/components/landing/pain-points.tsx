import { Clock, Settings, User, Users } from "lucide-react";
import { Reveal } from "./reveal";

const PAIN_CARDS = [
  {
    icon: User,
    title: "Todo recae en el dueño",
    desc: "Demasiadas tareas, poca delegación y menos tiempo para lo importante.",
  },
  {
    icon: Users,
    title: "El equipo no siempre está alineado",
    desc: "Las ideas existen, pero no todos reman en la misma dirección.",
  },
  {
    icon: Settings,
    title: "Faltan procesos claros",
    desc: "Se improvisa, se repite el trabajo y se pierden oportunidades.",
  },
  {
    icon: Clock,
    title: "Se trabaja mucho, pero sin el orden necesario",
    desc: "Hay esfuerzo, pero no siempre se convierte en mejores resultados.",
  },
];

export function PainPoints() {
  return (
    <section className="bg-cream py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.22em] text-navy-800/45">
            EL GRAN RETO DE MUCHOS NEGOCIOS
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy-800 lg:text-[34px]">
            Muchos negocios crecen...
            <br />
            <span className="text-teal-deep">pero sin estructura</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-800/70 lg:text-[15px]">
            Y cuando todo depende de ti, avanzar se vuelve más pesado.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PAIN_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 90} className="h-full">
              <article className="h-full rounded-lg border border-line bg-white p-4 shadow-[0_1px_3px_rgba(14,42,61,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-deep text-white">
                  <card.icon className="size-5" strokeWidth={1.8} aria-hidden />
                </div>
                <h3 className="mt-3 text-[13.5px] font-bold leading-snug text-navy-800">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-800/60">
                  {card.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
