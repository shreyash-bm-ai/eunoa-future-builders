import { useAuth } from "@/context/AuthContext";
import { RegistrationCard } from "./RegistrationCard";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogOut, User } from "lucide-react";

export function RegisterSection() {
  const { isAuthenticated, user, signOut } = useAuth();

  if (isAuthenticated) {
    return (
      <section id="register" className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center space-y-6 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center text-4xl shadow-lg mx-auto">
              🎉
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                You're all set!
              </h2>
              <p className="text-muted-foreground">
                Welcome to Eunoa. You now have full access to the chatbot, child assessment, and all our resources.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-green-800 text-sm">Logged in as</p>
                <p className="text-green-700 text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="hero"
                onClick={() => document.getElementById("child-report")?.scrollIntoView({ behavior: "smooth" })}
              >
                <User className="w-4 h-4 mr-2" /> Open Child Assessment
              </Button>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Join Eunoa — It's Free
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a free account to unlock the chatbot, child assessment, PDF reports, and personalised guidance.
          </p>
        </div>
        <div className="max-w-lg mx-auto animate-scale-in">
          <RegistrationCard />
        </div>
      </div>
    </section>
  );
}
