# Decantr — Wine Community Platform (Frontend Demo)

A frontend prototype for the Decantr wine community platform, built for SEBA Master Assignment 2 (Group 57).

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (version 18 or higher) — [Download](https://nodejs.org/)
- **pnpm** (package manager) — Install with:
  ```bash
  npm install -g pnpm
  ```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Haoyuli2002/SEBA.git
cd SEBA/Wine\ application\ demo
```

### 2. Install dependencies

```bash
pnpm install
```

If you see an error about build scripts, run:
```bash
pnpm approve-builds
pnpm install
```

### 3. Start the development server

```bash
pnpm dev
```

The app will be available at: **http://localhost:5173/**

## How to Use

### Login

When you open the app, you'll see a **Login page** with two role options:

| Role | Description | Redirects to |
|------|-------------|-------------|
| **Wine Lover** | Consumer who attends tastings | `/explore` (Discover Events) |
| **Wine Business** | Bar/winery owner who hosts events | `/business` (Business Dashboard) |

1. Choose your role
2. Enter any email and password
3. You'll be redirected to the corresponding interface

### Register (New User)

Click "Sign up" to create a new account. Business users will need to select a subscription plan and enter payment details.

## Page Routes

### Consumer (Wine Lover) Pages

| Route | Page |
|-------|------|
| `/` | Login |
| `/register` | Register |
| `/explore` | Discover Events (map + list) |
| `/event/summer-rose` | Event Details |
| `/event/summer-rose/tasting` | Tasting Notes |
| `/event/summer-rose/summary` | Event Summary |
| `/tastings` | My Tastings |
| `/cellar` | Wine Collection (Journal + Cellar) |
| `/profile` | Profile & Settings |

### Business Pages

| Route | Page |
|-------|------|
| `/business` | Business Dashboard |
| `/business/events` | Events Manager |
| `/business/events/create` | Create Event |
| `/business/events/new-event/wines` | Manage Wine List |
| `/business/events/summer-rose/analytics` | Event Analytics |
| `/business/wines` | Wine Inventory |
| `/business/analytics` | Business Analytics |
| `/business/settings` | Settings |

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS 4** (styling)
- **React Router 7** (routing)
- **Recharts** (charts)
- **Lucide React** (icons)
- **Radix UI / shadcn/ui** (UI components)

## Project Structure

```
src/
├── app/
│   ├── components/       # Shared UI components
│   ├── context/          # React Context (UserContext, EventsContext)
│   ├── pages/            # All page components
│   │   ├── business/     # Business dashboard pages
│   │   └── ...           # Consumer pages
│   └── routes.tsx        # Route definitions
├── imports/              # SVG logos
└── styles/               # CSS files
```

## Troubleshooting

- **Port already in use?** Vite will automatically use the next available port (5174, etc.)
- **TypeScript errors in VS Code?** These are type declaration issues that don't affect runtime. The app runs fine.
- **Images not loading?** Make sure you have an internet connection (event images are loaded from Unsplash).