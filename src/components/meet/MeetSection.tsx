import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TEAM_MEMBERS } from "@/config/site.config";
import { ChevronDown, Linkedin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function MeetSection() {
  const [selectedId, setSelectedId] = useState<string>(TEAM_MEMBERS[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = TEAM_MEMBERS.find((m) => m.id === selectedId) ?? TEAM_MEMBERS[0];

  return (
    <section id="meet" className="py-20 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container px-4 mx-auto relative">
        {/* Section header */}
        <div className="text-center space-y-4 mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
            <Users className="w-4 h-4" />
            The Humans Behind Eunoa
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Educators, technologists, and child-development experts — passionate about unlocking every child's potential.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-[280px,1fr] gap-6 items-start">
          {/* Dropdown selector */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Select a team member
            </p>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-border rounded-xl shadow-sm hover:border-primary/40 transition-colors text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0",
                      selected.color
                    )}
                  >
                    {selected.initials}
                  </div>
                  <span className="text-foreground">{selected.name}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200",
                    dropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute z-20 top-full mt-2 w-full bg-white border border-border rounded-xl shadow-custom-xl overflow-hidden animate-fade-in">
                  {TEAM_MEMBERS.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => {
                        setSelectedId(member.id);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary transition-colors text-left",
                        selectedId === member.id && "bg-primary/5 font-semibold"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0",
                          member.color
                        )}
                      >
                        {member.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick list */}
            <div className="hidden md:flex flex-col gap-2">
              {TEAM_MEMBERS.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedId(member.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                    selectedId === member.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-secondary"
                  )}
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0",
                      member.color
                    )}
                  >
                    {member.initials}
                  </div>
                  <span
                    className={cn(
                      "truncate",
                      selectedId === member.id
                        ? "font-semibold text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {member.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile card */}
          <Card
            key={selected.id}
            className="p-8 shadow-custom-xl border-border bg-gradient-card animate-scale-in"
          >
            <div className="space-y-5">
              {/* Avatar + name */}
              <div className="flex items-start gap-5">
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0",
                    selected.color
                  )}
                >
                  {selected.initials}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selected.name}</h3>
                  <p className="text-primary font-semibold text-sm mt-0.5">{selected.role}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{selected.description}</p>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Links */}
              <div className="flex items-center gap-3">
                <a
                  href={selected.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
