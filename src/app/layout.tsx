import type { Metadata } from "next";
import { Inter, Lora, Marcellus, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const delafield = Mrs_Saint_Delafield({
  variable: "--font-delafield",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gabino | Transformación empresarial con propósito",
  description:
    "Acompaño a dueños, líderes y equipos a ordenar su negocio, tomar mejores decisiones y crecer de forma más clara y sostenible.",
  keywords: [
    "consultoría",
    "transformación empresarial",
    "MIPYMES",
    "estrategia",
    "procesos",
    "Gabino",
  ],
  openGraph: {
    title: "Gabino | Transformación empresarial con propósito",
    description:
      "Haz crecer tu negocio con estrategia, orden y enfoque.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} ${marcellus.variable} ${delafield.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
