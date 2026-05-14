Decantr - Customer Journey Document
PAGE 1: Personas
Persona 1: Sophie Wagner — Wine Bar Owner (B2B)
Attribute	Details
Age	42
Occupation	Owner of "Weinkultur," a boutique wine bar in Munich
Background	Has been running her wine bar for 5 years. Hosts 2-3 tasting events per month with a selection of ~200 wines. Holds a sommelier certification.
Pain Points	• Collects tasting feedback on paper — tedious to organize and analyze • Limited understanding of customer taste preferences — hard to optimize wine selection • Marketing relies solely on Instagram and mailing lists — limited reach to new customers
Goals	• Digitize event management and tasting feedback collection • Gain real-time insights into customer preferences • Reach a larger, targeted audience of wine enthusiasts
Persona 2: Alex Chen — Casual Wine Enthusiast (B2C)
Attribute	Details
Age	29
Occupation	Software engineer, recently moved to Munich
Background	Enjoys wine socially and attends tasting events at least once a month. Mostly drinks wine when going out. Starting to develop interest in understanding wine better but not yet an expert.
Pain Points	• Cannot remember names of wines enjoyed in the past • Doesn't know where to find local wine events • Feels overwhelmed choosing wine at shops without guidance
Goals	• Discover local wine events easily • Record tasting experiences for future reference • Understand personal taste preferences over time
PAGE 2: Business Registration & Subscription
Step in Journey: Sophie signs up as a business user and selects a subscription plan.

Mockup Description (for Figma):

Web page with Decantr logo centered at top
Headline: "Join Decantr as a Business"
Role selection area: Two large clickable cards side by side — "Wine Enthusiast" (outlined/unselected) | "Wine Business" (filled/selected with highlight)
Registration form below:
Business Name: text field → "Weinkultur"
Email: text field
Password: text field
Business Type: dropdown → options: Wine Bar / Winery / Event Organizer
Subscription plan section:
Two plan cards: "Basic - €29/month" | "Premium - €59/month" (highlighted)
Feature bullet points under each plan
CTA button at bottom: "Start Free Trial"
Bullet Points (for paper):

Sophie navigates to the Decantr registration page and selects the "Wine Business" role
She enters her business details including name, email, and business type (Wine Bar)
She reviews the available subscription plans and selects the Premium tier
After completing payment, she is directed to her business dashboard
Backend: User account and subscription record are created in the database (Create)
PAGE 3: Create Tasting Event
Step in Journey: Sophie creates a new tasting event for her wine bar.

Mockup Description (for Figma):

Left sidebar navigation: Dashboard | Events (active) | Wines | Analytics | Settings
Main content area — form titled "Create New Event"
Event Name: text field → "Summer Rosé Tasting"
Date & Time: date picker → "June 14, 2026 — 18:00"
Location: text field (pre-filled with bar address) → "Weinkultur, Schwabing, Munich"
Description: large text area → "Join us for an evening exploring premium Rosé wines from Provence..."
Event Type: radio buttons → "Open to all" / "Registration required" (selected)
Max Participants: number input → "20"
Ticket Price: number input → "€15"
Cover Image: upload area with placeholder
Bottom buttons: "Save as Draft" | "Next: Add Wines →"
Bullet Points (for paper):

Sophie navigates to the Events section and clicks "Create New Event"
She fills in event details: name, date, location, description, and participant limit
She sets the event to require registration with a ticket price of €15
She saves the event as a draft and proceeds to add wines
Backend: A new Event entity is created and stored in the database (Create)
PAGE 4: Manage Wine List (CRUD Operations)
Step in Journey: Sophie adds wines to her event, edits details, and removes one wine.

Mockup Description (for Figma):

Header: "Summer Rosé Tasting — Wine List" + status badge "Draft"
Wine list displayed as a table/card list:
Row 1: #1 | "Château d'Esclans Whispering Angel 2023" | Rosé | Provence | [Edit ✏️] [Delete 🗑️]
Row 2: #2 | "Domaines Ott By.Ott 2022" | Rosé | Provence | [Edit ✏️] [Delete 🗑️]
Row 3: #3 | "Miraval Studio 2023" | Rosé | Provence | [Edit ✏️] [Delete 🗑️]
Row 4: #4 | "Minuty Prestige 2022" | Rosé | Côtes de Provence | [Edit ✏️] [Delete 🗑️]
Row 5: (being deleted — shown with strikethrough or red highlight)
"+ Add Wine" button at bottom of list
Side panel or modal: "Add Wine" form with fields: Wine Name, Type (dropdown), Region, Vintage Year, Grape Variety, Tasting Order
Top right: "Publish Event" button (prominent, green)
Bullet Points (for paper):

Sophie adds five wines to the event, entering name, type, region, and vintage for each
She notices an error in one wine's details and uses the edit function to correct the vintage year
She decides to remove one wine that is no longer available and deletes it from the list
Once satisfied with the wine list, she clicks "Publish Event" to make it visible to users
Backend: Wine entries are created, updated, and deleted in the database (Create, Update, Delete). Event status is updated to "Published" (Update)
PAGE 5: Discover Events (User Perspective)
Step in Journey: Alex opens the app, browses the explore page, and discovers Sophie's event.

Mockup Description (for Figma):

Top navigation bar: Decantr logo | Search bar ("Search events, wines...") | Profile avatar
Below nav: Filter chips row — "This Week" | "Nearby" | "Rosé" | "Free" | "Under €20"
Main content split layout:
Top half: Interactive map with pin markers showing event locations (one pin highlighted near Schwabing)
Bottom half: Scrollable event cards list
Card 1 (highlighted): Cover image | "Summer Rosé Tasting" | "Jun 14 · 18:00" | "Weinkultur, Schwabing" | "€15" | "12/20 spots left" | ⭐ 4.5
Card 2: "Natural Wine Wednesday" | "Jun 11 · 19:00" | "Vinothek Maxvorstadt" | "Free"
Card 3: "Blind Tasting Challenge" | "Jun 18 · 20:00" | "Cork & Barrel" | "€25"
Bottom tab bar: 🔍 Explore (active) | 🍷 My Tastings | 📦 Cellar | 👤 Profile
Bullet Points (for paper):

Alex opens the Decantr app and lands on the Explore page
He sees a map view with nearby tasting events and a list of upcoming events
He uses filters to narrow down results by date and price range
He spots "Summer Rosé Tasting" at Weinkultur and taps the card for more details
Backend: Events are retrieved from the database filtered by location and date (Read)
PAGE 6: Event Details & Registration
Step in Journey: Alex views the event details and registers for Sophie's tasting event.

Mockup Description (for Figma):

Full-width cover image at top (wine glasses / rosé aesthetic)
Event title: "Summer Rosé Tasting"
Info row with icons: 📅 "June 14, 2026 · 18:00–20:30" | 📍 "Weinkultur, Schwabing" | 👥 "12/20 registered"
Host section: Profile thumbnail + "Hosted by Weinkultur" + ⭐ 4.7 rating
Description section: "Join us for an evening exploring premium Rosé wines from Provence. Taste 4 carefully selected wines, learn about the region, and enjoy light snacks..."
What's included: bullet list (4 wine tastings, tasting sheet, snacks)
Small map showing venue location
Fixed bottom bar: "€15 per person" + large button "Register Now"
Confirmation modal (overlay): "You're registered! ✓" + "Add to Calendar" + "View Event"
Bullet Points (for paper):

Alex views the full event details including description, time, location, and host information
He sees 12 out of 20 spots are taken and decides to register
He taps "Register Now" and confirms his attendance
He receives a confirmation with an option to add the event to his calendar
Backend: A new Registration entry linking Alex to the event is created in the database (Create)
PAGE 7: Tasting Experience — Recording Notes
Step in Journey: Alex attends the event and records tasting notes for each wine.

Mockup Description (for Figma):

Header: "Summer Rosé Tasting" + progress indicator "Wine 2 of 4"
Wine identifier: "Wine #2" (blind tasting — no name shown)
Tasting note form:
Appearance: Color selector (3-4 color swatches: pale pink, salmon, deep rosé) — "Salmon" selected
Nose (Aroma): Selectable flavor tags in bubbles/chips — Citrus ✓ | Strawberry ✓ | Floral | Peach | Tropical | Herbal | Mineral
Palate (Taste): Selectable tags — Dry ✓ | Crisp ✓ | Fruity | Smooth | Light-bodied ✓ | Medium-bodied | Full-bodied
Overall Rating: 5-star rating → 4 stars selected
Personal Notes: Text area → "Very refreshing, perfect for summer. Light strawberry finish."
Bottom buttons: "← Previous Wine" | "Save & Next Wine →"
Bullet Points (for paper):

At the event, Alex opens the tasting interface on his phone
For each wine, he records his impressions using pre-defined tags for appearance, aroma, and palate
He gives an overall star rating and optionally adds personal notes
The interface guides him through all 4 wines sequentially
Backend: A TastingNote entity is created for each wine, linked to Alex and the event (Create)
PAGE 8: Post-Event Summary & Cellar
Step in Journey: After the event, Alex views his personal tasting summary and saves favorites to his cellar.

Mockup Description (for Figma):

Header: "Your Tasting Summary" + event name
Wine reveal list (blind tasting wines now showing names):
Wine #1: "Château d'Esclans Whispering Angel 2023" — Your rating: ⭐⭐⭐⭐ — Tags: Citrus, Dry, Light
Wine #2: "Domaines Ott By.Ott 2022" — Your rating: ⭐⭐⭐⭐⭐ — Tags: Strawberry, Crisp — ❤️ Favorite
Wine #3: "Miraval Studio 2023" — Your rating: ⭐⭐⭐ — Tags: Floral, Smooth
Wine #4: "Minuty Prestige 2022" — Your rating: ⭐⭐⭐⭐ — Tags: Peach, Fruity
Insight card: "Based on your tastings, you prefer: Dry, Fruity, Light-bodied wines"
Pop-up/banner (Strava-style): "Save wines to your Cellar?" with buttons: [Add Favorites] [Add All] [Dismiss]
One wine shown being added to cellar with a checkmark animation
Bullet Points (for paper):

After the event concludes, Alex receives a personal tasting summary
The blind tasting wines are revealed with their actual names and his ratings
The platform identifies his taste preferences based on the notes he recorded
Alex is prompted to save his favorite wines to his personal cellar for future reference
Backend: Wine names are linked to tasting notes (Read). Cellar entries are created for selected wines (Create). Taste preference profile is updated.
PAGE 9: Business Analytics Dashboard
Step in Journey: Sophie reviews the aggregated feedback and analytics from her event.

Mockup Description (for Figma):

Left sidebar navigation (same as page 3)
Header: "Event Analytics — Summer Rosé Tasting" + status badge "Completed"
Summary metrics row (4 cards):
👥 Participants: 18 | ⭐ Avg Rating: 4.2/5 | 📝 Notes Recorded: 72 | ❤️ Favorites: 24
Chart area — two charts side by side:
Left: Horizontal bar chart — "Average Rating by Wine" (Ott highest at 4.6, Miraval lowest at 3.4)
Right: Tag cloud or bubble chart — "Most Mentioned Flavors" (Strawberry, Citrus, Dry, Crisp in large text; Floral, Oak, Spice in smaller)
Table below: Wine ranking — columns: Rank | Wine | Avg Rating | Times Favorited | Top Tags
Domaines Ott By.Ott — 4.6 — 8 favorites — Strawberry, Crisp
Minuty Prestige — 4.3 — 6 favorites — Peach, Fruity
Whispering Angel — 4.1 — 5 favorites — Citrus, Light
Miraval Studio — 3.4 — 2 favorites — Floral, Smooth
Bottom: "Export Report (PDF)" button | "Apply Insights →" button
Bullet Points (for paper):

Sophie accesses the analytics dashboard for her completed event
She sees key metrics: participant count, average rating, and total tasting notes submitted
The bar chart reveals that "Domaines Ott" was the highest-rated wine, while "Miraval Studio" received the lowest scores
The flavor tag analysis shows her guests predominantly prefer strawberry and citrus notes
She can export a PDF report or apply insights to plan her next event
Backend: Aggregated tasting note data is retrieved and processed for visualization (Read)
PAGE 10: Data-Driven Wine List Optimization
Step in Journey: Sophie uses the insights to update her wine list for the next event.

Mockup Description (for Figma):

Header: "Autumn Tasting — Wine List" + status "Draft"
Notification/insight banner at top: "💡 Based on your last event: Guests preferred Dry, Fruity, Light-bodied wines. Consider adding similar profiles."
Wine list (editable):
Row 1: "Domaines Ott By.Ott 2022" — Rosé — Retained ✓ (green badge: "Top Rated")
Row 2: "Minuty Prestige 2022" — Rosé — Retained ✓
Row 3: "Miraval Studio 2023" — being deleted