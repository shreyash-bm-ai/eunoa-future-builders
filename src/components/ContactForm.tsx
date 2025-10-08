import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, Phone, User, Users } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const ContactForm = () => {
  const { toast } = useToast();
  const scrollY = useParallax();
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    grade: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Request Received!",
        description: "Our team will contact you within 24 hours to schedule your free session.",
      });
      setFormData({
        parentName: "",
        email: "",
        phone: "",
        childName: "",
        grade: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const parallaxOffset = (scrollY - 3200) * 0.08;

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div 
          className="text-center space-y-4 mb-16 animate-fade-in"
          style={{
            transform: `translateY(${Math.max(0, parallaxOffset)}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Book Your Free Session
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how we can help your child build the skills for tomorrow
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card 
            className="p-8 md:p-12 shadow-custom-xl bg-gradient-card border-border animate-scale-in"
            style={{
              transform: `translateY(${Math.max(0, parallaxOffset * 0.5)}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentName" className="text-card-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Parent's Name *
                  </Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-card-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-card-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 123-4567"
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="childName" className="text-card-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Child's Name *
                  </Label>
                  <Input
                    id="childName"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                    placeholder="Student's name"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade" className="text-card-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Current Grade *
                </Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 7th Grade"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-card-foreground">
                  What skills is your child interested in? (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your child's interests..."
                  rows={4}
                  className="bg-background border-border resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                variant="hero"
                disabled={isSubmitting}
                className="w-full text-lg"
              >
                {isSubmitting ? "Submitting..." : "Schedule Free Session"}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                By submitting, you agree to be contacted by our team. We respect your privacy.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
