import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import WhyChooseUs from "@/components/WhyChooseUs";
import Founders from "@/components/Founders";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <WhyChooseUs />
      <Founders />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
