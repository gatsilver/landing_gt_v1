import type { Metadata } from "next";
import { Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alexbrush",
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
        className={`${montserrat.variable} ${alexBrush.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
