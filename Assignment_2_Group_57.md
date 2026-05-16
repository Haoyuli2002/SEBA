# Decantr — Assignment 2

## Table of Contents

1. [Personas](#personas)
2. [Customer Journeys](#customer-journeys)
   - [Wine Enthusiast — Alex Chen](#1-wine-enthusiast--alex-chen)
   - [Wine Business Owner — Sophie Wagner](#2-wine-business-owner--sophie-wagner)
3. [UML Class Diagram](#uml-class-diagram)

## Personas

<p align="center">
  <img src="Personas.jpeg" width="85%">
</p>

<div style="page-break-before: always;"></div>

## Customer Journeys

### 1. Wine Enthusiast — Alex Chen

#### Step 1: Registration

| Mockup | Description |
|--------|-------------|
| ![Registration 1](customer_mockups/1_Wine_Lover_Registration.png) | Alex opens the Decantr website and clicks "Sign up." On the registration page, he selects "Wine Lover" (free). He is taken to a form to fill in his personal details. |
| ![Registration 2](customer_mockups/2_Wine_Lover_Registration_2.png) | He enters his first name, last name, email, and password. After agreeing to the terms of service, he clicks "Create Account" and is immediately directed to the Explore page. |

- **Frontend:** Registration form with role selection, form validation.
- **Backend:** POST `/api/auth/register` — Creates User with role "taster". Returns JWT token. 
- **Database: Create** User document.

#### Step 2: Discovering Events

| Mockup | Description |
|--------|-------------|
| ![Discover Events](customer_mockups/3_Discover_Wine_Event.png) | The Explore page shows Alex an interactive map with pins marking nearby tasting events, alongside a scrollable list of upcoming events. He applies filters for "This Week" and "Nearby." He spots "Summer Rosé Tasting" at Weinkultur — €15, 12/20 registered, 4.5 stars. |

- **Frontend:** Map component with event markers, filterable event card list, search bar.
- **Backend:** GET `/api/events?status=published&location=munich` — Returns published events filtered by location and date. 
- **Database: Read** Events, Registrations (count per event).

#### Step 3: Viewing Event Details

| Mockup | Description |
|--------|-------------|
| ![Event Details](customer_mockups/4_View_Wine_Event.png) | Alex taps the event card and views the full details page: a cover image, event description promising four carefully selected Rosé wines from Provence, what's included (tastings, notes, snacks, sommelier guidance), host info ("Weinkultur" ⭐ 4.7), a location map, and €15 per person with a "Register Now" button. |

- **Frontend:** Event detail page with cover image, structured info, host section, location preview.
- **Backend:** GET `/api/events/:id` — Returns full event data including host business info and wine list. 
- **Database: Read** Event, Business, Wine documents.

#### Step 4: Payment & Registration

| Mockup | Description |
|--------|-------------|
| ![Book Event](customer_mockups/5_Book_Wine_Event.png) | Alex clicks "Register Now" and a payment modal appears. He sees an order summary (Summer Rosé Tasting — €15), selects "Credit Card" as payment method, and enters his card details: cardholder name, card number, expiry date, and CVV. A lock icon confirms SSL encryption. |
| ![Payment Success](customer_mockups/6_Payment_Successful.png) | After a brief "Processing..." animation, a green checkmark confirms "Payment Successful!" The modal shows the amount paid (€15) and gives him two options: "Start Tasting Experience" or "Back to Events." The event now appears in his My Tastings section. |

- **Frontend:** Payment modal with order summary, card form, processing animation, success confirmation.
- **Backend:** POST `/api/registrations` — Creates Registration document. Integrates with Stripe for payment processing. 
- **Database: Create** Registration (paymentStatus: completed, paymentMethod: credit_card, amountPaid: 15).

#### Step 5: Attending the Tasting Event

| Mockup | Description |
|--------|-------------|
| ![Start Tasting](customer_mockups/7_Start_tasting_event.png) | On the evening of the event, Alex arrives at Weinkultur and opens the tasting interface. The screen shows the event name, a list of wines to taste, and a progress indicator. He begins his tasting journey through 4 wines. |
| ![Evaluate Wines](customer_mockups/8_Evaluate_wines.png) | For each wine, Alex records his impressions using a structured form: appearance (color swatch selection), nose/aroma (selectable flavor tags like Citrus, Strawberry, Floral), palate (Dry, Crisp, Light-bodied), overall star rating (1-5), and personal notes. He clicks "Save & Next Wine" to proceed. |

- **Frontend:** Step-by-step tasting form with progress bar, color selector, tag chips, star rating, text area.
- **Backend:** POST `/api/tasting-notes` — Creates a TastingNote document for each wine, linked to user, event, and wine. 
- **Database: Create** TastingNote documents (one per wine per user).

#### Step 6: Post-Event Summary

| Mockup | Description |
|--------|-------------|
| ![Tasting Summary](customer_mockups/9_Tasting_summary.png) | After completing all tastings, Alex receives his personal summary. The wines are revealed with their actual names alongside his ratings and flavor tags. A taste profile insight tells him: "Based on your tastings, you prefer Dry, Fruity, Light-bodied wines." A banner prompts him to save his favorites to his wine cellar. |

- **Frontend:** Summary view with wine reveal cards, star ratings, taste profile insight, save-to-cellar prompt.
- **Backend:** GET `/api/users/:id/tasting-summary?eventId=...` — Retrieves tasting notes, reveals wine names, computes taste profile. 
- **Database: Read** TastingNotes (by user + event), Wines (names revealed).

#### Step 7: Wine Journal & Cellar

| Mockup | Description |
|--------|-------------|
| ![Wine Journal](customer_mockups/10_Wine_journal.png) | Later that week, Alex opens "My Cellar" and navigates to the "Journal" tab. He sees all wines he's tasted, complete with his ratings, flavor tags, personal notes, and the event where he tasted them. Statistics at the top show total wines tasted (5), average rating (4.4), and 5-star wines (2). |
| ![Wine Cellar](customer_mockups/11_Wine_Cellar.png) | In the "My Cellar" tab, Alex can view wines he's purchased or saved — with producer info, bottle count, purchase location, and price. This becomes his personal wine collection tracker, growing with each event he attends. |

- **Frontend:** Journal tab with wine cards (rating, tags, notes), Cellar tab with owned bottles, statistics, search/filter.
- **Backend:** POST `/api/cellar` — Creates CellarEntry documents. GET `/api/users/:id/cellar` — Retrieves all entries. 
- **Database: Create** CellarEntry documents. **Read** CellarEntries + Wines + TastingNotes.

---

### 2. Wine Business Owner — Sophie Wagner

#### Step 1: Registration & Subscription

| Mockup | Description |
|--------|-------------|
| ![Choose Role](business_mockups/1_Choose_roles.png) | Sophie navigates to the Decantr website and clicks "Sign up." On the registration page, she is presented with two clear options: "Wine Lover" (free) and "Wine Business" (subscription required). She selects "Wine Business," which takes her to the next step. |
| ![Register](business_mockups/2_Register_as_business_owner.png) | She fills in her personal details — first name, last name, and email — along with her business information: "Weinkultur" as the business name and "Wine Bar" as the business type. After setting a password and agreeing to the terms of service, she clicks "Next: Choose Plan →." |
| ![Subscription](business_mockups/3_Choose_a_subscription_plan.png) | Sophie is presented with two subscription plans: Basic (€29/mo) and Premium (€59/mo). She selects the Premium plan for unlimited events and advanced analytics. She enters her credit card details and clicks "Subscribe & Create Account." After payment processing, she is directed to her business dashboard. |

- **Frontend:** Registration form with role-based fields, multi-step flow, plan selection cards, payment form.
- **Backend:** POST `/api/auth/register` — Creates User + Business + Subscription documents. Payment processed via Stripe API. 
- **Database: Create** User, Business, Subscription documents.

#### Step 2: Managing Wine Inventory

| Mockup | Description |
|--------|-------------|
| ![Wine Inventory](business_mockups/12_Manage_wine_inventory.png) | Before creating events, Sophie first builds her wine inventory. She navigates to the "Wines" section in the sidebar and sees her existing collection displayed in a table: wine name (with grape variety), region, type (color-coded badges), stock count, and price. She can search and filter wines. |
| ![Add Wine](business_mockups/13_Add_wine_to_inventory.png) | Sophie clicks "Add New Wine" to expand her collection. A modal appears where she enters the wine name, type, region, grape variety, stock quantity, and price. She can also edit existing wines or delete ones she no longer carries. This demonstrates full CRUD functionality on her wine inventory. |

- **Frontend:** Data table with search, Add/Edit modal form, Delete with confirmation.
- **Backend:** POST `/api/wines` (Create), GET `/api/business/:id/wines` (Read), PUT `/api/wines/:id` (Update), DELETE `/api/wines/:id` (Delete). 
- **Database:** Full **CRUD** on Wine documents.

#### Step 3: Creating a Tasting Event

| Mockup | Description |
|--------|-------------|
| ![Events Page](business_mockups/4_Event_Page.png) | Sophie navigates to the "Events" section. She sees her list of past and upcoming events with status badges (Published, Draft, Completed), registration progress bars, and revenue for each. She clicks "Create Event" to start a new one. |
| ![Create Event](business_mockups/5_Create_an_Event.png) | Sophie fills out the event creation form: event name ("Summer Rosé Tasting"), date (June 14, 2026), time (18:00), location (pre-filled with her bar address), description, event type ("Registration required"), max participants (20), and ticket price (€15). She clicks "Next: Add Wines →." |

- **Frontend:** Event list with status badges, Create Event form with date picker, radio buttons, number inputs.
- **Backend:** POST `/api/events` — Creates Event document with status "draft". 
- **Database: Create** Event document.

#### Step 4: Adding Wines to the Event

| Mockup | Description |
|--------|-------------|
| ![Add Wines 1](business_mockups/6_Add_wines_to_the_event.png) | On the wine list management page, Sophie adds wines from her inventory to the tasting event. She sees the current wine list in a table format showing order number, wine name, type, region, and vintage with Edit and Delete action buttons. |
| ![Add Wines 2](business_mockups/7_Add_wines_to_the_event_2.png) | Sophie uses the "Add Wine" button to open a modal form. She enters the wine name, selects the type (Rosé/Red/White/Sparkling), vintage year, region, and grape variety. Each wine is added to the event's tasting order. |
| ![Add Wines 3](business_mockups/8_Add_wines_to_the_event_3.png) | She notices an incorrect vintage on one wine and uses the edit button to correct it. She also removes a wine that is no longer available. The table updates in real-time, demonstrating Create, Read, Update, and Delete operations on the event's wine list. |
| ![Publish](business_mockups/9_Publish_event.png) | Satisfied with her selection, Sophie clicks the green "Publish Event" button. The event status changes from "Draft" to "Published" and becomes immediately visible to all wine enthusiasts on the Explore page. |

- **Frontend:** Wine table with CRUD actions, Add/Edit modal, Publish button.
- **Backend:** POST `/api/events/:id/wines` (Create), PUT `/api/wines/:id` (Update), DELETE `/api/wines/:id` (Delete), PUT `/api/events/:id` (Update status to "published").
- **Database:** Full **CRUD** on event Wine documents.

#### Step 5: Reviewing Event Performance & Feedback

| Mockup | Description |
|--------|-------------|
| ![Event Performance](business_mockups/10_Event_performance.png) | After the event concludes, Sophie returns to her Dashboard. She selects "Summer Rosé Tasting" from the event dropdown to view its performance. She sees key metrics (revenue €270, 18/20 attendees, avg rating 4.2/5), wine satisfaction ratings displayed as star ratings sorted from highest to lowest, and real user feedback with text comments and individual star ratings. |

- **Frontend:** Event selector dropdown, stat cards, star rating list (sorted), user feedback cards with quotes.
- **Backend:** GET `/api/events/:id/analytics` — Aggregates TastingNotes: average ratings per wine, user comments. 
- **Database: Read** TastingNotes (aggregated), Registrations.

#### Step 6: Business Analytics Overview

| Mockup | Description |
|--------|-------------|
| ![Analytics](business_mockups/11_Business_Analytitcs.png) | Sophie navigates to the "Analytics" section for a holistic view across all her events. She sees customer retention (64%), new enthusiasts gained (+124), total bottles served (432), a Revenue vs Attendance trend chart over 6 months, and a Popular Wine Types pie chart showing the distribution of preferences (Rosé 45%, White 30%, Red 20%, Sparkling 5%). |

- **Frontend:** Charts (Recharts: LineChart, PieChart), metric cards with progress indicators.
- **Backend:** GET `/api/business/:id/analytics` — Cross-event aggregation of revenue, attendance, wine type preferences. 
- **Database: Read** Events, TastingNotes, Registrations (historical aggregation).

---

<div style="page-break-before: always;"></div>

## UML Class Diagram

<p align="center">
  <img src="UML_Diagram.png" width="80%">
</p>

<div style="font-size: 11px; line-height: 1.4; margin-top: 10px;">

<p>This UML class diagram represents Decantr's conceptual data model. The central class is <b>User</b>, specialized into Wine Enthusiast (B2C) and Business Owner (B2B).<br>
<b>Business Owner</b> → owns Business → creates Events → features Wines &nbsp;|&nbsp; <b>Wine Enthusiast</b> → creates Registrations (with payment) → records TastingNotes → saves CellarEntries</p>

<p><b>Key Enumerations:</b> UserRole · EventStatus · WineType · BusinessType · PaymentStatus · PaymentMethod · SubscriptionTier · EventType</p>

<p><b>Key Relationships:</b></p>
<table style="font-size: 11px; width: 100%; border: none;">
<tr>
<td style="vertical-align: top; padding-right: 5px;">
• User (Business) owns one Business (1:1)<br>
• Business hosts many Events (1:*)<br>
• Event features many Wines (1:*)<br>
• User (Enthusiast) has many Registrations (1:*)<br>
• Registration linked to one Event (*:1)
</td>
<td style="vertical-align: top;">
• User (Enthusiast) creates many TastingNotes (1:*)<br>
• TastingNote references one Wine and one Event<br>
• User (Enthusiast) has many CellarEntries (1:*)<br>
• CellarEntry references one Wine<br>
• Business has one Subscription (1:0..1)
</td>
</tr>
</table>

</div>