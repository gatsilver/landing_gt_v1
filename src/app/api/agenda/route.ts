import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Cuerpo inválido" },
        { status: 400 }
      );
    }

    const { name, email, company, message, date, time } = body as Record<
      string,
      unknown
    >;

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      typeof email !== "string" ||
      !EMAIL_RE.test(email.trim()) ||
      typeof date !== "string" ||
      !DATE_RE.test(date) ||
      typeof time !== "string" ||
      !TIME_RE.test(time)
    ) {
      return NextResponse.json(
        { ok: false, error: "Datos incompletos o inválidos" },
        { status: 400 }
      );
    }

    const lead = await db.agendaLead.create({
      data: {
        name: name.trim().slice(0, 120),
        email: email.trim().slice(0, 160),
        company:
          typeof company === "string" && company.trim()
            ? company.trim().slice(0, 160)
            : null,
        message:
          typeof message === "string" && message.trim()
            ? message.trim().slice(0, 1000)
            : null,
        date,
        time,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[/api/agenda] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
