import { Instagram, Linkedin, Youtube } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Método", href: "#metodo" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contacto", href: "#contacto" },
];

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
  { label: "Spotify", href: "https://open.spotify.com", icon: null },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          <span className="font-logo text-lg tracking-[0.35em]">GABINO</span>
          <span className="hidden h-5 w-px bg-white/25 sm:block" aria-hidden />
          <span className="hidden text-[11px] text-white/60 sm:block">
            Transformación empresarial con propósito
          </span>
        </div>

        <nav aria-label="Navegación del pie de página">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2.5">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-full border border-white/25 text-white/80 transition duration-200 hover:border-white/60 hover:bg-white/10 hover:text-white"
              >
                {social.icon ? (
                  <social.icon className="size-3.5" aria-hidden />
                ) : (
                  <SpotifyIcon className="size-4" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
