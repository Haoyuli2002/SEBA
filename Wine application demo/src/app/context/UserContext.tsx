import { createContext, useContext, useState } from "react";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: "taster" | "business";
  businessName?: string;
  businessType?: string;
  location?: string;
  memberSince?: string;
  isNewUser: boolean;
}

export interface RegisteredEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  price: number;
  status: "confirmed" | "completed";
  registeredAt: string;
}

export interface JourneyWine {
  id: string;
  name: string;
  type: string;
  region: string;
  vintage: string;
  rating: number;
  notes: string;
  tastedAt: string;
  tastedDate: string;
  tags: string[];
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  logout: () => void;
  registeredEvents: RegisteredEvent[];
  registerForEvent: (event: RegisteredEvent) => void;
  journeyWines: JourneyWine[];
  addToJourney: (wines: JourneyWine[]) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  registeredEvents: [],
  registerForEvent: () => {},
  journeyWines: [],
  addToJourney: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserData | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [journeyWines, setJourneyWines] = useState<JourneyWine[]>([]);

  const logout = () => {
    setUserState(null);
    setRegisteredEvents([]);
    setJourneyWines([]);
  };

  const registerForEvent = (event: RegisteredEvent) => {
    setRegisteredEvents((prev) => {
      if (prev.some((e) => e.id === event.id)) return prev;
      return [...prev, event];
    });
  };

  const addToJourney = (wines: JourneyWine[]) => {
    setJourneyWines((prev) => {
      const newWines = wines.filter((w) => !prev.some((p) => p.id === w.id));
      return [...prev, ...newWines];
    });
  };

  const handleSetUser = (userData: UserData | null) => {
    setUserState(userData);
    if (userData) {
      if (!userData.isNewUser && userData.role === "taster") {
        // Pre-populate demo data for existing users (Alex)
        setRegisteredEvents([
          {
            id: "summer-rose",
            title: "Summer Rosé Tasting",
            date: "June 14, 2026",
            time: "18:00",
            venue: "Weinkultur, Schwabing",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
            price: 15,
            status: "confirmed",
            registeredAt: "2026-05-20",
          },
          {
            id: "natural-wine",
            title: "Natural Wine Wednesday",
            date: "June 11, 2026",
            time: "19:00",
            venue: "Vinothek Maxvorstadt",
            image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop",
            price: 0,
            status: "confirmed",
            registeredAt: "2026-05-15",
          },
        ]);
        setJourneyWines([
          {
            id: "journey-1",
            name: "Domaines Ott By.Ott 2022",
            type: "Rosé",
            region: "Provence, France",
            vintage: "2022",
            rating: 5,
            notes: "Very refreshing, perfect for summer. Light strawberry finish.",
            tastedAt: "Summer Rosé Tasting",
            tastedDate: "June 14, 2026",
            tags: ["Strawberry", "Crisp", "Light-bodied"],
          },
          {
            id: "journey-2",
            name: "Minuty Prestige 2022",
            type: "Rosé",
            region: "Côtes de Provence, France",
            vintage: "2022",
            rating: 4,
            notes: "Lovely peach notes with a fruity character.",
            tastedAt: "Summer Rosé Tasting",
            tastedDate: "June 14, 2026",
            tags: ["Peach", "Fruity"],
          },
          {
            id: "journey-3",
            name: "Château Margaux 2018",
            type: "Red",
            region: "Bordeaux, France",
            vintage: "2018",
            rating: 5,
            notes: "Incredible depth and complexity. Blackberry and oak.",
            tastedAt: "Winter Red Wine Collection",
            tastedDate: "January 20, 2026",
            tags: ["Blackberry", "Oak", "Full-bodied"],
          },
        ]);
      } else {
        setRegisteredEvents([]);
        setJourneyWines([]);
      }
    } else {
      setRegisteredEvents([]);
      setJourneyWines([]);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, logout, registeredEvents, registerForEvent, journeyWines, addToJourney }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}