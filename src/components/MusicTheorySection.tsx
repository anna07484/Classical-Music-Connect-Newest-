import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Music, Trophy, Clock, Star } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  category: "theory" | "history";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  completed: boolean;
  description: string;
  content: string;
}

const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Understanding Musical Scales",
    category: "theory",
    difficulty: "beginner",
    duration: "10 min",
    completed: true,
    description: "Learn about major and minor scales and how they create different moods",
    content: "A scale is a series of musical notes ordered by pitch. The major scale creates a bright, happy sound while minor scales tend to sound sad or mysterious..."
  },
  {
    id: "2", 
    title: "The Baroque Period (1600-1750)",
    category: "history",
    difficulty: "beginner",
    duration: "15 min",
    completed: true,
    description: "Explore the ornate musical style of Bach, Vivaldi, and Handel",
    content: "The Baroque period was characterized by elaborate musical ornamentation, complex counterpoint, and emotional expression..."
  },
  {
    id: "3",
    title: "Chord Progressions",
    category: "theory", 
    difficulty: "intermediate",
    duration: "12 min",
    completed: false,
    description: "Discover how chords move and create harmonic progressions",
    content: "Chord progressions are the backbone of musical harmony. Common progressions like I-V-vi-IV create familiar sounds..."
  },
  {
    id: "4",
    title: "Classical Period Masters",
    category: "history",
    difficulty: "intermediate", 
    duration: "18 min",
    completed: false,
    description: "Study the lives and works of Mozart, Haydn, and Beethoven",
    content: "The Classical period (1750-1820) emphasized clarity, balance, and form. Mozart's genius, Haydn's innovation..."
  }
];

export const MusicTheorySection = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "theory" | "history">("all");

  const completedLessons = mockLessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / mockLessons.length) * 100;

  const filteredLessons = mockLessons.filter(lesson => 
    activeFilter === "all" || lesson.category === activeFilter
  );

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  if (selectedLesson) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setSelectedLesson(null)}
          className="mb-4"
        >
          ← Back to Lessons
        </Button>
        
        <Card className="bg-gradient-subtle">
          <CardHeader>
            <div className="flex items-center gap-2">
              {selectedLesson.category === "theory" ? <Brain className="w-5 h-5 text-burgundy" /> : <BookOpen className="w-5 h-5 text-burgundy" />}
              <CardTitle className="font-elegant text-xl text-burgundy">
                {selectedLesson.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-gold/10 text-burgundy border-gold/30">
                {selectedLesson.category}
              </Badge>
              <Badge variant="outline" className={
                selectedLesson.difficulty === "beginner" ? "bg-accent/10 text-accent-foreground border-accent/30" :
                selectedLesson.difficulty === "intermediate" ? "bg-burgundy/10 text-burgundy border-burgundy/30" :
                "bg-red-100 text-red-800 border-red-200"
              }>
                {selectedLesson.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{selectedLesson.duration}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{selectedLesson.description}</p>
            <div className="prose prose-sm max-w-none">
              <p>{selectedLesson.content}</p>
            </div>
            <Button 
              className="w-full mt-6 bg-gradient-elegant"
              onClick={() => {
                // Mark as completed and return to lessons
                setSelectedLesson(null);
              }}
            >
              Complete Lesson
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="font-elegant text-xl text-burgundy flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Music Theory & History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-burgundy">{completedLessons}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">{mockLessons.length}</div>
              <div className="text-sm text-muted-foreground">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">Level 2</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-burgundy">Progress</h3>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-elegant text-lg text-burgundy">Available Lessons</CardTitle>
          <div className="flex gap-2 mt-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
              className="text-xs"
            >
              All
            </Button>
            <Button
              variant={activeFilter === "theory" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("theory")}
              className="text-xs"
            >
              Theory
            </Button>
            <Button
              variant={activeFilter === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("history")}
              className="text-xs"
            >
              History
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {lesson.category === "theory" ? <Brain className="w-4 h-4 text-burgundy" /> : <BookOpen className="w-4 h-4 text-burgundy" />}
                        <h4 className="font-semibold text-sm">{lesson.title}</h4>
                        {lesson.completed && <Star className="w-4 h-4 text-gold fill-gold" />}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{lesson.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-gold/10 text-burgundy border-gold/30">
                          {lesson.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {lesson.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={lesson.completed ? "outline" : "default"}
                      onClick={() => handleStartLesson(lesson)}
                      className="ml-3"
                    >
                      {lesson.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-elegant text-lg text-burgundy flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Learning Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Badge variant="outline" className="justify-center p-2 bg-gold/10 text-burgundy border-gold/30">
              <BookOpen className="w-4 h-4 mr-1" />
              Theory Basics
            </Badge>
            <Badge variant="outline" className="justify-center p-2 bg-accent/10 text-accent-foreground border-accent/30">
              <Music className="w-4 h-4 mr-1" />
              Baroque Expert
            </Badge>
            <Badge variant="outline" className="justify-center p-2 bg-muted/50 text-muted-foreground border-muted">
              <Brain className="w-4 h-4 mr-1" />
              Harmony Master
            </Badge>
            <Badge variant="outline" className="justify-center p-2 bg-muted/50 text-muted-foreground border-muted">
              <Trophy className="w-4 h-4 mr-1" />
              Scholar
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};