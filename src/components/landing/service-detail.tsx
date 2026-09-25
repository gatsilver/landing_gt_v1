"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  ClipboardList,
  Compass,
  FileText,
  Layers,
  MessageSquareText,
  Repeat2,
  Rocket,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { CtaButton } from "./cta-button";
import { Reveal } from "./reveal";
import { SERVICE_CARDS, type ServiceId } from "./services";
import { useAgenda } from "./agenda";

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const SERVICE_META: Record<
  ServiceId,
  { meta: { icon: typeof Users; label: string; value: string }[] }
> = {
  consultoria: {
    meta: [
      { icon: MessageSquareText, label: "Modalidad", value: "Sesiones 1-a-1 · Presencial u online" },
      { icon: CalendarClock, label: "Ritmo", value: "Ciclos de 8 a 12 semanas" },
      { icon: Users, label: "Para", value: "Dueños, gerentes y líderes" },
    ],
  },
  procesos: {
    meta: [
      { icon: Users, label: "Modalidad", value: "Trabajo con el equipo núcleo" },
      { icon: CalendarClock, label: "Duración", value: "Proyectos de 6 a 10 semanas" },
      { icon: Layers, label: "Para", value: "Operación, ventas y administración" },
    ],
  },
  talleres: {
    meta: [
      { icon: CalendarClock, label: "Duración", value: "Sesiones de 90 min a medio día" },
      { icon: Users, label: "Modalidad", value: "Presencial, online o híbrida" },
      { icon: Target, label: "Para", value: "Equipos completos o áreas específicas" },
    ],
  },
};

const INCLUDES: Record<ServiceId, { icon: typeof Search; text: string }[]> = {
  consultoria: [
    { icon: Search, text: "Diagnóstico 360° del negocio" },
    { icon: FileText, text: "Plan de prioridades de 90 días" },
    { icon: MessageSquareText, text: "Sesiones semanales de decisión" },
    { icon: BarChart3, text: "Tablero simple de seguimiento" },
  ],
  procesos: [
    { icon: Search, text: "Mapa del flujo actual de trabajo" },
    { icon: ClipboardList, text: "Procesos rediseñados y documentados" },
    { icon: Users, text: "Roles claros y acuerdos de equipo" },
    { icon: Repeat2, text: "Rutinas cortas de medición" },
  ],
  talleres: [
    { icon: Search, text: "Diagnóstico de necesidades del equipo" },
    { icon: Layers, text: "Módulos prácticos a la medida" },
    { icon: ClipboardList, text: "Herramientas listas para usar" },
    { icon: TrendingUp, text: "Seguimiento después de cada sesión" },
  ],
};

const FIT: Record<
  ServiceId,
  { yes: string[]; no: string[] }
> = {
  consultoria: {
    yes: [
      "Tu negocio creció y el orden no lo acompañó.",
      "Sientes que todo pasa por ti y quieres salir del cuello de botella.",
      "Quieres decidir con prioridades claras, no con urgencias.",
    ],
    no: [
      "Buscas una solución mágica sin involucrarte.",
      "Prefieres un informe que nadie va a ejecutar.",
    ],
  },
  procesos: {
    yes: [
      "El trabajo se repite, se traba o se pierde entre manos.",
      "Cada persona opera a su manera y nadie sabe cuál es la oficial.",
      "Quieres que el negocio funcione aunque no estés presente.",
    ],
    no: [
      "Quieres burocracia y manuales que nadie lee.",
      "Esperas cambiar procesos sin cambiar hábitos.",
    ],
  },
  talleres: {
    yes: [
      "Tu equipo necesita hablar el mismo idioma.",
      "Hay buenas ideas pero poca ejecución.",
      "Buscas sesiones prácticas, no conferencias motivacionales.",
    ],
    no: [
      "Quieres un evento de un día y ya.",
      "El equipo asiste obligado y sin agenda propia.",
    ],
  },
};

/* Ruta de consultoría: 4 movimientos */
const ROUTE = [
  {
    icon: Search,
    title: "Diagnóstico 360°",
    desc: "Revisamos números, procesos y equipo para ver el negocio completo, sin maquillaje.",
    deliverable: "Mapa de situación con hallazgos priorizados",
  },
  {
    icon: Target,
    title: "Plan de prioridades",
    desc: "Definimos las 3 apuestas que mueven la aguja y dejamos el resto para después.",
    deliverable: "Plan de 90 días con responsables y fechas",
  },
  {
    icon: MessageSquareText,
    title: "Acompañamiento ejecutivo",
    desc: "Sesiones semanales para decidir, ajustar y ejecutar con foco, siempre con base en el plan.",
    deliverable: "Agenda de decisiones y acuerdos semanales",
  },
  {
    icon: BarChart3,
    title: "Revisión y escala",
    desc: "Medimos avances, consolidamos lo que funciona y preparamos el siguiente salto.",
    deliverable: "Tablero de resultados y hoja de ruta siguiente",
  },
];

const BEFORE_AFTER = [
  {
    before: "Decisiones tomadas a base de urgencias del día a día.",
    after: "Decisiones basadas en prioridades claras y un plan.",
  },
  {
    before: "Todo pasa por ti, sin espacio para pensar el negocio.",
    after: "Una rutina semanal de enfoque, delegación y seguimiento.",
  },
  {
    before: "Crecimiento por esfuerzo, no por diseño.",
    after: "Crecimiento con orden, métricas y visión de largo plazo.",
  },
];

const FLOW = [
  { icon: Search, title: "Diagnóstico", desc: "Recorremos el flujo actual y sus cuellos de botella." },
  { icon: ClipboardList, title: "Rediseño", desc: "Simplificamos: menos pasos, menos papeles, menos dudas." },
  { icon: Rocket, title: "Implementación", desc: "Lo ponemos en marcha con el equipo, en su idioma." },
  { icon: Repeat2, title: "Medición", desc: "Rutinas cortas para mantener el flujo vivo y mejorando." },
];

const FLOW_TABLE = [
  { before: "Cada quien trabaja como puede.", after: "Roles y responsables claros." },
  { before: "Se improvisa y se repite trabajo.", after: "Procesos documentados y simples." },
  { before: "Reuniones sin acuerdos ni seguimiento.", after: "Rituales cortos con indicadores visibles." },
];

const FORMATS = [
  {
    id: "presencial",
    label: "Presencial",
    detail: "Sesiones de 3 a 4 horas en tu empresa, con ejercicios sobre casos reales del equipo.",
  },
  {
    id: "online",
    label: "Online",
    detail: "Series de 4 a 6 sesiones de 90 minutos, con materiales y retos entre encuentros.",
  },
  {
    id: "hibrido",
    label: "Híbrido",
    detail: "Sesiones presenciales clave + acompañamiento online entre sesiones para no perder impulso.",
  },
] as const;

const MODULES = [
  { title: "Liderazgo con propósito", desc: "De jefe a líder: dirección clara y ejemplo visible." },
  { title: "Priorización y foco", desc: "Cómo decidir qué importa y soltar lo que distrae." },
  { title: "Delegación efectiva", desc: "Entregar tareas sin perder control ni calidad." },
  { title: "Comunicación que alinea", desc: "Mensajes claros, reuniones cortas y acuerdos que se cumplen." },
  { title: "Indicadores simples", desc: "Los números mínimos que todo equipo debe mirar cada semana." },
  { title: "Cultura de resultados", desc: "Hábitos que sostienen el orden después del taller." },
];

/* ------------------------------------------------------------------ */
/* Bloques innovadores por servicio                                    */
/* ------------------------------------------------------------------ */

/** 1 · Consultoría: ruta interactiva en 4 movimientos + antes/después */
function ConsultoriaBlock() {
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
      <div>
        <h3 className="font-display text-xl font-extrabold text-navy-800 sm:text-2xl">
          La ruta en 4 movimientos
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-navy-800/65">
          Un ciclo claro, sin sorpresas. Toca cada movimiento para ver qué
          pasa y qué recibes.
        </p>

        <ol className="mt-6 space-y-2.5">
          {ROUTE.map((phase, i) => {
            const open = openPhase === i;
            return (
              <li key={phase.title}>
                <div
                  className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                    open ? "border-teal-deep/40 bg-white shadow-md" : "border-line bg-white/70"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenPhase(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center gap-3.5 px-4 py-3.5 text-left"
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold transition-colors duration-300 ${
                        open ? "bg-teal-deep text-white" : "bg-teal-mist text-teal-deep"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14.5px] font-bold text-navy-800">
                        {phase.title}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className={`size-4 text-teal-deep transition-transform duration-300 ${open ? "rotate-90" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-line/70 px-4 pb-4 pt-3.5 sm:pl-[68px]">
                      <p className="text-[13px] leading-relaxed text-navy-800/70">
                        {phase.desc}
                      </p>
                      <p className="mt-2.5 inline-flex items-start gap-2 rounded-lg bg-teal-mist px-3 py-2 text-[12px] font-semibold text-teal-deep">
                        <ClipboardList className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                        Entregable: {phase.deliverable}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="font-display text-xl font-extrabold text-navy-800 sm:text-2xl">
          El cambio que vas a notar
        </h3>
        <div className="mt-5 space-y-3">
          {BEFORE_AFTER.map((row) => (
            <div
              key={row.before}
              className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]"
            >
              <div className="rounded-lg border border-line bg-white/80 px-4 py-3">
                <p className="text-[10px] font-bold tracking-[0.18em] text-navy-800/40">
                  HOY
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-navy-800/70">
                  {row.before}
                </p>
              </div>
              <span className="hidden items-center justify-center text-teal-deep sm:flex" aria-hidden>
                <ArrowRight className="size-4" />
              </span>
              <div className="rounded-lg border border-teal-deep/30 bg-teal-mist/60 px-4 py-3">
                <p className="text-[10px] font-bold tracking-[0.18em] text-teal-deep">
                  CON ACOMPAÑAMIENTO
                </p>
                <p className="mt-1 text-[12.5px] font-medium leading-snug text-navy-800">
                  {row.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 2 · Procesos: flujo visual + tabla antes/después */
function ProcesosBlock() {
  return (
    <div>
      <div className="text-center">
        <h3 className="font-display text-xl font-extrabold text-navy-800 sm:text-2xl">
          Del caos al flujo
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-[13.5px] leading-relaxed text-navy-800/65">
          No entregamos un manual: reconstruimos la forma de trabajar junto al
          equipo, en cuatro tiempos.
        </p>
      </div>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-2">
        {FLOW.map((step, i) => (
          <li key={step.title} className="contents">
            <div className="flex flex-col items-center rounded-xl border border-line bg-white px-4 py-6 text-center shadow-[0_1px_3px_rgba(14,42,61,0.05)]">
              <span className="flex size-12 items-center justify-center rounded-full bg-teal-mist text-teal-deep">
                <step.icon className="size-5" strokeWidth={1.7} aria-hidden />
              </span>
              <p className="mt-3 text-[13.5px] font-bold text-navy-800">
                {step.title}
              </p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-navy-800/60">
                {step.desc}
              </p>
            </div>
            {i < FLOW.length - 1 && (
              <span
                aria-hidden
                className="hidden rotate-90 items-center justify-center text-navy-800/30 lg:flex lg:rotate-0"
              >
                <ArrowRight className="size-5" />
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Tabla antes / después */}
      <div className="mt-8 overflow-hidden rounded-xl border border-line bg-white">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-line bg-cream px-4 py-2.5 sm:gap-4 sm:px-6">
          <p className="text-[10.5px] font-bold tracking-[0.18em] text-navy-800/45">
            ANTES
          </p>
          <span className="w-6" aria-hidden />
          <p className="text-[10.5px] font-bold tracking-[0.18em] text-teal-deep">
            DESPUÉS
          </p>
        </div>
        {FLOW_TABLE.map((row) => (
          <div
            key={row.before}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-line/60 px-4 py-3.5 last:border-b-0 sm:gap-4 sm:px-6"
          >
            <p className="text-[12.5px] leading-snug text-navy-800/60">
              {row.before}
            </p>
            <span
              aria-hidden
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-mist text-teal-deep"
            >
              <ArrowRight className="size-3.5" />
            </span>
            <p className="text-[12.5px] font-medium leading-snug text-navy-800">
              {row.after}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 3 · Talleres: formatos interactivos + programa módulo a módulo */
function TalleresBlock() {
  const [format, setFormat] = useState<(typeof FORMATS)[number]["id"]>("presencial");
  const active = FORMATS.find((f) => f.id === format) ?? FORMATS[0];

  return (
    <div>
      <div className="text-center">
        <h3 className="font-display text-xl font-extrabold text-navy-800 sm:text-2xl">
          El programa, sesión a sesión
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-[13.5px] leading-relaxed text-navy-800/65">
          Módulos independientes que se combinan según lo que tu equipo
          necesita. Elige el formato y arma tu serie.
        </p>
      </div>

      {/* Selector de formato */}
      <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3">
        <div
          role="tablist"
          aria-label="Formato del taller"
          className="flex w-full justify-center gap-1.5 rounded-full border border-line bg-white p-1.5"
        >
          {FORMATS.map((f) => (
            <button
              key={f.id}
              role="tab"
              type="button"
              aria-selected={format === f.id}
              onClick={() => setFormat(f.id)}
              className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-[12.5px] font-bold transition ${
                format === f.id
                  ? "bg-navy-800 text-white shadow"
                  : "text-navy-800/60 hover:bg-cream hover:text-navy-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="min-h-10 rounded-lg bg-teal-mist/60 px-4 py-2.5 text-center text-[12.5px] leading-relaxed text-navy-800/80">
          {active.detail}
        </p>
      </div>

      {/* Módulos */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m, i) => (
          <article
            key={m.title}
            className="group rounded-xl border border-line bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-teal-deep/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold text-teal-deep/35 transition-colors group-hover:text-teal-deep/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-cream text-teal-deep transition group-hover:bg-teal-mist">
                <Check className="size-4" aria-hidden />
              </span>
            </div>
            <h4 className="mt-2 text-[14px] font-bold text-navy-800">{m.title}</h4>
            <p className="mt-1 text-[12px] leading-relaxed text-navy-800/60">
              {m.desc}
            </p>
          </article>
        ))}
      </div>

      {/* Ritmo 3×1 */}
      <div className="mt-8 rounded-xl bg-navy-800 px-5 py-6 text-center text-white sm:px-8">
        <p className="text-[10.5px] font-bold tracking-[0.24em] text-gold-300">
          EL RITMO DE CADA SESIÓN
        </p>
        <p className="mt-2.5 font-display text-lg font-extrabold sm:text-xl">
          3 × 1:{" "}
          <span className="font-semibold text-white/85">
            1 concepto clave · 1 herramienta práctica · 1 compromiso accionable
          </span>
        </p>
        <p className="mx-auto mt-2.5 max-w-md text-[12.5px] leading-relaxed text-white/65">
          Nada de teoría suelta: cada sesión termina con algo concreto que el
          equipo aplica la misma semana.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vista completa                                                      */
/* ------------------------------------------------------------------ */

export function ServiceDetail({
  serviceId,
  onBack,
}: {
  serviceId: ServiceId;
  onBack: () => void;
}) {
  const { open } = useAgenda();
  const card = SERVICE_CARDS.find((c) => c.id === serviceId)!;
  const meta = SERVICE_META[serviceId];
  const includes = INCLUDES[serviceId];
  const fit = FIT[serviceId];

  return (
    <article aria-label={`Detalle del servicio: ${card.title}`}>
      {/* Hero del servicio */}
      <section className="relative overflow-hidden bg-navy-800 text-white">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 size-96 rounded-full bg-teal-accent/10 blur-[90px]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-10">
          {/* Migas + volver */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[12.5px] font-semibold text-white/85 transition hover:border-white/60 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden
              />
              Volver a inicio
            </button>
            <nav aria-label="Miga de pan">
              <p className="text-[11.5px] text-white/55">
                Inicio <span className="mx-1.5 text-white/30">/</span> Servicios
                <span className="mx-1.5 text-white/30">/</span>
                <span className="text-teal-accent">{card.title}</span>
              </p>
            </nav>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.24em] text-teal-accent">
                {serviceId === "consultoria" && "SERVICIO 01 · CONSULTORÍA"}
                {serviceId === "procesos" && "SERVICIO 02 · PROCESOS Y EQUIPOS"}
                {serviceId === "talleres" && "SERVICIO 03 · TALLERES"}
              </p>
              <h1
                tabIndex={-1}
                className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[42px]"
              >
                {card.title}
              </h1>
              <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-white/80">
                {card.desc}{" "}
                {serviceId === "consultoria" &&
                  "Un espacio de trabajo 1-a-1 para ordenar el negocio, priorizar lo que importa y decidir con claridad."}
                {serviceId === "procesos" &&
                  "Menos improvisación, menos retrabajo: una operación que fluye y un equipo que sabe qué le toca."}
                {serviceId === "talleres" &&
                  "Nada de charlas motivacionales: herramientas que el equipo usa desde la primera sesión."}
              </p>

              <ul className="mt-6 space-y-2.5">
                {meta.meta.map((m) => (
                  <li key={m.label} className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-teal-accent">
                      <m.icon className="size-4" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="text-[12.5px] text-white/80">
                      <span className="font-bold text-white">{m.label}: </span>
                      {m.value}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-2xl bg-teal-accent/10 blur-2xl"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-navy-950/50">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            {serviceId === "consultoria" && <ConsultoriaBlock />}
            {serviceId === "procesos" && <ProcesosBlock />}
            {serviceId === "talleres" && <TalleresBlock />}
          </Reveal>

          {/* Qué incluye + para quién */}
          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <h3 className="font-display text-xl font-extrabold text-navy-800 sm:text-2xl">
                Qué incluye
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3 rounded-xl border border-line bg-white p-4"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-mist text-teal-deep">
                      <item.icon className="size-4" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="text-[13px] font-medium leading-snug text-navy-800/85">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="font-display text-xl font-extrabold text-navy-800 sm:text-2xl">
                ¿Es para ti?
              </h3>
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-teal-deep/30 bg-teal-mist/50 p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-teal-deep">
                    <Check className="size-4" aria-hidden />
                    ES PARA TI SI…
                  </p>
                  <ul className="mt-3 space-y-2">
                    {fit.yes.map((y) => (
                      <li
                        key={y}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-navy-800/85"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden />
                        {y}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-line bg-white/80 p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-navy-800/50">
                    <X className="size-4" aria-hidden />
                    NO ES PARA TI SI…
                  </p>
                  <ul className="mt-3 space-y-2">
                    {fit.no.map((n) => (
                      <li
                        key={n}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-navy-800/60"
                      >
                        <X className="mt-0.5 size-4 shrink-0 text-navy-800/40" aria-hidden />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-12 text-white lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              ¿Conversamos sobre tu caso?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-white/70">
              Agenda una llamada sin compromiso: revisamos tu situación y te
              digo, con honestidad, si este servicio es lo que necesitas.
            </p>
            <div className="mt-6 flex justify-center">
              <CtaButton interest={card.title} size="lg" />
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
