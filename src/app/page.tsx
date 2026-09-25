import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { PainPoints } from "@/components/landing/pain-points";
import { Transformation } from "@/components/landing/transformation";
import { Services } from "@/components/landing/services";
import { Method } from "@/components/landing/method";
import { Audiences } from "@/components/landing/audiences";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta";
import { SiteFooter } from "@/components/landing/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <PainPoints />
        <Transformation />
        <Services />
        <Method />
        <Audiences />
        <Testimonials />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
