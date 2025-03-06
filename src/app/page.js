import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Hero from "@/components/homepage/Hero";
import OurPartners from "@/components/homepage/OurPartners";
import StartYourHealthJourney from "@/components/homepage/StartYourHealthJourney";
import TalkToDoctor from "@/components/homepage/TalkToDoctor";
import Testimonials from "@/components/homepage/Testimonials";
import WhychooseCeftifyMed from "@/components/homepage/WhychooseCeftifyMed";

const Homepage = () => {
  return (
    <>
      <div className="bg-[url('/images/hero-bg.png')] bg-cover ">
        <Header />
        <Hero />
      </div>
      <WhychooseCeftifyMed />
      <TalkToDoctor />
      <Testimonials />
      <OurPartners />
      <StartYourHealthJourney />
      <Footer />
    </>
  );
};

export default Homepage;
