export interface Event {
  id: string;
  title: string;
  club: string;
  description: string;
  category: string;
  tags: string[];
  dateTime: string;
  venue: string;
  createdBy: string;
  interested: number;
  going: number;
}

export const INITIAL_EVENTS: Event[] = [
  {
    id: "1",
    title: "EXTEMPORE",
    club: "Toastmasters",
    description: "Spontaneous speaking competition to test your quick thinking and communication skills",
    category: "Competition",
    tags: ["Public Speaking", "Competition"],
    dateTime: "2025-10-06T13:45:00",
    venue: "MBA Conference Room",
    createdBy: "organizer@college.edu",
    interested: 45,
    going: 32,
  },
  {
    id: "2",
    title: "LinkedIn Success",
    club: "E-CELL",
    description: "Introduction to LinkedIn and personal branding for career growth",
    category: "Workshop",
    tags: ["Career", "Networking", "LinkedIn"],
    dateTime: "2025-10-06T13:45:00",
    venue: "ECL 06",
    createdBy: "organizer@college.edu",
    interested: 78,
    going: 56,
  },
  {
    id: "3",
    title: "Raw and Rare Workshop",
    club: "Incubation Cell",
    description: "Startup journey from idea to execution - learn from successful entrepreneurs",
    category: "Workshop",
    tags: ["Startup", "Entrepreneurship", "Business"],
    dateTime: "2025-10-06T13:45:00",
    venue: "Gyaan Mandir Auditorium",
    createdBy: "organizer@college.edu",
    interested: 92,
    going: 67,
  },
  {
    id: "4",
    title: "AUDITIONS - Diwali Festival",
    club: "Dance Club",
    description: "Auditions for the upcoming Diwali festival dance performances",
    category: "Audition",
    tags: ["Dance", "Festival", "Diwali"],
    dateTime: "2025-10-07T13:45:00",
    venue: "Civil Front",
    createdBy: "organizer@college.edu",
    interested: 65,
    going: 48,
  },
  {
    id: "5",
    title: "Core Team Auditions",
    club: "Music Club",
    description: "Join the music club core team - showcase your musical talent",
    category: "Audition",
    tags: ["Music", "Audition", "Core Team"],
    dateTime: "2025-10-07T13:45:00",
    venue: "J.C. Bose",
    createdBy: "organizer@college.edu",
    interested: 54,
    going: 41,
  },
  {
    id: "6",
    title: "Clean Drive",
    club: "NSS",
    description: "Plastic-free campus initiative - help make our campus greener",
    category: "Social",
    tags: ["Environment", "Social Service", "Campus"],
    dateTime: "2025-10-08T13:45:00",
    venue: "Football Ground",
    createdBy: "organizer@college.edu",
    interested: 38,
    going: 29,
  },
  {
    id: "7",
    title: "Hands on Workshop",
    club: "XPOSURE",
    description: "Photography workshop covering composition, lighting, and editing techniques",
    category: "Workshop",
    tags: ["Photography", "Workshop", "Creative"],
    dateTime: "2025-10-08T13:45:00",
    venue: "CS Block 103",
    createdBy: "organizer@college.edu",
    interested: 71,
    going: 52,
  },
  {
    id: "8",
    title: "Workshop on Canva",
    club: "Design Club",
    description: "Learn graphic design basics and create stunning visuals using Canva",
    category: "Workshop",
    tags: ["Design", "Canva", "Graphics"],
    dateTime: "2025-10-09T13:45:00",
    venue: "CS Block 304",
    createdBy: "organizer@college.edu",
    interested: 88,
    going: 63,
  },
];
