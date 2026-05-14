import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { Login } from "./pages/Login";
import { DiscoverEvents } from "./pages/DiscoverEvents";
import { EventDetails } from "./pages/EventDetails";
import { TastingNotes } from "./pages/TastingNotes";
import { EventSummary } from "./pages/EventSummary";
import { MyTastings } from "./pages/MyTastings";
import { Cellar } from "./pages/Cellar";
import { Profile } from "./pages/Profile";
import { BusinessDashboard } from "./pages/business/BusinessDashboard";
import { DashboardHome } from "./pages/business/DashboardHome";
import { EventsManager } from "./pages/business/EventsManager";
import { WineInventory } from "./pages/business/WineInventory";
import { BusinessAnalytics } from "./pages/business/BusinessAnalytics";
import { SettingsPage } from "./pages/business/SettingsPage";
import { CreateEvent } from "./pages/business/CreateEvent";
import { ManageWineList } from "./pages/business/ManageWineList";
import { Analytics } from "./pages/business/Analytics";
import { Register } from "./pages/Register";

function withLayout(Component: React.ComponentType) {
  return () => (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/explore",
    Component: withLayout(DiscoverEvents),
  },
  {
    path: "/event/:eventId",
    Component: withLayout(EventDetails),
  },
  {
    path: "/event/:eventId/tasting",
    Component: withLayout(TastingNotes),
  },
  {
    path: "/event/:eventId/summary",
    Component: withLayout(EventSummary),
  },
  {
    path: "/tastings",
    Component: withLayout(MyTastings),
  },
  {
    path: "/cellar",
    Component: withLayout(Cellar),
  },
  {
    path: "/profile",
    Component: withLayout(Profile),
  },
  {
    path: "/business",
    Component: BusinessDashboard,
    children: [
      { index: true, Component: DashboardHome },
      { path: "events", Component: EventsManager },
      { path: "wines", Component: WineInventory },
      { path: "analytics", Component: BusinessAnalytics },
      { path: "settings", Component: SettingsPage },
    ],
  },
  {
    path: "/business/events/create",
    Component: CreateEvent,
  },
  {
    path: "/business/events/:eventId/wines",
    Component: ManageWineList,
  },
  {
    path: "/business/events/:eventId/analytics",
    Component: Analytics,
  },
]);