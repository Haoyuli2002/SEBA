import { createContext, useContext, useState } from "react";

export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  price: number;
  registered: number;
  capacity: number;
  rating: number;
  host: string;
  image: string;
  description: string;
  included: string[];
  eventType: "open" | "registration";
  status: "draft" | "published" | "completed";
  wines: WineData[];
}

export interface WineData {
  id: string;
  name: string;
  type: string;
  region: string;
  vintage: string;
  grapeVariety: string;
  order: number;
}

interface EventsContextType {
  events: EventData[];
  addEvent: (event: EventData) => void;
  getEventById: (id: string) => EventData | undefined;
}

// Default mock events
const defaultEvents: EventData[] = [
  {
    id: "summer-rose",
    title: "Summer Rosé Tasting",
    date: "Jun 14, 2026",
    time: "18:00",
    venue: "Weinkultur, Schwabing",
    address: "Leopoldstraße 45, Munich",
    price: 15,
    registered: 12,
    capacity: 20,
    rating: 4.5,
    host: "Weinkultur",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
    description: "Join us for an evening exploring premium Rosé wines from Provence. Taste 4 carefully selected wines, learn about the region, and enjoy light snacks paired with each wine.",
    included: ["4 premium wine tastings", "Tasting sheet and notes", "Light snacks and bread", "Expert sommelier guidance"],
    eventType: "registration",
    status: "published",
    wines: [
      { id: "w1", name: "Château d'Esclans Whispering Angel 2023", type: "Rosé", region: "Provence", vintage: "2023", grapeVariety: "Grenache, Cinsault", order: 1 },
      { id: "w2", name: "Domaines Ott By.Ott 2022", type: "Rosé", region: "Provence", vintage: "2022", grapeVariety: "Grenache, Syrah", order: 2 },
      { id: "w3", name: "Miraval Studio 2023", type: "Rosé", region: "Provence", vintage: "2023", grapeVariety: "Grenache, Cinsault, Syrah", order: 3 },
      { id: "w4", name: "Minuty Prestige 2022", type: "Rosé", region: "Côtes de Provence", vintage: "2022", grapeVariety: "Grenache, Tibouren", order: 4 },
    ],
  },
  {
    id: "natural-wine",
    title: "Natural Wine Wednesday",
    date: "Jun 11, 2026",
    time: "19:00",
    venue: "Vinothek Maxvorstadt",
    address: "Augustenstraße 12, Munich",
    price: 0,
    registered: 8,
    capacity: 15,
    rating: 4.3,
    host: "Vinothek Maxvorstadt",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop",
    description: "Discover the world of natural and organic wines.",
    included: ["3 natural wine tastings", "Organic cheese pairing", "Winemaker Q&A"],
    eventType: "open",
    status: "published",
    wines: [],
  },
  {
    id: "blind-tasting",
    title: "Blind Tasting Challenge",
    date: "Jun 18, 2026",
    time: "20:00",
    venue: "Cork & Barrel",
    address: "Sendlinger Straße 23, Munich",
    price: 25,
    registered: 5,
    capacity: 12,
    rating: 4.7,
    host: "Cork & Barrel",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=300&fit=crop",
    description: "Test your palate in this exciting blind tasting competition.",
    included: ["5 mystery wines", "Scorecard", "Prize for winner", "Snacks"],
    eventType: "registration",
    status: "published",
    wines: [],
  },
  {
    id: "italian-reds",
    title: "Italian Red Wine Journey",
    date: "Jun 22, 2026",
    time: "19:30",
    venue: "Vino Italiano",
    address: "Frauenstraße 8, Munich",
    price: 20,
    registered: 15,
    capacity: 20,
    rating: 4.6,
    host: "Vino Italiano",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
    description: "Explore the diverse regions of Italian red wines.",
    included: ["4 Italian red tastings", "Bruschetta pairing", "Regional wine map"],
    eventType: "registration",
    status: "published",
    wines: [],
  },
  {
    id: "champagne-evening",
    title: "Champagne & Sparkling Wines",
    date: "Jun 25, 2026",
    time: "18:30",
    venue: "Bubbles Bar",
    address: "Maximilianstraße 15, Munich",
    price: 30,
    registered: 10,
    capacity: 16,
    rating: 4.8,
    host: "Bubbles Bar",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop",
    description: "Celebrate with premium champagnes and sparkling wines.",
    included: ["5 sparkling tastings", "Oyster pairing", "Champagne house history"],
    eventType: "registration",
    status: "published",
    wines: [],
  },
];

const EventsContext = createContext<EventsContextType>({
  events: defaultEvents,
  addEvent: () => {},
  getEventById: () => undefined,
});

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<EventData[]>(defaultEvents);

  const addEvent = (event: EventData) => {
    setEvents((prev) => [...prev, event]);
  };

  const getEventById = (id: string) => {
    return events.find((e) => e.id === id);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, getEventById }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}