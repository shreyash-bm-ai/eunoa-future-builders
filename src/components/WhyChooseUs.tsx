import { Card } from "@/components/ui/card";
import { Award, Users, Target, Zap } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Industry Experts",
    description: "Learn from professionals working at major tech companies like Google, Microsoft, and leading startups"
  },
  {
    icon: Target,
    title: "Career-Focused",
    description: "Not just theory - we prepare students for real tech careers with hands-on projects and mentorship"
  },
  {
    icon: Zap,
    title: "Efficient Learning",
    description: "Our proven methodology helps students grasp complex concepts quickly and retain them long-term"
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description: "Personalized attention with small class sizes ensuring every student gets the support they need"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose Eunoa?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're not just another coding class - we're building the next generation of tech leaders
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card 
                key={index}
                className="p-8 hover:shadow-custom-xl transition-all duration-300 bg-gradient-card border-border animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-card-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
