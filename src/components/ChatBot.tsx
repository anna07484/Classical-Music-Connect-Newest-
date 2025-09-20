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
    
    // Music terms with beginner-friendly explanations
    if (q.includes("cadenza")) {
      return "A cadenza is like a musical solo spotlight! It's when the orchestra pauses and the soloist gets to show off with improvised or written passages. Think of it as the classical music equivalent of a guitar solo. Why it matters: It shows the performer's individual artistry and technical skill.";
    }
    
    if (q.includes("motif")) {
      return "A motif is a short musical idea that composers repeat and transform throughout a piece - like a musical building block. Beethoven's Fifth Symphony starts with the famous 'da-da-da-DUM' motif. Why it matters: Recognizing motifs helps you follow the composer's musical story and development.";
    }
    
    if (q.includes("sonata")) {
      return "A sonata is like a musical essay with a specific structure: exposition (introducing themes), development (exploring them), and recapitulation (bringing them back). It's the backbone of classical music. Why it matters: Understanding sonata form helps you anticipate and appreciate how the music unfolds.";
    }
    
    if (q.includes("allegro")) {
      return "Allegro means 'fast and lively' in Italian - it's a tempo marking that tells musicians to play with energy and speed. Most symphonies start with an allegro movement. Why it matters: Tempo markings help you understand the character and mood the composer intended.";
    }
    
    if (q.includes("forte")) {
      return "Forte means 'loud' in Italian - it's one of the volume markings (dynamics) in classical music. The opposite is piano (soft). Why it matters: Dynamics create drama and emotion - the contrast between loud and soft passages creates musical tension and release.";
    }
    
    // Composers with engaging facts
    if (q.includes("mozart")) {
      return "Wolfgang Amadeus Mozart (1756-1791) was a child prodigy who composed over 600 works. His music is known for perfect balance, crystal clarity, and emotional depth hidden beneath elegant surfaces. Fun fact: He wrote his first symphony at age 8! Why he matters: Mozart mastered every musical form and his works are the perfect introduction to classical music.";
    }
    
    if (q.includes("beethoven")) {
      return "Ludwig van Beethoven (1770-1827) bridged the Classical and Romantic eras, composing some of music's most powerful works despite increasing deafness. His nine symphonies changed music forever. Fun fact: He was completely deaf when he wrote his final symphony! Why he matters: Beethoven showed that music could express the full range of human emotion and struggle.";
    }
    
    if (q.includes("bach")) {
      return "Johann Sebastian Bach (1685-1750) was a German composer whose mathematical precision and spiritual depth created the foundation of Western classical music. His works are architectural masterpieces. Fun fact: He had 20 children and several became famous composers too! Why he matters: Bach's counterpoint and harmonic innovations influenced every composer who came after him.";
    }
    
    if (q.includes("chopin")) {
      return "Frédéric Chopin (1810-1849) was a Polish composer who revolutionized piano music. His works are deeply emotional and technically brilliant, often inspired by Polish folk music. Fun fact: He was the first 'rock star' pianist! Why he matters: Chopin showed how the piano could express poetry and deep emotion, not just technical virtuosity.";
    }
    
    if (q.includes("debussy")) {
      return "Claude Debussy (1862-1918) was a French composer who created musical 'impressionism' - music that captures moods and atmospheres rather than telling specific stories. His music sounds like musical paintings. Fun fact: He was inspired by Asian music at the 1889 Paris World's Fair! Why he matters: Debussy broke traditional rules and opened new possibilities for modern music.";
    }
    
    // Practical advice for beginners
    if (q.includes("what") && q.includes("listen")) {
      return "Great question! When listening to classical music, try focusing on: 1) The main melody - can you hum it? 2) How loud or soft it gets (dynamics) 3) The mood - happy, sad, dramatic? 4) Recurring musical ideas (motifs). Why it matters: Active listening turns concerts into engaging musical conversations!";
    }
    
    if (q.includes("nervous") || q.includes("intimidate")) {
      return "It's totally normal to feel nervous at your first concert! Here's the secret: classical audiences are very welcoming. Just arrive a few minutes early, turn off your phone, and let the music wash over you. Applaud between pieces (not movements). Why it matters: Everyone was a beginner once - the classical community loves welcoming new listeners!";
    }
    
    if (q.includes("dress") || q.includes("wear")) {
      return "Good news! Most concerts today are business casual - think 'nice dinner out' rather than 'black tie gala.' Dark colors are traditional but not required. The most important thing is feeling comfortable. Fun fact: Audiences used to cheer and talk during concerts! Why it matters: Feeling appropriately dressed helps you focus on the music.";
    }
    
    if (q.includes("symphony")) {
      return "A symphony is a large-scale orchestral work, usually in four movements. It's like a musical journey with different characters - fast, slow, dance-like, and triumphant finale. Why it matters: Symphonies represent the pinnacle of orchestral composition and showcase the full power of the orchestra.";
    }
    
    return "That's an interesting question! I specialize in beginner-friendly explanations about classical music terms, composers, and concert etiquette. Try asking me about specific composers like Mozart or Beethoven, musical terms like 'cadenza' or 'motif,' or practical questions about attending concerts. What would you like to explore?";
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