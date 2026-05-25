import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { RegistrationCard } from "@/components/auth/RegistrationCard";
import {
  REPORT_QUESTIONS,
  CHILD_PROFILES,
} from "@/config/site.config";
import type { ChildProfile } from "@/config/site.config";
import { generateChildReport } from "./PDFReportExport";
import {
  ChevronRight,
  ChevronLeft,
  Download,
  Loader2,
  BarChart2,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Stage = "intro" | "info" | "questions" | "result";

export function ChildReportPanel() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [stage, setStage] = useState<Stage>("intro");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [parentName, setParentName] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [downloading, setDownloading] = useState(false);

  const progress = stage === "questions" ? ((current + 1) / REPORT_QUESTIONS.length) * 100 : 0;

  const computeProfile = (): ChildProfile => {
    const scores: Record<string, number> = {
      creator: 0,
      thinker: 0,
      achiever: 0,
      connector: 0,
      explorer: 0,
    };
    Object.entries(answers).forEach(([qId, val]) => {
      const q = REPORT_QUESTIONS.find((q) => q.id === qId);
      const opt = q?.options.find((o) => o.value === val);
      if (opt) {
        Object.entries(opt.score).forEach(([key, score]) => {
          scores[key] = (scores[key] ?? 0) + score;
        });
      }
    });
    const topId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return CHILD_PROFILES[topId];
  };

  const handleAnswer = (value: string) => {
    const q = REPORT_QUESTIONS[current];
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (current < REPORT_QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      // All questions answered
      const computedAnswers = newAnswers;
      const scores: Record<string, number> = {
        creator: 0, thinker: 0, achiever: 0, connector: 0, explorer: 0,
      };
      Object.entries(computedAnswers).forEach(([qId, val]) => {
        const q = REPORT_QUESTIONS.find((q) => q.id === qId);
        const opt = q?.options.find((o) => o.value === val);
        if (opt) {
          Object.entries(opt.score).forEach(([key, score]) => {
            scores[key] = (scores[key] ?? 0) + score;
          });
        }
      });
      const topId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      setProfile(CHILD_PROFILES[topId]);
      setStage("result");
    }
  };

  const handleDownload = async () => {
    if (!profile) return;
    setDownloading(true);
    try {
      await generateChildReport({
        childName,
        childAge,
        parentName,
        profile,
        answers,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });
      toast({ title: "Report downloaded! 🎉", description: "Check your downloads folder." });
    } catch {
      toast({ title: "Download failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setStage("intro");
    setCurrent(0);
    setAnswers({});
    setProfile(null);
    setChildName("");
    setChildAge("");
    setParentName("");
  };

  return (
    <section id="child-report" className="py-20 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-56 h-56 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
            <ClipboardList className="w-4 h-4" />
            Child Profile Assessment
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Discover Your Child's Superpower
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A 5-minute friendly assessment that reveals how your child learns, thinks, and shines.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Auth gate */}
          {!isAuthenticated && (
            <div className="mb-8">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center mb-6">
                <p className="text-amber-800 font-medium text-sm">
                  🔒 Register for free to unlock the full assessment and get a downloadable PDF report.
                </p>
              </div>
              <RegistrationCard />
            </div>
          )}

          {/* Intro */}
          {stage === "intro" && (
            <Card className="p-8 shadow-custom-xl border-border bg-gradient-card animate-scale-in">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-hero mx-auto flex items-center justify-center text-4xl shadow-lg">
                  🌟
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Child Profile Assessment</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    This is not a test — there are no right or wrong answers! We will ask your child (with your help) 10 simple questions to create their unique profile.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: "🕐", label: "5 Minutes" },
                    { icon: "✅", label: "10 Questions" },
                    { icon: "📄", label: "Free PDF Report" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-secondary rounded-xl">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setStage("info")}
                  disabled={!isAuthenticated}
                  className="w-full"
                >
                  {isAuthenticated ? "Start Assessment →" : "Register to Start →"}
                </Button>
              </div>
            </Card>
          )}

          {/* Info collection */}
          {stage === "info" && (
            <Card className="p-8 shadow-custom-xl border-border bg-gradient-card animate-scale-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Let's start with the basics</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    This helps us personalise your child's report.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="childName">Child's Name *</Label>
                    <Input
                      id="childName"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Aarav"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="childAge">Child's Age *</Label>
                    <Input
                      id="childAge"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="e.g. 12"
                      type="number"
                      min="6"
                      max="18"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="parentName">Your Name (Parent) *</Label>
                    <Input
                      id="parentName"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Ravi Sharma"
                      className="bg-background"
                    />
                  </div>
                </div>
                <Button
                  variant="hero"
                  className="w-full"
                  disabled={!childName.trim() || !childAge.trim() || !parentName.trim()}
                  onClick={() => setStage("questions")}
                >
                  Begin Assessment <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          )}

          {/* Questions */}
          {stage === "questions" && (
            <div className="space-y-4 animate-fade-in">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Question {current + 1} of {REPORT_QUESTIONS.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Card className="p-8 shadow-custom-xl border-border bg-gradient-card">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-3xl">{REPORT_QUESTIONS[current].emoji}</span>
                    <h3 className="text-xl font-bold text-foreground leading-snug">
                      {REPORT_QUESTIONS[current].question}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pick the option that sounds most like {childName || "your child"}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {REPORT_QUESTIONS[current].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full text-left px-5 py-3.5 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 text-sm font-medium group flex items-center justify-between"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>

                  {current > 0 && (
                    <button
                      onClick={() => setCurrent((c) => c - 1)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous question
                    </button>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Result */}
          {stage === "result" && profile && (
            <div className="space-y-5 animate-scale-in">
              <Card className="p-8 shadow-custom-xl border-border overflow-hidden relative">
                <div className={cn(
                  "absolute inset-x-0 top-0 h-2 bg-gradient-to-r",
                  profile.gradient
                )} />
                <div className="space-y-5 pt-2">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-4xl shadow-lg shrink-0",
                      profile.gradient
                    )}>
                      {profile.emoji}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {childName}'s profile is…
                      </p>
                      <h3 className={cn("text-3xl font-bold", profile.color)}>
                        {profile.name}
                      </h3>
                      <p className="text-muted-foreground italic text-sm">
                        "{profile.tagline}"
                      </p>
                    </div>
                  </div>

                  <p className="text-foreground leading-relaxed">{profile.description}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className={cn("w-4 h-4", profile.color)} />
                        <p className="font-semibold text-sm">Top Strengths</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.strengths.map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart2 className={cn("w-4 h-4", profile.color)} />
                        <p className="font-semibold text-sm">Suggested Activities</p>
                      </div>
                      <ul className="space-y-1">
                        {profile.suggestedActivities.slice(0, 3).map((a) => (
                          <li key={a} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-secondary/60 rounded-xl p-4 border border-border">
                    <p className="text-sm font-semibold mb-1">A note for you 🙏</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profile.parentNote}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating PDF...</>
                  ) : (
                    <><Download className="w-4 h-4 mr-2" /> Download Full PDF Report</>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="sm:w-auto"
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
