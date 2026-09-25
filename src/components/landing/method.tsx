import {
  ArrowRight,
  BarChart3,
  FileText,
  Search,
  Settings,
} from "lucide-react";
import { Reveal } from "./reveal";

const STEPS = [
  {
    number: "1",
    icon: Search,
    title: "Diagnóstico",
    desc: "Analizamos tu situación actual, identificamos oportunidades reales y retos prioritarios.",
  },
  {
    number: "2",
    icon: FileText,
    title: "Prioridades claras",
    desc: "Definimos un plan enfocado en lo que realmente genera impacto.",
  },
  {
    number: "3",
    icon: Settings,
    title: "Implementación",
    desc: "Te acompaño a ejecutar con un enfoque práctico y realista.",
  },
  {
    number: "4",
    icon: BarChart3,
    title: "Seguimiento",
    desc: "Medimos avances, ajustamos y mantenemos el impulso para lograr resultados duraderos.",
  },
];

function Step({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[12px] font-bold text-white">
          {step.number}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-teal-deep shadow-sm">
          <step.icon className="size-[18px]" strokeWidth={1.8} aria-hidden />
        </span>
      </div>
      <h3 className="mt-3 text-[14.5px] font-bold text-navy-800">
        {step.title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-navy-800/60">
        {step.desc}
      </p>
    </div>
  );
}

export function Method() {
  return (
    <section id="metodo" className="scroll-mt-16 bg-teal-mist">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14 lg:px-8 lg:py-[72px]">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.22em] text-teal-deep/80">
            MI MÉTODO
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy-800 lg:text-[34px]">
            Así trabajo
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-800/70">
            Un proceso claro, práctico y enfocado en resultados.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <ol className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-4">
            {STEPS.map((step, i) => (
              <li key={step.number} className="contents">
                <Step step={step} />
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden justify-center pt-1 text-navy-800/30 lg:flex"
                  >
                    <ArrowRight className="size-5" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
