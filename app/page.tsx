import { BootLoader } from "@/components/BootLoader";
import { Builder } from "@/components/Builder";
import { Dock } from "@/components/Dock";
import { Hero } from "@/components/Hero";
import { Nav, ProgressRail } from "@/components/Nav";
import { AboutSection, ContactSection, RecordSection, WorkSection } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <BootLoader />
      <ProgressRail />
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        <RecordSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Dock />
      <Builder />
    </>
  );
}
