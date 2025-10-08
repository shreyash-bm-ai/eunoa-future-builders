import { Card } from "@/components/ui/card";
import { Code, Cpu, Mic, Rocket, Trophy, Wrench } from "lucide-react";

const skills = [
  {
    icon: Code,
    title: "Coding",
    description: "Master programming fundamentals with Python, JavaScript, and web development",
    color: "text-primary"
  },
  {
    icon: Trophy,
    title: "Competitive Programming",
    description: "Excel in coding competitions and problem-solving with DSA mastery",
    color: "text-accent"
  },
  {
    icon: Cpu,
    title: "Arduino & IoT",
    description: "Build real hardware projects and learn electronics from scratch",
    color: "text-primary"
  },
  {
    icon: Mic,
    title: "Public Speaking",
    description: "Develop confidence and communication skills for presentations",
    color: "text-accent"
  },
  {
    icon: Rocket,
    title: "Full-Stack Development",
    description: "Create complete web applications with modern frameworks and tools",
    color: "text-primary"
  },
  {
    icon: Wrench,
    title: "Project Building",
    description: "Work on real-world projects that go into your portfolio",
    color: "text-accent"
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-card">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Skills That Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We focus on practical skills that prepare students for real careers in tech
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-custom-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up bg-card border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-lg bg-secondary flex items-center justify-center ${skill.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
