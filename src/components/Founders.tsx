import { Card } from "@/components/ui/card";
import { Linkedin, Github, Mail } from "lucide-react";

const founders = [
  {
    name: "Founder Name 1",
    role: "Co-Founder & Tech Lead",
    bio: "10+ years at Google, passionate about making coding accessible to young minds",
    funFact: "Built first website at age 12, now helps kids do the same!",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Founder Name 2",
    role: "Co-Founder & Education Director",
    bio: "Former Engineering Manager at Microsoft, believes in learning by doing",
    funFact: "Once taught coding to 100+ students in a single weekend hackathon",
    linkedin: "#",
    github: "#"
  }
];

const Founders = () => {
  return (
    <section className="py-20 bg-gradient-card">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Meet the Founders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tech veterans on a mission to democratize quality tech education
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-custom-xl transition-all duration-300 bg-card border-border animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center text-3xl font-bold text-primary-foreground">
                    {founder.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-card-foreground">
                      {founder.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {founder.role}
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {founder.bio}
                </p>
                
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm font-medium text-accent mb-1">Fun Fact:</p>
                  <p className="text-foreground">{founder.funFact}</p>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <a 
                    href={founder.linkedin}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={founder.github}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="GitHub profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="mailto:founders@eunoa.edu"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Email founders"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
