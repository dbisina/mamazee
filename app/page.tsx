import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Story from "@/components/Story";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import AmbientParticles from "@/components/AmbientParticles";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <AmbientParticles />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Categories />
          <FeaturedProducts />
          <Story />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </div>
  );
}
