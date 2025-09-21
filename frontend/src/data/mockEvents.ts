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
    id: "nyphil-001",
    title: "New York Philharmonic: Mozart & Bartók",
    date: "2025-09-25",
    time: "7:30 PM",
    venue: "David Geffen Hall",
    priceType: "ticketed",
    price: "$45-165",
    program: [
      "Mozart: The Magic Flute Overture",
      "Mozart: Violin Concerto No. 5 in A major",
      "Bartók: The Wooden Prince Suite"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Mozart's final violin concerto paired with Bartók's colorful ballet music",
      listenFor: "The playful dialogue between violin and orchestra in Mozart, and the exotic orchestral colors in Bartók",
      funFact: "Mozart wrote this violin concerto when he was only 19 years old!"
    }
  },
  {
    id: "nyphil-002",
    title: "New York Philharmonic: Beethoven's Fifth",
    date: "2025-10-15",
    time: "7:30 PM",
    venue: "David Geffen Hall",
    priceType: "ticketed",
    price: "$45-165",
    program: [
      "Corigliano: Symphony No. 1",
      "Beethoven: Symphony No. 5"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "One of the most famous symphonies ever written, paired with a powerful modern work",
      listenFor: "The famous 'fate knocking at the door' opening motif in Beethoven",
      funFact: "Beethoven's Fifth Symphony was premiered in 1808 during a 4-hour concert!"
    }
  },
  {
    id: "carnegie-001",
    title: "Piano Recital: Daniil Trifonov",
    date: "2025-09-30",
    time: "7:00 PM",
    venue: "Carnegie Hall - Joan & Sanford I. Weill Recital Hall",
    priceType: "ticketed",
    price: "$45-95",
    program: [
      "Chopin: Ballades Nos. 1-4",
      "Debussy: Images Book II",
      "Ravel: Gaspard de la nuit"
    ],
    category: "recital",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Virtuosic piano works from the Romantic and Impressionist eras",
      listenFor: "The storytelling quality in Chopin's ballades and the colorful textures in French music",
      funFact: "Ravel's 'Gaspard de la nuit' was designed to be more difficult than any piano piece ever written!"
    }
  },
  {
    id: "carnegie-002",
    title: "Vienna Philharmonic",
    date: "2025-10-05",
    time: "8:00 PM",
    venue: "Carnegie Hall - Stern Auditorium",
    priceType: "ticketed",
    price: "$75-225",
    program: [
      "Brahms: Symphony No. 4",
      "Schumann: Piano Concerto",
      "Strauss: Till Eulenspiegel's Merry Pranks"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "German Romantic masterpieces performed by one of the world's greatest orchestras",
      listenFor: "The rich, warm sound of the Vienna Philharmonic and the playful melodies in Strauss",
      funFact: "The Vienna Philharmonic uses the same instruments and setup as they did 150 years ago!"
    }
  },
  {
    id: "carnegie-003",
    title: "Chamber Music: Emerson String Quartet",
    date: "2025-10-08",
    time: "8:00 PM",
    venue: "Carnegie Hall - Joan & Sanford I. Weill Recital Hall",
    priceType: "ticketed",
    price: "$35-75",
    program: [
      "Haydn: String Quartet Op. 76 No. 3 'Emperor'",
      "Bartók: String Quartet No. 6",
      "Dvořák: String Quartet No. 12 'American'"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "String quartet masterpieces spanning 200 years of music history",
      listenFor: "The conversation between the four instruments and memorable melodies",
      funFact: "Haydn's 'Emperor' quartet contains the melody that became the German national anthem!"
    }
  },
  {
    id: "met-001",
    title: "Metropolitan Opera: La Traviata",
    date: "2025-09-28",
    time: "7:30 PM",
    venue: "Metropolitan Opera House",
    priceType: "ticketed",
    price: "$35-295",
    program: [
      "Verdi: La Traviata"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Verdi's beloved tragic love story set in 19th-century Paris",
      listenFor: "The famous drinking song 'Libiamo' and Violetta's coloratura arias",
      funFact: "La Traviata was initially a flop because audiences thought it was too modern!"
    }
  },
  {
    id: "met-002",
    title: "Metropolitan Opera: Don Giovanni",
    date: "2025-10-12",
    time: "7:30 PM",
    venue: "Metropolitan Opera House",
    priceType: "ticketed",
    price: "$35-295",
    program: [
      "Mozart: Don Giovanni"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Mozart's dark comedy about the legendary seducer Don Juan",
      listenFor: "The dramatic confrontation scenes and the famous 'Catalog Aria'",
      funFact: "Mozart finished writing the overture just hours before the premiere!"
    }
  },
  {
    id: "lincoln-001",
    title: "Chamber Music Society: Wind Quintet",
    date: "2025-10-03",
    time: "7:30 PM",
    venue: "Alice Tully Hall",
    priceType: "ticketed",
    price: "$30-65",
    program: [
      "Mozart: Wind Quintet in E-flat major",
      "Dvořák: Wind Serenade Op. 44",
      "Milhaud: La cheminée du roi René"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Charming chamber music featuring wood and brass instruments",
      listenFor: "The blend of different wind instrument colors and textures",
      funFact: "Mozart's wind quintet was written for friends who were all court musicians!"
    }
  },
  {
    id: "brooklyn-001",
    title: "Brooklyn Philharmonic: American Classics",
    date: "2025-09-27",
    time: "8:00 PM",
    venue: "Brooklyn Academy of Music",
    priceType: "ticketed",
    price: "$25-85",
    program: [
      "Copland: Appalachian Spring",
      "Gershwin: Rhapsody in Blue",
      "Bernstein: Symphonic Dances from West Side Story"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Three iconic American composers celebrating the American musical spirit",
      listenFor: "The folk melodies in Copland, jazz elements in Gershwin, and Latin rhythms in Bernstein",
      funFact: "Gershwin wrote Rhapsody in Blue in just five weeks!"
    }
  },
  {
    id: "church-001",
    title: "Bach Vespers at Holy Trinity",
    date: "2025-10-06",
    time: "5:00 PM",
    venue: "Holy Trinity Lutheran Church",
    priceType: "free",
    program: [
      "Bach: Cantata BWV 140 'Wachet auf'",
      "Bach: Organ Preludes and Fugues"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Sacred Bach performed in an intimate church setting with historical instruments",
      listenFor: "The interweaving vocal lines and the powerful organ accompaniment",
      funFact: "Bach wrote over 200 cantatas, one for nearly every Sunday of the church year!"
    }
  },
  {
    id: "juilliard-001",
    title: "Juilliard Orchestra",
    date: "2025-10-10",
    time: "7:30 PM",
    venue: "Peter Jay Sharp Theater",
    priceType: "free",
    program: [
      "Prokofiev: Symphony No. 5",
      "Sibelius: Violin Concerto"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Rising stars perform powerful 20th-century masterpieces",
      listenFor: "The dramatic contrasts in Prokofiev and the Nordic atmosphere in Sibelius",
      funFact: "Prokofiev's Fifth Symphony was his musical response to World War II!"
    }
  },
  {
    id: "mannes-001",
    title: "Mannes Faculty Recital",
    date: "2025-09-29",
    time: "7:00 PM",
    venue: "Mannes School of Music",
    priceType: "free",
    program: [
      "Schubert: Piano Trio No. 2",
      "Mendelssohn: Piano Trio No. 1"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Romantic chamber music featuring piano, violin, and cello",
      listenFor: "The beautiful melodies and intimate conversation between instruments",
      funFact: "Schubert wrote his Piano Trio No. 2 just months before his death at age 31!"
    }
  },
  {
    id: "bargemusic-001",
    title: "Bargemusic: Brahms & Friends",
    date: "2025-10-04",
    time: "8:00 PM",
    venue: "Bargemusic",
    priceType: "ticketed",
    price: "$35-50",
    program: [
      "Brahms: Piano Quintet",
      "Schumann: Piano Quintet"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Romantic chamber music performed on a floating concert hall with Manhattan views",
      listenFor: "The rich harmonies and emotional depth of German Romantic music",
      funFact: "Bargemusic is built on a converted coffee barge from 1899!"
    }
  },
  {
    id: "nysymphonic-001",
    title: "New York Symphonic Ensemble",
    date: "2025-10-01",
    time: "7:00 PM",
    venue: "Merkin Concert Hall",
    priceType: "ticketed",
    price: "$20-40",
    program: [
      "Vivaldi: The Four Seasons",
      "Bach: Brandenburg Concerto No. 3"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Beloved Baroque masterpieces featuring solo violin and small orchestra",
      listenFor: "The musical depictions of nature in Vivaldi and the intricate counterpoint in Bach",
      funFact: "Vivaldi wrote The Four Seasons with accompanying poems describing each season!"
    }
  },
  {
    id: "grace-001",
    title: "Grace Rainey Rogers Auditorium: Mozart Evening",
    date: "2025-10-07",
    time: "6:30 PM",
    venue: "Metropolitan Museum of Art",
    priceType: "ticketed",
    price: "$25-45",
    program: [
      "Mozart: Piano Sonata K. 331",
      "Mozart: String Quartet K. 387",
      "Mozart: Clarinet Quintet K. 581"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "An evening dedicated to Mozart's chamber music in the museum setting",
      listenFor: "Mozart's perfect balance of elegance and emotional expression",
      funFact: "Mozart's Clarinet Quintet was written for his friend Anton Stadler!"
    }
  },
  {
    id: "concert-001",
    title: "Young Concert Artists: Rising Stars",
    date: "2025-10-09",
    time: "7:30 PM",
    venue: "Merkin Concert Hall",
    priceType: "ticketed",
    price: "$15-35",
    program: [
      "Chopin: Piano Sonata No. 3",
      "Debussy: Cello Sonata",
      "Franck: Violin Sonata"
    ],
    category: "recital",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Emerging artists perform challenging late-Romantic and impressionist works",
      listenFor: "The different musical languages of Polish, French, and Belgian composers",
      funFact: "Chopin's Piano Sonata No. 3 was his last completed large-scale work!"
    }
  },
  {
    id: "village-001",
    title: "The Village Trip Festival: World Premieres",
    date: "2025-10-11",
    time: "7:00 PM",
    venue: "St. John's in the Village",
    priceType: "ticketed",
    price: "$20-35",
    program: [
      "David Amram: Five American Voices (World Premiere)",
      "Carman Moore: A Village Triptych (World Premiere)"
    ],
    category: "concert",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Brand new works by contemporary American composers exploring American themes",
      listenFor: "Modern harmonies and rhythms that reflect contemporary American life",
      funFact: "David Amram has composed music for over 100 films and collaborated with Jack Kerouac!"
    }
  },
  {
    id: "music-001",
    title: "Music Before 1800: Handel & Purcell",
    date: "2025-09-26",
    time: "8:00 PM",
    venue: "Corpus Christi Church",
    priceType: "ticketed",
    price: "$25-40",
    program: [
      "Purcell: Dido and Aeneas (Concert Version)",
      "Handel: Music for the Royal Fireworks (Chamber Version)"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Baroque masterpieces performed on period instruments in a historic church",
      listenFor: "The ornate melodic lines and the different sound of historical instruments",
      funFact: "Handel's Music for the Royal Fireworks caused such excitement that 12,000 people attended rehearsal!"
    }
  },
  {
    id: "sunday-001",
    title: "Mostly Mozart Festival Orchestra",
    date: "2025-10-13",
    time: "7:00 PM",
    venue: "David Geffen Hall",
    priceType: "ticketed",
    price: "$30-75",
    program: [
      "Mozart: Symphony No. 39",
      "Mozart: Piano Concerto No. 27",
      "Mozart: Symphony No. 41 'Jupiter'"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "An all-Mozart program featuring his final two symphonies and last piano concerto",
      listenFor: "The perfect architecture of Mozart's mature style and the brilliant finale of the Jupiter Symphony",
      funFact: "Mozart never heard his Jupiter Symphony performed - he died before its first performance!"
    }
  },
  {
    id: "salon-001",
    title: "Classical Salon: Schubert Lieder",
    date: "2025-10-14",
    time: "7:30 PM",
    venue: "National Arts Club",
    priceType: "ticketed",
    price: "$35-55",
    program: [
      "Schubert: Winterreise (Winter Journey) - Complete Song Cycle"
    ],
    category: "recital",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Schubert's most profound song cycle about a journey through winter landscapes and despair",
      listenFor: "The intimate storytelling between voice and piano, and how music expresses the German poetry",
      funFact: "Winterreise was Schubert's last major work - he died the year after composing it!"
    }
  },
  {
    id: "laphil-001",
    title: "Los Angeles Philharmonic: Gustavo Dudamel - Reid & Strauss",
    date: "2025-09-25",
    time: "8:00 PM",
    venue: "Walt Disney Concert Hall",
    priceType: "ticketed",
    price: "$40-175",
    program: [
      "Reid: New Work (World Premiere)",
      "Strauss: Also sprach Zarathustra"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "A brand new composition paired with Strauss's famous philosophical tone poem",
      listenFor: "The famous opening fanfare of Zarathustra (used in 2001: A Space Odyssey)",
      funFact: "Also sprach Zarathustra was inspired by Friedrich Nietzsche's philosophical novel!"
    }
  },
  {
    id: "laphil-002",
    title: "Los Angeles Philharmonic: Zubin Mehta - Bruckner Symphony No. 8",
    date: "2025-11-07",
    time: "8:00 PM",
    venue: "Walt Disney Concert Hall",
    priceType: "ticketed",
    price: "$40-175",
    program: [
      "Bruckner: Symphony No. 8"
    ],
    category: "concert",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "One of the greatest symphonies ever written, conducted by legendary maestro Zubin Mehta",
      listenFor: "The massive orchestral climaxes and beautiful brass chorale sections",
      funFact: "Bruckner's 8th Symphony lasts about 90 minutes and is called the 'Apocalyptic'!"
    }
  },
  {
    id: "laphil-003",
    title: "Los Angeles Philharmonic: Patti Smith Collaboration",
    date: "2025-11-15",
    time: "8:00 PM",
    venue: "Walt Disney Concert Hall",
    priceType: "ticketed",
    price: "$45-185",
    program: [
      "Various orchestral works with Patti Smith poetry readings"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Rock legend Patti Smith collaborates with the LA Phil in a unique evening",
      listenFor: "The blend of classical music with spoken word poetry",
      funFact: "Patti Smith is known as the 'Godmother of Punk' but also writes acclaimed poetry!"
    }
  },
  {
    id: "laphil-004",
    title: "Los Angeles Philharmonic: Beethoven's Ninth",
    date: "2025-10-18",
    time: "8:00 PM",
    venue: "Walt Disney Concert Hall",
    priceType: "ticketed",
    price: "$40-175",
    program: [
      "Beethoven: Symphony No. 9 'Choral'"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Beethoven's final symphony featuring the famous 'Ode to Joy' with full chorus",
      listenFor: "The triumphant finale with choir singing Schiller's 'Ode to Joy'",
      funFact: "Beethoven was completely deaf when he composed this symphony!"
    }
  },
  {
    id: "laco-001",
    title: "Los Angeles Chamber Orchestra: Mozart & Haydn",
    date: "2025-09-28",
    time: "7:30 PM",
    venue: "Royce Hall, UCLA",
    priceType: "ticketed",
    price: "$30-85",
    program: [
      "Mozart: Symphony No. 40",
      "Haydn: Cello Concerto No. 1",
      "Mozart: Symphony No. 41 'Jupiter'"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Two masterpieces by Mozart bookend a charming Haydn cello concerto",
      listenFor: "The dramatic opening of Mozart's 40th and the brilliant counterpoint in the Jupiter finale",
      funFact: "Mozart's 40th Symphony is one of only two he wrote in a minor key!"
    }
  },
  {
    id: "colburn-001",
    title: "Colburn Chamber Music: Piano Trios",
    date: "2025-10-05",
    time: "7:30 PM",
    venue: "Colburn School - Zipper Concert Hall",
    priceType: "free",
    program: [
      "Brahms: Piano Trio No. 1",
      "Ravel: Piano Trio"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Romantic German music meets French impressionism in this piano trio evening",
      listenFor: "The passionate melodies in Brahms and the exotic colors in Ravel",
      funFact: "Ravel's Piano Trio was composed just before World War I broke out!"
    }
  },
  {
    id: "music-center-001",
    title: "Music Center Recital: Hilary Hahn, Violin",
    date: "2025-10-12",
    time: "8:00 PM",
    venue: "Dorothy Chandler Pavilion",
    priceType: "ticketed",
    price: "$45-125",
    program: [
      "Bach: Partita No. 2 for Solo Violin",
      "Brahms: Violin Sonata No. 3",
      "Contemporary Works"
    ],
    category: "recital",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "World-renowned violinist in a program spanning three centuries",
      listenFor: "The technical mastery required for Bach's solo violin works",
      funFact: "Bach's Partita No. 2 ends with the famous Chaconne, considered one of the greatest pieces ever written!"
    }
  },
  {
    id: "usc-001",
    title: "USC Thornton Symphony",
    date: "2025-09-30",
    time: "7:30 PM",
    venue: "USC - Bovard Auditorium",
    priceType: "free",
    program: [
      "Copland: Appalachian Spring Suite",
      "Dvořák: Symphony No. 9 'From the New World'"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "American classics performed by talented music students",
      listenFor: "The folk melodies woven throughout both pieces",
      funFact: "Dvořák wrote his 'New World' Symphony while living in New York in the 1890s!"
    }
  },
  {
    id: "redlands-001",
    title: "Redlands Symphony: Mahler's Fourth",
    date: "2025-10-25",
    time: "7:30 PM",
    venue: "University of Redlands - Memorial Chapel",
    priceType: "ticketed",
    price: "$25-55",
    program: [
      "Mahler: Symphony No. 4"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Mahler's most accessible symphony featuring a beautiful soprano finale",
      listenFor: "The child-like innocence and the heavenly final movement with soprano solo",
      funFact: "Mahler's 4th Symphony depicts a child's view of heaven!"
    }
  },
  {
    id: "pasadena-001",
    title: "Pasadena Symphony: Tchaikovsky Spectacular",
    date: "2025-10-11",
    time: "8:00 PM",
    venue: "Pasadena Civic Auditorium",
    priceType: "ticketed",
    price: "$35-95",
    program: [
      "Tchaikovsky: Piano Concerto No. 1",
      "Tchaikovsky: Symphony No. 5"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Two of Tchaikovsky's most beloved works in one evening",
      listenFor: "The famous opening chords of the Piano Concerto and the fate theme in the Symphony",
      funFact: "Tchaikovsky's Piano Concerto was initially rejected by pianist Nikolai Rubinstein as 'unplayable'!"
    }
  },
  {
    id: "santa-monica-001",
    title: "Santa Monica Symphony: Film Music Night",
    date: "2025-10-19",
    time: "7:30 PM",
    venue: "Santa Monica High School Auditorium",
    priceType: "ticketed",
    price: "$15-35",
    program: [
      "Williams: Star Wars Suite",
      "Elfman: Batman Theme",
      "Zimmer: Interstellar Suite"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Hollywood film music performed by local symphony orchestra",
      listenFor: "How these composers use the orchestra to create cinematic emotions",
      funFact: "John Williams has been nominated for 54 Academy Awards, more than any living person!"
    }
  },
  {
    id: "cal-arts-001",
    title: "CalArts New Music Ensemble",
    date: "2025-10-08",
    time: "8:00 PM",
    venue: "California Institute of the Arts",
    priceType: "free",
    program: [
      "Adams: Short Ride in a Fast Machine",
      "Reich: Different Trains",
      "Glass: Metamorphosis"
    ],
    category: "concert",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Contemporary American minimalist composers in an evening of modern sounds",
      listenFor: "The repetitive patterns and gradual changes characteristic of minimalism",
      funFact: "Steve Reich's 'Different Trains' uses recorded speech as part of the musical composition!"
    }
  },
  {
    id: "long-beach-001",
    title: "Long Beach Symphony: Gershwin & Bernstein",
    date: "2025-10-04",
    time: "7:30 PM",
    venue: "Carpenter Performing Arts Center",
    priceType: "ticketed",
    price: "$28-75",
    program: [
      "Gershwin: Rhapsody in Blue",
      "Bernstein: Symphonic Dances from West Side Story",
      "Gershwin: An American in Paris"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "American composers who brought jazz and popular music into the concert hall",
      listenFor: "The jazz harmonies and rhythms woven into classical orchestral textures",
      funFact: "Gershwin's 'An American in Paris' includes actual French taxi horns in the score!"
    }
  },
  {
    id: "disney-hall-002",
    title: "Chamber Music Series: Tokyo String Quartet",
    date: "2025-09-26",
    time: "7:30 PM",
    venue: "Walt Disney Concert Hall - BP Hall",
    priceType: "ticketed",
    price: "$40-85",
    program: [
      "Beethoven: String Quartet Op. 131",
      "Debussy: String Quartet",
      "Bartók: String Quartet No. 4"
    ],
    category: "recital",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Three masterpieces of the string quartet literature from different eras",
      listenFor: "The intense emotional journey of Beethoven's late style",
      funFact: "Beethoven's Op. 131 has seven movements played without pause - he called it his greatest work!"
    }
  },
  {
    id: "beverly-hills-001",
    title: "Beverly Hills Auditorium: Chopin Recital",
    date: "2025-10-15",
    time: "7:00 PM",
    venue: "Beverly Hills High School Auditorium",
    priceType: "ticketed",
    price: "$25-50",
    program: [
      "Chopin: Ballades Nos. 1-4",
      "Chopin: Polonaise-Fantasy",
      "Chopin: Scherzo No. 4"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "An evening devoted to the poetry and passion of Chopin's piano music",
      listenFor: "The singing melodies and the way Chopin makes the piano sound like an entire orchestra",
      funFact: "Chopin wrote almost exclusively for the piano - it was his chosen voice for musical expression!"
    }
  },
  {
    id: "orange-county-001",
    title: "Pacific Symphony: Mahler's Fifth",
    date: "2025-11-01",
    time: "8:00 PM",
    venue: "Renée and Henry Segerstrom Concert Hall",
    priceType: "ticketed",
    price: "$35-115",
    program: [
      "Mahler: Symphony No. 5"
    ],
    category: "concert",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Mahler's breakthrough symphony featuring the famous Adagietto",
      listenFor: "The dramatic funeral march opening and the tender fourth movement love song",
      funFact: "The Adagietto was featured prominently in the film 'Death in Venice' by Luchino Visconti!"
    }
  },
  {
    id: "pomona-001",
    title: "Pomona College Choir: Bach St. Matthew Passion",
    date: "2025-10-20",
    time: "7:30 PM",
    venue: "Pomona College - Bridges Auditorium",
    priceType: "free",
    program: [
      "Bach: St. Matthew Passion (Complete)"
    ],
    category: "concert",
    beginnerFriendly: false,
    beginnersNotes: {
      context: "Bach's monumental passion telling the story of Christ's crucifixion",
      listenFor: "The dialogue between the Evangelist narrator and other characters",
      funFact: "The St. Matthew Passion lasts nearly 3 hours and was forgotten for 100 years until Mendelssohn revived it!"
    }
  },
  {
    id: "ucla-001",
    title: "UCLA Center for the Art of Performance: Kronos Quartet",
    date: "2025-10-29",
    time: "8:00 PM",
    venue: "Royce Hall",
    priceType: "ticketed",
    price: "$40-95",
    program: [
      "Glass: String Quartet No. 5",
      "Astor Piazzolla: Four for Tango",
      "Terry Riley: Cadenza on the Night Plain"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "The world's most adventurous string quartet performs contemporary masterpieces",
      listenFor: "How these composers expand the sound world of the traditional string quartet",
      funFact: "Kronos Quartet has premiered over 1,000 new works in their 50-year career!"
    }
  },
  {
    id: "chapman-001",
    title: "Chapman University Orchestra: Russian Spectacular",
    date: "2025-11-08",
    time: "7:30 PM",
    venue: "Chapman University - Musco Center",
    priceType: "ticketed",
    price: "$20-45",
    program: [
      "Rachmaninoff: Piano Concerto No. 2",
      "Stravinsky: Firebird Suite"
    ],
    category: "concert",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Two of the most beloved Russian orchestral works",
      listenFor: "The lush melodies in Rachmaninoff and the exotic orchestral colors in Stravinsky",
      funFact: "Rachmaninoff's Second Piano Concerto helped cure his three-year composer's block!"
    }
  },
  {
    id: "intimate-001",
    title: "Intimate Musical Mornings: Schubert Songs",
    date: "2025-10-26",
    time: "11:00 AM",
    venue: "Private Home in Beverly Hills",
    priceType: "ticketed",
    price: "$75-125",
    program: [
      "Schubert: Die schöne Müllerin (Complete Song Cycle)"
    ],
    category: "recital",
    beginnerFriendly: true,
    beginnersNotes: {
      context: "Schubert's song cycle about a young miller's tragic love story",
      listenFor: "How the piano and voice work together to tell the story",
      funFact: "Schubert wrote over 600 songs in his short 31-year life, creating the art song as we know it!"
    }
  }
];