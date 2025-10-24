<div align="center">

# 🎬 NETFLIXPRO - ADVANCED CONTENT ANALYTICS DASHBOARD
### *AI-Assisted Strategic Insights for Movies & TV Shows (2008–2021)*

![NetflixPro](https://img.shields.io/badge/🎬%20NetflixPro-Content%20Analytics-red?style=for-the-badge&logoColor=white)
![React](https://img.shields.io/badge/⚛️%20React-18+-cyan?style=for-the-badge&logoColor=white)
![TypeScript](https://img.shields.io/badge/📘%20TypeScript-5.5+-blue?style=for-the-badge&logoColor=white)
![Vite](https://img.shields.io/badge/⚡%20Vite-5.4+-purple?style=for-the-badge&logoColor=white)
![Tailwind](https://img.shields.io/badge/🎨%20TailwindCSS-3.4+-teal?style=for-the-badge&logoColor=white)
![Supabase](https://img.shields.io/badge/🗄️%20Supabase-2.x-green?style=for-the-badge&logoColor=white)
![Status](https://img.shields.io/badge/🚀%20Status-Ready%20to%20Run-brightgreen?style=for-the-badge&logoColor=white)

🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿
```
███╗   ██╗███████╗████████╗██╗     ███████╗██╗  ██╗██╗██╗  ██╗███████╗
████╗  ██║██╔════╝╚══██╔══╝██║     ██╔════╝██║  ██║██║██║ ██╔╝██╔════╝
██╔██╗ ██║█████╗     ██║   ██║     ███████╗███████║██║█████╔╝ █████╗  
██║╚██╗██║██╔══╝     ██║   ██║     ╚════██║██╔══██║██║██╔═██╗ ██╔══╝  
██║ ╚████║███████╗   ██║   ███████╗███████║██║  ██║██║██║  ██╗███████╗
╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝
```
🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿


🎯 **Next-Generation Content Intelligence & Strategic Analytics**  
*Catalog Insights • Global Coverage • Executive Summaries • Recommendations*

🔧 [Live Demo]() • 📖 [Docs]() • ⭐ Star this project  

</div>

---

## 🌟 Revolutionary Features

### 📈 DATA-DRIVEN DASHBOARD
- KPI Cards (Total, Movies, TV Shows, Countries)
- Growth Trends by Year
- Rating, Genre, and Country Distributions

### 🔎 EXPLORE CONTENT
- Full-Text Search (Title, Director, Cast, Country)
- Multi-filters: Type, Year, Rating, Genre, Country
- Rich Content List with Selection

### 🧠 AI-ASSISTED INSIGHTS
- Strategic Insights Panel (Strengths, Gaps, Opportunities)
- Executive Summary
- Exportable Text Report

### 🧭 ADVANCED ANALYTICS
- Diversity Index (Genre/Country/Type balance over time)
- Genre Network (co-occurrence graph)
- Regional Representation & Inclusion Tracker
- Country-level Breakdown & World Map

---

## 🔥 Core Capabilities
- 🎬 **Comprehensive Catalog Analytics:** Movies vs TV Shows, Genre/Country mix
- 🔍 **Intelligent Filtering:** Combine multiple filters for precise queries
- 🧩 **Recommendations:** Related titles based on type/genre/country/year/ratings
- 📊 **Rich Visualizations:** Line, Bar, Pie, Network, and Map views
- 🗄️ **Supabase Integration:** Seed and query `netflix_content` table
- 📥 **Export:** One-click executive report download
- 🎨 **Modern UI/UX:** Tailwind CSS design with responsive grid

---

## 🚀 Quick Start Guide

### ⚡ Prerequisites

```bash
✅ Node.js 18+
✅ npm
✅ Modern Browser
```

### 🛠️ Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd Netflix/project

# Install dependencies
npm install

# (Optional) Configure Supabase for persistence
# Create .env in project/ with your credentials
# VITE_SUPABASE_URL=your-supabase-url
# VITE_SUPABASE_ANON_KEY=your-anon-key

# Apply database schema (Supabase SQL editor)
# Run: supabase/migrations/20251001165710_create_netflix_content_tables.sql

# Start development server
npm run dev
```

🎉 **App Running:** http://localhost:5173  
🗄️ **Database:** Supabase table `netflix_content` (auto-seeded on first run)

> Note: Supabase credentials are required for DB seeding and fetching. Ensure `.env` is present at `project/.env` before starting.

---

## 🏗️ Project Architecture
```
🎬 NETFLIXPRO ANALYTICS DASHBOARD
┣━━ project/
┃   ┣━━ index.html                 # Root HTML
┃   ┣━━ package.json               # Scripts & deps
┃   ┣━━ vite.config.ts             # Vite config
┃   ┣━━ tailwind.config.js         # Tailwind config
┃   ┣━━ postcss.config.js          # PostCSS plugins
┃   ┣━━ supabase/
┃   ┃   ┗━━ migrations/            # SQL schema
┃   ┗━━ src/
┃       ┣━━ main.tsx               # App mount
┃       ┣━━ App.tsx                # Tabs, data flow
┃       ┣━━ index.css              # Tailwind directives
┃       ┣━━ lib/
┃       ┃   ┗━━ supabase.ts        # Supabase client
┃       ┣━━ types/
┃       ┃   ┗━━ netflix.ts         # Data types
┃       ┣━━ data/
┃       ┃   ┣━━ netflixData.ts     # Synthetic dataset generator
┃       ┃   ┗━━ Netflix Dataset.csv # Raw CSV (reference)
┃       ┣━━ utils/                 # Analytics & helpers
┃       ┃   ┣━━ dataAnalysis.ts
┃       ┃   ┣━━ advancedAnalysis.ts
┃       ┃   ┣━━ recommendations.ts
┃       ┃   ┣━━ exportUtils.ts
┃       ┃   ┗━━ seedDatabase.ts
┃       ┗━━ components/            # UI & charts
┃           ┣━━ StatCard.tsx
┃           ┣━━ PieChart.tsx, BarChart.tsx, LineChart.tsx
┃           ┣━━ GenreNetwork.tsx, WorldMap.tsx, DiversityIndex.tsx
┃           ┣━━ InclusionTracker.tsx
┃           ┣━━ SearchFilters.tsx, ContentList.tsx
┃           ┗━━ RecommendationModal.tsx, StrategicInsights.tsx
┗━━ README.md
```

---

## 🛠️ Technology Stack

### ⚛️ Frontend Core
- React 18
- TypeScript 5.5
- Vite 5.4
- Tailwind CSS 3.4

### 🌐 Data & Services
- Supabase (Postgres + REST) for storage and seeding
- Local synthetic dataset as fallback/seed source

### 🔧 Dev & Quality
- ESLint (TS + React Hooks)
- npm scripts

---

## 🚀 Features Breakdown

### 📊 Dashboard
- KPI cards and executive summary
- Content growth line chart (2008–2021)
- Top genres and countries bar charts
- Type distribution pie chart

### 🔍 Explore
- Real-time search across title/director/cast/country
- Multi-select filters: Types, Years, Ratings, Genres, Countries
- Result count with active filter indicator

### 🧠 Advanced Analytics
- Diversity index by year (genre/country/type balance)
- Genre co-occurrence network
- Regional representation and inclusion tracker
- Country details with top genres

### 🎯 Recommendations
- Similarity based on type/genres/country/rating/year/duration
- Modal with curated related content

### 🧾 Export
- One-click report: `netflix-analytics-report.txt`
- CSV export helper available for datasets

---

## 📱 Responsive Design

| Device  | Breakpoint     | Layout        | Features                          |
|---------|-----------------|---------------|-----------------------------------|
| Mobile  | < 640px         | Single column | Full-width cards, touch optimized |
| Tablet  | 640–1024px      | Two columns   | Balanced layout                   |
| Desktop | 1024–1440px     | Three cols    | Sidebar-style sections            |
| Large   | > 1440px        | Expanded grid | Max content density               |

---

## 🔐 Environment Variables
Create `project/.env`:
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```
> These are required at build/start time. Keep them private and never commit `.env` (already gitignored).

---

## 🤝 Contributing
1. 🍴 Fork this repository
2. 🌟 Star to support
3. 🔧 Follow linting and TypeScript best practices
4. 🧪 Test changes locally (filters/analytics/reports)
5. 📝 Commit with clear messages
6. 🚀 Open a detailed Pull Request

---

## 📜 License & Credits

📄 **MIT License** – Free for personal & commercial use

### 🙏 Acknowledgments
- ⚛️ React Team
- 🎨 Tailwind CSS
- 🗄️ Supabase
- 📊 Open-source visualization inspiration

---

<div align="center">

**🎬 Built for Data-Driven Content Strategy**  
📈 Insights • 🌍 Global Coverage • 🧭 Smart Exploration

⭐ **Star this repo if it helped you!** ⭐

🍿 *Understand the catalog. Discover gaps. Drive strategy.* 🍿

🚀 **Ready to analyze the Netflix catalog? Launch the dashboard now!** 🚀

</div>
