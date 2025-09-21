import { Home, Calendar, PlusCircle, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: "discover", label: "Discover", icon: Home },
    { id: "learn", label: "Learn", icon: Calendar },
    { id: "post", label: "Post Event", icon: PlusCircle },
    { id: "assistant", label: "Assistant", icon: MessageCircle },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/50 z-50">
      <div className="flex items-center justify-center px-4 py-3 max-w-md mx-auto">
        <div className="flex items-center justify-between w-full max-w-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-lg transition-colors duration-200",
                  isActive 
                    ? "text-burgundy bg-burgundy/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};