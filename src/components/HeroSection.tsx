import { Music, Sparkles } from "lucide-react";
import concertHallHero from "@/assets/concert-hall-hero.jpg";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-elegant rounded-2xl mb-6">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${concertHallHero})` }}
      />
      <div className="relative p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Music className="w-6 h-6 text-gold" />
          <Sparkles className="w-5 h-5 text-gold" />
        </div>
        <h1 className="font-elegant text-2xl font-bold text-primary-foreground mb-2">
          Classical Music Connect
        </h1>
        <p className="text-primary-foreground/90 text-sm">
          Discover concerts, learn with every performance, and connect with the classical music community
        </p>
      </div>
    </div>
  );
};