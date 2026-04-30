"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Minimize2,
  Maximize2
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function GuruChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Namaste! I am Guru AI. How can I help you on your learning journey today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response based on language
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();

      if (language === "hi") {
        if (lowerInput.includes("नमस्ते") || lowerInput.includes("hi")) {
          response = "नमस्ते! आप कैसे हैं? मैं आपकी क्या मदद कर सकता हूँ?";
        } else if (lowerInput.includes("कोर्स") || lowerInput.includes("course")) {
          response = "हमारे पास AI, पायथन और वेब डिज़ाइन के बेहतरीन कोर्सेस हैं! आप 'Explore' सेक्शन देख सकते हैं।";
        } else if (lowerInput.includes("क्विज़") || lowerInput.includes("quiz")) {
          response = "चुनौती क्षेत्र (Challenge Zone) में जाकर आप अपनी शक्तियों का परीक्षण कर सकते हैं! 🏆";
        } else if (lowerInput.includes("कोडिंग") || lowerInput.includes("code")) {
          response = "कोडिंग एक जादू है! क्या आप C, Python या Java सीखना चाहते हैं?";
        } else if (lowerInput.includes("धन्यवाद") || lowerInput.includes("thanks")) {
          response = "आपका स्वागत है! और कुछ जो मैं आपके लिए कर सकता हूँ? 😊";
        } else {
          response = "यह बहुत अच्छा सवाल है! मैं अभी सीख रहा हूँ, लेकिन क्या आप इसके बारे में और जानना चाहेंगे?";
        }
      } else if (language === "mr") {
        if (lowerInput.includes("नमस्कार") || lowerInput.includes("hi")) {
          response = "नमस्कार! तुम्ही कसे आहात? मी तुम्हाला कशी मदत करू शकतो?";
        } else if (lowerInput.includes("कोर्स") || lowerInput.includes("course")) {
          response = "आमच्याकडे AI, पायथन आणि वेब डिझाइनचे उत्तम कोर्सेस आहेत! 'Explore' विभाग तपासा.";
        } else if (lowerInput.includes("क्विझ") || lowerInput.includes("quiz")) {
          response = "चुनौती क्षेत्रात (Challenge Zone) जाऊन तुम्ही तुमच्या कौशल्याची चाचणी घेऊ शकता! 🏆";
        } else if (lowerInput.includes("कोडिंग") || lowerInput.includes("code")) {
          response = "कोडिंग ही एक जादू आहे! तुम्हाला C, Python किंवा Java शिकायला आवडेल का?";
        } else if (lowerInput.includes("आभार") || lowerInput.includes("thanks")) {
          response = "तुमचे स्वागत आहे! मी तुमच्यासाठी अजून काही करू शकतो का? 😊";
        } else {
          response = "हा एक छान प्रश्न आहे! मी अजून शिकत आहे, पण तुम्हाला याबद्दल अधिक जाणून घ्यायला आवडेल का?";
        }
      } else {
        if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
          response = "Hello! I'm doing great. How can I assist you today?";
        } else if (lowerInput.includes("course") || lowerInput.includes("learn")) {
          response = "We have amazing courses in AI, Python, and Web Crafting. Check the 'Explore' section!";
        } else if (lowerInput.includes("quiz") || lowerInput.includes("challenge")) {
          response = "Head over to the Challenge Zone to earn EXP and test your skills! 🏆";
        } else if (lowerInput.includes("code") || lowerInput.includes("coding")) {
          response = "Coding is like a superpower! You can practice in our Magic Playground.";
        } else if (lowerInput.includes("legit") || lowerInput.includes("real") || lowerInput.includes("trust")) {
          response = "Absolutely! Our courses are curated from top institutions like Harvard and freeCodeCamp. We are 100% legit! ✅";
        } else if (lowerInput.includes("help") || lowerInput.includes("support")) {
          response = "I can help you here, or you can visit our Help Center for detailed guides and FAQs! 📚";
        } else if (lowerInput.includes("thanks") || lowerInput.includes("thank you")) {
          response = "You're very welcome! Keep learning and stay curious! 😊";
        } else {
          response = "That's an interesting topic! I'm still learning, but let's explore it together. You can also check our Help Center for more info.";
        }
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? "80px" : "500px",
              width: isMinimized ? "200px" : "380px"
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-card border-2 border-primary/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none">Guru AI</h3>
                  <p className="text-[10px] text-white/70 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Always here to help
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-white/20 text-white rounded-full"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-white/20 text-white rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-transparent to-primary/5"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                          msg.role === "user" ? "bg-accent text-white" : "bg-primary text-white"
                        }`}>
                          {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm font-medium shadow-sm ${
                          msg.role === "user" 
                            ? "bg-accent text-white rounded-tr-none" 
                            : "bg-card border-2 border-border rounded-tl-none"
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-card border-2 border-border p-3 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-card border-t border-border">
                  <div className="relative flex items-center">
                    <Input 
                      placeholder="Ask anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="pr-12 rounded-2xl border-2 focus-visible:ring-primary/20"
                    />
                    <Button 
                      size="icon" 
                      className="absolute right-1.5 h-8 w-8 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      onClick={handleSend}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 bg-primary text-white rounded-full shadow-[0_10px_30px_rgba(59,130,246,0.5)] flex items-center justify-center relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
        <MessageCircle className={`h-8 w-8 transition-transform duration-500 ${isOpen ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
        <X className={`h-8 w-8 absolute transition-transform duration-500 ${isOpen ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
        
        {/* Magic Sparkles */}
        {!isOpen && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
