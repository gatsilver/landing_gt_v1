"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
} from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/* Contexto: cualquier botón "Agenda una llamada" abre el mismo diálogo */
/* ------------------------------------------------------------------ */

type AgendaContextValue = {
  open: (interest?: string) => void;
  close: () => void;
};

const AgendaContext = createContext<AgendaContextValue | null>(null);

export function useAgenda() {
  const ctx = useContext(AgendaContext);
  if (!ctx) throw new Error("useAgenda debe usarse dentro de <AgendaProvider>");
  return ctx;
}

export function AgendaProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState<string | undefined>(undefined);

  const openAgenda = useCallback((i?: string) => {
    setInterest(i);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <AgendaContext.Provider value={{ open: openAgenda, close }}>
      {children}
      <AgendaDialog open={open} onOpenChange={setOpen} interest={interest} />
    </AgendaContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Diálogo                                                             */
/* ------------------------------------------------------------------ */

function AgendaDialog({
  open,
  onOpenChange,
  interest,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  interest?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="max-h-[92dvh] gap-0 overflow-hidden rounded-2xl border-line p-0 sm:max-w-3xl"
      >
        <div className="max-h-[92dvh] overflow-y-auto">
          <header className="flex items-start justify-between gap-4 bg-navy-800 px-5 py-5 text-white sm:px-7">
            <div>
              <p className="text-[10px] font-bold tracking-[0.28em] text-teal-accent">
                AGENDA
              </p>
              <DialogTitle className="mt-1.5 font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                Agenda una llamada
              </DialogTitle>
              <p className="mt-1.5 max-w-xs text-[12.5px] leading-relaxed text-white/70">
                Elige el día y la hora que mejor te funcione y cuéntame de tu
                negocio.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                aria-hidden
                className="font-script text-4xl leading-none text-gold-300 [-rotate-6] sm:text-5xl"
              >
                Gabino
              </span>
              <DialogClose className="flex size-8 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:bg-white/10 hover:text-white">
                <span className="text-lg leading-none">&times;</span>
                <span className="sr-only">Cerrar</span>
              </DialogClose>
            </div>
          </header>

          {/* Radix desmonta el contenido al cerrar: cada apertura
              empieza un flujo limpio */}
          <AgendaWidget interest={interest} compact={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Widget: calendario pequeño + horarios + formulario de contacto      */
/* ------------------------------------------------------------------ */

const WEEKDAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"];
const TIME_SLOTS = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];

const monthFormatter = new Intl.DateTimeFormat("es-CO", {
  month: "long",
  year: "numeric",
});
const dayFormatter = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

/** Matriz del mes (semanas que empiezan en lunes). */
function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // 0 = lunes
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function slotPassed(date: Date, slot: string) {
  const [h, m] = slot.split(":").map(Number);
  const slotDate = new Date(date);
  slotDate.setHours(h, m, 0, 0);
  return slotDate.getTime() < Date.now() + 30 * 60 * 1000; // margen de 30 min
}

type Status = "idle" | "submitting" | "success" | "error";

export function AgendaWidget({
  interest,
  compact = true,
}: {
  interest?: string;
  compact?: boolean;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(
    interest ? `Me interesa el servicio: ${interest}.` : ""
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const grid = useMemo(() => buildMonthGrid(cursor.year, cursor.month), [cursor]);
  const isCurrentMonth =
    cursor.year === today.getFullYear() && cursor.month === today.getMonth();

  const canPrev = !isCurrentMonth;

  const shiftMonth = (dir: 1 | -1) => {
    setCursor((c) => {
      const d = new Date(c.year, c.month + dir, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const pickDate = (d: Date) => {
    if (d < today) return;
    setSelectedDate(d);
    // Si la hora elegida ya no aplica para el nuevo día, se limpia
    if (selectedTime && d.getTime() === today.getTime() && slotPassed(d, selectedTime)) {
      setSelectedTime(null);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setStatus("error");
      setErrorMsg("Elige un día y una hora disponibles.");
      return;
    }
    if (name.trim().length < 2) {
      setStatus("error");
      setErrorMsg("Escribe tu nombre.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      setErrorMsg("Revisa tu correo electrónico.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      const res = await fetch("/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
          message: message.trim() || null,
          date: `${yyyy}-${mm}-${dd}`,
          time: selectedTime,
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(
        "No pudimos registrar tu solicitud. Inténtalo de nuevo en unos segundos."
      );
    }
  };

  const reset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setCompany("");
    setMessage(interest ? `Me interesa el servicio: ${interest}.` : "");
    setStatus("idle");
    setErrorMsg("");
  };

  /* ----------------------- Estado de éxito ----------------------- */
  if (status === "success") {
    return (
      <div className="bg-white px-5 py-10 text-center sm:px-7">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-teal-mist text-teal-deep">
          <CheckCircle2 className="size-7" strokeWidth={1.8} aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl font-extrabold text-navy-800">
          {name.trim().split(" ")[0]}, tu llamada quedó agendada
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-navy-800/65">
          Te contactaré para confirmar. Guarda estos datos:
        </p>
        <div className="mx-auto mt-5 flex max-w-sm flex-col items-stretch gap-2 sm:flex-row sm:justify-center">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-[12.5px] font-semibold text-navy-800">
            <CalendarDays className="size-4 text-teal-deep" aria-hidden />
            {selectedDate
              ? dayFormatter.format(selectedDate).replace(/^\w/, (c) => c.toUpperCase())
              : ""}
          </span>
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-[12.5px] font-semibold text-navy-800">
            <Clock className="size-4 text-teal-deep" aria-hidden />
            {selectedTime} h
          </span>
        </div>
        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-navy-800/30 px-5 py-2.5 text-[13px] font-semibold text-navy-800 transition hover:bg-navy-800 hover:text-white"
          >
            Agendar otra llamada
          </button>
        </div>
        <p className="mt-5 text-[11px] text-navy-800/45">
          Sin compromiso · 100% confidencial
        </p>
      </div>
    );
  }

  /* ------------------------ Flujo principal ----------------------- */
  return (
    <div className="grid lg:grid-cols-2">
      {/* Columna 1: calendario + horarios */}
      <section
        aria-label="Elige día y hora"
        className="border-b border-line bg-white p-5 sm:p-6 lg:border-b-0 lg:border-r"
      >
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-navy-800/50">
          <span className="flex size-5 items-center justify-center rounded-full bg-navy-800 text-[10px] text-white">
            1
          </span>
          ELIGE DÍA Y HORA
        </p>

        {/* Calendario pequeño */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-bold text-navy-800">
              {monthFormatter
                .format(new Date(cursor.year, cursor.month, 1))
                .replace(/^\w/, (c) => c.toUpperCase())}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={!canPrev}
                aria-label="Mes anterior"
                className="flex size-7 items-center justify-center rounded-full border border-line text-navy-800/70 transition enabled:hover:bg-cream disabled:opacity-30"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Mes siguiente"
                className="flex size-7 items-center justify-center rounded-full border border-line text-navy-800/70 transition hover:bg-cream"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-1 text-center" role="grid">
            {WEEKDAY_LABELS.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="pb-1 text-[10px] font-bold tracking-wide text-navy-800/40"
              >
                {w}
              </span>
            ))}
            {grid.map((date, i) => {
              if (!date) return <span key={`empty-${i}`} aria-hidden />;
              const disabled = date < today;
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
              const isToday = isSameDay(date, today);
              return (
                <span key={date.toISOString()} className="flex justify-center">
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => pickDate(date)}
                    aria-label={dayFormatter.format(date)}
                    aria-pressed={isSelected}
                    className={`flex size-8 items-center justify-center rounded-full text-[12px] transition ${
                      isSelected
                        ? "bg-gold-400 font-bold text-navy-900 shadow-[0_2px_8px_rgba(214,176,112,0.45)]"
                        : disabled
                          ? "cursor-not-allowed text-navy-800/25"
                          : "text-navy-800/80 hover:bg-teal-mist"
                    } ${isToday && !isSelected ? "ring-1 ring-navy-800/40" : ""}`}
                  >
                    {date.getDate()}
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Horarios */}
        <div className="mt-5">
          <p className="text-[10.5px] font-bold tracking-[0.18em] text-navy-800/50">
            HORARIOS DISPONIBLES {selectedDate ? "" : "— ELIGE UN DÍA"}
          </p>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => {
              const disabled =
                !selectedDate ||
                (selectedDate.getTime() === today.getTime() &&
                  slotPassed(selectedDate, slot));
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSelectedTime(slot)}
                  aria-pressed={isSelected}
                  className={`rounded-full border px-2 py-2 text-[12px] font-semibold transition ${
                    isSelected
                      ? "border-navy-800 bg-navy-800 text-white"
                      : disabled
                        ? "cursor-not-allowed border-line text-navy-800/30"
                        : "border-line text-navy-800/80 hover:border-navy-800/40 hover:bg-cream"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Columna 2: formulario de contacto */}
      <section aria-label="Tus datos" className="bg-cream p-5 sm:p-6">
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-navy-800/50">
          <span className="flex size-5 items-center justify-center rounded-full bg-navy-800 text-[10px] text-white">
            2
          </span>
          TUS DATOS
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3.5" noValidate>
          <div>
            <label
              htmlFor="agenda-name"
              className="mb-1 block text-[11.5px] font-semibold text-navy-800/80"
            >
              Nombre *
            </label>
            <Input
              id="agenda-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              className="h-10 rounded-lg border-line bg-white text-[13px]"
            />
          </div>
          <div>
            <label
              htmlFor="agenda-email"
              className="mb-1 block text-[11.5px] font-semibold text-navy-800/80"
            >
              Correo *
            </label>
            <Input
              id="agenda-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              className="h-10 rounded-lg border-line bg-white text-[13px]"
            />
          </div>
          <div>
            <label
              htmlFor="agenda-company"
              className="mb-1 block text-[11.5px] font-semibold text-navy-800/80"
            >
              Empresa o cargo (opcional)
            </label>
            <Input
              id="agenda-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Ej. Dueño de tienda · Sector retail"
              autoComplete="organization"
              className="h-10 rounded-lg border-line bg-white text-[13px]"
            />
          </div>
          <div>
            <label
              htmlFor="agenda-message"
              className="mb-1 block text-[11.5px] font-semibold text-navy-800/80"
            >
              ¿Qué quieres resolver? (opcional)
            </label>
            <Textarea
              id="agenda-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Cuéntame brevemente tu situación…"
              rows={compact ? 2 : 3}
              className="resize-none rounded-lg border-line bg-white text-[13px]"
            />
          </div>

          {status === "error" && errorMsg && (
            <p role="alert" className="text-[12px] font-semibold text-red-700">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 px-6 py-3 text-sm font-bold text-navy-900 shadow-[0_2px_12px_rgba(0,0,0,0.18)] transition duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Confirmando…
              </>
            ) : (
              "Confirmar mi llamada"
            )}
          </button>
          <p className="text-center text-[10.5px] leading-relaxed text-navy-800/45">
            Sin compromiso · Tus datos solo se usan para coordinar la llamada.
          </p>
        </form>
      </section>
    </div>
  );
}
