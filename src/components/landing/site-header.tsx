"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CtaButton } from "./cta-button";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "Sobre mí", href: "#sobre-mi", id: "sobre-mi" },
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Método", href: "#metodo", id: "metodo" },
  { label: "Resultados", href: "#resultados", id: "resultados" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: resalta el enlace de la sección visible
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-navy-800 transition-shadow duration-300 ${
        scrolled || open
          ? "border-b border-white/10 shadow-lg shadow-navy-950/30"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-3"
          aria-label="Gabino — inicio"
        >
          <span className="pl-1 font-display text-lg font-semibold tracking-[0.38em] text-white">
            GABINO
          </span>
          <span className="hidden h-6 w-px bg-white/25 sm:block" aria-hidden />
          <span className="hidden text-[10.5px] leading-[1.35] text-white/70 sm:block">
            Transformación empresarial
            <br />
            con propósito
          </span>
        </a>

        {/* Navegación desktop */}
        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`relative pb-1 text-[13px] transition-colors duration-200 ${
                    active === link.id
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gold-400 transition-all duration-300 ${
                      active === link.id ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <CtaButton size="sm" />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex size-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-white/10 bg-navy-900 lg:hidden"
        >
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                    active === link.id
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <CtaButton size="sm" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
