# Decantr - Wine Community Platform (Frontend Demo)

A frontend prototype for the Decantr wine community platform, built for SEBA Master Assignment 2 (Group 57).

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS 4** (styling)
- **React Router 7** (routing)
- **Recharts** (charts in analytics)
- **Lucide React** (icons)
- **Radix UI / shadcn/ui** (UI components)

## Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) or npm

```bash
# Install pnpm if you don't have it
npm install -g pnpm
```

## Getting Started

```bash
# 1. Navigate to the project folder
cd "Wine application demo"

# 2. Approve build scripts (required by pnpm for tailwindcss/esbuild)
pnpm approve-builds

# 3. Install dependencies
pnpm install

# 4. Start the development server
pnpm dev
```

The app will be available at **http://localhost:5173/**

### Alternative: Using npm

```bash
cd "Wine application demo"
npm install
npm run dev
```

## How to Use the Demo

### Login Flow

When you open the app, you'll see a **Login page** with two role options:

| Role | Description | Redirects to |
|------|-------------|-------------|
| **Wine Lover** | Consumer who attends tastings | `/explore` (Discover Events) |
| **Wine Business** | Bar/winery owner who hosts events | `/business` (Business Dashboard) |

1. Choose your role (Wine Lover or Wine Business)
2. Enter any email and password (no real authentication)
3. You'll be redirected to the corresponding interface

### Registration

Click "Sign up" on the login page to access the registration flow, which also asks you to choose a role first.

## Page Routes

### Consumer (Wine Lover) Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Login | Role selection + email/password login |
| `/register` | Register | Role selection + registration form |
| `/explore` | Discover Events | Map + list view of wine events |
| `/event/:eventId` | Event Details | Event info, host, pricing, registration |
| `/event/:eventId/tasting` | Tasting Notes | Record notes for each wine (appearance, aroma, palate, rating) |
| `/event/:eventId/summary` | Event Summary | Post-event wine reveal + taste profile + save to cellar |
| `/tastings` | My Tastings | History of tasting sessions |
| `/cellar` | Wine Collection | Personal wine journey + owned bottles |
| `/profile` | Profile | User profile settings |

### Business Pages

| Route | Page | Description |
|-------|------|-------------|
| `/business` | Business Dashboard | Overview, stats, quick actions |
| `/business/events` | Events Manager | List of all events |
| `/business/events/create` | Create Event | Form to create a new tasting event |
| `/business/events/:eventId/wines` | Manage Wine List | Add/edit/delete wines for an event (CRUD) |
| `/business/events/:eventId/analytics` | Event Analytics | Ratings, flavor insights, wine rankings |
| `/business/wines` | Wine Inventory | Full wine inventory |
| `/business/analytics` | Business Analytics | Overall business analytics |
| `/business/settings` | Settings | Business settings |

## Demo Data

The app uses hardcoded demo data (no backend). Key demo events:

- **Summer Rosé Tasting** (`/event/summer-rose`) - Main demo event with full flow
- **Natural Wine Wednesday** (`/event/natural-wine`)
- **Blind Tasting Challenge** (`/event/blind-tasting`)

## Customer Journey (for Assignment 2)

The demo follows this customer journey:

1. **Sophie** (Business) → Register → Create Event → Add Wines → Publish
2. **Alex** (Consumer) → Register → Explore → Find Event → Register for Event
3. **Alex** → Attend Event → Record Tasting Notes
4. **Alex** → View Summary → Save Wines to Cellar
5. **Sophie** → View Analytics Dashboard → Optimize Wine List

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── AppLayout.tsx      # Main layout with sidebar (consumer)
│   │   ├── BottomNav.tsx      # Mobile bottom navigation
│   │   └── ui/               # shadcn/ui components
│   ├── pages/
│   │   ├── Login.tsx          # Login (role selection + credentials)
│   │   ├── Register.tsx       # Registration (role selection + form)
│   │   ├── DiscoverEvents.tsx # Event discovery with map + filters
│   │   ├── EventDetails.tsx   # Event info + registration
│   │   ├── TastingNotes.tsx   # Wine-by-wine tasting form
│   │   ├── EventSummary.tsx   # Post-event summary + cellar save
│   │   ├── Cellar.tsx         # Personal wine collection
│   │   ├── MyTastings.tsx     # Tasting history
│   │   ├── Profile.tsx        # User profile
│   │   └── business/
│   │       ├── BusinessDashboard.tsx  # Business layout + sidebar
│   │       ├── DashboardHome.tsx      # Business home
│   │       ├── CreateEvent.tsx        # Event creation form
│   │       ├── ManageWineList.tsx     # CRUD wine management
│   │       ├── Analytics.tsx          # Event analytics + charts
│   │       └── ...
│   └── routes.tsx             # All route definitions
├── imports/                   # SVG logos
└── styles/                    # CSS (Tailwind, theme, fonts)
```

## Notes

- This is a **frontend-only prototype** (no backend/database)
- All data is hardcoded for demo/mockup purposes
- The full MERN stack implementation will be done in subsequent assignments
- TypeScript type errors about `@types/react` are resolved after running `pnpm install`