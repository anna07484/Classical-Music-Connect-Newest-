import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hi! I'm your classical music AI mentor. Ask me about musical terms, composers, or anything about classical music!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInput("");
  };

  const getAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes("cadenza")) {
      return "A cadenza is a virtuosic solo passage, usually near the end of a movement, where the soloist can showcase their technical skill and musical interpretation. Originally improvised, most cadenzas today are written out. Why it matters: It's often the most exciting and impressive part of a concerto!";
    }
    
    if (q.includes("debussy")) {
      return "Claude Debussy (1862-1918) was a French composer who pioneered Impressionism in music. His works like 'Clair de Lune' use innovative harmonies and textures to create atmospheric 'sound paintings.' Why it matters: He revolutionized how music could express mood and color rather than just traditional melodies.";
    }
    
    if (q.includes("sonata")) {
      return "A sonata is a multi-movement work for a solo instrument or instrument with piano. The first movement typically follows 'sonata form' - exposition, development, and recapitulation. Why it matters: It's one of the most important structural forms in classical music, used by Mozart, Beethoven, and countless others.";
    }
    
    if (q.includes("symphony")) {
      return "A symphony is a large-scale orchestral work, usually in four movements. It's like a musical journey with different characters - fast, slow, dance-like, and triumphant finale. Why it matters: Symphonies represent the pinnacle of orchestral composition and showcase the full power of the orchestra.";
    }
    
    return "That's a great question! Classical music has so many fascinating elements. Try asking about specific terms like 'cadenza,' composers like 'Debussy,' or musical forms like 'sonata' or 'symphony.' I'm here to make classical music more approachable for you!";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="font-elegant text-xl text-burgundy flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Music Mentor
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" ? "bg-burgundy text-primary-foreground" : "bg-gold text-burgundy"
                    }`}>
                      {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.type === "user" 
                        ? "bg-burgundy text-primary-foreground" 
                        : "bg-muted"
                    }`}>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about musical terms, composers, or pieces..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} size="icon" className="bg-gradient-elegant">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};