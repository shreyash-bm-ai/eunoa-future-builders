import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { signUpWithEmail, signInWithEmail } from "@/lib/supabase";
import { Loader2, Sparkles, User, Mail, Phone, BookOpen, Lock } from "lucide-react";

type Mode = "login" | "register";

type Props = {
  onSuccess?: () => void;
  compact?: boolean;
};

export function RegistrationCard({ onSuccess, compact = false }: Props) {
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("register");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    parentName: "",
    phone: "",
    childName: "",
    childGrade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        await signUpWithEmail(form.email, form.password, {
          parent_name: form.parentName,
          phone: form.phone,
          child_name: form.childName,
          child_grade: form.childGrade,
        });
        toast({
          title: "Welcome to Eunoa! 🎉",
          description: "Check your email to verify, then you're all set.",
        });
      } else {
        await signInWithEmail(form.email, form.password);
        toast({ title: "Welcome back! 👋", description: "You're now signed in." });
      }
      onSuccess?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast({ title: "Oops!", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className={`bg-gradient-to-br from-white to-purple-50 border-purple-100 shadow-custom-xl ${compact ? "p-5" : "p-8"}`}
    >
      <div className="space-y-1 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className={`font-bold text-foreground ${compact ? "text-lg" : "text-2xl"}`}>
            {mode === "register" ? "Join Eunoa — It's Free" : "Welcome Back!"}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm pl-10">
          {mode === "register"
            ? "Create an account to unlock the chatbot, child report, and more."
            : "Sign in to continue your journey."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "register" && (
          <>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="parentName" className="text-sm flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Parent's Name
                </Label>
                <Input
                  id="parentName"
                  name="parentName"
                  value={form.parentName}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="bg-white"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="childName" className="text-sm flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Child's Name
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  value={form.childName}
                  onChange={handleChange}
                  placeholder="Child's name"
                  required
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="childGrade" className="text-sm flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Grade
                </Label>
                <Input
                  id="childGrade"
                  name="childGrade"
                  value={form.childGrade}
                  onChange={handleChange}
                  placeholder="e.g. Grade 7"
                  required
                  className="bg-white"
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="bg-white"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            minLength={6}
            className="bg-white"
          />
        </div>

        <Button
          type="submit"
          variant="hero"
          className="w-full mt-2"
          disabled={loading}
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait...</>
          ) : mode === "register" ? (
            "Create Free Account →"
          ) : (
            "Sign In →"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        {mode === "register" ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "register" ? "login" : "register")}
          className="text-primary font-medium hover:underline"
        >
          {mode === "register" ? "Sign in" : "Register free"}
        </button>
      </p>
    </Card>
  );
}
