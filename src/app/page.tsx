import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { FinalCta } from "@/sections/FinalCta";
import { Hero } from "@/sections/Hero";
import { Process } from "@/sections/Process";
import { Services } from "@/sections/Services";
import { Structure } from "@/sections/Structure";
import { Testimonials } from "@/sections/Testimonials";
import { TrustBar } from "@/sections/TrustBar";
import { WhyChoose } from "@/sections/WhyChoose";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <WhyChoose />
        <Structure />
        <Process />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
