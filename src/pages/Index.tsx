import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import { MeetSection } from "@/components/meet/MeetSection";
import { ChildReportPanel } from "@/components/report/ChildReportPanel";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { BottomSection } from "@/components/BottomSection";
import { RegisterSection } from "@/components/auth/RegisterSection";

const Index = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <WhyChooseUs />
      <MeetSection />
      <ChildReportPanel />
      <RegisterSection />
      <BottomSection
        onChatOpen={() => {
          // The chatbot is a fixed widget; scroll to bottom to reveal it
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }}
        onReportOpen={() => scrollTo("child-report")}
        onMeetOpen={() => scrollTo("meet")}
        onRegisterOpen={() => scrollTo("register")}
      />
      <Footer />

      {/* Floating chatbot — always visible */}
      <ChatbotWidget onOpenReport={() => scrollTo("child-report")} />
    </div>
  );
};

export default Index;
