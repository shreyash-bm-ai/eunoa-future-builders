import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VALUE_CARDS } from "@/config/site.config";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onChatOpen?: () => void;
  onReportOpen?: () => void;
  onMeetOpen?: () => void;
  onRegisterOpen?: () => void;
};

export function BottomSection({
  onChatOpen,
  onReportOpen,
  onMeetOpen,
  onRegisterOpen,
}: Props) {
  const handlers: Record<string, (() => void) | undefined> = {
    chat: onChatOpen,
    report: onReportOpen,
    meet: onMeetOpen,
    register: onRegisterOpen,
  };

  return (
    <section
      id="get-started"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(262 52% 47% / 0.04) 0%, hsl(188 94% 55% / 0.04) 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-hero text-white px-5 py-2 rounded-full text-sm font-semibold shadow-custom-lg">
            <Zap className="w-4 h-4" />
            Everything You Need, Right Here
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Your Child's Journey Starts Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore programs, meet the team, discover your child's superpower — or just say hi. We're here for all of it.
          </p>
        </div>

        {/* Value cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {VALUE_CARDS.map((card, i) => (
            <Card
              key={card.title}
              className={cn(
                "p-6 flex flex-col gap-4 border bg-gradient-to-br hover:shadow-custom-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-scale-in group",
                card.color
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => handlers[card.ctaAction]?.()}
            >
              <div className="text-4xl">{card.icon}</div>
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-foreground text-lg">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all">
                {card.cta}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>

        {/* Final CTA banner */}
        <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center text-white shadow-custom-xl animate-fade-in-up">
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            Give Your Child a Head Start 🚀
          </h3>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Join hundreds of Indian families who are building their children's future with Eunoa. Your first session is completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-base shadow-lg"
              onClick={onRegisterOpen}
            >
              Register Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 font-semibold text-base"
              onClick={onChatOpen}
            >
              Chat With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
