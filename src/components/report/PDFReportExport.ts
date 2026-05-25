import jsPDF from "jspdf";
import type { ChildProfile } from "@/config/site.config";

type ReportData = {
  childName: string;
  childAge: string;
  parentName: string;
  profile: ChildProfile;
  answers: Record<string, string>;
  date: string;
};

const PURPLE = [98, 51, 153] as [number, number, number];
const LIGHT_PURPLE = [245, 240, 255] as [number, number, number];
const CYAN = [6, 182, 212] as [number, number, number];
const DARK = [30, 27, 75] as [number, number, number];
const MUTED = [107, 114, 128] as [number, number, number];
const WHITE: [number, number, number] = [255, 255, 255];
const PROFILE_COLORS: Record<string, [number, number, number]> = {
  creator: [219, 39, 119],
  thinker: [37, 99, 235],
  achiever: [217, 119, 6],
  connector: [5, 150, 105],
  explorer: [124, 58, 237],
};

export async function generateChildReport(data: ReportData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const profileColor = PROFILE_COLORS[data.profile.id] ?? PURPLE;

  // ── Page 1: Cover ────────────────────────────────────────────────────────────
  // Hero gradient background (simulate with rect)
  doc.setFillColor(...PURPLE);
  doc.rect(0, 0, W, 80, "F");
  doc.setFillColor(...profileColor);
  doc.rect(0, 60, W, 30, "F");

  // White wave effect
  doc.setFillColor(...WHITE);
  doc.ellipse(W / 2, 85, W * 0.7, 15, "F");

  // Title
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("Child Profile Report", W / 2, 30, { align: "center" });
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text("Powered by Eunoa Future Builders", W / 2, 42, { align: "center" });

  // Profile emoji area
  doc.setFillColor(...LIGHT_PURPLE);
  doc.roundedRect(W / 2 - 25, 52, 50, 50, 10, 10, "F");
  doc.setTextColor(...profileColor);
  doc.setFontSize(36);
  doc.text(data.profile.emoji, W / 2, 84, { align: "center" });

  // Child info
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(data.childName, W / 2, 115, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...MUTED);
  doc.text(`Age: ${data.childAge}  ·  Report Date: ${data.date}`, W / 2, 124, { align: "center" });
  doc.text(`Parent: ${data.parentName}`, W / 2, 132, { align: "center" });

  // Profile badge
  doc.setFillColor(...profileColor);
  doc.roundedRect(W / 2 - 40, 140, 80, 12, 6, 6, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(data.profile.name.toUpperCase(), W / 2, 148.5, { align: "center" });

  // Tagline
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.text(`"${data.profile.tagline}"`, W / 2, 162, { align: "center" });

  // Description section
  doc.setFillColor(...LIGHT_PURPLE);
  doc.roundedRect(15, 170, W - 30, 50, 8, 8, "F");
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("About This Profile", 22, 180);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const descLines = doc.splitTextToSize(data.profile.description, W - 50);
  doc.text(descLines.slice(0, 4), 22, 188);

  // Footer
  doc.setFillColor(...PURPLE);
  doc.rect(0, H - 18, W, 18, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(9);
  doc.text("Eunoa Future Builders  ·  Confidential  ·  Page 1 of 2", W / 2, H - 7, { align: "center" });

  // ── Page 2: Strengths, Learning Style, Activities, Parent Notes ──────────────
  doc.addPage();

  // Header strip
  doc.setFillColor(...profileColor);
  doc.rect(0, 0, W, 18, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`${data.childName}'s Profile Report  ·  Eunoa Future Builders`, W / 2, 12, { align: "center" });

  let y = 28;

  const sectionTitle = (title: string, emoji: string, color: [number, number, number]) => {
    doc.setFillColor(...color);
    doc.roundedRect(15, y - 1, W - 30, 10, 3, 3, "F");
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${emoji}  ${title}`, 22, y + 6.5);
    y += 14;
  };

  const bullet = (text: string) => {
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setFillColor(...profileColor);
    doc.circle(22, y + 1.5, 1.5, "F");
    const lines = doc.splitTextToSize(text, W - 55);
    doc.text(lines, 27, y + 3.5);
    y += lines.length * 5 + 2;
  };

  // Strengths
  sectionTitle("Top Strengths", "⭐", profileColor);
  data.profile.strengths.forEach(bullet);
  y += 4;

  // Learning Style
  sectionTitle("Learning Style", "📖", PURPLE);
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lsLines = doc.splitTextToSize(data.profile.learningStyle, W - 42);
  doc.text(lsLines, 22, y);
  y += lsLines.length * 5 + 8;

  // Suggested Activities
  sectionTitle("Suggested Activities at Eunoa", "🚀", CYAN);
  data.profile.suggestedActivities.forEach(bullet);
  y += 4;

  // Parent Notes
  sectionTitle("A Note for You, Parents 🙏", "💌", [150, 50, 180] as [number, number, number]);
  doc.setFillColor(250, 245, 255);
  doc.roundedRect(15, y, W - 30, 38, 6, 6, "F");
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  const pnLines = doc.splitTextToSize(data.profile.parentNote, W - 46);
  doc.text(pnLines, 22, y + 8);
  y += 44;

  // Next Steps
  if (y < H - 40) {
    doc.setFillColor(...LIGHT_PURPLE);
    doc.roundedRect(15, y, W - 30, 28, 6, 6, "F");
    doc.setTextColor(...PURPLE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("✅  Next Steps", 22, y + 8);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text([
      "1. Share this report with your child together — make it a conversation, not an evaluation.",
      "2. Explore Eunoa programs that align with their profile's suggested activities.",
      "3. Book a free session with our counselors to design a personalised learning path.",
    ], 22, y + 15);
  }

  // Footer
  doc.setFillColor(...PURPLE);
  doc.rect(0, H - 18, W, 18, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(9);
  doc.text("Eunoa Future Builders  ·  Confidential  ·  Page 2 of 2", W / 2, H - 7, { align: "center" });

  doc.save(`Eunoa_ChildReport_${data.childName.replace(/\s+/g, "_")}.pdf`);
}
