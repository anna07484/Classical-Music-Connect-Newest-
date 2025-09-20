export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  priceType: "free" | "ticketed";
  price?: string;
  program: string[];
  category: "concert" | "recital";
  beginnerFriendly: boolean;
  beginnersNotes?: {
    context: string;
    listenFor: string;
    funFact: string;
  };
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Mozart Piano Concerto No. 21",
    date: "March 15, 2025",
    time: "7:30 PM",
    venue: "Carnegie Hall",
    priceType: "ticketed",
    price: "$35-85",
    program: [
      "Mozart - Piano Concerto No. 21 in C major, K. 467",
      "Beethoven - Symphony No. 5 in C minor",
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Mozart's Piano Concerto No. 21 is famous for its gorgeous slow movement, often called 'Elvira Madigan' after a Swedish film that used it.",
      listenFor: "The playful dialogue between piano and orchestra, especially the crystalline piano runs and the dreamy second movement melody.",
      funFact: "Mozart wrote this concerto in just 4 weeks while also composing The Marriage of Figaro!"
    }
  },
  {
    id: "2",
    title: "Student Showcase: Bach & Beyond",
    date: "March 18, 2025",
    time: "3:00 PM",
    venue: "Juilliard School - Paul Hall",
    priceType: "free",
    program: [
      "Bach - Goldberg Variations (selections)",
      "Chopin - Ballade No. 1 in G minor",
      "Debussy - Clair de Lune",
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Bach's Goldberg Variations were originally written to help a count with insomnia - they're both soothing and intellectually stimulating.",
      listenFor: "How each variation transforms the same basic melody in completely different ways - like musical magic tricks!",
      funFact: "Glenn Gould's recording of these variations made him famous overnight at age 22."
    }
  },
  {
    id: "3",
    title: "Beethoven Symphony No. 9 'Choral'",
    date: "March 22, 2025",
    time: "8:00 PM",
    venue: "Lincoln Center - Avery Fisher Hall",
    priceType: "ticketed",
    price: "$45-120",
    program: [
      "Beethoven - Symphony No. 9 in D minor, Op. 125 'Choral'",
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Beethoven's final symphony includes voices singing Schiller's 'Ode to Joy' - a celebration of universal brotherhood and joy.",
      listenFor: "The famous 'Ode to Joy' melody first appears quietly in the orchestra before building to the triumphant choral finale.",
      funFact: "Beethoven was completely deaf when he premiered this symphony, and had to be turned around to see the audience's applause!"
    }
  },
  {
    id: "4",
    title: "Chamber Music Afternoon",
    date: "March 25, 2025",
    time: "2:00 PM",
    venue: "Frick Collection",
    priceType: "ticketed",
    price: "$25",
    program: [
      "Schubert - String Quartet No. 14 'Death and the Maiden'",
      "Brahms - Piano Quintet in F minor",
    ],
    category: "concert",
    beginnerFriendly: false,
  },
  {
    id: "5",
    title: "Young Artists Recital: Romantic Era",
    date: "March 28, 2025",
    time: "7:00 PM",
    venue: "Manhattan School of Music",
    priceType: "free",
    program: [
      "Schumann - Kinderszenen",
      "Liszt - Hungarian Rhapsody No. 2",
      "Chopin - Nocturne in E-flat major",
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "The Romantic era focused on expressing deep emotions and telling stories through music - perfect for newcomers to connect with.",
      listenFor: "How the piano can sound like an entire orchestra, with thunderous passages and delicate whispers.",
      funFact: "Liszt was the first true 'rock star' of classical music - women would faint at his concerts!"
    }
  },
  {
    id: "6",
    title: "Vivaldi's Four Seasons",
    date: "April 2, 2025",
    time: "7:30 PM",
    venue: "St. Bartholomew's Church",
    priceType: "ticketed",
    price: "$30",
    program: [
      "Vivaldi - The Four Seasons",
      "Bach - Brandenburg Concerto No. 3",
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Vivaldi wrote poems describing each season, then composed music to match - you can literally hear storms, birds, and crackling fires!",
      listenFor: "Bird calls in Spring, thunderstorms in Summer, harvest celebrations in Autumn, and chattering teeth in Winter.",
      funFact: "Vivaldi taught at an orphanage for girls and wrote most of his 400+ concertos for his talented students to perform."
    }
  }
];