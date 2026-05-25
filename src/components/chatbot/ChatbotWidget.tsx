import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, ChevronDown, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { RegistrationCard } from "@/components/auth/RegistrationCard";
import { CHAT_FLOW, CONTACTS } from "@/config/site.config";
import type { FlowNode } from "@/config/site.config";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  typing?: boolean;
};

type Props = {
  onOpenReport?: () => void;
};

export function ChatbotWidget({ onOpenReport }: Props) {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState<FlowNode | null>(null);
  const [showContacts, setShowContacts] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addBotMessage = (text: string, node: FlowNode) => {
    setIsTyping(true);
    const delay = Math.min(800 + text.length * 10, 2000);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", text },
      ]);
      setCurrentNode(node);
      if (node.action === "show_contacts") setShowContacts(true);
      if (node.action === "start_report") {
        onOpenReport?.();
      }
    }, delay);
  };

  const startChat = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setStarted(true);
    setShowContacts(false);
    setMessages([]);
    setCurrentNode(null);
    const startNode = CHAT_FLOW["start"];
    addBotMessage(startNode.message, startNode);
  };

  const handleOption = (optionLabel: string, nextId: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: optionLabel },
    ]);
    const nextNode = CHAT_FLOW[nextId];
    if (!nextNode) return;
    addBotMessage(nextNode.message, nextNode);
  };

  const handleReset = () => {
    setStarted(false);
    setShowContacts(false);
    setMessages([]);
    setCurrentNode(null);
    setShowAuth(false);
  };

  const pulse = !open;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out origin-bottom-right",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        <div className="w-[22rem] sm:w-96 bg-white rounded-2xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden"
          style={{ maxHeight: "calc(100vh - 6rem)", minHeight: "420px" }}
        >
          {/* Header */}
          <div className="bg-gradient-hero p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Eunoa Guide</p>
                <span className="flex items-center gap-1 text-xs text-white/80">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse inline-block" />
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {started && (
                <button
                  onClick={handleReset}
                  className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors text-xs"
                  title="Restart chat"
                >
                  ↺
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-purple-50/30 to-white min-h-0">
            {!started && !showAuth && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-3xl shadow-lg">
                  🌟
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    Eunoa Instant Talk
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 max-w-52">
                    Get answers, explore programs, and understand your child better — instantly.
                  </p>
                </div>
                <Button
                  variant="hero"
                  onClick={startChat}
                  className="text-sm px-6"
                >
                  Start Instant Talk ✨
                </Button>
              </div>
            )}

            {showAuth && !isAuthenticated && (
              <div className="space-y-3">
                <p className="text-sm text-center text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg p-3">
                  🔒 Create a free account to unlock the full chat experience.
                </p>
                <RegistrationCard compact onSuccess={() => { setShowAuth(false); startChat(); }} />
              </div>
            )}

            {started && (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-gradient-hero flex items-center justify-center text-sm shrink-0 mr-2 mt-1">
                        🤖
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-sm",
                        msg.role === "user"
                          ? "bg-gradient-hero text-white rounded-br-sm"
                          : "bg-white border border-purple-100 text-foreground rounded-bl-sm"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-hero flex items-center justify-center text-sm shrink-0">
                      🤖
                    </div>
                    <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact cards */}
                {showContacts && !isTyping && (
                  <div className="space-y-2 mt-2">
                    {Object.values(CONTACTS).map((contact) => (
                      <a
                        key={contact.name}
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white border border-green-200 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all shadow-sm group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-lg shrink-0">
                          {contact.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground">
                            {contact.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{contact.role}</p>
                          <p className="text-xs text-green-600 font-medium">{contact.phone}</p>
                        </div>
                        <Phone className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform shrink-0" />
                      </a>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Options */}
          {started && !isTyping && currentNode?.options && currentNode.options.length > 0 && !showContacts && (
            <div className="border-t border-purple-100 p-3 bg-white shrink-0">
              <div className="space-y-2">
                {currentNode.options.map((opt) => (
                  <button
                    key={opt.next}
                    onClick={() => handleOption(opt.label, opt.next)}
                    className="w-full text-left px-4 py-2.5 text-sm bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-primary/20 flex items-center gap-2"
                  >
                    {opt.emoji && <span>{opt.emoji}</span>}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
          "bg-gradient-hero text-white hover:scale-110 active:scale-95",
          pulse && "animate-pulse"
        )}
        style={{ animationDuration: "2s" }}
        aria-label="Toggle chat"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {!open && !started && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white">
            1
          </span>
        )}
      </button>
    </div>
  );
}
