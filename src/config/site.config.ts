// Central configuration file for all data-driven content.
// Edit this file to update names, contacts, team members, questions, and flows.

// ─── Contact People ───────────────────────────────────────────────────────────
export const CONTACTS = {
  divyansh: {
    name: "Divyansh",
    role: "Admissions & Program Lead",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    emoji: "👨‍💼",
  },
  rohit: {
    name: "Rohit",
    role: "Parent Relations & Support",
    phone: "+91 87654 32109",
    whatsapp: "918765432109",
    emoji: "👨‍🏫",
  },
};

// ─── Meet the Team (5 people) ─────────────────────────────────────────────────
export const TEAM_MEMBERS = [
  {
    id: "divyansh",
    name: "Divyansh Sharma",
    role: "Co-Founder & Program Lead",
    description:
      "Passionate about making quality tech education accessible to every child. Leads curriculum design and student success.",
    initials: "DS",
    color: "from-purple-500 to-indigo-600",
    linkedin: "#",
  },
  {
    id: "rohit",
    name: "Rohit Verma",
    role: "Co-Founder & Parent Relations",
    description:
      "Dedicated to building bridges between parents and technology. Ensures every family feels supported throughout the journey.",
    initials: "RV",
    color: "from-cyan-500 to-blue-600",
    linkedin: "#",
  },
  {
    id: "ananya",
    name: "Ananya Kapoor",
    role: "Head of Curriculum",
    description:
      "Former educator with 8+ years designing engaging, child-friendly learning pathways rooted in practical skills.",
    initials: "AK",
    color: "from-pink-500 to-rose-600",
    linkedin: "#",
  },
  {
    id: "karan",
    name: "Karan Mehta",
    role: "Tech & Product",
    description:
      "Full-stack developer who builds the interactive tools and platforms that make learning fun and measurable for students.",
    initials: "KM",
    color: "from-amber-500 to-orange-600",
    linkedin: "#",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Child Psychology Advisor",
    description:
      "Certified child psychologist who ensures every learning method and assessment is age-appropriate and empowering.",
    initials: "PN",
    color: "from-green-500 to-teal-600",
    linkedin: "#",
  },
];

// ─── Chatbot Flow (Decision Tree) ─────────────────────────────────────────────
export type FlowOption = {
  label: string;
  emoji?: string;
  next: string;
};

export type FlowNode = {
  id: string;
  message: string;
  options?: FlowOption[];
  action?: "show_contacts" | "start_report" | "end";
};

export const CHAT_FLOW: Record<string, FlowNode> = {
  start: {
    id: "start",
    message:
      "Namaste! 🙏 I'm Eunoa's guide — here to help you unlock your child's potential.\n\nWhat brings you here today?",
    options: [
      { label: "Tell me about Eunoa's programs", emoji: "📚", next: "programs" },
      { label: "Understand my child better", emoji: "🧠", next: "understand_child" },
      { label: "Talk to someone right now", emoji: "📞", next: "contacts" },
    ],
  },
  programs: {
    id: "programs",
    message:
      "Eunoa Future Builders helps students from Grade 6–10 build real-world tech skills — coding, design, problem-solving, and career confidence.\n\nWhat would you like to know more about?",
    options: [
      { label: "What skills do you teach?", emoji: "💡", next: "skills_detail" },
      { label: "How are sessions structured?", emoji: "🗓️", next: "structure" },
      { label: "What's the fee?", emoji: "💰", next: "fee" },
    ],
  },
  skills_detail: {
    id: "skills_detail",
    message:
      "We cover:\n• 🖥️ Web & App Development\n• 🎨 UI/UX Design Thinking\n• 🤖 AI & Robotics basics\n• 💼 Career Roadmapping\n• 🗣️ Communication & Confidence\n\nEvery skill is taught hands-on with real projects!",
    options: [
      { label: "Sounds great! Talk to a counselor", emoji: "👋", next: "contacts" },
      { label: "How do sessions work?", emoji: "🗓️", next: "structure" },
    ],
  },
  structure: {
    id: "structure",
    message:
      "Sessions are 45–60 min, twice a week (flexible online). Each batch is small (max 8 kids) for personal attention.\n\nParents get a weekly progress update so you're always in the loop! 📊",
    options: [
      { label: "I'd like to enroll!", emoji: "🚀", next: "contacts" },
      { label: "I want to assess my child first", emoji: "🧩", next: "understand_child" },
    ],
  },
  fee: {
    id: "fee",
    message:
      "We believe great education should be accessible. Our counselors will explain the plans and current offers in detail based on your child's needs.\n\nLet's connect you with someone who can help!",
    options: [{ label: "Talk to a counselor", emoji: "📞", next: "contacts" }],
  },
  understand_child: {
    id: "understand_child",
    message:
      "Understanding your child's unique strengths is the first step to unlocking their potential! 🌟\n\nWould you like to try our Child Profile Assessment? It's quick, fun, and gives you a detailed report.",
    options: [
      { label: "Yes! Start the assessment", emoji: "🧩", next: "start_assessment" },
      { label: "Tell me more first", emoji: "💬", next: "assessment_info" },
      { label: "Maybe later, just call me", emoji: "📞", next: "contacts" },
    ],
  },
  assessment_info: {
    id: "assessment_info",
    message:
      "Our Child Profile Assessment has 10 simple questions that reveal your child's:\n• Learning style\n• Natural strengths\n• Interests & passions\n• Problem-solving approach\n\nYou get a beautiful, downloadable PDF report at the end! It takes just 5 minutes. 🎯",
    options: [
      { label: "Let's do it!", emoji: "✨", next: "start_assessment" },
      { label: "Talk to someone instead", emoji: "📞", next: "contacts" },
    ],
  },
  start_assessment: {
    id: "start_assessment",
    message:
      "Perfect! The Child Profile Assessment is ready for you.\n\nScroll down to find the assessment panel on this page, or click below to open it now! 📋",
    options: [{ label: "Talk to our team after", emoji: "📞", next: "contacts" }],
    action: "start_report",
  },
  contacts: {
    id: "contacts",
    message:
      "Our team is here for you! 💪\n\nChoose who you'd like to speak with:",
    options: [],
    action: "show_contacts",
  },
};

// ─── Child Report: Questions ───────────────────────────────────────────────────
export type ReportQuestion = {
  id: string;
  question: string;
  emoji: string;
  options: { label: string; value: string; score: Record<string, number> }[];
};

export const REPORT_QUESTIONS: ReportQuestion[] = [
  {
    id: "q1",
    question: "When your child gets free time at home, they usually…",
    emoji: "🏠",
    options: [
      { label: "Draw, paint, or build something", value: "a", score: { creator: 3, explorer: 1 } },
      { label: "Read, watch documentaries, or research things", value: "b", score: { thinker: 3, explorer: 1 } },
      { label: "Play games or solve puzzles", value: "c", score: { thinker: 2, achiever: 1 } },
      { label: "Call or hangout with friends", value: "d", score: { connector: 3 } },
      { label: "Start a new project or try something new", value: "e", score: { explorer: 3, achiever: 1 } },
    ],
  },
  {
    id: "q2",
    question: "How does your child prefer to learn something new?",
    emoji: "📖",
    options: [
      { label: "By watching someone do it first", value: "a", score: { creator: 2, connector: 1 } },
      { label: "By reading and understanding theory", value: "b", score: { thinker: 3 } },
      { label: "By jumping in and figuring it out", value: "c", score: { explorer: 3, achiever: 1 } },
      { label: "By doing it with a friend or in a group", value: "d", score: { connector: 3 } },
      { label: "By following a clear step-by-step guide", value: "e", score: { achiever: 3 } },
    ],
  },
  {
    id: "q3",
    question: "When something doesn't work out, your child usually…",
    emoji: "🧩",
    options: [
      { label: "Gets frustrated but keeps trying", value: "a", score: { achiever: 2, explorer: 1 } },
      { label: "Thinks hard and finds another way", value: "b", score: { thinker: 3 } },
      { label: "Asks someone for help right away", value: "c", score: { connector: 2 } },
      { label: "Takes a break and comes back later", value: "d", score: { explorer: 2, creator: 1 } },
      { label: "Turns the failure into something new", value: "e", score: { creator: 3 } },
    ],
  },
  {
    id: "q4",
    question: "In a school project, your child prefers to…",
    emoji: "🏫",
    options: [
      { label: "Be the one who designs or makes things visual", value: "a", score: { creator: 3 } },
      { label: "Research and provide all the information", value: "b", score: { thinker: 3 } },
      { label: "Plan and organize the entire thing", value: "c", score: { achiever: 3 } },
      { label: "Present and explain it to the class", value: "d", score: { connector: 3 } },
      { label: "Come up with the creative idea or angle", value: "e", score: { explorer: 3, creator: 1 } },
    ],
  },
  {
    id: "q5",
    question: "What kind of topics excite your child the most?",
    emoji: "💡",
    options: [
      { label: "Art, music, animation, or design", value: "a", score: { creator: 3 } },
      { label: "Science, math, history, or 'how things work'", value: "b", score: { thinker: 3 } },
      { label: "Sports, competitions, or challenges", value: "c", score: { achiever: 3 } },
      { label: "People, helping others, social causes", value: "d", score: { connector: 3 } },
      { label: "Technology, travel, or anything new", value: "e", score: { explorer: 3 } },
    ],
  },
  {
    id: "q6",
    question: "How does your child behave in a group setting?",
    emoji: "👥",
    options: [
      { label: "Quietly observes and then contributes", value: "a", score: { thinker: 2, creator: 1 } },
      { label: "Takes charge and leads the group", value: "b", score: { achiever: 3 } },
      { label: "Makes everyone laugh and feel included", value: "c", score: { connector: 3 } },
      { label: "Comes up with the most creative ideas", value: "d", score: { creator: 3, explorer: 1 } },
      { label: "Asks lots of questions and challenges ideas", value: "e", score: { explorer: 3, thinker: 1 } },
    ],
  },
  {
    id: "q7",
    question: "When your child is excited about something, they…",
    emoji: "🎉",
    options: [
      { label: "Immediately start making or building it", value: "a", score: { creator: 3, explorer: 1 } },
      { label: "Research everything about it first", value: "b", score: { thinker: 3 } },
      { label: "Set a goal and plan how to achieve it", value: "c", score: { achiever: 3 } },
      { label: "Tell all their friends about it", value: "d", score: { connector: 3 } },
      { label: "Explore where it could lead", value: "e", score: { explorer: 3 } },
    ],
  },
  {
    id: "q8",
    question: "How does your child handle new challenges?",
    emoji: "🏆",
    options: [
      { label: "With curiosity and excitement", value: "a", score: { explorer: 3 } },
      { label: "Carefully and methodically", value: "b", score: { thinker: 3, achiever: 1 } },
      { label: "With creative flair and imagination", value: "c", score: { creator: 3 } },
      { label: "By rallying others to help", value: "d", score: { connector: 3 } },
      { label: "With determination to win or succeed", value: "e", score: { achiever: 3 } },
    ],
  },
  {
    id: "q9",
    question: "Your child's biggest strength at school is…",
    emoji: "⭐",
    options: [
      { label: "Creativity and original thinking", value: "a", score: { creator: 3 } },
      { label: "Deep understanding of subjects", value: "b", score: { thinker: 3 } },
      { label: "Getting things done on time", value: "c", score: { achiever: 3 } },
      { label: "Getting along with everyone", value: "d", score: { connector: 3 } },
      { label: "Trying new things without fear", value: "e", score: { explorer: 3 } },
    ],
  },
  {
    id: "q10",
    question: "If your child could design their ideal learning environment, it would be…",
    emoji: "🌟",
    options: [
      { label: "A creative studio with freedom to make anything", value: "a", score: { creator: 3 } },
      { label: "A quiet library full of books and research tools", value: "b", score: { thinker: 3 } },
      { label: "A competitive lab with goals and achievements", value: "c", score: { achiever: 3 } },
      { label: "A collaborative space working on real-world problems", value: "d", score: { connector: 3 } },
      { label: "An open field where they can explore anything", value: "e", score: { explorer: 3 } },
    ],
  },
];

// ─── Child Profiles ────────────────────────────────────────────────────────────
export type ChildProfile = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: string[];
  learningStyle: string;
  suggestedActivities: string[];
  parentNote: string;
  color: string;
  gradient: string;
};

export const CHILD_PROFILES: Record<string, ChildProfile> = {
  creator: {
    id: "creator",
    name: "The Creator",
    emoji: "🎨",
    tagline: "Imagination is their superpower",
    description:
      "Your child thrives when they can express themselves and build things from scratch. They have a rich inner world and love turning ideas into something tangible — whether it's art, code, music, or stories.",
    strengths: [
      "Original thinking and innovation",
      "Visual and spatial reasoning",
      "Emotional expression through projects",
      "Bringing beauty and meaning to work",
    ],
    learningStyle:
      "Learns best through creative projects, open-ended challenges, and freedom to experiment. Structured drilling bores them — give them a canvas!",
    suggestedActivities: [
      "Web design and front-end development",
      "Animation and digital art",
      "Game design and storytelling",
      "Music production with technology",
      "App design and UI/UX",
    ],
    parentNote:
      "Nurture their creative confidence. Don't push them toward a single 'correct' answer — they flourish when given room to explore ideas their way. Their creativity can power world-changing careers in design, tech, and innovation.",
    color: "text-pink-600",
    gradient: "from-pink-500 to-rose-600",
  },
  thinker: {
    id: "thinker",
    name: "The Thinker",
    emoji: "🧠",
    tagline: "Deep diver, problem solver",
    description:
      "Your child is naturally analytical and loves understanding *why* things work the way they do. They ask thoughtful questions, enjoy complex challenges, and often arrive at solutions others miss entirely.",
    strengths: [
      "Logical and analytical thinking",
      "Research and deep learning",
      "Pattern recognition",
      "Systematic problem solving",
    ],
    learningStyle:
      "Learns best through structured explanations, research, and step-by-step reasoning. They appreciate depth over breadth and prefer to master something fully.",
    suggestedActivities: [
      "Python and data science",
      "Mathematics and competitive programming",
      "Science experiments and research projects",
      "Chess and logic games",
      "AI and machine learning fundamentals",
    ],
    parentNote:
      "Give them space to think deeply — don't rush them. They may be quiet but their mind is always working. Encourage them to voice their reasoning: the world needs more clear, careful thinkers.",
    color: "text-blue-600",
    gradient: "from-blue-500 to-indigo-600",
  },
  achiever: {
    id: "achiever",
    name: "The Achiever",
    emoji: "🏆",
    tagline: "Goal-setter, dream chaser",
    description:
      "Your child is driven, focused, and motivated by goals. They love to compete (with themselves and others), track progress, and feel the rush of accomplishment. Structure and milestones bring out their best.",
    strengths: [
      "Goal-setting and follow-through",
      "Time management and discipline",
      "Leadership under pressure",
      "Resilience and persistence",
    ],
    learningStyle:
      "Learns best with clear objectives, measurable milestones, and recognition. Progress tracking, leaderboards, and certificates fuel their motivation.",
    suggestedActivities: [
      "Coding challenges and hackathons",
      "Entrepreneurship and startup simulations",
      "Project management and product building",
      "Debate and public speaking",
      "STEM competitions",
    ],
    parentNote:
      "Help them balance achievement with enjoyment — they can be hard on themselves. Celebrate their effort, not just results. Their drive, if channeled well, will take them very far.",
    color: "text-amber-600",
    gradient: "from-amber-500 to-orange-600",
  },
  connector: {
    id: "connector",
    name: "The Connector",
    emoji: "🤝",
    tagline: "Heart-led, people-first",
    description:
      "Your child is warm, empathetic, and deeply social. They light up in collaborative environments, and their emotional intelligence gives them an edge in teamwork, communication, and leadership. They care about people.",
    strengths: [
      "Empathy and emotional intelligence",
      "Communication and storytelling",
      "Team leadership and inclusion",
      "Conflict resolution and mediation",
    ],
    learningStyle:
      "Learns best in collaborative settings, group projects, and discussions. They absorb knowledge through relationships and real-world context. Solo work for extended periods drains them.",
    suggestedActivities: [
      "Community tech projects",
      "User research and product design",
      "Social entrepreneurship",
      "Content creation and digital marketing",
      "Public speaking and communication",
    ],
    parentNote:
      "Their sensitivity is a strength — not a weakness. Encourage them to combine their people skills with tech: the world desperately needs empathetic leaders in technology.",
    color: "text-green-600",
    gradient: "from-green-500 to-teal-600",
  },
  explorer: {
    id: "explorer",
    name: "The Explorer",
    emoji: "🚀",
    tagline: "Fearless, curious, always next",
    description:
      "Your child is fueled by curiosity and novelty. They love diving into new subjects, experimenting, and questioning everything. They rarely fear failure because every setback feels like a new discovery to them.",
    strengths: [
      "Intellectual curiosity and fearlessness",
      "Adaptability and flexibility",
      "Cross-domain thinking and connecting dots",
      "Innovation and experimentation",
    ],
    learningStyle:
      "Learns best through exploration, variety, and self-directed projects. Repetitive tasks bore them quickly — they thrive with open-ended, interdisciplinary challenges.",
    suggestedActivities: [
      "Cross-disciplinary tech projects",
      "Robotics and hardware tinkering",
      "Startup ideation and rapid prototyping",
      "Multi-domain research projects",
      "Travel tech and geography apps",
    ],
    parentNote:
      "Don't try to tame their curiosity — harness it. Give them lots of varied experiences. Their wide interests will eventually converge into a unique, powerful career path that nobody else has walked.",
    color: "text-purple-600",
    gradient: "from-purple-500 to-violet-600",
  },
};

// ─── Bottom Section Value Cards ────────────────────────────────────────────────
export const VALUE_CARDS = [
  {
    icon: "🧠",
    title: "Know Your Child",
    description:
      "Our free Child Profile Assessment reveals your child's unique learning style, strengths, and natural talents in just 5 minutes.",
    cta: "Start Assessment",
    ctaAction: "report" as const,
    color: "from-purple-50 to-indigo-50 border-purple-200",
  },
  {
    icon: "💬",
    title: "Instant Talk",
    description:
      "Chat with our smart guide to explore programs, ask questions, and connect with our team — anytime, from anywhere.",
    cta: "Open Chat",
    ctaAction: "chat" as const,
    color: "from-cyan-50 to-blue-50 border-cyan-200",
  },
  {
    icon: "👥",
    title: "Meet Our Team",
    description:
      "Real people, real passion. Get to know the educators, technologists, and child-development experts behind Eunoa.",
    cta: "Meet the Team",
    ctaAction: "meet" as const,
    color: "from-pink-50 to-rose-50 border-pink-200",
  },
  {
    icon: "🚀",
    title: "Start Your Journey",
    description:
      "Register today to unlock your child's personalized learning journey, free sessions, and early-bird benefits.",
    cta: "Register Free",
    ctaAction: "register" as const,
    color: "from-amber-50 to-orange-50 border-amber-200",
  },
];
