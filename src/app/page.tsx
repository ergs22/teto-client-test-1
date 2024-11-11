
import UseCase from "@/components/UseCase";
import Experience from "@/components/Experience";
import FAQ from "@/components/FAQ";
import GetNow from "@/components/GetNow";
import NavBar from "@/components/NavBar";
import Heroe from "@/components/Heroe";
import Footer from "@/components/Footer";
import ModalHome from "@/components/ModalHome";
export default function Home() {
  return (
    <section>
      <ModalHome />
      <div>
        <header id="home">
          <NavBar />
          <Heroe />
        </header>
        <div className="py-[5%] w-full bg-hero-2"></div>
        <main className="overflow-hidden">
          <UseCase />
          <Experience />
          <FAQ />
          <GetNow />
        </main>
        <Footer />
      </div>
    </section>
  );
}
