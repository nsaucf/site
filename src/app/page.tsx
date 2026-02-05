import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/layout/Footer";

import { Join } from "@/components/home/Join";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent font-sans">
      <Hero />
      <Features />
      <Join />
      <Footer />
    </main>
  );
}
