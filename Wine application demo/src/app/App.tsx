import { RouterProvider } from "react-router";
import { router } from "./routes";
import { UserProvider } from "./context/UserContext";
import { EventsProvider } from "./context/EventsContext";

export default function App() {
  return (
    <UserProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </UserProvider>
  );
}