"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { AgendaProvider } from "@/components/landing/agenda";
import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { PainPoints } from "@/components/landing/pain-points";
import { Transformation } from "@/components/landing/transformation";
import { Services, SERVICE_CARDS, type ServiceId } from "@/components/landing/services";
import { Method } from "@/components/landing/method";
import { Audiences } from "@/components/landing/audiences";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { ServiceDetail } from "@/components/landing/service-detail";

const VALID_SERVICES = SERVICE_CARDS.map((s) => s.id);

function parseServiceHash(): ServiceId | null {
  const match = window.location.hash.match(/^#servicio-(\w+)$/);
  const id = match?.[1] as ServiceId | undefined;
  return id && VALID_SERVICES.includes(id) ? id : null;
}

/* El hash de la URL se trata como sistema externo (store):
   popstate/hashchange lo actualizan y pushState/replaceState emiten. */
const hashListeners = new Set<() => void>();

function subscribeToHash(cb: () => void) {
  hashListeners.add(cb);
  window.addEventListener("popstate", cb);
  window.addEventListener("hashchange", cb);
  return () => {
    hashListeners.delete(cb);
    window.removeEventListener("popstate", cb);
    window.removeEventListener("hashchange", cb);
  };
}

function emitHashChange() {
  hashListeners.forEach((cb) => cb());
}

export default function Home() {
  const serviceId = useSyncExternalStore(
    subscribeToHash,
    parseServiceHash,
    () => null
  );
  const scrollYRef = useRef(0);
  const pushedRef = useRef(false);

  /* Si se aterriza directo en #servicio-x, marcamos que el botón
     "Volver" debe usar history.back() */
  useEffect(() => {
    if (parseServiceHash()) pushedRef.current = true;
  }, []);

  const openService = useCallback((id: ServiceId) => {
    scrollYRef.current = window.scrollY;
    pushedRef.current = true;
    window.history.pushState(null, "", `#servicio-${id}`);
    emitHashChange();
    window.scrollTo({ top: 0 });
  }, []);

  const closeService = useCallback(() => {
    if (pushedRef.current) {
      // popstate actualizará el hash-store y cerrará la pestaña
      window.addEventListener(
        "popstate",
        () => window.scrollTo({ top: scrollYRef.current }),
        { once: true }
      );
      window.history.back();
    } else {
      window.history.replaceState(null, "", "#servicios");
      emitHashChange();
      window.scrollTo({ top: 0 });
    }
  }, []);

  /* Con una pestaña de servicio abierta, los enlaces de sección
     regresan a inicio y luego llevan al ancla correspondiente */
  useEffect(() => {
    if (!serviceId) return;
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#servicio-")) return;
      e.preventDefault();
      pushedRef.current = false;
      window.history.replaceState(null, "", href);
      emitHashChange();
      window.setTimeout(() => {
        document
          .getElementById(href.slice(1))
          ?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [serviceId]);

  return (
    <AgendaProvider>
      <div className="flex min-h-screen flex-col bg-cream">
        <SiteHeader />
        {serviceId ? (
          <main className="flex-1">
            <ServiceDetail serviceId={serviceId} onBack={closeService} />
          </main>
        ) : (
          <main className="flex-1">
            <Hero />
            <PainPoints />
            <Transformation />
            <Services onOpen={openService} />
            <Method />
            <Audiences />
            <Testimonials />
            <CtaSection />
          </main>
        )}
        <SiteFooter />
      </div>
    </AgendaProvider>
  );
}
