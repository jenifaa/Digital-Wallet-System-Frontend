import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hello! I'm WalletIQ Assistant. I can help with transactions, loans, wallet status, and account security. How can I help you today?",
  },
];

const quickReplies = [
  "How do I send money?",
  "Check my wallet balance",
  "Loan application status",
  "Reset my PIN",
];

function getAssistantReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("send") || lower.includes("transfer")) {
    return "To send money, go to Send Money, enter the recipient's email or phone, amount, and your wallet PIN. Transfers are processed instantly.";
  }
  if (lower.includes("balance") || lower.includes("wallet")) {
    return "Your current balance is visible on your dashboard and Wallet Details page. Tap the eye icon to show or hide your balance.";
  }
  if (lower.includes("loan")) {
    return "You can request a loan from the Loans section. After submission, track approval status in Loan History and repayments in Repayment History.";
  }
  if (lower.includes("pin") || lower.includes("password")) {
    return "Set your wallet PIN under Set PIN. For account password changes, visit Change Password in your profile settings.";
  }
  if (lower.includes("block") || lower.includes("restrict")) {
    return "If your wallet is blocked or deactivated, visit Wallet Details for restrictions and contact support for assistance.";
  }

  return "Thanks for your message. For detailed support, visit our FAQ page or contact our team. Is there anything else I can help with?";
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getAssistantReply(text),
      },
    ]);
    setIsTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-120 w-90 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-indigo-950/40"
            role="dialog"
            aria-label="Support chat"
          >
            <div className="flex items-center justify-between border-b border-slate-800 bg-indigo-600 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-2">
                  <Bot className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">WalletIQ Assistant</p>
                  <p className="text-xs text-indigo-100/80">Online • Banking support</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="size-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                    message.role === "assistant"
                      ? "bg-slate-900 text-slate-200"
                      : "ml-auto bg-indigo-600 text-white",
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isTyping && (
                <div className="max-w-[85%] rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-400">
                  Assistant is typing...
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => sendMessage(reply)}
                    className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-indigo-500/40 hover:text-white"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="border-slate-800 bg-slate-900 text-white"
                />
                <Button type="submit" size="icon" className="shrink-0 rounded-xl">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-950/40"
        aria-label="Open support chat"
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </motion.button>
    </>
  );
}
